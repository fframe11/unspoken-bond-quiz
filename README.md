# Unspoken Bond - รักนะ เมี๊ยวเมี๊ยว 🐾

> **An Interactive Story-Driven Personality Experience**

A beautifully crafted interactive web application that combines psychological archetypes with a heartwarming narrative. Through a series of immersive choices, users embark on a spiritual journey to discover their unique "spirit animal" companion.

---

## 🎯 Overview

**Unspoken Bond** is a modern, responsive web application built with a focus on seamless user experience, fluid animations, and interactive storytelling. 

### Key Technical Features
✨ **Interactive Narrative Engine** - Dynamic state management for branching choices.
✨ **Custom Assessment Algorithm** - Calculates user inputs to generate accurate personality archetypes.
✨ **Visual Progression System** - Real-time UI transformation matching the user's journey.
✨ **Cinematic Transitions** - Smooth, immersive cutscenes powered by Framer Motion.
✨ **Fully Responsive & Optimized** - Designed for mobile-first engagement with highly shareable output cards.

---

## 📖 Story Synopsis

The experience follows Rin, an exhausted businessman navigating the mundane routines of city life. One evening, an encounter with a mysterious cat spirit triggers a profound journey of self-reflection. Through a series of perspective-shifting moments, users help guide the narrative, ultimately revealing the true nature of their unseen companion and what it reflects about themselves.

---

## 🛠️ Tech Stack

### Frontend & UI
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

### Core Architecture
```text
unspoken-bond-quiz/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── IntroScene.tsx      # Intro animation & context
│   │   │   ├── QuestionCard.tsx    # Interactive choice module
│   │   │   ├── CutsceneDisplay.tsx # Narrative progression UI
│   │   │   └── ResultCard.tsx      # Final generated shareable card
│   │   ├── pages/
│   │   │   ├── Home.tsx            
│   │   │   ├── Quiz.tsx            # Main application state logic
│   │   │   └── NotFound.tsx        
│   │   ├── lib/                    # Core algorithms and utilities
│   │   ├── contexts/               # Global state (Theme, User flow)
│   │   ├── App.tsx                 
│   │   ├── main.tsx                
│   │   └── index.css               
│   └── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
