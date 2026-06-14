# AWS Amplify Hosting Deployment Guide

**Status**: Ready for deployment  
**Build Configuration**: `amplify.yml` ✅  
**Next.js Setup**: `next.config.js` (standalone mode) ✅  
**Type Check**: Included in build pipeline ✅

---

## Quick Start (5 minutes)

### Prerequisites
- AWS Account (free tier eligible)
- Repository pushed to GitHub/GitLab/Bitbucket

### Step 1: Open AWS Amplify Console

```
https://console.aws.amazon.com
→ Search "Amplify"
→ Click "Amplify"
→ Click "Amplify Hosting" (left sidebar)
→ Click "Create new app" → "Host web app"
```

### Step 2: Connect Repository

1. **Select Git Provider**
   - Choose: GitHub, GitLab, Bitbucket, or AWS CodeCommit
   - Authorize Amplify to access your repository

2. **Select Repository**
   - Repository: `clinic-app-13jun` (or your repo name)
   - Branch: `main` (or your deployment branch)
   - Click "Next"

### Step 3: Review Build Settings

Amplify should auto-detect:

| Setting | Value | Status |
|---------|-------|--------|
| Build Command | `npm run build` | ✅ Auto-detected |
| Start Command | `npm start` | ✅ Auto-detected |
| Output Directory | `.next` | ✅ Auto-detected from `amplify.yml` |
| Framework | Next.js | ✅ Auto-detected |
| Node Version | 18 LTS | ✅ Default |

**If not auto-detected**, manually set:
```
Build Command:    npm run build
Output Directory: .next
```

### Step 4: Configure Environment

Leave empty for now (no backend configured yet).

When you add AWS services later:
- Click "Advanced settings"
- Add environment variables (NEXT_PUBLIC_*)
- Save and redeploy

### Step 5: Deploy

1. Click "Save and deploy"
2. Watch the build logs in real-time
3. Deployment takes 2-5 minutes

### Step 6: Access Your App

Once complete, you'll see:
```
✅ Deployment successful
🌐 https://<branch-name>.<app-id>.amplifyapp.com
```

Click the link to view your live clinic app!

---

## Detailed Console Steps (With Screenshots Guide)

### Step 1: Sign In to AWS Console

**URL**: https://console.aws.amazon.com

1. Enter your AWS Account ID or email
2. Enter password
3. Complete MFA if enabled

### Step 2: Navigate to Amplify Hosting

**Search for Amplify:**
```
Top search bar → Type "Amplify"
→ Click "Amplify" service
→ From left sidebar: "Amplify Hosting"
```

### Step 3: Create New App

**Button Location**: Top right → "Create new app"

**Dropdown Menu:**
```
▼ Create new app
  → "Host web app" (select this)
```

### Step 4: Connect to Git Provider

**Option A: GitHub (Most Common)**

1. Click "GitHub"
2. Click "Authorize AWS Amplify"
3. GitHub login page opens
4. Click "Authorize aws-amplify"
5. Grant permissions
6. Return to Amplify

### Step 5: Select Repository

**In Amplify Console:**

1. **Recently Used Repositories** section
   - Look for `clinic-app-13jun`
   - Click to select
   
   *OR* manually search:
   
2. **Search box** at top
   - Type `clinic-app`
   - Select from dropdown

3. **Branch**
   - Select: `main` (or your branch)
   - Click "Next"

### Step 6: Review Build Settings

**You should see:**

```
App name:           clinic-app
Repository:         clinic-app-13jun
Branch:             main
Backend environment: [No backend]

Build settings:
  Build command:      npm run build
  Output directory:   .next
  Environment variables: (none)
```

If anything is wrong, edit it.

**Click "Next"** when satisfied.

### Step 7: Review & Confirm

**Final Review Page:**
```
App settings:
  - Name: clinic-app
  - Repository: clinic-app-13jun
  - Branch: main
  
Build settings:
  - Command: npm run build
  - Output: .next
  
Environment variables:
  - (none)
```

**Click "Save and deploy"**

### Step 8: Monitor Build

**Build Logs Page:**

You'll see real-time logs:
```
▸ Cloning repository...
▸ Installing dependencies...
  npm ci
  
▸ Building...
  npm run type-check
  npm run build
  
▸ Generating deployment package...

[After ~2-5 minutes]
✅ Build successful
🌐 Domain: https://main.d1234567890.amplifyapp.com
```

### Step 9: Test Your App

**Click the live link:**
```
https://main.d1234567890.amplifyapp.com
```

