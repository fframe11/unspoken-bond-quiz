# Unspoken Bond - รักนะ เมี๊ยวเมี๊ยว

> **A Spiritual MBTI Pet Quiz with Interactive Storytelling**

An immersive personality quiz that combines MBTI psychology with a heartwarming narrative about a businessman and his mysterious cat companion. Through 10 meaningful questions, users discover their true cat spirit animal while witnessing a spiritual transformation journey.

---

## 🎯 Overview

**Unspoken Bond** is a viral-ready interactive quiz experience that blends:
- **Storytelling**: A touching narrative about the bond between a man and his cat
- **MBTI Personality System**: 16 unique cat breeds representing 16 personality types
- **Visual Progression**: Checkpoint system showing spiritual transformation through aura colors
- **Interactive Cutscenes**: Emotional moments after each answer revealing the story's progression
- **Shareable Results**: Beautiful result cards perfect for social media

### Key Features
✨ **10 Immersive Questions** - Each question advances the emotional narrative  
✨ **16 Cat Personality Types** - Unique MBTI mappings with detailed descriptions  
✨ **Spiritual Checkpoint System** - Visual representation of aura transformation  
✨ **Dynamic Cutscenes** - Story progression after each answer  
✨ **Responsive Design** - Works seamlessly on mobile and desktop  
✨ **Share Functionality** - Easy sharing to social media  

---

## 📖 Story Summary

The quiz follows a Japanese businessman named Rin who comes home exhausted from work. He encounters a mysterious cat spirit that has been watching over him. Through 10 moments of interaction, the quiz reveals:

1. **Initial Meeting** - The cat's first impression of Rin
2. **Emotional Connection** - How the cat responds to Rin's struggles
3. **Shared Moments** - Daily interactions that build their bond
4. **Spiritual Awakening** - The protagonist's aura begins to transform
5. **Final Revelation** - Discovering what kind of cat spirit they truly are

Each answer choice reflects a personality trait that determines which of the 16 cat types the user embodies.

---

## 🎮 Quiz Structure

### Questions (10 Total)

| # | Theme | MBTI Dimension | Description |
|---|-------|---|---|
| 1 | First Impression | E/I | How does the cat perceive Rin's arrival? |
| 2 | Emotional Response | S/N | How does the cat react to Rin's mood? |
| 3 | Comfort Style | T/F | What's the cat's way of showing care? |
| 4 | Weekend Behavior | J/P | How does the cat spend free time? |
| 5 | Memory & Nostalgia | E/I | Reaction to Rin's past memories |
| 6 | Social Dynamics | S/N | How does the cat interact with guests? |
| 7 | Playtime Approach | T/F | What's the cat's play style? |
| 8 | Sickness & Care | J/P | How does the cat care for sick Rin? |
| 9 | Curiosity & Wonder | E/I | Response to new experiences |
| 10 | Final Farewell | S/N | How does the cat say goodbye? |

### Checkpoint System

After each question, users see a visual representation of their spiritual transformation:
- **Aura Color Evolution** - From gray to vibrant colors
- **Physical Transformation** - From human silhouette to cat form
- **Emotional Narrative** - Text describing the spiritual journey

### Result Types (16 MBTI Cats)

Each result includes:
- **Cat Breed Name** (English & Thai)
- **MBTI Type** (e.g., ENFP, ISTJ)
- **Personality Description** - How this cat type loves
- **Aura Color** - Unique color representing their energy
- **Love Language** - How they express affection
- **Secret Item** - A symbolic object representing their essence

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Wouter** - Lightweight routing
- **Framer Motion** - Smooth animations
- **Sonner** - Toast notifications

### Development Tools
- **Vite** - Lightning-fast build tool
- **Node.js 22** - Runtime environment
- **pnpm** - Fast package manager

### Project Structure
```
unspoken-bond-quiz/
├── client/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── IntroScene.tsx          # Intro cutscene
│   │   │   ├── EntryScene.tsx          # Entry POV scene
│   │   │   ├── QuestionCard.tsx        # Question display
│   │   │   ├── CutsceneDisplay.tsx     # Cutscene after answer
│   │   │   └── ResultCard.tsx          # Final result display
│   │   ├── pages/
│   │   │   ├── Home.tsx                # Home page
│   │   │   ├── Quiz.tsx                # Main quiz logic
│   │   │   └── NotFound.tsx            # 404 page
│   │   ├── lib/
│   │   │   └── quizDataNew.ts          # Quiz data & MBTI logic
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx        # Theme management
│   │   ├── App.tsx                     # Main app component
│   │   ├── main.tsx                    # Entry point
│   │   └── index.css                   # Global styles
│   └── index.html
├── server/
│   └── index.ts                        # Express server (placeholder)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (v22 recommended)
- npm or pnpm

### Installation

1. **Clone or extract the project**
   ```bash
   cd unspoken-bond-quiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📱 User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      INTRO SCENE                             │
