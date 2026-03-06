# Neri Portfolio

A Netflix-themed personal portfolio built with React and Vite. Features a dual-era design — **Tech Era** (dark theme) and **Biz Era** (warm theme) — that showcases both technical and business experience through an interactive, cinematic interface.

## Preview

- **Profile Selector** — Netflix-style "Who's watching?" landing page
- **Dual Themes** — Toggle between Tech Era (dark, red accent) and Biz Era (cream, gold accent)
- **Resume Cart** — Add-to-cart checkout for downloadable resumes
- **Category Accordion** — Expandable industry-grouped experience cards
- **Smooth Transitions** — Animated profile switching with scroll-to-top

## Tech Stack

- **React 19** + **Vite 6**
- Vanilla CSS with custom properties theming
- Static build — no backend required

## Project Structure

```
src/
├── App.jsx                  # Root component with theme & transition state
├── main.jsx                 # Entry point
├── data/
│   └── portfolioData.js     # All portfolio content (PRESENT & PAST profiles)
├── styles/
│   └── index.css            # Global styles with CSS custom properties
└── components/
    ├── ProfileSelector.jsx  # Netflix "Who's watching?" landing
    ├── NavBar.jsx           # Navigation bar
    ├── HeroSection.jsx      # Hero banner
    ├── ExperienceSection.jsx# Experience with category accordion (Biz Era)
    ├── ProjectsSection.jsx  # Project showcase
    ├── SkillsSection.jsx    # Skills display
    ├── EducationBanner.jsx  # Education info
    ├── ResumeSection.jsx    # Resume cart + contact card
    ├── ContactCard.jsx      # Contact info with brand icons
    ├── SectionLabel.jsx     # Reusable section headers
    ├── TransitionOverlay.jsx# Theme switch animation
    └── Footer.jsx           # Page footer
public/
├── profile.png              # Profile photo
├── icons/                   # Custom PNG icons
└── resumes/                 # Downloadable resume PDFs
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

Built for static hosting (GreenGeeks cPanel, GitHub Pages, Netlify, etc.). After `npm run build`, upload the contents of the `dist/` folder to your web server's `public_html` directory.

## Author

**Nerissa Bautista**  
B.A. Computing & Informatics · Cybersecurity M.S. Candidate  
[LinkedIn](https://www.linkedin.com/in/nerissabautista) · [GitHub](https://github.com/neribautista)
