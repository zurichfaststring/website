# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Resend API Key for email sending
RESEND_API_KEY=your_resend_api_key_here

# Email configuration
FROM_EMAIL=noreply@zurichfaststring.ch
ADMIN_EMAIL=info@zurichfaststring.ch

# Admin authentication (change this password!)
ADMIN_PASSWORD=your_secure_password_here

# Database
# Development (SQLite)
DATABASE_URL="file:./dev.db"

# Production (PostgreSQL - use Vercel Postgres or Supabase)
# DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
```

## For Vercel Deployment

Add these environment variables in your Vercel project settings:

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add each variable above
4. Make sure to use a **strong password** for `ADMIN_PASSWORD`

## Security Notes

- **NEVER** commit `.env.local` to Git (it's already in `.gitignore`)
- **NEVER** share your `RESEND_API_KEY`
- **ALWAYS** use a strong password for `ADMIN_PASSWORD`
- For production, consider using a proper authentication system (e.g., NextAuth.js)


