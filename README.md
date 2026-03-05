# ✨ Vaibhav Gupta | Backend Engineer Portfolio

A premium, futuristic portfolio built with **React**, **TypeScript**, and **Vite**, featuring glassmorphic design, smooth animations, and a secure backend integration with **Supabase**.

![Preview](https://raw.githubusercontent.com/lucide-react/lucide/main/icons/layers.svg) <!-- Replace with a real screenshot/image if available -->

## Live Website : 
[97vaibhav](97vaibhav-portfolio.netlify.app)

---

## 🚀 Vision & Design
This portfolio is designed to showcase technical expertise with a high-end, "developer-first" aesthetic.
- **Glassmorphism**: Sleek, translucent UI elements with blurred backgrounds.
- **Dynamic Animations**: Powered by **Framer Motion** for a fluid, responsive feel.
- **Micro-interactions**: Subtle hover effects and transitions that enhance user engagement.
- **Performance**: Optimized for speed and Lighthouse scores using Vite's build system.

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) (Modern CSS Hooks) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Backend** | [Supabase](https://supabase.com/) (PostgreSQL & Edge Functions) |
| **Deployment** | [Netlify](https://www.netlify.com/) |

## ✨ Key Features
- **Interactive Hero Section**: Engaging introduction to core skills (Golang, Python, AWS).
- **Public Speaking Showcase**: Highlighting presentations at Go Conference 2024 & 2025.
- **Experience Timeline**: A visual journey of professional growth as a Backend Engineer.
- **Contact Form**: A fully functional, secure form connected to Supabase for lead generation.
- **Responsive Design**: Flawless experience across Mobile, Tablet, and Desktop.

## 📦 Project Structure
```bash
├── 📁 .agents          # AI-assisted workflow configurations
├── 📁 public           # Static assets
└── 📁 src
    ├── 📁 components   # Modular UI components (Hero, Skills, Contact, etc.)
    ├── 📁 lib          # Third-party configurations (Supabase client)
    ├── 📁 assets       # Visual assets and icons
    ├── App.tsx         # Main application logic
    └── index.css       # Global design system & tokens
```

---

## 🛠️ Local Development

### 1. Clone the repository
```bash
git clone https://github.com/[your-username]/portfolio-vaibhav.git
cd portfolio-vaibhav
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your Supabase credentials (see `.env.example`):
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the development server
```bash
npm run dev
```

---

## 🌐 Deployment

### Netlify Setup
1. Connect your GitHub repository to **Netlify**.
2. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. **Environment Variables**:
   Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Netlify Dashboard under **Site Settings > Environment Variables**.

---

## 📧 Contact
- **Location**: Tokyo, Japan 🇯🇵
- **GitHub**: [@97vaibhav](https://github.com/97vaibhav)
- **LinkedIn**: [Vaibhav Gupta](https://www.linkedin.com/in/97vaibhav/)

---
*Built with ❤️ by Vaibhav Gupta*
