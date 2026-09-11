# GED0001 Digital Reading Portfolio

A complete, production-ready, professional 3D interactive website for the GED0001 Digital Reading Portfolio. Built with Next.js, React Three Fiber, and Tailwind CSS.

## Features

- **Interactive 3D Room**: A modern, clean library environment to explore.
- **Automatic Content Discovery**: Simply drop PDFs and images into the designated folders and they appear automatically.
- **Built-in Document Viewer**: View PDFs and images without leaving the site.
- **Responsive Design**: Works on desktop, tablet, and mobile.
- **No Database Required**: All content is managed via the file system.

## Installation & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

   The 3D stack is intentionally aligned for React 19:
   - `react` / `react-dom`: 19.x
   - `@react-three/fiber`: 9.x
   - `@react-three/drei`: 10.x

   Avoid `--legacy-peer-deps` unless you are deliberately troubleshooting a separate package conflict, because it can hide incompatible peer-dependency combinations.

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### If you previously installed the old dependency set

The original project used React 19 with React Three Fiber 8, which can cause a browser runtime crash such as:

```text
Cannot read properties of undefined (reading 'ReactCurrentOwner')
```

After pulling the fixed version, do a clean reinstall.

**PowerShell:**
```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm install
npm run dev
```

**Command Prompt:**
```bat
rmdir /s /q .next
rmdir /s /q node_modules
npm install
npm run dev
```

## HOW TO ADD NEW SCHOOLWORK

This portfolio uses an **Automatic Content Discovery** system. You do NOT need to edit any React components or write code to add new assignments.

### Directory Structure
All your work goes into the `portfolio-content/` directory. It is organized into:
- `portfolio-content/reading-process/`
- `portfolio-content/reader-responses/`
- `portfolio-content/icare/`
- `portfolio-content/reflections/`

### Steps to Add Work:

1. **Create a new folder** inside the appropriate category.
   *Example: `portfolio-content/reading-process/reading-02`*

2. **Add your document**. Put your PDF, PNG, JPG, JPEG, or WEBP inside that folder.
   *(The system will automatically find it).*

3. **(Optional) Add metadata**. Create an `info.json` file in the same folder to specify the title, description, date, or score:
   ```json
   {
     "title": "Reading Process Worksheet 2",
     "subtitle": "Critical Analysis",
     "date": "2026-09-15",
     "description": "My analysis of the assigned reading material.",
     "order": 2
   }
   ```

4. **Restart the server**. Run `npm run dev` again, and the system will automatically scan the folders and generate the website content.

## Replacing Profile Information

To change your name, course, professor, or other details, edit:
`src/config/portfolio.ts`

```typescript
export const portfolioConfig = {
  name: "Your Name",
  course: "Your Course",
  subject: "GED0001",
  // ...
};
```

## Adding/Changing 3D Models

The current 3D room is built using procedural geometry (Three.js primitives) so it stays lightweight and works without external model files.

If you want to add custom GLB/GLTF models:
1. Place your `.glb` files in the `public/models/` directory.
2. Edit `src/components/3d/Room.tsx` to load them using `@react-three/drei`'s `useGLTF` hook.

## Deployment

This project is set up for deployment on **Vercel**.

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Vercel should detect the Next.js project automatically.
4. Deploy. The `npm run build` script will run the content scanner before the Next.js build.

## Dependency note

Do not downgrade `@react-three/fiber` back to 8.x while the project is on React 19. Fiber 8 targets React 18; Fiber 9 is the React 19-compatible line.
