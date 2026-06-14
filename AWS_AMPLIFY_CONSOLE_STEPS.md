# AWS Amplify Console — Exact Deployment Steps

**Time required**: 5-10 minutes  
**Cost**: Free (within free tier)  
**Result**: Live app at `https://<app-id>.amplifyapp.com`

---

## STEP 1: Sign In to AWS

**URL**: https://console.aws.amazon.com

1. Enter your **AWS Account ID** (12-digit number) or **email**
2. Click **"Next"**
3. Enter **password**
4. Click **"Sign in"**
5. Complete MFA if enabled

---

## STEP 2: Open AWS Amplify

**In AWS Console:**

1. **Search Bar** (top left)
   - Type: `amplify`
   - Results appear below
   
2. **Click** on the **"Amplify"** service
   - (Shows icon with orange/blue)

**Alternative path:**
- Top menu → Services → Search → "Amplify"

---

## STEP 3: Navigate to Amplify Hosting

**You should see:**
```
AWS Amplify Dashboard

Left Sidebar:
  ├─ Home
  ├─ Amplify Hosting
  ├─ Amplify Studio
  └─ ...
```

**Click**: **"Amplify Hosting"** (left sidebar)

---

## STEP 4: Create New App

**You should see:**
```
Amplify Hosting

"Get Started" section (if first time)
OR
"All apps" section (if existing apps)
```

**Click**: **"Create new app"** (top right button)

**Choose hosting method:**
```
Create new app

▼ Host web app  (← SELECT THIS)
  Deploy without Git
```

**Click**: **"Host web app"**

---

## STEP 5: Connect Git Repository

**Choose Your Git Provider:**

```
Connect with your Git provider

[GitHub]  [GitLab]  [Bitbucket]  [AWS CodeCommit]
```

**Click**: **"GitHub"** (or your provider)

---

## STEP 6: Authorize Amplify

**GitHub Authorization Page:**

```
AWS Amplify by Amazon

"Authorize aws-amplify"

[Authorize aws-amplify]
```

**Click**: **"Authorize aws-amplify"**

You may be prompted to:
- Confirm password
- Complete 2FA

---

## STEP 7: Select Repository

**Back in Amplify Console:**

```
Recently used repositories:
  [ ] clinic-app-13jun
  [ ] other-repo-1
  [ ] other-repo-2
```

**Click**: **"clinic-app-13jun"** (your repository)

---

## STEP 8: Select Branch

**Branch Selection:**

```
Select the branch

Branch: [main ▼]
         (other branches)
```

**Dropdown shows**:
- main (most common)
- develop
- feature branches
- etc.

**Select**: **"main"** (production branch)

**Click**: **"Next"**

---

## STEP 9: Review Build Settings

**Amplify Auto-Detects Settings:**

```
Build settings

App name: clinic-app
Repository: clinic-app-13jun
Branch: main

Build command: npm run build
Start command: npm start
Output directory: .next
Framework: Next.js

These are auto-detected ✓
Leave unchanged.
```

**Verify these values match:**

| Setting | Expected | Status |
|---------|----------|--------|
| Build command | `npm run build` | ✓ Auto-detected |
| Output directory | `.next` | ✓ From `amplify.yml` |
| Start command | `npm start` | ✓ Auto-detected |
| Framework | Next.js | ✓ Auto-detected |

**If NOT auto-detected**, manually enter:
```
Build command: npm run build
Output directory: .next
```

**If everything looks correct:**

**Click**: **"Next"**

---

## STEP 10: Review App Settings

**Final Review Page:**

```
App overview

App name:           clinic-app ✓
Repository:         clinic-app-13jun ✓
Owner:              your-github-username ✓
Branch:             main ✓

Build settings:
  Build command:    npm run build ✓
  Start command:    npm start ✓
  Output directory: .next ✓

Environment variables: (none) ← OK for now
```

**This all looks correct!**

**Click**: **"Save and deploy"**

---

## STEP 11: Monitor Build Progress

**Build Logs Appear:**

```
Build Logs

[Stage 1 of 3] - Clone repository
  ▸ Cloning repository...
  ✓ Cloned successfully

[Stage 2 of 3] - Install dependencies & Build
  ▸ Running: npm ci
  ▸ npm WARN ...
  ✓ Dependencies installed
  
  ▸ Running: npm run build
  ▸ Compiling TypeScript...
  ▸ Building Next.js...
  ▸ Generating optimized production build...
  ✓ Build succeeded

[Stage 3 of 3] - Deploy
  ▸ Creating deployment artifact...
  ▸ Uploading to CloudFront...
  ▸ Configuring HTTPS...
  ✓ Deployment successful
```

**Watch the logs** (takes 2-5 minutes)

**When complete**, you'll see:

```
✅ Deployment successful

Congratulations! Your app is live.

Domain: https://main.d1234567890.amplifyapp.com
Created: 2026-06-14 at 14:32 UTC
Branch: main
```

---

## STEP 12: Visit Your Live App

**Success Message Shows:**

```
Deployment successful

Domain: https://main.d1234567890.amplifyapp.com
```

