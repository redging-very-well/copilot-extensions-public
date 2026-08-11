---
name: docbot
description: Generate a self-contained HTML document — slide deck, SVG diagram, design system sheet, prototype, explainer, status report, or editing UI. Run /docbot help for the nine subtasks.
argument-hint: <subtask> <topic>
allowed-tools: Task, Read, Glob
---

Route this docbot request. The user's arguments are:

$ARGUMENTS

## Subtasks

| Subtask | Agent | Generates |
|---------|-------|-----------|
| `explore` | `docbot-explore` | Compare approaches side-by-side with card grids, tradeoff tables, and recommendations |
| `review` | `docbot-review` | Annotated code walkthroughs, architecture diagrams, and PR review documents |
| `design` | `docbot-design` | Living design system token sheets and component variant contact sheets |
| `prototype` | `docbot-prototype` | Animation sandboxes with tunable parameters and clickable multi-screen flows |
| `diagram` | `docbot-diagram` | Inline SVG flowcharts, architecture diagrams, ER diagrams, and data flow illustrations |
| `deck` | `docbot-deck` | Arrow-key slide decks as a single HTML file — present in a meeting with no export step |
| `research` | `docbot-research` | Explainers with collapsible sections, tabbed code samples, and sidebar glossaries |
| `report` | `docbot-report` | Status updates with KPI strips, incident post-mortems with timelines and charts |
| `editor` | `docbot-editor` | Throwaway editing interfaces — triage boards, config editors, prompt tuners — with export |

## Routing

Take the first whitespace-delimited word of the arguments, lowercased, as the subtask. Everything after it is the topic. Then follow exactly one of these three branches.

**A. No arguments, or the arguments are exactly `help`, `--help`, or `-h`.**

Read `${CLAUDE_PLUGIN_ROOT}/prompts/orchestrator.md` and present its catalogue of the nine agents to the user, so they can see when to reach for each. Then stop. Do not generate a document.

**B. The first word matches a subtask in the table above.**

Launch the matching `docbot-<subtask>` subagent with the Task tool. Do not do the work yourself and do not read the specialist prompt files — the agent handles all of it. The task prompt you give the agent must contain:

- The topic, verbatim as the user wrote it. If the topic is empty, use `Generate a <subtask> document.`
- This line, so the agent can find its briefs: `Your docbot prompts directory is ${CLAUDE_PLUGIN_ROOT}/prompts`
- The absolute path of the current working directory, so the agent writes `docs/html/` into the right project.

When the agent returns, report the path of the file it wrote in one line. Do not restate the document's contents.

**C. The first word matches nothing in the table.**

Do not guess a subtask and do not generate a document. Read the arguments as an intent, name the one or two subtasks that fit, and suggest the exact command to run — for example `I want to compare auth strategies` maps to `/docbot explore authentication strategies`, and `draw the DB schema` maps to `/docbot diagram database schema relationships`. Keep it to a few lines.
