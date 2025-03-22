import express from "express"
import multer from "multer"

import path from "path"
import { fileURLToPath } from 'url';

import fs from "fs"

// calling database functions
// import { saveFile } from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// serving static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// multer storage folder / settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // uploaded file directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // file name
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        let allowedTypes = ['image/jpg', 'image/jpeg'];
        if (!allowedTypes.includes(file.mimetype)) return cb(new Error('Invalid file type'), false);
        cb(null, true);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// upload process
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('File cannot upload.');
    const filename = req.file.filename;
    // save activities to MySQL for uploading 

    // saveFile: database function
    // saveFile(filename);
    res.send({ content: `File uploaded successfully: ${filename}`, url: `/uploads/${filename}` });
});

// dynamically serve the uploaded files
app.get('/uploads/:filename', (req, res) => {
    const { filename } = req.params;
    const file_path = path.join(__dirname, '.', '/uploads');
    // check for files with the same base name (ignoring extensions)
    fs.readdir(file_path, (err, files) => {
        if (err) return res.status(500).send('Server error occured.');
        // find a file with the same base name but any extension (ignore extention)
        const matched_files = files.filter(file => file.startsWith(filename));
        if (matched_files.length === 0) return res.status(404).send('File not found.');
        // send the first matched file
        let matched_file = matched_files[0]
        res.sendFile(path.join(file_path, matched_file));
    });
});

// launching the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
