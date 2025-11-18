# Railway Deployment Guide for Share Care Give

## Prerequisites
- Railway account (https://railway.app)
- GitHub or GitLab account
- Your project pushed to a Git repository

## Step 1: Prepare Your Repository

1. **Export from Replit** (if needed):
   - Download your project as a ZIP
   - Extract and push to GitHub/GitLab

2. **Ensure these files are present**:
   - `railway.json` (deployment configuration)
   - `package.json` with production scripts
   - Database schema in `shared/schema.ts`

## Step 2: Deploy on Railway

1. **Create New Project**:
   - Go to https://railway.app
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository

2. **Add PostgreSQL Database**:
   - In your Railway project, click "New Service"
   - Choose "Database" → "PostgreSQL"
   - Railway automatically creates and links the database

3. **Environment Variables**:
   Railway automatically provides:
   - `DATABASE_URL` - PostgreSQL connection string
   - `PORT` - Server port

   You need to add:
   - `VITE_GOOGLE_MAPS_API_KEY` - Your Google Maps API key
   - Any other API keys your app needs

## Step 3: Configure Database

After deployment, run these commands in Railway's shell or locally with Railway CLI:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Push database schema
railway run npm run db:push

# Seed initial data
railway run npm run db:seed
```

## Step 4: Update Frontend API URLs

Before deploying, update your frontend to use relative API URLs:

In `src/pages/Community.tsx` and other files:
```javascript
// Change from:
fetch('http://localhost:3001/api/communities')

// To:
fetch('/api/communities')
```

## Step 5: Production Build Settings

Railway will automatically:
1. Install dependencies: `npm install`
2. Build frontend: `npm run build`
3. Start server: `npm run start:prod`

## Environment Variables Needed

Set these in Railway dashboard → Variables:

```env
# Database (auto-provided by Railway)
DATABASE_URL=postgresql://...

# Your API Keys
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key

# Optional
NODE_ENV=production
```

## Deployment Commands

After pushing to GitHub, Railway auto-deploys. You can also:

```bash
# Manual deploy
railway up

# View logs
railway logs

# Run commands
railway run npm run db:studio
```

## Database Migration from Neon to Railway

If you have data in Neon to migrate:

1. Export from Neon:
```bash
pg_dump $OLD_DATABASE_URL > backup.sql
```

2. Import to Railway:
```bash
railway run psql $DATABASE_URL < backup.sql
```

## Troubleshooting

1. **Port Issues**: Railway sets PORT automatically, ensure your server uses `process.env.PORT || 3001`

2. **Database Connection**: Check DATABASE_URL is set in Railway variables

3. **Build Failures**: Check Railway logs for npm install or build errors

4. **CORS Issues**: Update CORS settings in `server/index.ts` to allow your Railway domain

## Production URL

After deployment, Railway provides a URL like:
- `https://your-app.railway.app`

Update your frontend to use this URL for API calls in production.

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Share Care Give Support: admin@sharecaregive.org