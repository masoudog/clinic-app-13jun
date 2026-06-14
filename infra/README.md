# Infrastructure as Code (IaC)

**Status**: Ready for deployment  
**Framework**: AWS CloudFormation  
**Language**: YAML  
**Target Service**: AWS Amplify Hosting

---

## Overview

This folder contains Infrastructure as Code definitions for deploying the Clinic CRM Next.js application to AWS Amplify Hosting using CloudFormation.

---

## Files

### `amplify-hosting.yml`

**Purpose**: CloudFormation template for Amplify Hosting deployment

**Resources Created**:
- `AWS::Amplify::App` — Amplify application
- `AWS::Amplify::Branch` — Main branch configuration
- `AWS::IAM::Role` — Service role for Amplify
- `AWS::CloudWatch::Alarm` — Build failure notifications

**Parameters**:
- `AppName` — Application name (default: clinic-app-13jun)
- `RepositoryUrl` — GitHub repository URL
- `BranchName` — Git branch to deploy (default: main)
- `GitHubAccessToken` — GitHub personal access token (NoEcho)
- `EnvironmentName` — Environment name (dev/staging/prod)

**Outputs**:
- `AmplifyAppId` — Application ID
- `DefaultDomain` — Amplify default domain
- `BranchUrl` — Deployment URL for the branch
- `DeploymentUrl` — Full deployment URL
- `RepositoryUrl` — Repository URL (for reference)
- `Environment` — Environment name
- `BranchName` — Deployed branch name

### `DEPLOY_WITH_CLOUDFORMATION.md`

**Purpose**: Step-by-step deployment guide with PowerShell commands

**Contents**:
1. Prerequisites checklist
2. GitHub token creation (Step 1)
3. AWS CLI verification (Step 2)
4. Environment variables setup (Step 3)
5. Template validation (Step 4)
6. Stack creation (Step 5)
7. Deployment monitoring (Step 6-7)
8. Output retrieval (Step 8)
9. Verification (Step 9-10)
10. Complete deployment script
11. Individual commands for manual deployment
12. Troubleshooting guide
13. Stack management (update/delete)

---

## Quick Start

### 1. Prepare GitHub Token
```
https://github.com/settings/tokens
→ Generate new token (classic)
→ Scopes: repo, admin:repo_hook
→ Copy token
```

### 2. Deploy Stack
```powershell
# From repository root
cd infra

# Run deployment script (easier)
.\deploy.ps1

# OR use individual commands (see guide)
```

### 3. Verify Deployment
```
Visit output URL: https://main.d1234567890abc.amplifyapp.com
Expected: App loads with RTL layout
```

---

## Template Structure

### Parameters Section
```yaml
Parameters:
  AppName:
    Type: String
    Default: clinic-app-13jun
  RepositoryUrl:
    Type: String
    Default: https://github.com/masoudog/clinic-app-13jun
  BranchName:
    Type: String
    Default: main
  GitHubAccessToken:
    Type: String
    NoEcho: true  # ← Won't display in console
  EnvironmentName:
    Type: String
    AllowedValues: [dev, staging, prod]
```

### Resources Section
```yaml
Resources:
  ClinicAmplifyApp:
    Type: AWS::Amplify::App
    Properties:
      Name: !Ref AppName
      Repository: !Ref RepositoryUrl
      AccessToken: !Ref GitHubAccessToken
      BuildSpec: ... (from amplify.yml)
      
  ClinicAmplifyBranch:
    Type: AWS::Amplify::Branch
    Properties:
      AppId: !GetAtt ClinicAmplifyApp.AppId
      BranchName: !Ref BranchName
      EnableAutoBuild: true
```

### Outputs Section
```yaml
Outputs:
  AmplifyAppId:
    Value: !GetAtt ClinicAmplifyApp.AppId
  DefaultDomain:
    Value: !GetAtt ClinicAmplifyApp.DefaultDomain
  BranchUrl:
    Value: !Sub 'https://${BranchName}.${ClinicAmplifyApp.DefaultDomain}'
```

---

## Key Features

