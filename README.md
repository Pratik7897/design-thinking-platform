# Design Thinking Platform

An interactive, React-based web application that guides users through the comprehensive 6-phase Design Thinking process.

## 🚀 Features

- **Guided Multi-Step Input:** A structured form to collect essential product or project details.
- **AI-Powered Analysis Engine:** Dynamically generates insights for each phase of the Design Thinking process using the Google Gemini API (`@google/generative-ai`).
- **Interactive Phase Cards:** Beautifully animated cards using `framer-motion` to navigate through generated insights.
- **Dynamic Dashboard:** Visualize progress and quickly reference different phases.
- **PDF Export:** Export your completed Design Thinking analysis to PDF for easy sharing and presentation (powered by `jspdf`).
- **Responsive Design:** A sleek, modern user interface that works beautifully across all devices.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite
- **Styling:** CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Export capabilities:** jsPDF
- **AI Integration:** Google Generative AI

## 🏃‍♂️ Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Make sure to set up your `.env` file with the required API keys (e.g., your Google Gemini API key).

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

4. **Build for Production:**
   ```bash
   npm run build
   ```

## 🐛 Recent Updates
- Fixed unused variable lint warnings during build optimization.
- Cleaned up unused imports across all UI components.
