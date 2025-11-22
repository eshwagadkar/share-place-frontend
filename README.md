# Places App -- MERN + Redux Toolkit 

**⚠️ Project Status: Actively and Incrementally Updated** 

🔗 Live URL : https://share-my-places-app-c02a1.web.app/auth 

A full-stack MERN application for creating, updating, and managing
places with authentication, image uploads, JWT protection, custom hooks,
reusable UI components, and Redux state management.

## 🚀 Features

### 🔐 Authentication & Authorization

-   Signup and Signin using a custom backend.
-   JWT-based authentication.
-   Automatic token attachment to requests.
-   Redux-managed auth state.
-   LocalStorage token persistence via middleware.
-   Authenticated & unauthenticated routes.

### 📍 Places Management

-   Create, update, and delete places.
-   View places authored by a specific user.
-   Update and delete performed only if the logged in user created it in first place
-   Upload images with FormData.
-   Google Maps integration.
-   Validation syncing between frontend & backend.

### 🧱 Reusable Components

-   Custom Button, Form Input, Modal, Loading Spinner.
-   Side Drawer with animations.
-   useForm & useHttpClient hooks.

### 📡 Backend Health Monitoring

-   Custom hook to check backend server health.

### 🎛 State Management

-   Redux Toolkit.
-   Optimized slice mutations.

### 🌐 Routing

-   Dynamic routes: /user/:userId/places
-   Lazy-loaded components.

## 🛠️ Technical Highlights

### Frontend

-   React + Redux Toolkit
-   Custom hooks: useForm, useHttpClient
-   Lazy loading
-   Image upload with preview
-   Google Maps integration
-   Error modal & spinner

### Backend

-   Node.js/Express API
-   JWT auth middleware
-   Image upload endpoints
-   Place CRUD with creator checks
-   Server health endpoint

## 📁 Project Timeline

1.  Initial setup & code cleanup
2.  Routing & UI structure
3.  Forms & validation
4.  HTTP & error handling
5.  Redux integration
6.  CRUD operations
7.  Image uploads
8.  Optimizations & enhancements

## 📦 Installation

``` bash
git clone https://github.com/eshwagadkar/share-place-frontend.git
cd share-place-frontend
npm install
```

Create `.env`:

    VITE_GOOGLE_API_KEY=BIzaSyAUnpoPrK***************************
    VITE_BACKEND_URL=http://localhost:4009/api/v1/
    VITE_IMAGE_BACKEND_URL=http://localhost:4009/

Run:

``` bash
nvm use 22 && npm run dev -- --host  
```

## Backend URL (Render Hosting Service - Free Tier)
https://github.com/eshwagadkar/share-place-backend/api/v1

## 🤝 Contributing

PRs welcome.

## 📜 License

MIT