✅ **No Hardcoded Credentials**
- GitHub token passed as parameter
- `NoEcho: true` hides token in console
- Template safe to share (doesn't contain secrets)

✅ **CloudFormation Best Practices**
- Parameters for all configurable values
- Metadata for parameter grouping in console
- Outputs for easy reference
- Export names for cross-stack references
- Tags for resource tracking

✅ **Complete BuildSpec Embedded**
- Uses repo's `amplify.yml` as reference
- Embedded in template for consistency
- Includes type-check in build pipeline
- Caching configured for speed

✅ **IAM Role Included**
- AmplifyServiceRole for permissions
- Uses AWS managed policy: AdministratorAccess-Amplify
- Properly scoped to Amplify service

✅ **CloudWatch Monitoring**
- Build failure alarm
- Dimensions for app and branch tracking
- Optional but recommended

---

## Security

### What's Secure
✅ Template file is safe to commit (no credentials)  
✅ GitHub token only in parameter at deploy time  
✅ NoEcho hides token from console output  
✅ Token never stored in CloudFormation  
✅ AWS credentials from CLI profile (local config)  

### What to Protect
⚠️ GitHub token — Keep safe, don't share  
⚠️ `.env.local` — Never commit to Git  
⚠️ AWS credentials — Use profiles, not hardcoded  

---

## Deployment States

### During Creation
```
CREATE_IN_PROGRESS
  → Amplify app created
  → Branch configured
  → Build started
```

### On Success
```
CREATE_COMPLETE
  → Resources created
  → Outputs available
  → App live
```

### On Failure
```
CREATE_FAILED
  → Resources rolled back
  → Check events for error
  → Fix issue and retry
```

---

## Common Operations

### Check Stack Status
```powershell
aws cloudformation describe-stacks `
  --stack-name clinic-app-amplify-stack `
  --query 'Stacks[0].StackStatus' `
  --region us-east-1
```

### Get Deployment URL
```powershell
aws cloudformation describe-stacks `
  --stack-name clinic-app-amplify-stack `
  --query 'Stacks[0].Outputs[?OutputKey==`DeploymentUrl`].OutputValue' `
  --output text `
  --region us-east-1
```

### Monitor Build
```powershell
$appId = aws cloudformation describe-stacks `
  --stack-name clinic-app-amplify-stack `
  --query 'Stacks[0].Outputs[?OutputKey==`AmplifyAppId`].OutputValue' `
  --output text `
  --region us-east-1

aws amplify list-jobs `
  --app-id $appId `
  --branch-name main `
  --region us-east-1
```

### Delete Stack
```powershell
aws cloudformation delete-stack `
  --stack-name clinic-app-amplify-stack `
  --region us-east-1
```

---

## Parameters Explained

### `AppName`
- **Default**: `clinic-app-13jun`
- **Type**: String
- **Use**: Amplify app name (also used in resource names)
- **Change**: Update to use different app name

### `RepositoryUrl`
- **Default**: `https://github.com/masoudog/clinic-app-13jun`
- **Type**: String with pattern validation
- **Use**: GitHub repository URL
- **Format**: Must be `https://github.com/username/repo`

### `BranchName`
- **Default**: `main`
- **Type**: String
- **Use**: Git branch to deploy (usually `main` or `develop`)
- **Auto-deployment**: Enabled on this branch

### `GitHubAccessToken`
- **Type**: String (NoEcho)
- **Required**: Yes (no default)
- **Use**: Personal access token for GitHub access
- **Scope**: Needs `repo` and `admin:repo_hook` permissions
- **Note**: Create at https://github.com/settings/tokens

### `EnvironmentName`
- **Default**: `dev`
- **Type**: String (constrained)
- **Options**: `dev`, `staging`, `prod`
- **Use**: Environment identifier (for tags, names, outputs)

---

## Outputs Explained

All outputs are exported for use by other stacks:

### `AmplifyAppId`
- Your Amplify application ID
- Use: Manage app via AWS CLI/API
- Reference: Save for manual operations

### `DefaultDomain`
- Amplify's domain: `d1234567890abc.amplifyapp.com`
- Use: Base domain for branches
- Note: Available immediately after creation

### `BranchUrl`
- Full URL for deployed branch: `https://main.d1234567890abc.amplifyapp.com`
- Use: Access your live app
- Note: App may take 1-5 min to load first time

### `DeploymentUrl`
- Same as BranchUrl (for convenience)
- Use: Primary URL to share/visit

### `RepositoryUrl`
- GitHub repository URL (for reference)
- Use: Documentation, links

### `Environment`
- Environment name (dev/staging/prod)
- Use: Tracking, identification

### `BranchName`
- Deployed branch name (usually "main")
- Use: Reference, automation

---

## What Gets Created

### AWS Amplify
- **App**: Clinic app with GitHub integration
- **Branch**: main branch with auto-build enabled
- **Build Configuration**: From embedded buildSpec
- **Domain**: Amplify default domain (*.amplifyapp.com)
- **HTTPS**: Automatic via AWS Certificate Manager

### IAM
- **Role**: AmplifyServiceRole
- **Policy**: AdministratorAccess-Amplify (AWS managed)
- **Trust**: Amplify service principal

### CloudWatch
- **Alarm**: Build failure notification
- **Metrics**: Tracked automatically

### Not Created
✅ Cognito  
✅ Database  
✅ API Gateway  
✅ Lambda  
✅ Secrets (credentials not stored)

---

## Troubleshooting

### Stack won't create
1. Check template syntax: `aws cloudformation validate-template`
2. Verify GitHub token is valid and not expired
3. Check AWS account has Amplify permissions

### GitHub connection fails
1. Verify token has `repo` scope
2. Verify token has `admin:repo_hook` scope
3. Regenerate token if expired
4. Check repository URL is correct

### Build fails in Amplify
1. Check Amplify Console for build logs
2. Verify `amplify.yml` is in repository root
3. Check `npm ci` doesn't fail locally
4. Verify `npm run build` succeeds locally

### Can't access deployed app
1. Wait 2-5 minutes for first build/deploy
2. Hard refresh browser (Ctrl+Shift+R)
3. Check browser console (F12) for errors
4. Verify URL from CloudFormation outputs

---

## Next Steps

1. **Review template**: Understand what gets created
2. **Create GitHub token**: Step 1 in DEPLOY_WITH_CLOUDFORMATION.md
3. **Deploy**: Follow guide to create stack
4. **Verify**: Visit deployment URL
5. **Monitor**: Watch AWS Amplify Console for builds

---

## References

- **CloudFormation Documentation**: https://docs.aws.amazon.com/cloudformation/
- **Amplify Hosting**: https://docs.aws.amazon.com/amplify/
- **AWS CLI**: https://docs.aws.amazon.com/cli/
- **GitHub Tokens**: https://github.com/settings/tokens

