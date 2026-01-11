# 🏠 HomeQuest — Room & Rental Listing Platform

HomeQuest is a modern full-stack web application that helps users find, list, and manage rental rooms and properties with ease.
The platform supports authenticated room owners and room seekers, providing a clean search experience, verified listings, and detailed property pages.

## ✨ Features

### 🔍 Property Discovery
 -  Search rooms by location, price range, property type, and tenant preference
 -  View all listings with a responsive grid layout
 -  Clean, minimal room cards for easy scanning

### 🏘️ Property Management (Owners)
 - Add new property listings with multiple images
 - Edit existing listings (update details & replace images)
 - Delete properties securely
 - View only your own listings in “My Listings”

### 📄 Property Details
 - Dedicated property page with:
 - Image gallery
 - Location & rent
 - Property type & tenant preference
 - Owner contact details (phone/email)

### 🔐 Authentication & Authorization
 - Email & password authentication using Supabase Auth
 - Protected routes using a reusable `AuthLayout`
 - Owners can edit/delete only their own properties
 - Secure Row Level Security (RLS) policies

### 🎨 UI & UX
 - Fully responsive design (mobile → tablet → desktop)
 - Reusable UI components:
   - `Input`
   - `Select`
   - `Button`
   - `RoomCard`
 - Clean, minimal, and professional layout using Tailwind CSS

## 🧑‍💻 Tech Stack
 - Frontend
   - React (Vite)
   - Redux Toolkit (Auth state)
   - React Router DOM
   - React Hook Form
 - Tailwind CSS
 - Backend / Services
   - Supabase
   - PostgreSQL database
   - Authentication
   - Storage (property images)
   - Row Level Security (RLS)
    
```bash
## 🗂️ Project Structure (Simplified)
  src/
  ├── components/
  │   ├── Input.jsx
  │   ├── Select.jsx
  │   ├── Button.jsx
  │   ├── RoomCard.jsx
  │   ├── Header.jsx
  │   ├── Footer.jsx
  │   └── LogoutBtn.jsx
  │
  ├── pages/
  │   ├── Home.jsx
  │   ├── Login.jsx
  │   ├── Signup.jsx
  │   ├── SearchResults.jsx
  │   ├── PropertyDetails.jsx
  │   ├── AddProperty.jsx
  │   ├── EditProperty.jsx
  │   └── MyListings.jsx
  │
  ├── layouts/
  │   └── AuthLayout.jsx
  │
  ├── store/
  │   └── authSlice.js
  │
  ├── Supabase/
  │   ├── supabaseClient.js
  │   └── imageUtil.js
```

## 🔐 Authentication Flow
 - Public routes:
   - Home
   - Search
   - Property details
 - Protected routes:
   - Add Property
   - Edit Property
   - Delete Property
   - My Listings

`AuthLayout` ensures:
 - Redirect to `/login` if user is not authenticated
 - Smooth loading while auth state is resolving

## 🖼️ Image Handling
 - Images are uploaded to Supabase Storage
 - Database stores public image URLs
 - Owners can:
   - Upload multiple images
   - Replace all images during edit
 - Images are lazy-loaded for better performance

## 🚀 Getting Started
1️⃣ Clone the repository
```
git clone https://github.com/your-username/homequest.git
cd homequest
```
2️⃣ Install dependencies
```
npm install
```

3️⃣ Setup environment variables
Create a `.env` file:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BUCKET_NAME=prop_images
```
4️⃣ Run the app
```
npm run dev
```

##🛡️ Security
 - Supabase Row Level Security (RLS) ensures:
   - Only owners can update/delete their own listings
   - Public read access for browsing properties
 - Sensitive actions are protected at both client and database level

##📌 Future Enhancements
 - Pagination & infinite scroll
 - Favorites / saved listings
 - Advanced filters (multi-select dropdowns)
 - Admin dashboard
 - Email notifications
 - Map-based property search

##🤝 Contribution
Contributions are welcome!
 - Fork the repo
 - Create a feature branch
 - Submit a pull request

## 👤 Author

Sarthak Tomar
Full-Stack Developer
Built with ❤️ using React & Supabase

Add API schema documentation

Just tell me 👍
