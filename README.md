# Elder Lands | B. Salem

A premium, cinematic 4-book kingdom-building LitRPG series website. This project features an immersive dark fantasy aesthetic, responsive design, and automated deployment via GitHub Actions.

## ⚔️ Series Overview
**Ambitious heir. Pragmatic father. One fief. Infinite consequences.**

*The Elder Lands* follows Lucan Zesh as he transforms from a doubting heir into a decisive leader. The series explores father-son dynamics, earned progression, and the weight of leadership in a world where every decision ripples through the fief.

## ✨ Features
- **Cinematic Hero Section**: Immersive landing with dynamic overlays and motion typography.
- **Kingdom-Building Guide**: Interactive lore cards exploring fief maps, God Orb systems, and system mechanics.
- **Book Showcase**: Tabbed interface featuring all 4 books with ratings, reviews, and direct links.
- **Reader Testimonials**: Curated reviews from Royal Road, Goodreads, and Amazon.
- **Mobile Optimized**: Custom headers and fluid layouts designed for flawless reading on any device.
- **CI/CD Ready**: Automated deployment to GitHub Pages via Vite and GitHub Actions.

## 🛠️ Technology Stack
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Cinzel, Playfair Display, and Lato (via Google Fonts)
- **Styling**: Vanilla CSS (Modern CSS variables and clamping)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ijazahvmmed/bassel.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Deployment
This project is configured for **GitHub Pages**. Any push to the `master` branch will trigger an automatic build and deployment via the `.github/workflows/deploy.yml` workflow.

## 📜 Project Structure
- `index.tsx`: Core application logic and styled-components.
- `index.html`: Entry point and font loading.
- `vite.config.ts`: Environment and deployment configuration.
- `.github/workflows/`: Automated CI/CD pipelines.

## ⚖️ License
Copyright © 2025 B. Salem. All rights reserved. The Elder Lands is a trademark of B. Salem LLC.
