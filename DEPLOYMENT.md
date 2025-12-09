# 🚀 Deployment Guide - Zurich Fast String

## ✅ Security Checklist

Before deploying, verify that:

- [x] `.env.local` is NOT in the repository (checked via `.gitignore`)
- [x] No hardcoded credentials in the code
- [x] Admin credentials use environment variables
- [x] All sensitive data is in environment variables

## 📦 Deploy to Vercel

### Step 1: Import Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub: `zurichfaststring/website`
4. Vercel will auto-detect Next.js - click "Deploy"

### Step 2: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=noreply@zurichfaststring.ch
ADMIN_EMAIL=info@zurichfaststring.ch
ADMIN_PASSWORD=your_secure_admin_password_here
DATABASE_URL=your_postgres_connection_string_here
```

⚠️ **IMPORTANT**: Use your actual Resend API key and create a STRONG admin password!

### Step 3: Setup PostgreSQL Database

**Option A: Vercel Postgres (Recommended)**
1. In Vercel: Storage → Create Database → Postgres
2. Vercel auto-configures `DATABASE_URL`
3. Skip to Step 4

**Option B: Supabase**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your connection string (Settings → Database)
4. Add `DATABASE_URL` in Vercel env vars

### Step 4: Update Prisma Schema

1. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"  // Change from "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. Commit and push:
   ```bash
   git add prisma/schema.prisma
   git commit -m "Switch to PostgreSQL for production"
   git push
   ```

### Step 5: Run Database Migrations

In your terminal (with DATABASE_URL set):
```bash
npx prisma migrate deploy
```

Or use Vercel CLI:
```bash
vercel env pull
npx prisma migrate deploy
```

### Step 6: Configure Custom Domain

1. In Vercel: Settings → Domains
2. Add `zurichfaststring.ch` and `www.zurichfaststring.ch`
3. Vercel will provide DNS records (A, CNAME)
4. Add these records in your domain registrar (Infomaniak, Hostpoint, etc.)
5. Wait 5-60 minutes for DNS propagation
6. Vercel will auto-enable HTTPS

### Step 7: Configure Email Domain (Resend)

1. Go to [resend.com/domains](https://resend.com/domains)
2. Add domain: `zurichfaststring.ch`
3. Add the provided DNS records:
   - SPF record
   - DKIM record
4. Verify domain
5. Update `FROM_EMAIL` to use your domain

## 🔒 Post-Deployment Security

### Change Admin Password
1. Update `ADMIN_PASSWORD` in Vercel env vars
2. Use a strong password (12+ characters, mixed case, numbers, symbols)

### Test Authentication
1. Go to `https://zurichfaststring.ch/admin`
2. Try logging in with the new credentials
3. Verify that old credentials don't work

## 🧪 Testing Checklist

After deployment, test:

- [ ] Homepage loads correctly
- [ ] All three languages work (EN, DE, FR)
- [ ] Booking flow works end-to-end
- [ ] Email confirmation is sent (client + admin)
- [ ] Admin login works
- [ ] Admin dashboard displays bookings
- [ ] Settings can be updated
- [ ] Closed days can be managed

## 📧 Email Testing

Send a test booking and verify:
- Client receives confirmation email in correct language
- Admin receives notification (always in French)
- Emails are not truncated by Gmail
- WhatsApp link works
- All information is correct

## 🆘 Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify all dependencies are in `package.json`
- Check for TypeScript errors

### Database Connection Fails
- Verify `DATABASE_URL` is correct
- Check that migrations were run
- Verify Prisma schema uses `postgresql`

### Emails Not Sending
- Verify `RESEND_API_KEY` is correct
- Check domain is verified in Resend
- Check DNS records are configured
- Look at Vercel function logs

### Admin Login Not Working
- Verify `ADMIN_PASSWORD` is set in Vercel
- Clear browser cache/localStorage
- Check API route logs in Vercel

## 📊 Monitoring

- **Vercel Analytics**: Automatically enabled
- **Error Tracking**: Check Vercel function logs
- **Email Logs**: Check Resend dashboard

## 🔄 Updates

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically redeploy!

---

**Need help?** Check Vercel docs: https://vercel.com/docs

