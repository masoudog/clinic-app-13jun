# Clinic App

A modern clinic booking and management web application built with Next.js, TypeScript, Tailwind CSS, and AWS Amplify.

## Tech Stack

- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **Authentication & Backend**: AWS Amplify
- **Deployment**: AWS Amplify Hosting
- **Code Quality**: ESLint, Prettier

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── hooks/            # Custom React hooks
├── lib/              # Utility libraries (AWS Amplify config, etc.)
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
└── globals.css       # Global Tailwind styles
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- AWS account (for Amplify)

### Installation

1. Clone the repository and navigate to the project:
   ```bash
   cd clinic-app-13jun
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Then update `.env.local` with your AWS Amplify credentials.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Code Formatting

```bash
npm run format
npm run format:check
```

## Environment Variables

Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID=your_pool_id
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=your_user_pool_id
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID=your_web_client_id
```

**Do NOT commit `.env.local` to version control.**

## AWS Amplify Hosting Deployment

### Prerequisites

- AWS Account with billing enabled
- Git repository (GitHub, GitLab, Bitbucket, or AWS CodeCommit)
- Repository pushed to your remote (main branch or feature branch)

### Deployment via AWS Amplify Console (Recommended)

**Option 1: From AWS Console (Easiest)**

1. **Sign in to AWS Console**
   - Go to https://console.aws.amazon.com
   - Search for "Amplify"
   - Click "Amplify Hosting"

2. **Create New App**
   - Click "Create new app"
   - Select "Host web app"

3. **Connect Your Repository**
   - Choose your Git provider (GitHub, GitLab, Bitbucket, CodeCommit)
   - Authorize Amplify to access your account
   - Select this repository (`clinic-app-13jun`)

4. **Review Build Settings**
   - **Build Command**: `npm run build` (auto-detected)
   - **Start Command**: `npm start` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - These match the `amplify.yml` configuration

5. **Configure Deployment**
   - Select branch to deploy (e.g., `main`)
   - Leave environment variables empty for now (no backend needed)
   - Click "Save and deploy"

6. **Monitor Deployment**
   - Watch build logs in real-time
   - App deploys automatically on each push to main branch

**Option 2: Deploy via AWS CLI**

```bash
# Install AWS CLI (if not already installed)
# See: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

# Login to AWS (if not already)
aws configure

# Install Amplify CLI
npm install -g @aws-amplify/cli

# Deploy to Amplify Hosting
amplify hosting push

# Or use manual upload
amplify add hosting    # Follow prompts
amplify publish        # Deploys to production
```

### Environment Variables (For Future Use)

When you add backend services later:

1. In **Amplify Console** → App Settings → Environment Variables
2. Add your `.env.local` variables:
   ```
   NEXT_PUBLIC_AWS_REGION=us-east-1
   NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=xxx
   NEXT_PUBLIC_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID=xxx
   NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID=xxx
   ```
3. Redeploy for changes to take effect

### Build Configuration

The project uses `amplify.yml` for build settings:
- **Build script**: `npm run type-check && npm run build`
- **Output directory**: `.next` (Next.js standalone build)
- **Cache**: node_modules, .next cache
- **Node version**: 18 LTS (Amplify default)

### After Deployment

- **Live URL**: Your app is accessible at `https://<branch-name>.<app-id>.amplifyapp.com`
- **Custom Domain**: Add custom domain in Amplify Console → Domain Management
- **HTTPS**: Automatically enabled with AWS Certificate Manager
- **CDN**: CloudFront CDN automatically included

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails with `npm` error | Ensure `package.json` is valid; check Node version is 18+ |
| Build passes but app doesn't load | Check `.next` folder was created; verify `next.config.js` |
| RTL text not showing | Verify `src/globals.css` Persian font imports loaded |
| Env vars not working | Redeploy after adding variables in Amplify Console |

### Local Testing Before Deploy

```bash
# Build locally (same as Amplify)
npm install
npm run build

# Test build locally
npm start

# Visit http://localhost:3000
```

### Continuous Deployment

Every push to your main branch automatically:
1. Triggers Amplify build
2. Runs `npm run type-check && npm run build`
3. Deploys to `.amplifyapp.com` domain
4. Updates live URL with new version

## Architecture Notes

- **Component-Based**: All UI elements are modular, reusable components
- **Type-Safe**: Full TypeScript support for better development experience
- **Responsive**: Mobile-first responsive design using Tailwind CSS
- **Amplify Integration**: Ready for AWS backend services (Auth, API, Storage)
- **SSR/SSG**: Leverages Next.js App Router for optimal performance

## Design System

Colors and spacing are extensible via `tailwind.config.ts`. Update theme variables to match your Figma design.

## Notes

- Keep UI close to the Figma design
- All AWS credentials go in `.env.local` (never commit secrets)
- Use TypeScript for type safety
- Create reusable components in `src/components/`
- Keep business logic in hooks (`src/hooks/`) and utilities (`src/utils/`)
