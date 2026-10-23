import { Tool } from '../types';

export const INITIAL_TOOLS: Tool[] = [
  {
    id: 'tool-planner',
    name: 'Goal Decomposer & Planner',
    description: 'Breaks complex high-level objectives into sequential, actionable execution phases with dependency graphs.',
    category: 'planning',
    icon: 'Layers',
    status: 'simulated',
    isEnabled: true,
    mcpCompatible: true,
    exampleInput: JSON.stringify({ goal: "Prepare project checklist", deadline: "Friday", scope: "v1 launch" }, null, 2),
    exampleOutput: JSON.stringify({ phases: 4, tasks: 12, criticalPath: ["Spec review", "QA audit", "Release tag"] }, null, 2),
    parameters: [
      { name: 'goal', type: 'string', description: 'The overarching objective to break down', required: true },
      { name: 'maxSteps', type: 'number', description: 'Upper bound on steps (default: 5)', required: false },
      { name: 'granularity', type: 'enum', description: 'high-level | balanced | granular', required: false }
    ]
  },
  {
    id: 'tool-checklist',
    name: 'Structured Checklist Generator',
    description: 'Generates prioritized, categorised task lists with verification criteria and ownership markers.',
    category: 'productivity',
    icon: 'CheckSquare',
    status: 'simulated',
    isEnabled: true,
    mcpCompatible: true,
    exampleInput: JSON.stringify({ topic: "Weekly sprint prep", categories: ["Immediate", "Scheduled", "Follow-up"] }, null, 2),
    exampleOutput: JSON.stringify({ checklist: [{ id: "c1", task: "Review pull requests", priority: "high" }] }, null, 2),
    parameters: [
      { name: 'context', type: 'string', description: 'Contextual notes and background items', required: true },
      { name: 'format', type: 'string', description: 'Output formatting template (markdown or JSON)', required: false }
    ]
  },
  {
    id: 'tool-summarizer',
    name: 'Document Synthesizer',
    description: 'Extracts core insights, action items, executive takeaways, and constraints from long-form content.',
    category: 'analysis',
    icon: 'FileText',
    status: 'simulated',
    isEnabled: true,
    mcpCompatible: true,
    exampleInput: JSON.stringify({ sourceLengthWords: 3400, targetFormat: "bullet-points", focus: "architectural decisions" }, null, 2),
    exampleOutput: JSON.stringify({ summaryPoints: 5, actionItems: 4, readTimeMinutes: 1 }, null, 2),
    parameters: [
      { name: 'documentText', type: 'string', description: 'Text or reference URI to analyze', required: true },
      { name: 'depth', type: 'string', description: 'brief | standard | exhaustive', required: false }
    ]
  },
  {
    id: 'tool-calendar',
    name: 'Calendar & Schedule Optimizer',
    description: 'Allocates execution blocks into realistic time windows based on effort estimations and constraints.',
    category: 'productivity',
    icon: 'Calendar',
    status: 'simulated',
    isEnabled: true,
    mcpCompatible: true,
    exampleInput: JSON.stringify({ taskList: ["Focus sprint 90m", "Spec review 45m"], startDay: "Monday" }, null, 2),
    exampleOutput: JSON.stringify({ schedule: [{ day: "Monday 10:00 AM", item: "Focus sprint" }] }, null, 2),
    parameters: [
      { name: 'timeBudget', type: 'string', description: 'Daily available focus hours', required: false },
      { name: 'preferredSlots', type: 'string[]', description: 'Preferred times of day for deep work', required: false }
    ]
  },
  {
    id: 'tool-code-auditor',
    name: 'Code & Dependency Auditor',
    description: 'Inspects code packages, tests, and configuration files for vulnerabilities, dead code, or upgrade diffs.',
    category: 'data',
    icon: 'Terminal',
    status: 'simulated',
    isEnabled: true,
    mcpCompatible: true,
    exampleInput: JSON.stringify({ repoUrl: "local://workspace", scanMode: "quick-verify" }, null, 2),
    exampleOutput: JSON.stringify({ issuesFound: 0, testCoverage: "94%", recommendedActions: [] }, null, 2),
    parameters: [
      { name: 'targetPath', type: 'string', description: 'Relative path to audit', required: true }
    ]
  },
  {
    id: 'tool-alexa-voice',
    name: 'Alexa+ Voice Agent Connector',
    description: 'Synchronizes task prompts and voice check-ins with Alexa+ conversational endpoint for ambient hands-free updates.',
    category: 'integration',
    icon: 'Mic',
    status: 'planned',
    isEnabled: false,
    mcpCompatible: true,
    exampleInput: JSON.stringify({ intent: "Alexa, what's next on my TaskWeave checklist?", deviceId: "echo-ambient-01" }, null, 2),
    exampleOutput: JSON.stringify({ speechOutput: "You have 2 high-priority tasks remaining for this afternoon.", card: "Sprint Checklist" }, null, 2),
    parameters: [
      { name: 'skillId', type: 'string', description: 'Alexa Developer Skill ID', required: true },
      { name: 'pushNotification', type: 'boolean', description: 'Send audio reminder when step finishes', required: false }
    ]
  },
  {
    id: 'tool-mcp-github',
    name: 'MCP GitHub Server Bridge',
    description: 'External Model Context Protocol bridge connecting to GitHub issues, pull requests, and git commit hooks.',
    category: 'integration',
    icon: 'GitPullRequest',
    status: 'planned',
    isEnabled: false,
    mcpCompatible: true,
    exampleInput: JSON.stringify({ command: "mcp/github:create_issue", repo: "org/repo", title: "TaskWeave execution task" }, null, 2),
    exampleOutput: JSON.stringify({ issueUrl: "https://github.com/org/repo/issues/42", state: "open" }, null, 2),
    parameters: [
      { name: 'mcpEndpoint', type: 'string', description: 'Local or remote MCP URI (e.g. mcp://localhost:8080)', required: true }
    ]
  },
  {
    id: 'tool-slack-notifier',
    name: 'Team Workspace Notifier (Slack MCP)',
    description: 'Posts structured workflow status summaries and milestone completions to designated channels.',
    category: 'integration',
    icon: 'MessageSquare',
    status: 'planned',
    isEnabled: false,
    mcpCompatible: true,
    exampleInput: JSON.stringify({ channel: "#dev-standup", reportFormat: "compact-summary" }, null, 2),
    exampleOutput: JSON.stringify({ delivered: true, timestamp: "16:42:00" }, null, 2),
    parameters: [
      { name: 'webhookUrl', type: 'string', description: 'Incoming webhook URL or MCP transport', required: true }
    ]
  }
];
