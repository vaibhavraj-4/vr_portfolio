# Vaibhav Raj — Portfolio (Astro + Decap CMS)

A single-page scrollable portfolio with a **built-in admin panel** so you can edit content through a web UI — no code changes needed for day-to-day updates.

- **Frontend**: [Astro](https://astro.build) static site generator
- **CMS**: [Decap CMS](https://decapcms.org) (formerly Netlify CMS) — a git-based CMS that commits changes back to GitHub
- **Auth**: Netlify Identity (free, supports GitHub/email login)
- **Hosting**: Netlify (free tier is plenty)
- **Cost**: $0/month

---

## 📁 Project Structure

```
astro-portfolio/
├── src/
│   ├── content/              ← editable data files (JSON)
│   │   ├── hero/
│   │   ├── about/
│   │   ├── skills/           ← one JSON file per skill
│   │   ├── journey/          ← one JSON per timeline entry
│   │   ├── projects/         ← one JSON per project
│   │   ├── certificates/
│   │   ├── awards/
│   │   ├── activities/
│   │   └── contact/
│   ├── components/           ← Astro components
│   ├── layouts/
│   └── pages/index.astro     ← the single portfolio page
├── public/
│   ├── admin/
│   │   ├── index.html        ← Decap CMS loads here → /admin
│   │   └── config.yml        ← form definitions
│   ├── icons/                ← logos, favicon, etc.
│   ├── projects/             ← project images (SVGs)
│   ├── uploads/              ← images uploaded via CMS end up here
│   ├── styles/global.css
│   ├── scripts.js
│   └── particles-config.js
├── astro.config.mjs
├── netlify.toml              ← Netlify deploy settings
└── package.json
```

---

## 🚀 Local Development

```bash
# Install deps
npm install

# Run dev server at http://localhost:4321
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The `/admin` route won't work locally unless you configure a local backend or use `npm run cms-proxy`. For day-to-day development, just edit the JSON files in `src/content/` directly.

---

## 🌐 Deployment & Admin Panel Setup (one-time)

Follow these steps once, then your admin panel is live forever.

### Step 1 — Push to GitHub

```bash
cd astro-portfolio
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/vaibhavraj-4/portfolio.git
git push -u origin main
```

### Step 2 — Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and sign in with GitHub
2. Click **"Add new site" → "Import an existing project"**
3. Pick your `portfolio` repo
4. Netlify auto-detects Astro. Build settings should be:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy** — first deploy takes ~60 seconds

Your site is now live at `https://<random-name>.netlify.app`. Rename it in **Site settings → Change site name** (e.g., `vaibhavraj`).

### Step 3 — Enable Netlify Identity (for admin login)

1. In your Netlify site dashboard → **Integrations → Identity → Enable Identity**
2. Under **Registration**, change to **"Invite only"** (so random people can't sign up as admins)
3. Under **External providers**, optionally enable **GitHub** for faster login
4. Invite yourself: **Identity → Invite users → enter your email → Send**
5. Check your email, click the confirmation link, set a password

### Step 4 — Enable Git Gateway (lets the CMS commit to GitHub)

1. Still in **Identity → Services → Git Gateway → Enable**
2. Netlify generates a token that allows Decap CMS to commit to your repo

### Step 5 — Visit your admin panel

Go to `https://your-site.netlify.app/admin/` — you'll see the Netlify Identity login modal.

Log in with the credentials from Step 3. After login, the Decap CMS dashboard loads with all the collections you defined in `config.yml`.

### Step 6 — Optional: Custom domain

1. Buy a domain (e.g., `vaibhavraj.dev` from Namecheap or Cloudflare, ~₹1000/year)
2. Netlify → **Domain management → Add custom domain**
3. Follow their DNS setup instructions

---

## ✏️ How to use the admin panel

Once deployed:

1. Visit `yoursite.com/admin/`
2. Log in
3. Pick a collection on the left (Hero, About, Skills, Journey, Projects, etc.)
4. Edit fields in the form
5. Click **"Publish"** (top right)
6. Decap commits the change to GitHub → Netlify rebuilds your site → live in ~60 seconds

### Adding a new project

1. Click **💼 Projects → + New Project**
2. Fill in title, summary, description, upload an image
3. Pick section (Production / Internship / Academic / For Fun)
4. Optionally add a status chip like "Active · Phase 2 of 10"
5. Set sort order (lower = appears earlier)
6. Click **Publish**

### Updating SINTRA phase progress

1. Click **💼 Projects → SINTRA Stability Analytics**
2. Update "Status badge text" field (e.g. change from "Phase 1 of 10" to "Phase 2 of 10")
3. Update the description if you want to add new phase details
4. Publish

### Uploading images

- Every image field has a drag-and-drop area
- Uploaded files land in `public/uploads/` and are committed to Git
- URLs are auto-generated (`/uploads/your-image.png`)

---

## 🔒 Security notes

- Netlify Identity with "Invite only" means **only you** can log in to `/admin`
- Git Gateway commits happen under your identity (tied to your Netlify account)
- All changes are in Git history — nothing is ever permanently lost
- If you mess up a publish, revert the commit on GitHub

---

## 🛠️ Content file reference

If you ever want to edit directly instead of using the admin:

| Section | File pattern |
|---|---|
| Hero | `src/content/hero/index.json` |
| About prose | `src/content/about/index.json` |
| Skills | `src/content/skills/*.json` (one file per skill) |
| Journey | `src/content/journey/*.json` |
| Projects | `src/content/projects/*.json` |
| Certificates | `src/content/certificates/*.json` |
| Awards | `src/content/awards/*.json` |
| Activities | `src/content/activities/*.json` |
| Contact | `src/content/contact/index.json` |

All files are JSON. Edit, commit, push — Netlify rebuilds automatically.

---

## 🧪 Troubleshooting

**"Config Errors: Backend" when loading /admin**
→ Make sure Git Gateway is enabled in Netlify (Step 4 above).

**Admin login loops or says "Identity not found"**
→ Make sure Netlify Identity is enabled and you've been invited.

**Changes published in admin but site doesn't update**
→ Check Netlify → Deploys tab. A new deploy should trigger automatically. If not, check that Git Gateway has correct GitHub permissions.

**Build fails in Netlify**
→ Check build log. Usually a content file has invalid JSON — fix in GitHub or re-edit via admin.

**Images don't show up**
→ Image paths in content files must start with `/` (e.g. `/icons/python-logo.png`). Relative paths break.

---

## 📝 Credits

- Astro framework
- Decap CMS (formerly Netlify CMS)
- Fonts: Roboto
- Icons: various sources, see `public/icons/`
- Particles: particles.js
- Animations: AOS, Typed.js

Built with care. © 2026 Vaibhav Raj.
