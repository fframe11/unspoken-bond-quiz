# Unspoken Bond - รักนะ เมี๊ยวเมี๊ยว | Setup & Installation Guide

> **Complete Guide to Download, Install, and Continue Development Locally**

---

## 📥 Step 1: Clone the Repository

### Option A: Using Git Command Line (Recommended)

```bash
git clone https://github.com/your-username/unspoken-bond-quiz.git
cd unspoken-bond-quiz
```

Replace `your-username` with your actual GitHub username.

### Option B: Download as ZIP from GitHub

1. Go to your GitHub repository: `https://github.com/your-username/unspoken-bond-quiz`
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. Extract the ZIP file to your desired location
5. Open Command Prompt/Terminal in the extracted folder

---

## 🔧 Step 2: Install Dependencies

### Prerequisites
Make sure you have installed:
- **Node.js** (v18 or higher, v22 recommended): [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **pnpm**

### Installation Command

**Option A: Standard Installation**
```bash
npm install
```

**Option B: If you get dependency conflicts (Recommended)**
```bash
npm install --legacy-peer-deps
```

**Option C: Using pnpm (Faster)**
```bash
pnpm install
```

### What This Does
- Downloads all required packages from `package.json`
- Sets up React, TypeScript, Tailwind CSS, and other dependencies
- Creates `node_modules` folder (can be large, ~500MB)

---

## 🚀 Step 3: Start Development Server

### Run the Dev Server
```bash
npm run dev
```

### Expected Output
```
➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

### Open in Browser
- Open your browser and go to: **http://localhost:3000**
- The app should load automatically
- Any changes you make to the code will hot-reload instantly

---

## 📁 Project Structure

```
unspoken-bond-quiz/
├── client/                          # Frontend React app
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── IntroScene.tsx
│   │   │   ├── EntryScene.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── CutsceneDisplay.tsx
│   │   │   └── ResultCard.tsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Quiz.tsx             # Main quiz logic
│   │   │   └── NotFound.tsx
│   │   ├── lib/
│   │   │   └── quizDataNew.ts       # Quiz questions & MBTI data
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx
│   │   ├── App.tsx                  # Main app component
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   └── index.html
├── server/                          # Backend (placeholder)
│   └── index.ts
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript config
├── tailwind.config.ts               # Tailwind CSS config
├── vite.config.ts                   # Vite build config
├── README.md                        # Full project documentation
├── SETUP.md                         # This file
└── .gitignore                       # Git ignore rules
```

---

## 🛠️ Available Commands

### Development
```bash
npm run dev          # Start development server (hot reload)
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run check        # Check TypeScript errors
npm run format       # Format code with Prettier
```

### Troubleshooting
```bash
npm run clean        # Clear build cache (if exists)
```

---

## 🎯 Making Changes & Continuing Development

### Edit Quiz Questions
File: `client/src/lib/quizDataNew.ts`

```typescript
const questions: Question[] = [
  {
    id: 1,
    text: "Your question here?",
    checkpoint: "Visual description of transformation",
    options: [
      { text: "Option 1", scores: { E: 1, S: 0, T: 1, J: 0 } },
      { text: "Option 2", scores: { E: 0, S: 1, T: 0, J: 1 } },
      // ... more options
    ]
  }
  // ... more questions
];
```

### Edit Cat Breeds/Results
File: `client/src/lib/quizDataNew.ts`

```typescript
const catBreeds: Record<string, CatBreed> = {
  ENFP: {
    name: "Adventure Fox Explorer",
    description: "Your cat description...",
    auraColor: "#FF6B9D",
    loveLanguage: "Quality time & adventures",
    secretItem: "Compass"
  }
  // ... more cat breeds
};
```

### Edit Cutscenes
File: `client/src/lib/quizDataNew.ts`

```typescript
const checkpoints = [
  "Your paw begins to glow with a faint color...",
  "Your tail starts to fluff up...",
  // ... more checkpoints
];
```

### Edit Styling
File: `client/src/index.css`

- Global colors and themes
- Tailwind CSS configuration
- Custom CSS variables

### Edit Components
Files in: `client/src/components/`

- `IntroScene.tsx` - Intro cutscene
- `EntryScene.tsx` - Entry scene
- `QuestionCard.tsx` - Question display
- `CutsceneDisplay.tsx` - Cutscene after answer
- `ResultCard.tsx` - Result display

---

## 🔄 Committing Changes to GitHub

### After Making Changes

1. **Check what changed:**
   ```bash
   git status
   ```

2. **Stage changes:**
   ```bash
   git add .
   ```

3. **Commit with message:**
   ```bash
   git commit -m "Add new features or describe your changes"
   ```

4. **Push to GitHub:**
   ```bash
   git push origin main
   ```

### Example Commit Messages
```bash
git commit -m "Update quiz questions for better storytelling"
git commit -m "Add new cat breeds and MBTI types"
git commit -m "Fix styling on mobile devices"
git commit -m "Improve cutscene animations"
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: `npm install` fails with dependency errors

**Solution:**
```bash
npm install --legacy-peer-deps
```

### Issue 2: Port 3000 already in use

**Solution A:** Use different port
```bash
npm run dev -- --port 3001
```

**Solution B:** Kill process using port 3000
```bash
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue 3: Hot reload not working

**Solution:**
1. Stop dev server (Ctrl+C)
2. Delete `node_modules` folder
3. Run `npm install` again
4. Run `npm run dev`

### Issue 4: TypeScript errors

**Solution:**
```bash
npm run check
```

This will show all TypeScript errors. Fix them based on the error messages.

### Issue 5: Styling looks broken

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server
3. Check that `index.css` is imported in `main.tsx`

---

## 📦 Build for Production

### Create Production Build
```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Preview Production Build Locally
```bash
npm run preview
```

---

## 🌐 Deployment Options

### Option 1: Manus Hosting (Already Set Up)
Your project is already live at: **https://unspkbond-voqphnon.manus.space**

### Option 2: Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Option 3: Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Option 4: Deploy to GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

---

## 📝 Important Files to Know

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `vite.config.ts` | Vite build configuration |
| `client/src/lib/quizDataNew.ts` | Quiz content & MBTI logic |
| `client/src/pages/Quiz.tsx` | Main quiz component |
| `client/src/index.css` | Global styles |

---

## 🔗 Useful Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [Git & GitHub Guide](https://guides.github.com)

---

## 💡 Tips for Development

1. **Use VS Code** - Recommended editor with great React/TypeScript support
2. **Install Extensions:**
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin
   - Prettier - Code formatter

3. **Keep components small** - Each component should do one thing
4. **Use TypeScript** - Catch errors before runtime
5. **Test frequently** - Run the dev server and check your changes
6. **Commit often** - Make small, meaningful commits

---

## 🆘 Need Help?

1. Check the **Common Issues** section above
2. Review the main `README.md` for project overview
3. Look at component comments in the code
4. Check browser console for error messages (F12)
5. Review git history: `git log`

---

## 📋 Quick Start Checklist

- [ ] Node.js installed (v18+)
- [ ] Repository cloned or ZIP extracted
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Browser opened to http://localhost:3000
- [ ] Quiz loads and works
- [ ] Made first code change
- [ ] Changes committed to git
- [ ] Changes pushed to GitHub

---

## 🎉 You're All Set!

You now have the complete source code running locally. Start making changes and building amazing features! 

Happy coding! 🚀

---

**Last Updated:** May 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
