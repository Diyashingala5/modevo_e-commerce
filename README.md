
# Modevo E-Commerce

A modern, full-featured e-commerce platform built with React and Tailwind CSS. Designed for scalability, performance, and a seamless shopping/admin experience.

## 🚀 Features

- **React 18** for fast, modern UI
- **React Router v6** for dynamic routing
- **Tailwind CSS** for rapid, responsive design
- **Context API** for state management (Cart, Notifications)
- **Admin Dashboard** with customer, order, and product management
- **Checkout flow** with order summary, payment, and shipping
- **Product catalog** with filtering, sorting, and details
- **User authentication** and profile management
- **Reusable UI components**
- **Error boundaries** and robust error handling

## 📋 Prerequisites

- Node.js (v16.x or higher recommended)
- npm (v7+) or yarn

## ⚙️ Environment Variables

Before running the project, create a `.env` file in the root directory with the following content:

```env
# Database Configuration
DATABASE_URL=

# Stripe Configuration
STRIPE_SECRET_KEY=
VITE_STRIPE_PUBLIC_KEY=
```

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Diyashingala5/modevo_e-commerce.git
   cd modevo_e-commerce
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📁 Project Structure

```
modevo_e-commerce/
├── public/                # Static assets, images, manifest, etc.
├── src/
│   ├── components/        # Shared UI components
│   │   └── ui/            # UI primitives (Button, Input, etc.)
│   ├── contexts/          # React Context providers (Cart, Notification)
│   ├── pages/             # Page components (admin, checkout, home, etc.)
│   ├── styles/            # CSS and Tailwind files
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   ├── Routes.jsx         # App routes
│   └── index.jsx          # Entry point
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
└── README.md              # Project documentation
```

## 🧩 Adding Routes

To add or modify routes, edit `src/Routes.jsx`. Example:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "./pages/home-page";
import ProductsListPage from "./pages/products-list-page";

const ProjectRoutes = () => {
  const element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/products", element: <ProductsListPage /> },
    // Add more routes as needed
  ]);
  return element;
};
export default ProjectRoutes;
```

## 🎨 Styling

Tailwind CSS is used for all styling. Customize styles in `src/styles/` and `tailwind.config.js`.

- Utility-first classes for rapid UI
- Responsive breakpoints
- Plugins for forms, typography, aspect ratio, and more

## 📱 Responsive Design

Fully responsive layouts using Tailwind's breakpoints and utility classes.

## 📦 Deployment

1. Build for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy the `dist/` folder to your preferred hosting (Netlify, Vercel, etc.)

---

## 📄 License

See [LICENSE](LICENSE) for details.