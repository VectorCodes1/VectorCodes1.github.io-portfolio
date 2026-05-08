# Matias Guillen Portfolio — GitHub Setup Guide

## What's in this project

```
ui_kits/portfolio/
  index-desktop.html   ← Full desktop portfolio (single-file, self-contained React app)
  index.html           ← Mobile portfolio shell
  Home.jsx             ← Mobile home page component
  ProjectsIndex.jsx    ← Mobile projects page
  LeadershipIndex.jsx  ← Mobile leadership page
  DetailPage.jsx       ← Mobile detail page
  AboutContact.jsx     ← Mobile about/contact pages
  ExperiencePage.jsx   ← Mobile experience page

assets/
  profileimage1.png            ← Your profile photo (circular in sidebar)
  lockheed_martin_logo.jpg     ← Lockheed Martin logo
  ieee_ucf_logo.jpg            ← IEEE UCF logo
  university_of_central_florida_logo.jpg ← UCF logo
  Profile.pdf                  ← Your resume PDF
  photos/
    president-1.jpg            ← IEEE President photos
    president-2.jpg
    president-3.jpg
    project-chair-1.jpg
    project-chair-2.jpg
    hkn-1.jpg
    hkn-2.jpg
    hkn-3.jpg
    service-committee-1.jpg
    service-committee-2.jpg
    service-committee-3.jpg
    service-committee-4.jpg
    circuit-design-competition-1.jpg
    circuit-design-competition-2.jpg
    circuit-design-competition-3.jpg
    solidworks-cert.jpg
    exemplary-student-branch.jpg
```

---

## Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click the **+** icon → **New repository**.
3. Name it something like `portfolio` or `matias-guillen-portfolio`.
4. Set it to **Public** (required for free GitHub Pages hosting).
5. Click **Create repository** — do NOT add a README yet.

---

## Step 2 — Install Git (if you don't have it)

- **Mac:** Open Terminal and run `git --version`. If not installed, it will prompt you to install Xcode Command Line Tools.
- **Windows:** Download from [git-scm.com](https://git-scm.com/download/win).

---

## Step 3 — Push this project to GitHub

Open Terminal (Mac) or Git Bash (Windows) and run these commands one by one. Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with yours.

```bash
# 1. Navigate to your project folder (wherever you downloaded/unzipped it)
cd /path/to/your/project

# 2. Initialize git
git init

# 3. Add all files
git add .

# 4. Make your first commit
git commit -m "Initial portfolio commit"

# 5. Connect to your GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. Push everything up
git branch -M main
git push -u origin main
```

---

## Step 4 — Enable GitHub Pages

1. Go to your repo on GitHub.
2. Click **Settings** → scroll to **Pages** (in the left sidebar).
3. Under **Source**, select **Deploy from a branch**.
4. Choose branch: `main`, folder: `/ (root)`.
5. Click **Save**.
6. After ~60 seconds, your site will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/ui_kits/portfolio/index-desktop.html`

---

## Step 5 — Set the homepage as your root (optional but recommended)

Create a file called `index.html` at the **project root** (not inside `ui_kits/portfolio/`) that redirects to the desktop portfolio:

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=ui_kits/portfolio/index-desktop.html">
</head>
<body>
  <a href="ui_kits/portfolio/index-desktop.html">Click here</a>
</body>
</html>
```

Then push again:
```bash
git add index.html
git commit -m "Add root redirect"
git push
```

Now `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/` will go straight to your portfolio.

---

## Step 6 — Updating your portfolio in the future

Whenever you make changes, push them up:
```bash
git add .
git commit -m "Update portfolio content"
git push
```

GitHub Pages will automatically re-deploy within ~60 seconds.

---

## Replacing placeholder content

| What to replace | Where |
|---|---|
| Profile photo | Replace `assets/profileimage1.png` with your photo (keep same filename) |
| About page photo | Replace `assets/profileimage1.png` or add a new image and update the `src` in `index-desktop.html` → `AboutDesktop` component |
| Resume PDF | Replace `assets/Profile.pdf` with your updated resume |
| Project thumbnails | Add images to `assets/photos/` and update the `thumb:` field in `PROJECTS_DATA` inside `index-desktop.html` |
| Phone / email | Search for `mattg.guillen@gmail.com` and `4079075123` in `index-desktop.html` |

---

## Tips

- The desktop file (`index-desktop.html`) is a single self-contained React app — everything is in one file. Edit it directly in any text editor (VS Code recommended).
- The mobile file (`index.html`) loads separate `.jsx` component files from the same folder.
- Both sites share the same `assets/` folder.
- No build step, no npm, no dependencies — it all runs directly in the browser.
