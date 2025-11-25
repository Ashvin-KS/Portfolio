# Ashvin K S - Portfolio

A modern, interactive, and fully responsive personal portfolio website built with Next.js and Tailwind CSS. This project showcases my skills, projects, and career journey as a Full-Stack Developer.

## ✨ Features

-   **Responsive Design**: Fully optimized for all devices, featuring a custom mobile navigation with a hamburger menu and smooth overlay animations.
-   **Dark/Light Mode**: Seamless theme switching with persistent state.
-   **Interactive UI**:
    -   **Waves Background**: A dynamic, sine-wave based background animation.
    -   **Cat Cursor**: A playful custom cursor that follows mouse movement.
    -   **Typing Animation**: Engaging text effects in the Hero section.
    -   **Scroll Animations**: Smooth fade-in and slide-up effects using Framer Motion.
-   **Sections**:
    -   **Hero**: Introduction with animated text and call-to-action.
    -   **About**: Personal bio and background.
    -   **Projects**: Showcase of key projects with links to code and demos.
    -   **Career**: Timeline of professional experience and education.
    -   **Skills**: Visual representation of technical skills.
    -   **Creative**: Gallery of 3D work (Blender) and game development projects.
    -   **Contact**: Functional contact form.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) & Custom Canvas Animations
-   **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
-   **UI Components**: Custom components inspired by shadcn/ui

## 🚀 Getting Started

Follow these steps to run the project locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Ashvin-KS/portfolio-prototyping.git
    cd portfolio-prototyping
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages and layout
├── components/          # Reusable React components
│   ├── portfolio/       # Portfolio-specific sections (Hero, About, etc.)
│   └── ui/              # Generic UI components (Buttons, Cards, etc.)
├── hooks/               # Custom React hooks (useToast, useTypingAnimation)
├── lib/                 # Utility functions
└── data/                # Static data for portfolio content
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Ashvin-KS/portfolio-prototyping/issues).

## 📝 License

This project is [MIT](LICENSE) licensed.
