# Technical Documentation: Pride of Cows

## 1. Project Overview
**Pride of Cows** is a full-stack e-commerce application designed for selling dairy products (Milk). It features a modern, responsive React frontend (Vite) and a robust Node.js/Express backend. The application is divided into two distinct portals: a customer-facing e-commerce site and a comprehensive Admin Panel for management.

---

## 2. Technology Stack

### Frontend (Client)
*   **Framework**: React 18 (via Vite)
*   **Routing**: React Router DOM v6
*   **Styling**: CSS, Responsive Design 
*   **Icons**: Lucide React, React Icons
*   **State Management**: React Context API (`AuthContext`) + Local Component State
*   **Utilities**: `jspdf` (PDF Generation), `xlsx` (Excel Export), `axios` (HTTP Requests)

### Backend (Server)
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (via Mongoose ODM)
*   **Authentication**: JSON Web Tokens (JWT) for secure session management
*   **File Handling**: Multer (for image uploads to local storage)
*   **Security**: `helmet`, `cors`, `bcryptjs` (Password Hashing)
*   **Real-time**: Socket.io (Setup available for future use)

### Tools & Environment
*   **Package Manager**: NPM
*   **Version Control**: Git
*   **Environment Variables**: `dotenv` (.env) management

---

## 3. Project Structure

### Root Directory
```text
/
├── backend/                # Node.js Server Code
│   ├── config/             # DB Connection Logic
│   ├── controllers/        # Request Handlers
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Route Definitions
│   ├── uploads/            # Static Image Storage
│   └── server.js           # Server Entry Point
├── src/                    # React Client Code
│   ├── AdminPanel/         # Admin Module (See Section 7)
│   ├── api/                # API Service Layer
│   ├── components/         # Reusable UI Components
│   ├── context/            # Global State (Auth)
│   ├── pages/              # User-Facing Pages
│   └── App.jsx             # Main Router Configuration
├── index.html              # Frontend Entry Point
└── package.json            # Dependencies & Scripts
```

---

## 4. Backend Architecture

### API Structure
The backend follows a simplified MVC (Model-View-Controller) pattern, where the "View" is served by the separate React frontend.
-   **Base URL**: `/api`
-   **Routes**:
    -   `/api/auth`: User authentication (Login/Register).
    -   `/api/user`: User profile management.
    -   `/api/orders`: Order placement and history.
    -   `/api/admin`: Admin-specific actions.
    -   `/api/admin/staff`: Staff/Sub-admin management.

### Database Schema (Mongoose Models)
1.  **User**: Stores customer data (name, email, password, address, etc.).
2.  **Order**: Stores order metadata, items, status, and payment info.
3.  **Staff**: (Found in `admin_panel.staff_details` collection)
    -   Fields: `userId`, `name`, `email`, `contact`, `designation`, `password`, `departments` (permissions), `profileImage`.

### Authentication
-   **User Auth**: Standard JWT flow. Tokens are verified via middleware for protected routes.
-   **Admin Auth**: Separate login flow for staff/admins using specific credentials stored in the Staff collection.

---

## 5. Frontend Architecture

### Routing System
The `App.jsx` handles the primary routing logic using `react-router-dom`.
-   **Public Routes**: Home (`/`), Shop (`/shop/all`), Cart (`/cart`).
-   **Protected Routes**: Wraps `/my-account/*` to ensure only logged-in users can access. Checks `user` state from `AuthContext`.
-   **Admin Routes**: Separate routing tree under `/admin/*` which renders the `Admin` layout component.

### Service Layer (`src/api`)
HTTP requests are abstracted into service files (e.g., `user.js`) to handle API calls. This promotes code reuse and cleaner components.

---

## 6. Client-Side Features (User Portal)

### Modules
1.  **Authentication**:
    -   User Login/Registration.
    -   Protected "My Account" area.
2.  **Shopping Experience**:
    -   **Home Page**: Landing page with featured sections.
    -   **Product Catalog**: Browsing products (Milk, etc.).
    -   **Cart**: Managing items before purchase.
3.  **Account Management**:
    -   **Profile**: View and edit personal details.
    -   **Orders**: View order history and status.
    -   **Addresses**: Manage shipping addresses.

---

## 7. Admin Panel
**Note**: As requested, the Admin Panel documentation is placed in this final section.

The Admin Panel is a distinct module located in `src/AdminPanel`. It overrides the standard user interface with its own Layout, Navbar, and Sidebar.

### 7.1. Architecture
-   **Entry Point**: `src/AdminPanel/Admin.jsx`
-   **Layout**: `AdminLayout.jsx` provides the persistent Sidebar and Topbar structure for all admin pages.
-   **Authentication**: Uses a local storage key `admin_token` to persist sessions. If the token is missing, the router forces a redirect to the Admin Login page.

### 7.2. Core Features & Custom Designs

#### A. Dashboard
-   **Path**: `/admin/dashboard`
-   **Function**: Provides a high-level overview of the system stats (logic implementation pending/in-progress).

#### B. User Management Module
This module allows the "Super Admin" or authorized staff to manage the internal team.

1.  **Add User (`/admin/users/add`)**
    -   **Form**: Creates new staff members.
    -   **Fields**: Name, Email, Contact, Designation (Admin/Manager/Staff), Password.
    -   **Permissions**: Granular checkbox system to assign access to specific modules (Product, Orders, Settings, etc.).
    -   **Profile Image**: Image upload functionality (restricted to 3MB, PNG/JPG).
    -   **Custom UI**: Features a bespoke **Custom Dropdown** for role selection (Green highlight `#ecfdf5` theme).

2.  **Manage Users (`/admin/users/manage`)**
    -   **List View**: Displays all staff members in a responsive table.
    -   **Features**:
        -   **Search**: Real-time filtering by name or email.
        -   **Pagination**: Custom paginated table view.
        -   **Items Per Page**: **Custom Styled Dropdown** (Green highlight theme) to toggle page size (5, 10, 20, 50).
        -   **Bulk Actions**: Select multiple users to batch delete.
        -   **Export**: Export current view to PDF or Excel (`xlsx`).
    -   **Responsive Design**: The table and toolbar adapt seamlessly to mobile (card view), tablet, and desktop screens.
    -   **Visuals**: Uses standard Avatars with hashed color generation if no image is uploaded.

### 7.3. Admin Styling
-   **Framework**: CSS Modules 
-   **Theme**: Uses a clean, professional color palette (Slate/Gray scaling) with specific accent colors (Green `#16c784`) for primary actions and active states.
-   **Components**: heavily utilizes custom-built UI elements (like the formatted Dropdowns and Modals) rather than relying on default browser inputs, ensuring a premium "app-like" feel.