You should see:
- RTL layout (sidebar on right)
- Design system demo page
- Persian text (فارسی)
- All colors rendered correctly

### Step 10: Enable Continuous Deployment

**Auto-Deploy on Push:**

Amplify automatically enables this. Now:
- Every push to `main` branch → automatic build & deploy
- Takes ~2-5 minutes per deployment
- No manual action needed

---

## Build Configuration Files Prepared

### ✅ `amplify.yml`

Frontend-only build configuration:
```yaml
version: 1
applications:
  - appRoot: ./
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci          # Install deps (faster than npm install)
        build:
          commands:
            - npm run type-check    # Validate TypeScript
            - npm run build         # Build Next.js app
      artifacts:
        baseDirectory: .next  # Output directory
        files:
          - '**/*'            # Include all generated files
      cache:
        paths:
          - node_modules/**/* # Cache dependencies
          - .next/cache/**/*  # Cache build artifacts
```

### ✅ `next.config.js`

Amplify-optimized Next.js config:
```javascript
// Standalone mode: better cold starts, smaller deployments
output: 'standalone',

// Cache headers for static assets
async headers() {
  return [
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ];
}
```

### ✅ `.amplifyrc`

Project-level Amplify configuration:
```json
{
  "appName": "clinic-app",
  "buildSpec": "amplify.yml",
  "envName": "dev",
  "region": "us-east-1"
}
```

---

## Verification Checklist

Before deploying, verify locally:

```bash
# 1. Install dependencies
npm install

# 2. Run type check (same as Amplify build)
npm run type-check
# Should pass with no errors ✓

# 3. Build locally (same as Amplify build)
npm run build
# Should complete successfully ✓

# 4. Test build locally
npm start
# Visit http://localhost:3000

# 5. Check output directory
ls -la .next/
# Should have standalone/ and public/
```

If all pass ✓, you're ready to deploy!

---

## After Deployment

### Add Custom Domain

1. **Amplify Console** → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `clinic.example.com`)
4. Update DNS records at your domain registrar
5. Done! HTTPS automatically configured

### Add Environment Variables (When Needed)

1. **Amplify Console** → App settings → Environment variables
2. Add your AWS credentials:
   ```
   NEXT_PUBLIC_AWS_REGION=us-east-1
   NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=xxx
   ```
3. **Redeploy** for changes to take effect

### View Deployment History

**Amplify Console** → Deployments

Shows:
- Branch
- Commit hash
- Build time
- Status (success/failed)
- Live URL

---

## Troubleshooting

### Build Fails with "npm ci" error

**Solution**: Ensure `package-lock.json` is committed

```bash
# Regenerate lock file locally
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Build Passes but App Shows Blank Page

**Solutions**:
1. Check browser console for errors (F12 → Console tab)
2. Verify fonts loaded: Check Network tab for Vazirmatn font
3. Clear browser cache: Hard refresh (Ctrl+Shift+R)

### RTL Layout Not Working in Production

**Check**:
- Browser DevTools → Elements → `<html dir="rtl" lang="fa">`
- Network tab → Verify `globals.css` loaded
- Redeploy if needed

### Env Variables Not Working

**Important**: Environment variables in Amplify:
1. Added in Amplify Console
2. Require **redeploy** to take effect
3. Visible in build logs

```
Environment variables:
  NEXT_PUBLIC_AWS_REGION=us-east-1
  NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=xxx
```

---

## Next Steps

After deployment is live:

1. **Add Cognito Authentication** (Phase 3)
   - Configure AWS Cognito user pool
   - Add environment variables to Amplify
   - Implement login/logout flows

2. **Add Database** (Phase 4)
   - Configure AWS DynamoDB or RDS
   - Create API endpoints
   - Implement CRUD operations

3. **Setup CI/CD** (Phase 5)
   - Configure pre-deploy checks
   - Add automated testing
   - Set up rollback procedures

---

## Key Points

✅ **No Backend Configured** — Just frontend hosting (perfect for now)  
✅ **Auto HTTPS** — Automatically enabled by AWS  
✅ **CDN Included** — CloudFront CDN for fast delivery  
✅ **Free Tier** — First 15 GB/month free  
✅ **Auto-Scaling** — Handles traffic spikes automatically  
✅ **Continuous Deployment** — Every push deploys instantly  

---

**Ready to deploy?** Open AWS Amplify console and follow the steps above!

**Questions?** Check AWS Amplify documentation:
https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html
