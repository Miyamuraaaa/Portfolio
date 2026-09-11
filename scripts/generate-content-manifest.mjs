import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const contentDir = path.join(rootDir, 'portfolio-content');
const publicContentDir = path.join(rootDir, 'public', 'portfolio-content');
const outputDir = path.join(rootDir, 'src', 'generated');
const manifestPath = path.join(outputDir, 'content-manifest.json');

const categories = [
  'reading-process',
  'reader-responses',
  'icare',
  'reflections'
];

const supportedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.webp'];

// Ensure directories exist
if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });
if (!fs.existsSync(publicContentDir)) fs.mkdirSync(publicContentDir, { recursive: true });
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Helper to copy files and create manifest entries
function processCategory(category) {
  const categoryPath = path.join(contentDir, category);
  const publicCategoryPath = path.join(publicContentDir, category);
  
  if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath, { recursive: true });
    return [];
  }
  
  if (!fs.existsSync(publicCategoryPath)) {
    fs.mkdirSync(publicCategoryPath, { recursive: true });
  }

  const items = [];
  const folders = fs.readdirSync(categoryPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  folders.forEach((folder, index) => {
    const folderPath = path.join(categoryPath, folder.name);
    const publicFolderPath = path.join(publicCategoryPath, folder.name);
    
    if (!fs.existsSync(publicFolderPath)) {
      fs.mkdirSync(publicFolderPath, { recursive: true });
    }

    const files = fs.readdirSync(folderPath);
    let info = {};
    let mainFile = null;
    let thumbnailFile = null;

    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      const srcFile = path.join(folderPath, file);
      const destFile = path.join(publicFolderPath, file);
      
      // Copy file to public directory so Next.js can serve it statically
      fs.copyFileSync(srcFile, destFile);

      if (file === 'info.json') {
        try {
          info = JSON.parse(fs.readFileSync(srcFile, 'utf8'));
        } catch (e) {
          console.error(`Error parsing info.json in ${folderPath}`, e);
        }
      } else if (supportedExtensions.includes(ext)) {
        if (file.includes('thumbnail') || file.includes('preview')) {
          thumbnailFile = file;
        } else if (!mainFile) {
          mainFile = file;
        }
      }
    });

    if (mainFile || info.title || category === 'reflections') {
      items.push({
        id: `${category}-${folder.name}`,
        folderName: folder.name,
        title: info.title || formatTitle(folder.name),
        subtitle: info.subtitle || '',
        date: info.date || new Date().toISOString().split('T')[0],
        description: info.description || '',
        score: info.score || null,
        reflection: info.reflection || null,
        order: info.order !== undefined ? info.order : index + 1,
        mainFile: mainFile ? `/portfolio-content/${category}/${folder.name}/${mainFile}` : null,
        mainFileType: mainFile ? path.extname(mainFile).toLowerCase().substring(1) : null,
        thumbnail: thumbnailFile ? `/portfolio-content/${category}/${folder.name}/${thumbnailFile}` : null,
      });
    }
  });

  return items.sort((a, b) => a.order - b.order);
}

function formatTitle(str) {
  return str.split(/[-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function generateManifest() {
  const manifest = {};
  
  categories.forEach(category => {
    manifest[category] = processCategory(category);
  });

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ Content manifest generated successfully!');
}

generateManifest();
