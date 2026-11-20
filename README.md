# Killo Harsha - Full Stack Developer Portfolio

A modern, high-performance, responsive personal portfolio website tailored for **Killo Harsha**, Full Stack Developer.

---

## ✨ Features & Highlights

- **Aesthetic & Theme**: Sleek developer dark mode with emerald (`#10b981`) and cyan glowing accents, glassmorphic cards, and subtle grid lighting.
- **Interactive Particle Background**: Real-time interactive HTML5 canvas particle node system that responds to cursor movements.
- **Dynamic Typing Animation**: Hero section showcasing core full-stack competencies.
- **Live Terminal Card**: Developer profile preview styled as an interactive code editor config (`killo_harsha.config.ts`).
- **Interactive Projects Showcase**: Filterable portfolio projects (`All`, `Full Stack`, `Frontend`, `Backend & APIs`) with rich modal popups detailing system architecture and tech stacks.
- **Technical Skills Matrix**: Comprehensive categorization across Frontend, Backend & APIs, Databases, and DevOps/Cloud.
- **Experience & Education Timeline**: Structured milestones covering full-stack projects, system engineering, and computer science foundations.
- **Interactive Resume Modal**: Previewable resume with one-click **"Print / Save as PDF"** feature.
- **Connect & Contact Form**: Functional contact form with client-side validation, instant feedback toasts, and a one-click **"Copy Email"** button.
- **Zero Configuration Required**: Uses CDN-delivered Tailwind CSS and Font Awesome — no npm build steps or complex configurations needed!

---

## 🚀 How to Run & Preview

### Option 1: Open Directly in Your Browser (Instant)
Simply double-click [`index.html`](file:///c:/Users/ACER/Desktop/harsha/index.html) in your file explorer to open it in Google Chrome, Microsoft Edge, or any modern web browser.

### Option 2: Run with the Included Node.js Server
If you'd like to test it over local HTTP:
```bash
node server.js
```
Then visit: `http://localhost:3000`

---

## 📁 File Structure

```
c:\Users\ACER\Desktop\harsha\
├── index.html        # Main semantic HTML structure & layout
├── style.css         # Custom animations, glassmorphism, scrollbar, & print styles
├── app.js            # Particle canvas, typing effect, project modals, filters & form handling
├── server.js         # Zero-dependency local Node.js HTTP preview server
└── README.md         # Documentation & deployment guide
```

---

## 🛠️ Easy Customization Guide

1. **Update Your Email & Social Links**:
   - In [`index.html`](file:///c:/Users/ACER/Desktop/harsha/index.html), search for `harsha.killo.dev@gmail.com` and replace it with your active personal/work email.
   - Update your GitHub, LinkedIn, and Twitter links in the `<header>`, `#home`, and `#contact` sections.

2. **Add or Modify Projects**:
   - Open [`app.js`](file:///c:/Users/ACER/Desktop/harsha/app.js) and look for `const projectData`.
   - Update the titles, descriptions, features, and tech stacks for any project.
   - Update the corresponding project card inside `#projects` in [`index.html`](file:///c:/Users/ACER/Desktop/harsha/index.html).

3. **Update Resume & Work Experience**:
   - In [`index.html`](file:///c:/Users/ACER/Desktop/harsha/index.html), find the `#experience` section and `#resume-modal` to adjust your years of experience, companies, or universities.

---

## 🌐 Free 1-Click Deployment

### Deploying to GitHub Pages (Free)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Killo Harsha portfolio"
   ```
2. Create a repository on GitHub (e.g. `killo-harsha.github.io`).
3. Push your code and enable **GitHub Pages** under `Settings > Pages > Branch: main / root`.

### Deploying to Vercel or Netlify (Free)
- Simply drag and drop the `harsha` folder into [Netlify Drop](https://app.netlify.com/drop) or import the GitHub repository into [Vercel](https://vercel.com) for instant live HTTPS hosting.
