import fs from 'fs';
import os from 'os';
import multer from 'multer';
import path from 'path';

// Vercel's filesystem is read-only except for the temp folder.
// NOTE: files saved there are temporary and are NOT kept - move to cloud storage (e.g. Cloudinary) before relying on uploads in production.
const uploadDir = process.env.VERCEL ? path.join(os.tmpdir(), 'uploads') : 'uploads';

try {
  fs.mkdirSync(uploadDir, { recursive: true });
} catch (err) {
  console.error('Could not create uploads directory:', err);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf', '.ai', '.eps', '.svg'];

export const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error('Unsupported file type. Allowed: PNG, JPG, PDF, AI, EPS, SVG'));
    }
    cb(null, true);
  },
});