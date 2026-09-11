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
   npm install --legacy-peer-deps
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## HOW TO ADD NEW SCHOOLWORK

This portfolio uses an **Automatic Content Discovery** system. You do NOT need to edit any React components or write code to add new assignments.

### Directory Structure
All your work goes into the `portfolio-content/` directory. It is organized into:
- `portfolio-content/reading-process/`
- `portfolio-content/reader-responses/`
- `portfolio-content/icare/`

### Steps to Add Work:

1. **Create a new folder** inside the appropriate category.
   *Example: `portfolio-content/reading-process/reading-02`*

2. **Add your document**. Put your PDF, PNG, or JPG inside that folder. 
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

4. **Restart the server**. Run `npm run dev` again, and the system will automatically scan the folders and generate the website content!

## Replacing Profile Information

To change your name, course, professor, or other details, simply edit this file:
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

The current 3D room is built using high-quality procedural geometry (Three.js primitives) to ensure it is lightweight and always works. 
If you want to add custom GLB/GLTF models:
1. Place your `.glb` files in the `public/models/` directory.
2. Edit `src/components/3d/Room.tsx` to load them using `@react-three/drei`'s `useGLTF` hook.

## Deployment

This project is perfectly set up for free deployment on **Vercel**.

1. Push this repository to GitHub.
2. Go to [Vercel.com](https://vercel.com) and import the repository.
3. Vercel will automatically detect that it's a Next.js project.
4. Click **Deploy**. The `npm run build` script will automatically run the content scanner and build your site.

Enjoy your professional digital portfolio!