**Click the domain link** OR

**Copy & paste into browser**:
```
https://main.d1234567890.amplifyapp.com
```

**You should see:**
- ✓ Sidebar on **RIGHT** side (RTL)
- ✓ Persian text (فارسی)
- ✓ Design system demo page
- ✓ All colors rendering
- ✓ No errors in console (F12)

---

## STEP 13: Verify Deployment

**In Browser**, press **F12** (DevTools):

1. **Elements Tab**
   - Look for: `<html dir="rtl" lang="fa">`
   - Confirms RTL is active ✓

2. **Console Tab**
   - Should show no errors
   - May show Next.js development messages (OK)

3. **Network Tab**
   - Check fonts loaded (Vazirmatn, Estedad)
   - Check CSS loaded

4. **Application Tab**
   - View stored data (localStorage)

---

## STEP 14: Enable Continuous Deployment (Automatic)

**Good news**: It's already enabled!

From now on:
- Every push to `main` branch
- Automatically triggers Amplify build
- Takes ~2-5 minutes
- New version goes live automatically

**Test it:**
1. Make a small code change
2. Commit and push to `main`
3. Go back to Amplify Console
4. Watch the new deployment happen in real-time

---

## STEP 15: (Optional) Add Custom Domain

**If you have a domain** (e.g., `clinic.example.com`):

1. **Amplify Console** → Your app
2. **Left sidebar** → "Domain management"
3. Click **"Add domain"**
4. Enter your domain: `clinic.example.com`
5. Follow DNS setup instructions
6. Point your domain registrar to Amplify nameservers
7. Done! HTTPS automatically configured

---

## After Deployment: Next Steps

### View Deployment History
```
Amplify Console → Your app → "Deployments" tab
```

Shows:
- All previous deployments
- Commit hashes
- Build times
- Status (success/failed)
- Ability to redeploy old versions

### Add Environment Variables (When Ready)
```
Amplify Console → Your app → "App settings" → "Environment variables"
```

Add when implementing backend:
```
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=xxx
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID=xxx
```

Then **redeploy** for changes to take effect.

### Monitor Performance
```
Amplify Console → Your app → "Monitoring" tab
```

View:
- Build times
- Deployment success rate
- CloudFront CDN hit rate

---

## Troubleshooting During Deployment

### Build Fails with "npm ci" Error

**In Build Logs**, see:
```
npm ERR! code E404
npm ERR! 404 Not Found
```

**Solution**:
1. Go to your repo on GitHub
2. Check `package-lock.json` exists
3. If missing:
   ```bash
   npm install
   git add package-lock.json
   git commit -m "Add package-lock.json"
   git push
   ```
4. Retry deployment

### Build Passes but App Shows Blank

**Causes**:
1. Browser caching
2. Fonts not loaded
3. CSS issues

**Solutions**:
1. Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. Open DevTools: **F12** → Console tab
3. Check for errors
4. If font errors: Redeploy

### "Cannot find .next directory"

**Check Build Logs**:
- Look for: `npm run build` output
- If failed: Fix the build locally first

```bash
npm install
npm run build
npm run type-check
```

Fix any errors, push to Git, redeploy.

---

## Success Criteria

✅ You know you're successful when:

1. **Live URL works**
   ```
   https://main.d1234567890.amplifyapp.com → page loads
   ```

2. **RTL Layout Correct**
   - Sidebar on RIGHT side
   - Text right-aligned
   - Margins/padding flipped

3. **Design Shows**
   - Colors render correctly
   - Typography displays
   - All components visible

4. **No Console Errors**
   - DevTools F12 → Console
   - Only warnings (if any)

5. **Auto-Deployment Works**
   - Push code to `main`
   - New deployment starts automatically
   - Old URL updates automatically

---

## Important Notes

⚠️ **URLs are temporary during development**
- Amplify generates: `https://main.d1234567890.amplifyapp.com`
- Add custom domain later (free HTTPS included)

ℹ️ **Free tier covers**
- 15 GB storage/month
- 1,000 build minutes/month
- Unlimited requests

💡 **Continuous deployment** enabled automatically
- No need for manual deploys
- Every Git push = new build

🔒 **HTTPS enabled** by default
- AWS Certificate Manager
- No additional cost

---

## Quick Reference

| Action | Where |
|--------|-------|
| View live app | https://main.d1234567890.amplifyapp.com |
| View build logs | Amplify Console → Deployments tab |
| View settings | Amplify Console → App settings |
| Add custom domain | Amplify Console → Domain management |
| Add env vars | Amplify Console → Environment variables |
| Monitor performance | Amplify Console → Monitoring |
| Redeploy | Amplify Console → Deployments → Redeploy |

---

## You're Done! 🎉

Your clinic app is now live on AWS Amplify.

**Share your live URL**: `https://main.d1234567890.amplifyapp.com`

**What's Next**:
- [ ] Test the design in production
- [ ] Add custom domain (optional)
- [ ] Set up staging branch (optional)
- [ ] Phase 2: Add backend services (Cognito, API, Database)

