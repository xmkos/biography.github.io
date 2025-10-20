# Managing Projects

Your portfolio projects are now stored in `projects.json` for easy management!

## 📁 File Structure

```
projects.json       ← All your projects live here
index.html         ← Main HTML (projects load dynamically)
app.js             ← JavaScript that loads and renders projects
style.css          ← Styling
```

## 🎯 How to Add a New Project

1. Open `projects.json`
2. Add a new project object to the `projects` array
3. Follow this template:

```json
{
  "id": "unique-project-id",
  "title": "Your Project Title",
  "categories": ["unity", "python", "game-jams", "ml"],
  "stack": ["Technology 1", "Technology 2", "Technology 3"],
  "status": "In development",
  "meta": {
    "timeline": "Development timeframe",
    "role": "Your role",
    "platform": "Target platform"
  },
  "excerpt": "Short description shown on the card (1-2 sentences)",
  "details": {
    "heading": "Key features",
    "items": [
      "Feature or highlight 1",
      "Feature or highlight 2",
      "Feature or highlight 3"
    ],
    "outcome": "Final result or goal description"
  }
}
```

## 📝 Field Reference

### Required Fields:
- **id**: Unique identifier (use lowercase with hyphens)
- **title**: Project name displayed as heading
- **categories**: Array of filter tags (must match filter buttons)
- **stack**: Array of technologies used
- **excerpt**: Short description shown initially
- **details**: Object containing expanded information

### Optional Fields:
- **status**: Shows a badge (e.g., "In development", "Completed", "Live")
- **meta.timeline**: Development duration
- **meta.role**: Your role in the project
- **meta.platform**: Target platform/device

## 🏷️ Available Categories

Use these values in the `categories` array (they match the filter buttons):
- `"unity"` - Unity projects
- `"python"` - Python projects
- `"game-jams"` - Game jam entries
- `"ml"` - Machine learning projects

**Note:** A project can have multiple categories!

## ✂️ How to Remove a Project

Simply delete the entire project object from the `projects` array in `projects.json`.

## 🔄 How to Reorder Projects

Projects are displayed in the order they appear in the JSON file. To reorder:
1. Cut the project object
2. Paste it in the desired position
3. Save the file

## ✅ Example: Complete Project Entry

```json
{
  "id": "space-shooter",
  "title": "Space Shooter Arena",
  "categories": ["unity", "game-jams"],
  "stack": ["Unity", "C#", "Photon"],
  "status": "Released",
  "meta": {
    "timeline": "72-hour game jam",
    "role": "Lead programmer",
    "platform": "PC/Mac"
  },
  "excerpt": "Fast-paced multiplayer space combat with procedural weapon generation and skill-based matchmaking.",
  "details": {
    "heading": "Key Features",
    "items": [
      "Real-time multiplayer using Photon networking",
      "Procedural weapon system with 100+ combinations",
      "Dynamic difficulty scaling based on player skill",
      "Retro-inspired pixel art with modern VFX"
    ],
    "outcome": "Won 'Best Multiplayer' award at GameDev Jam 2025"
  }
}
```

## 🚨 Common Mistakes to Avoid

1. **Missing comma** between projects
2. **Extra comma** after last project
3. **Unmatched quotes** in text
4. **Invalid category names** (won't be filtered correctly)
5. **Forgetting closing braces** `}` or brackets `]`

## 🔧 Testing Your Changes

After editing `projects.json`:
1. Save the file
2. Refresh your browser
3. Check that all projects appear
4. Test the filter buttons
5. Click "Learn more" to verify details expand

## 💡 Pro Tips

- Keep `excerpt` short (50-100 words) for best display
- Use 3-6 stack items for clean appearance
- Include 3-5 detail items for readability
- Use consistent wording ("Implemented", "Built", "Designed")
- Status badges are optional - only use when relevant

---

**Need help?** The projects automatically load when the page loads. If you see an error, check your browser's console (F12) for details.
