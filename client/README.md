# 🌬️ SkgBreath

Welcome to **SkgBreath**, a React-based web application that helps inform the citizens of Thessaloniki about their local air quality through **maps**, **graphs**, and real-time **data visualizations**.

---

## 📦 Frontend Tech Stack

This project uses the following tools and technologies:

- ⚛️ **React 19** – UI library for building component-based interfaces
- 🎨 **Tailwind CSS 3.3** – Utility-first CSS framework for rapid styling
- 🌍 **React Router DOM v7** – Routing library for SPAs
- 💾 **gh-pages** – Deployment to GitHub Pages
- 🧪 **Testing Library** – Unit testing utilities for React components
- 🎯 **Lucide React** – Icon library used for modern, lightweight UI icons

---

## 🧠 File Structure

```
SkgBreath/
├── public/                # Static files
│   ├── favicon.ico
│   ├── index.html         # HTML entry point
│   └── ...
├── src/                   # Source code
│   ├── App.jsx            # Main app component with routing
│   ├── index.js           # ReactDOM entry point
│   ├── index.css          # Tailwind & global styles
│   ├── assets/            # Logos, images, etc.
│   ├── components/        # Reusable UI components (e.g. Navbar)
│   ├── pages/             # Route views (Home, About, Data, etc.)
│   ├── services/          # API call logic (e.g. fetch air quality)
│   └── styles/            # Optional custom CSS
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS plugins (Tailwind + Autoprefixer)
├── package.json           # Project metadata, scripts, dependencies
└── README.md              # This file 📝
```

---

## 🚀 Getting Started

### 📥 Clone the repo
```bash
git clone https://github.com/KotsiosDimis/SKG-BREATH.git
cd SKG-BREATH
```

### 📦 Install dependencies
```bash
npm install
```

### 🔧 Start the development server
```bash
npm start
```
This will run the app at `http://localhost:3000`.

---

## 🌐 Deployment

This project is deployed to **GitHub Pages**:
📍 [https://KotsiosDimis.github.io/SKG-BREATH](https://KotsiosDimis.github.io/SKG-BREATH)

To redeploy:
```bash
npm run deploy
```
This will build the app and push it to the `gh-pages` branch.

---

## 📚 Pages Overview

| Route         | Component    | Description                             |
|---------------|--------------|-----------------------------------------|
| `/`           | `Home.jsx`    | Welcome message, intro to SkgBreath     |
| `/about`      | `About.jsx`   | Info about the app and its purpose      |
| `/data`       | `Data.jsx`    | Air quality API results in live format  |

Routing is handled via:
```jsx
<BrowserRouter basename="/SKG-BREATH">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/data" element={<Data />} />
  </Routes>
</BrowserRouter>
```

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to add a feature or fix a bug, feel free to fork the project and submit a PR.

---

## 📄 License

This project is open source. License to be defined.

---

Made with 💙 in Thessaloniki 🇬🇷
