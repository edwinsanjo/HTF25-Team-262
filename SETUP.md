# Setup Instructions

## Prerequisites
- Node.js installed
- MongoDB running (local or Atlas)

## Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install bcryptjs jsonwebtoken
   ```

3. Seed the database with initial users:
   ```bash
   npm run seed
   ```
   This will create:
   - Admin user: `admin` / `admin` (isAdmin: true)
   - Regular user: `user` / `user` (isAdmin: false)

4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:4000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

## Testing the Application

1. Open `http://localhost:3000` in your browser
2. Login with one of the seeded accounts:
   - **Admin**: register number `admin`, password `admin`
   - **User**: register number `user`, password `user`
3. Admin users can access `/admin/dashboard` to view all submissions
4. Regular users can:
   - Report found items (products)
   - File missing complaints
   - View reported items at `/reported`

## Environment Variables

### Backend (`server/.env`)
```
MONGODB_URI=mongodb://127.0.0.1:27017/nonamenow
# or for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nonamenow
JWT_SECRET=your_secret_key_here
PORT=4000
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

## Features

- ✅ JWT-based authentication
- ✅ Role-based access control (admin vs user)
- ✅ Protected routes with automatic redirection
- ✅ Image upload for found/missing items
- ✅ MongoDB persistence
- ✅ Dark, premium UI theme
- ✅ Thank-you modals and auto-redirect flows
- ✅ Logout functionality

## Architecture

### Backend
```
server/
├── server.js           # Entry point (uses modular app)
├── src/
│   ├── app.js         # Express app configuration
│   ├── config/
│   │   └── db.js      # Database connection
│   ├── models/        # Mongoose schemas
│   ├── middleware/    # Auth & upload middleware
│   ├── controllers/   # Route handlers
│   ├── routes/        # API routes
│   └── seed/          # Database seeding
└── uploads/           # Uploaded images
```

### Frontend
```
frontend/
├── app/
│   ├── page.tsx              # Login page
│   ├── layout.tsx            # Root layout with AuthProvider
│   ├── context/
│   │   └── AuthContext.tsx   # Auth state & route protection
│   ├── dashboard/
│   │   └── page.tsx          # User dashboard
│   ├── admin/dashboard/
│   │   └── page.tsx          # Admin dashboard
│   ├── reported/
│   │   └── page.tsx          # Reported items list
│   └── components/           # Reusable components
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with registerNumber & password
- `GET /api/auth/me` - Get current user info (requires token)

### Products (Found Items)
- `GET /api/products` - List all products
- `POST /api/products` - Create product (requires auth, multipart/form-data)

### Complaints (Missing Items)
- `GET /api/complaints` - List all complaints
- `POST /api/complaints` - Create complaint (requires auth, multipart/form-data)
