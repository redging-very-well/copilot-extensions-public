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

const slashCommands = [
  {
    name: "docbot",
    description: "List available docbot generators or route to the right one",
    action: async (session, params) => {
      const orchestratorPrompt = loadPrompt("orchestrator");
      const userMessage = params?.message ?? "List all available documentation agents.";
      await session.send({
        prompt: orchestratorPrompt + "\n\n## User Request\n\n" + userMessage,
      });
    },
  },
  ...specialists.map((spec) => ({
    name: spec.name,
    description: spec.description,
    action: async (session, params) => {
      const userMessage = params?.message ?? `Generate a ${spec.slug} document.`;
      const prompt = buildPrompt(spec.slug, userMessage);
      await session.send({ prompt });
    },
  })),
];

await joinSession({
  onPermissionRequest: ({ toolName }) => {
    const safeTools = [
      "read_file",
      "grep",
      "glob",
      "view",
      "list_directory",
    ];
    if (safeTools.includes(toolName)) {
      return { permissionDecision: "allow" };
    }
    return { permissionDecision: "ask" };
  },
  slashCommands,
  tools: [],
  hooks: {},
});
