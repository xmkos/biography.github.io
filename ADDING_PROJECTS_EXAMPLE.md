# Example: Adding a New Project

## Quick Copy-Paste Template

Copy this template and paste it into your `projects.json` file:

```json
{
  "id": "my-new-project",
  "title": "My Amazing Project",
  "categories": ["unity"],
  "stack": ["Unity", "C#"],
  "excerpt": "Brief description of what this project does and why it's interesting.",
  "details": {
    "heading": "Key Features",
    "items": [
      "First awesome feature",
      "Second awesome feature",
      "Third awesome feature"
    ],
    "outcome": "What was achieved or learned from this project."
  }
}
```

## Where to Add It

1. Open `projects.json`
2. Find the `"projects"` array
3. Add a **comma** after the last project
4. Paste your new project
5. Save the file

### ✅ Correct Example:

```json
{
  "projects": [
    {
      "id": "existing-project",
      "title": "Existing Project",
      ...
    },    ← Don't forget this comma!
    {
      "id": "my-new-project",
      "title": "My New Project",
      ...
    }
  ]
}
```

### ❌ Common Mistake (Missing Comma):

```json
{
  "projects": [
    {
      "id": "existing-project",
      "title": "Existing Project",
      ...
    }    ← Missing comma here!
    {
      "id": "my-new-project",
      ...
    }
  ]
}
```

## Full Example with All Optional Fields

```json
{
  "id": "advanced-ai-system",
  "title": "Advanced Enemy AI System",
  "categories": ["unity", "game-jams"],
  "stack": ["Unity", "C#", "Behavior Trees", "NavMesh"],
  "status": "Completed",
  "meta": {
    "timeline": "2-week sprint",
    "role": "AI Programmer",
    "platform": "PC/Console"
  },
  "excerpt": "Modular AI framework featuring behavior trees, pathfinding, and dynamic difficulty adjustment for adaptive gameplay experiences.",
  "details": {
    "heading": "Technical Highlights",
    "items": [
      "Behavior tree system with 15+ reusable nodes",
      "A* pathfinding with dynamic obstacle avoidance",
      "Real-time difficulty scaling based on player performance",
      "Memory-efficient state machine with 8 enemy types",
      "Debug visualization tools for AI decision-making"
    ],
    "outcome": "Successfully implemented in production game, reduced development time for future AI by 40%"
  }
}
```

## Field-by-Field Explanation

| Field | Required | Example | Notes |
|-------|----------|---------|-------|
| `id` | ✅ Yes | `"advanced-ai-system"` | Unique, lowercase, use hyphens |
| `title` | ✅ Yes | `"Advanced Enemy AI System"` | Display name |
| `categories` | ✅ Yes | `["unity", "ml"]` | Used for filtering |
| `stack` | ✅ Yes | `["Unity", "Python"]` | Technologies used |
| `status` | ❌ No | `"In development"` | Shows badge if present |
| `meta.timeline` | ❌ No | `"2-week sprint"` | How long it took |
| `meta.role` | ❌ No | `"Lead Developer"` | Your role |
| `meta.platform` | ❌ No | `"Mobile"` | Target platform |
| `excerpt` | ✅ Yes | "Short description..." | Main card text |
| `details.heading` | ✅ Yes | `"Key Features"` | Section title |
| `details.items` | ✅ Yes | `["Item 1", "Item 2"]` | Bullet points |
| `details.outcome` | ✅ Yes | "Final result..." | Summary |

## Tips for Great Project Descriptions

### ✅ Good Excerpt:
> "Modular AI framework featuring behavior trees, pathfinding, and dynamic difficulty adjustment for adaptive gameplay experiences."

**Why it's good:**
- Mentions key technologies (behavior trees, pathfinding)
- Explains what it does (adaptive gameplay)
- Concise but informative

### ❌ Bad Excerpt:
> "I made an AI system."

**Why it's bad:**
- Too vague
- No technical details
- Doesn't explain value or complexity

### ✅ Good Detail Items:
- "Behavior tree system with 15+ reusable nodes"
- "A* pathfinding with dynamic obstacle avoidance"
- "Real-time difficulty scaling based on player performance"

**Why they're good:**
- Specific and quantifiable
- Mention technical approaches
- Show complexity and thought

### ❌ Bad Detail Items:
- "Made some AI"
- "It works well"
- "Users like it"

**Why they're bad:**
- Vague and generic
- No technical substance
- Unmeasurable claims
