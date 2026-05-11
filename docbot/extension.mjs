import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { joinSession } from "@github/copilot-sdk/extension";

const __dirname = dirname(fileURLToPath(import.meta.url));
const promptsDir = join(__dirname, "prompts");

function loadPrompt(name) {
  return readFileSync(join(promptsDir, `${name}.md`), "utf-8");
}

function buildPrompt(specialist, userTopic) {
  const shared = loadPrompt("shared");
  const specialistPrompt = loadPrompt(specialist);
  return [
    "## Design System\n\n" + shared,
    "## Specialist Instructions\n\n" + specialistPrompt,
    "## User Request\n\n" + userTopic,
  ].join("\n\n---\n\n");
}

const specialists = [
  {
    name: "docbot-explore",
    slug: "explore",
    description:
      "Compare approaches side-by-side with card grids, tradeoff tables, and recommendations",
  },
  {
    name: "docbot-review",
    slug: "review",
    description:
      "Annotated code walkthroughs, architecture diagrams, and PR review documents",
  },
  {
    name: "docbot-design",
    slug: "design",
    description:
      "Living design system token sheets and component variant contact sheets",
  },
  {
    name: "docbot-prototype",
    slug: "prototype",
    description:
      "Animation sandboxes with tunable parameters and clickable multi-screen flows",
  },
  {
    name: "docbot-diagram",
    slug: "diagram",
    description:
      "Inline SVG flowcharts, architecture diagrams, ER diagrams, and data flow illustrations",
  },
  {
    name: "docbot-deck",
    slug: "deck",
    description:
      "Arrow-key slide decks as a single HTML file — present in a meeting with no export step",
  },
  {
    name: "docbot-research",
    slug: "research",
    description:
      "Explainers with collapsible sections, tabbed code samples, and sidebar glossaries",
  },
  {
    name: "docbot-report",
    slug: "report",
    description:
      "Status updates with KPI strips, incident post-mortems with timelines and charts",
  },
  {
    name: "docbot-editor",
    slug: "editor",
    description:
      "Throwaway editing interfaces — triage boards, config editors, prompt tuners — with export",
  },
];

const slugMap = Object.fromEntries(specialists.map((s) => [s.slug, s]));

function buildHelpText() {
  const lines = [
    "Available subtasks:\n",
    ...specialists.map((s) => `  ${s.slug.padEnd(12)} ${s.description}`),
    "",
    "Usage: /docbot <subtask> <topic>",
    "  e.g. /docbot diagram the authentication flow",
    "",
    "Run /docbot help to see this list.",
  ];
  return lines.join("\n");
}

function parseSubtask(message) {
  if (!message) return { slug: null, rest: "" };
  const trimmed = message.trim();
  const firstWord = trimmed.split(/\s+/)[0].toLowerCase();
  if (slugMap[firstWord]) {
    return { slug: firstWord, rest: trimmed.slice(firstWord.length).trim() };
  }
  return { slug: null, rest: trimmed };
}

// Declare session first so command handlers can reference it via closure.
// It's assigned once joinSession() resolves — before any user command fires.
let session;

const slashCommands = [
  {
    name: "docbot",
    description: "Generate HTML documents — run /docbot help for subtasks",
    handler: async ({ args }) => {
      const message = args ?? "";
      const { slug, rest } = parseSubtask(message);

      // help / --help / no args → show available subtasks via orchestrator
      if (
        !slug &&
        (!message.trim() || /^(help|--help|-h)$/i.test(message.trim()))
      ) {
        const orchestratorPrompt = loadPrompt("orchestrator");
        await session.send({
          prompt:
            orchestratorPrompt +
            "\n\n## User Request\n\nList all available documentation agents.",
        });
        return;
      }

      // Known subtask → route to specialist
      if (slug) {
        const userMessage = rest || `Generate a ${slug} document.`;
        const prompt = buildPrompt(slug, userMessage);
        await session.send({ prompt });
        return;
      }

      // Unknown subtask → let orchestrator route it
      const orchestratorPrompt = loadPrompt("orchestrator");
      await session.send({
        prompt: orchestratorPrompt + "\n\n## User Request\n\n" + message,
      });
    },
  },
];

session = await joinSession({
  onPermissionRequest: ({ toolName }) => {
    const safeTools = ["read_file", "grep", "glob", "view", "list_directory"];
    if (safeTools.includes(toolName)) {
      return { permissionDecision: "allow" };
    }
    return { permissionDecision: "ask" };
  },
  commands: slashCommands,
  tools: [],
  hooks: {},
});
