# File Storage/Upload App

This app allows users to upload images to server and view them. Dependencies are Express and Multer (currently).

Upload `.jpeg` and `.jpg` files using existing form on the home page (/). View uploaded images by going to `/uploads/filename` address.

### Storage

Files can be up to 5 MBs and currently two formats are supporting.

### Attention: Upload Folder

Files need to store under `server/uploads/` folder.

## Setup for Development/Local hosting

1. Clone repo: `https://github.com/1bukrek/file-storage-app.git`
2. Install node modules in project directory.
3. Run `npm run server` and go to `http://localhost:3000` in your browser.