│         (Businessman walking into home - POV 3rd)           │
│                                                              │
│                    [Enter Home Button]                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      ENTRY SCENE                             │
│         (Cat's POV - First meeting with owner)              │
│                                                              │
│                   [Start Quiz Button]                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              QUESTION + ANSWER SELECTION                     │
│                  (Questions 1-10)                            │
│                                                              │
│  [Option 1]  [Option 2]  [Option 3]  [Option 4]            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    CUTSCENE DISPLAY                          │
│        (Spiritual transformation visual + narrative)         │
│                                                              │
│                    [Next Button]                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
        (Repeat for all 10 questions)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    RESULT PAGE                               │
│  Cat Image | MBTI Type | Name | Description | Aura Color   │
│                                                              │
│        [Share Result]  [Retake Quiz]                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design Philosophy

### Visual Language
- **Minimal Line Art Style** - Clean, elegant illustrations
- **Soft Color Palette** - Calming, emotional tones
- **Progressive Revelation** - Information unfolds gradually
- **Emotional Pacing** - Cutscenes create narrative momentum

### User Experience
- **Frictionless Navigation** - One-click progression
- **Immediate Feedback** - Visual response to every action
- **Emotional Investment** - Story draws users in
- **Shareable Moments** - Results are Instagram-ready

---

## 🔧 Customization Guide

### Changing Questions
Edit `/client/src/lib/quizDataNew.ts`:
```typescript
const questions: Question[] = [
  {
    id: 1,
    text: "Your question here?",
    checkpoint: "Visual description of transformation",
    options: [
      { text: "Option 1", scores: { E: 1, S: 0, T: 1, J: 0 } },
      // ... more options
    ]
  }
];
```

### Modifying Cat Types
Update the `catBreeds` object in `quizDataNew.ts`:
```typescript
const catBreeds: Record<string, CatBreed> = {
  ENFP: {
    name: "Adventure Fox Explorer",
    description: "Your cat description...",
    auraColor: "#FF6B9D",
    loveLanguage: "Quality time & adventures",
    secretItem: "Compass"
  }
};
```

### Updating Cutscene Text
Modify cutscene descriptions in the `checkpoints` array:
```typescript
const checkpoints = [
  "Your paw begins to glow with a faint color...",
  // ... more checkpoints
];
```

### Styling
Global styles are in `/client/src/index.css`. Tailwind utilities are used throughout components for consistency.

---

## 📊 MBTI Mapping

The quiz uses a 4-dimensional scoring system:

| Dimension | Extrovert (E) | Introvert (I) |
|-----------|---------------|---------------|
| **Sensing (S)** | ESFJ, ESFP, ESTJ, ESTP | ISFJ, ISFP, ISTJ, ISTP |
| **Intuition (N)** | ENFJ, ENFP, ENTJ, ENTP | INFJ, INFP, INTJ, INTP |

Each answer option awards points to specific dimensions, and the final type is determined by which dimensions score highest.

---

## 🌐 Deployment

### Manus Hosting
The project is pre-configured for Manus hosting:
1. Click **Publish** in the Management UI
2. Select your domain (or purchase a new one)
3. Your quiz goes live instantly

### External Hosting (Vercel, Netlify, etc.)
```bash
# Build for production
npm run build

# Deploy the dist/ folder to your hosting provider
```

---

## 📝 Content Guidelines

### Writing Cutscenes
- Keep text **short and poetic** (1-2 sentences)
- Use **sensory language** (colors, feelings, movements)
- Maintain **narrative consistency** across all 10 checkpoints
- Reference the **spiritual transformation theme**

### Question Design
- Each question should reveal **one personality dimension**
- Options should be **clearly distinct** from each other
- Avoid **leading language** that hints at "correct" answers
- Ensure **cultural relevance** for your target audience

### Result Descriptions
- Make descriptions **personal and relatable**
- Include **specific behaviors** unique to each cat type
- Balance **positive traits** with **honest quirks**
- Keep length **concise** (2-3 sentences)

---

## 🐛 Troubleshooting

### Quiz not loading?
- Check browser console for errors
- Ensure all dependencies are installed: `npm install`
- Clear browser cache and reload

### Styling issues?
- Rebuild Tailwind CSS: `npm run dev`
- Check that `index.css` is imported in `main.tsx`
- Verify theme colors in `ThemeContext.tsx`

### Results not calculating correctly?
- Verify MBTI scoring logic in `quizDataNew.ts`
- Check that all 4 dimensions have scores
- Ensure cat breed keys match MBTI types exactly

---

## 📈 Future Enhancements

- [ ] Add sound effects and ambient music
- [ ] Create shareable result image cards
- [ ] Implement user result history/leaderboard
- [ ] Add multiple language support
- [ ] Create admin dashboard for analytics
- [ ] Add A/B testing for question variations
- [ ] Integrate with social media APIs for direct sharing
- [ ] Create companion mobile app

---

## 📄 License

This project is created for personal/commercial use. Modify and distribute as needed.

---

## 👨‍💻 Development Notes

### Component Architecture
- **Page Components** (`/pages`) - Handle routing and state management
- **UI Components** (`/components`) - Reusable, presentational components
- **Contexts** (`/contexts`) - Global state (theme, user data)
- **Lib** (`/lib`) - Utilities and data structures

### Styling Approach
- **Tailwind CSS** for layout and spacing
- **CSS Variables** for theming
- **Framer Motion** for animations
- **Inline styles** only when necessary

### Performance Optimization
- Lazy loading for images
- Memoization for expensive computations
- Efficient re-renders with React hooks
- Optimized bundle size with tree-shaking

---

## 🤝 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review component comments in the code
3. Refer to the Tech Stack documentation
4. Contact the development team

---

## 🎉 Credits

**Concept & Story**: Original narrative about spiritual connection  
**Design**: Minimal line art aesthetic  
**Development**: React + TypeScript + Tailwind CSS  
**MBTI System**: Adapted from Myers-Briggs Type Indicator  

---

**Last Updated**: May 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
