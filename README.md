# Forkify Application

A modern JavaScript recipe application built as part of [The Complete JavaScript Course 2025: From Zero to Expert!](https://www.udemy.com/course/the-complete-javascript-course/) by [Jonas Schmedtmann](https://x.com/jonasschmedtman).

Forkify allows users to search for recipes, adjust serving sizes dynamically, bookmark favorites, and upload their own custom recipes.

This project focuses heavily on advanced JavaScript concepts, modern tooling, and scalable architectural patterns.

---

## Features

- **Recipe Search:** Query thousands of recipes using a dedicated API with smooth loading spinners and error handling.
- **Dynamic Servings:** Adjust the number of servings on the fly; ingredients and quantities update automatically using a DOM-updating algorithm.
- **Bookmarks System:** Save your favorite recipes for quick access. Bookmarks are persisted across sessions using `localStorage`.
- **Custom Recipe Upload:** Design and upload your own recipes directly to the API, which are automatically marked with a custom user token.
- **Pagination:** Seamlessly navigate through search results with dynamic pagination controls.

---

## Architecture & Design Patterns

The application is structured using the **Model-View-Controller (MVC)** architecture to ensure a clean separation of concerns:

- **Model:** Manages the application state, handles API requests (fetching, searching, and uploading recipes), and manages bookmark storage.
- **Views:** Responsible for rendering the UI and capturing user interactions. Includes specialized views for the recipe details, search results, pagination, bookmarks, and the recipe upload form.
- **Controller:** Acts as the bridge between the Model and the Views. It utilizes the **Publisher-Subscriber Pattern** to handle UI events emitted by the views without creating tight coupling.

---

## Tooling & Tech Stack

- **Language:** [Modern JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Module Bundler:** [Parcel](https://parceljs.org/docs/) (for compiling assets, bundling code, and hot-reloading)
- **Transpiler:** [Babel](https://babeljs.io/docs/) (for backward compatibility with older browsers)
- **API:** [Forkify API v2](https://forkify-api.jonas.io/)

---

## Folder Structure

```bash
.
├── .github/               # CI/CD workflows (GitHub Actions)
├── final/                 # Finished application
│   ├── diagrams/          # Architecture and design visual assets
│   ├── src/
│   │   ├── img/           # Static assets (logos, icons, favicons)
│   │   └── js/            # Core application logic and JavaScript modules
│   ├── .prettierrc        # Code formatting configurations
│   ├── index.html         # Main application entry point
│   ├── package-lock.json
│   └── package.json       # Project dependencies and scripts
├── starter/               # Baseline/boilerplate code used at project onset
├── .gitignore
└── README.md              # Project documentation
```

---

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/ZaneCotten/forkify.git
   cd forkify/final
   ```

2. Install dependencies:

   ```shell
   npm install
   ```

3. Start the development server:

   ```shell
   npm start
   ```
