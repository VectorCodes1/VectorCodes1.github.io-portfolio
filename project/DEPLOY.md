# Deploying to GitHub Pages

## Folder structure

```
your-repo/
├── docs/
│   ├── index.html        ← the website (edit content here)
│   └── assets/
│       ├── Profile.pdf
│       ├── profileimage1.png
│       ├── ieee_ucf_logo.jpg
│       ├── lockheed_martin_logo.jpg
│       ├── university_of_central_florida_logo.jpg
│       └── photos/
│           └── *.jpg
└── DEPLOY.md             ← this file
```

---

## Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it something like `portfolio` or `matias-guillen`
3. Set it to **Public** (required for free GitHub Pages)
4. Click **Create repository**

---

## Step 2 — Upload your files

### Option A — GitHub web UI (easiest, no terminal needed)

1. Open your new repository on GitHub
2. Click **Add file → Upload files**
3. Drag the entire `docs/` folder into the upload area
4. Click **Commit changes**

> ⚠️ GitHub's web uploader flattens folders. To keep the `docs/assets/photos/` structure intact, use Option B or upload subfolders one at a time.

### Option B — Git command line (recommended)

```bash
# Clone your empty repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Copy the docs/ folder into the repo root
# (drag-and-drop or cp -r from wherever you saved it)

git add .
git commit -m "Initial portfolio deploy"
git push origin main
```

---

## Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → scroll to **Pages** in the left sidebar
3. Under **Source**, set:
   - Branch: `main`
   - Folder: `/docs`
4. Click **Save**

GitHub will show a green banner with your live URL:  
`https://YOUR_USERNAME.github.io/YOUR_REPO/`

It usually goes live within 1–2 minutes.

---

## Step 4 — Updating content

All editable content is in `docs/index.html`. Look for the section marked:

```
✏️  EDIT YOUR CONTENT HERE
```

The four data blocks you'll edit most:

| Block | What it controls |
|---|---|
| `EXPERIENCE_DATA` | Job titles, employers, dates, descriptions |
| `PROJECTS_DATA` | Project titles, dates, tools, descriptions |
| `LEADERSHIP_DATA` | Roles, organizations, dates, descriptions |
| `PHOTO_MAP` | Which photos appear on each detail page |

### Adding a new project

```js
{ 
  id: 'my-new-project',           // unique slug, no spaces
  title: 'My New Project',
  date: 'Jan 2025',
  desc: 'One sentence description.',
  specs: [
    ['Date',   'Jan 2025'],
    ['Tools',  'KiCad, MATLAB'],
    ['Type',   'RF Design'],
    ['Status', 'Completed'],
  ]
},
```

Then add photos in `PHOTO_MAP`:

```js
'my-new-project': [
  { src: 'assets/photos/my-photo.jpg', caption: 'Caption text here.' },
],
```

And drop the photo file into `docs/assets/photos/`.

### Updating GPA or coursework

Search for `GPA` in `docs/index.html` — it's in the `HomeFull` education block and again in `AboutDesktop`.

### Replacing the resume PDF

Replace `docs/assets/Profile.pdf` with your new PDF. Keep the same filename, or update the two references in `docs/index.html`:

```
assets/Profile.pdf
```

---

## Custom domain (optional)

1. Buy a domain (e.g. `matiasguillen.com`)
2. In GitHub Pages settings, enter it under **Custom domain**
3. At your domain registrar, add a CNAME record pointing to `YOUR_USERNAME.github.io`

---

## After every edit

```bash
git add docs/index.html
git commit -m "Update projects section"
git push origin main
```

GitHub Pages redeploys automatically — usually live within 30 seconds.
