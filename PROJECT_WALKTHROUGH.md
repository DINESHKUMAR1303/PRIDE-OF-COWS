# Pride of Cows - Project Documentation

## 1. Project Overview
**Name:** Pride of Cows
**Type:** E-commerce Web Application with a dedicated Admin Panel.
**Tech Stack:**
- **Frontend:** React (Vite), CSS3, JavaScript.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose).
- **State Management:** React Context API (`LoginContext`).
- **Routing:** `react-router-dom`.

---

## 2. Directory Structure

### **A. Root Directory (`/`)**
- `index.html`: The entry point for the browser.
- `vite.config.js`: Configuration for the Vite build tool.
- `package.json`: Lists dependencies (React, Lucide icons, Axios, etc.) and scripts (`npm run dev`).
- `backend/`: Contains the complete server-side code.

### **B. Source Code (`/src`)**
This is where the Frontend logic lives.

#### **1. Main Entry Points**
- `main.jsx`: Bootstraps the React app and wraps it in the `LoginProvider`.
- `App.jsx`: The "Traffic Controller". It handles the main **Routing** logic:
  - **Public Routes:** Home, About, Milk Products, My Account.
  - **Admin Routes:** `/admin/*` (delegates to `Admin.jsx`).
- `AdminPanel/Admin.jsx`: The specific router for the Admin section.

#### **2. API Layer (`/src/api`)**
- **Purpose:** Centralized place for valid HTTP requests to the backend.
- **Files:** `user.js` (User management), `auth.js` (Login/Signup).
- **Why?** Keeps components clean. Instead of writing `fetch('...')` inside components, we call `fetchStaff()`.

#### **3. Components (`/src/components`)**
Reusable building blocks used across the site.
- **Navbar & Footer:** Global navigation.
- **ScrollToTop:** A utility helper that forces the page to scroll up when navigating.
- **ProductCarousel:** Display sliders for products.
- **NotificationBar:** Top alert bar.

#### **4. Pages (`/src/pages`)**
The public-facing views of the website.
- **Home:** Landing page.
- **Milk:** Detailed product pages for Milk offerings.
- **Cart:** Shopping cart logic.
- **MyAccount:** User profile, addresses, and order history.

#### **5. Admin Panel (`/src/AdminPanel`)**
A secured area for administrators.
- **AdminLayout:** The "Frame" of the admin panel. It contains the **Sidebar** and the **Top Navbar**. It renders the changing content using `<Outlet />`.
- **Dashboard:** Charts and stats.
- **Users:**
  - `AddUser.jsx`: Form to create new staff/admin users.
  - `ManageUser.jsx`: Table view to list, edit, delete, and search users.
- **Login:** Dedicated admin login screen.

---

## 3. Key Functionalities Explained

### **A. Application Routing (The Navigation System)**
We use `react-router-dom` to switch pages without reloading the browser.
```javascript
// App.jsx
<Routes>
  {/* Public */}
  <Route path="/" element={<Home />} />
  
  {/* Admin - Protected */}
  <Route path="/admin/*" element={<Admin />} />
</Routes>
```
The `Admin` route uses a `*` wildcard, meaning anything starting with `/admin` is handled by the `Admin` component's internal router.

### **B. State Management (Context)**
We use `LoginContext` to globally track if a user is logged in.
- **Provider:** Wraps the entire app.
- **Usage:** Any component can call `useLogin()` to check login status or get user details.

### **C. Admin User Management**
This is a critical feature we recently built.
1. **Add User (`AddUser.jsx`)**:
   - Collects Name, Email, Password.
   - **Permissions:** A checkbox grid allowing Super Admins to grant specific access (e.g., "Product", "Settings").
   - **Profile Image:** detailed form layout with CSS Grid.
2. **Manage User (`ManageUser.jsx`)**:
   - **Fetching:** Calls `fetchStaff()` on load.
   - **Display:** Renders a responsive table.
   - **Filtering:** Search bar filters the local state array.
   - **Actions:** Edit (navigates to Add User with data), Delete (calls API), View (opens modal).
   - **Export:** Generates PDF/Excel files using `jspdf` and `xlsx` libraries.

### **D. Styling Architecture**
- **CSS Modules/Files:** Each component has its own `.css` file (e.g., `AddUser.css`).
- **Global Styles:** `App.css` and `index.css` handle resets and base fonts.
- **Responsive Design:** We heavily use `@media` queries to adapt layouts for Mobile (768px), Tablet (1024px), and Desktop.

---

## 4. Backend Overview (`/backend`)
- **server.js:** The Express server entry point. Connects to MongoDB.
- **Models (Mongoose):** Defines data structure (e.g., `User`, `Product`).
- **Controllers:** The logic methods (e.g., `createUser`, `loginUser`).
- **Routes:** Maps URLs (e.g., `/api/users/add`) to Controller functions.
