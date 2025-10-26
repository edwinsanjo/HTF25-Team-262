# User Accounts

## Admin Users (Full Access)
These users can access both the user dashboard and admin dashboard:

| Register Number | Password      | Role  |
|----------------|---------------|-------|
| admin          | admin123      | Admin |
| staff          | staff123      | Admin |
| security       | security123   | Admin |

## Regular Users (User Dashboard Only)
These users can only access the user dashboard and report items:

| Register Number| Password      | Role |
|----------------|---------------|------|
| john           | john123       | User |
| mary           | mary123       | User |
| student1       | student123    | User |
| student2       | student123    | User |
| user           | user123       | User |

## How to Create Users in Database

Run this command in the server directory:
```bash
npm run seed
```

Or manually:
```bash
node src/seed/seed.js
```

This will create all users listed above in your MongoDB database.

## Testing

1. **Admin Access**: Login with `admin` / `admin123` to access admin dashboard
2. **User Access**: Login with `john` / `john123` to access user dashboard
3. **Route Protection**: Try accessing admin routes with regular user - should be blocked
