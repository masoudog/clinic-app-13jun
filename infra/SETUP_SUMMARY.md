# CloudFormation Setup Summary

**Status**: ✅ Infrastructure as Code ready  
**Date**: June 14, 2026  
**Framework**: AWS CloudFormation  
**Language**: YAML  
**Next Action**: Review files, then deploy using commands in DEPLOY_WITH_CLOUDFORMATION.md

---

## What Was Created

### New Folder Structure

```
infra/
├── amplify-hosting.yml                    # CloudFormation template
├── DEPLOY_WITH_CLOUDFORMATION.md          # PowerShell deployment guide
├── README.md                              # Infrastructure documentation
└── SETUP_SUMMARY.md                       # This file
```

### Files Created

#### 1. `infra/amplify-hosting.yml`

**CloudFormation YAML template** for Amplify Hosting deployment

**Features**:
- ✅ No hardcoded credentials
- ✅ Parameterized configuration
- ✅ CloudFormation best practices
- ✅ Complete buildSpec embedded
- ✅ IAM role included
- ✅ CloudWatch monitoring
- ✅ Export names for cross-stack refs

**Resources Created**:
```
AWS::Amplify::App (ClinicAmplifyApp)
  → Creates Amplify application
  → Configures GitHub integration
  → Sets up build environment

AWS::Amplify::Branch (ClinicAmplifyBranch)
  → Configures main branch
  → Enables auto-build
  → Sets up branch notifications

AWS::IAM::Role (AmplifyServiceRole)
  → Allows Amplify to access AWS resources
  → Uses AWS managed policy

AWS::CloudWatch::Alarm (AmplifyBuildFailureAlarm)
  → Monitors for build failures
  → Sends notifications
```

**Parameters**:
```yaml
AppName:              clinic-app-13jun (editable)
RepositoryUrl:        https://github.com/masoudog/clinic-app-13jun
BranchName:           main (editable)
GitHubAccessToken:    [required at deploy time, NoEcho]
EnvironmentName:      dev (dev/staging/prod)
```

**Outputs** (retrieved after stack creation):
```
AmplifyAppId          → Your app ID
DefaultDomain         → Amplify domain base
BranchUrl            → Live deployment URL
DeploymentUrl        → Full live URL
RepositoryUrl        → GitHub URL (reference)
Environment          → Environment name
BranchName           → Deployed branch
```

#### 2. `infra/DEPLOY_WITH_CLOUDFORMATION.md`

**Comprehensive deployment guide** with PowerShell commands

**Contents** (230 lines):
```
✓ Prerequisites checklist
✓ Step 1: Create GitHub token (detailed)
✓ Step 2: Verify AWS CLI
✓ Step 3: Set environment variables
✓ Step 4: Validate template
✓ Step 5: Create CloudFormation stack
✓ Step 6: Monitor deployment
✓ Step 7: Check for errors
✓ Step 8: Get outputs
✓ Step 9: Access live app
✓ Step 10: Monitor Amplify
✓ Complete PowerShell script (copy & paste)
✓ Individual commands for manual deployment
✓ Troubleshooting section
✓ Stack management (update, delete)
```

**Key Sections**:
1. **GitHub Token Setup** — Exact steps with screenshots guide
2. **AWS CLI Verification** — Ensure credentials configured
3. **PowerShell Environment** — Variable setup
4. **Deployment Script** — Full `deploy.ps1` ready to use
5. **Manual Commands** — Step-by-step for individual execution
6. **Monitoring** — Real-time build status watch
7. **Output Retrieval** — Get deployment URL
8. **Troubleshooting** — Common issues and solutions

#### 3. `infra/README.md`

**Infrastructure documentation** for developers

**Contents**:
```
✓ Overview
✓ File descriptions
✓ Quick start guide
✓ Template structure (Parameters, Resources, Outputs)
✓ Key features
✓ Security notes
✓ Deployment states
✓ Common operations
✓ Parameter explanations
✓ Output reference
✓ What gets created
✓ Troubleshooting
✓ Next steps
✓ References
```

---

## Updated Files

### `README.md` (Root)

**Changes**:
- Added "Deploy with CloudFormation" section
- New subsection explaining IaC approach
- Quick deploy command (PowerShell)
- Benefits of CloudFormation
- Reference to detailed guide

**Location**: After "Continuous Deployment" section

---

## Key Design Decisions

### ✅ No Hardcoded Credentials

**Template is safe to commit**:
- GitHub token passed as parameter only
- No credentials stored in template
- `NoEcho: true` hides token from console
- AWS credentials from CLI profile (local config)

### ✅ Parameterized Configuration

**All changeable values are parameters**:
```yaml
AppName              → Change app name
RepositoryUrl        → Point to different repo
BranchName          → Deploy different branch
GitHubAccessToken   → Required at deploy time
EnvironmentName     → dev/staging/prod
```

### ✅ Complete BuildSpec

**Embedded in template** (consistent deployment):
```yaml
BuildSpec:
  npm ci              # Install deps
  npm run type-check  # Validate TypeScript
  npm run build       # Build Next.js
  Artifacts: .next/   # Output directory
  Cache: node_modules # Speed up rebuilds
```

### ✅ IAM Role Included

**AmplifyServiceRole** for Amplify permissions:
```yaml
AssumeRolePolicyDocument:
  Service: amplify.amazonaws.com
ManagedPolicyArn:
  AdministratorAccess-Amplify
```

### ✅ CloudWatch Monitoring

**Build failure alarm** (optional but included):
```yaml
MetricName: BuildFailure
Threshold: 1
Dimensions:
  - AppId
  - BranchName
```

### ✅ Metadata for CLI Console

**Better parameter grouping in CloudFormation console**:
```yaml
Metadata:
  AWS::CloudFormation::Interface:
    ParameterGroups:
      - Label: Application Configuration
      - Label: Repository Configuration
    ParameterLabels:
      AppName: Application Name
      # ... etc
```

---

## CloudFormation Template Structure

```
AWSTemplateFormatVersion: 2010-09-09
├─ Description
├─ Parameters (5 parameters)
│  ├─ AppName
│  ├─ RepositoryUrl
│  ├─ BranchName
│  ├─ GitHubAccessToken (NoEcho)
│  └─ EnvironmentName
├─ Metadata (parameter grouping)
├─ Resources (4 resources)
│  ├─ ClinicAmplifyApp
│  ├─ AmplifyServiceRole
│  ├─ ClinicAmplifyBranch
│  └─ AmplifyBuildFailureAlarm
└─ Outputs (7 outputs)
   ├─ AmplifyAppId
   ├─ AmplifyAppArn
   ├─ DefaultDomain
   ├─ BranchUrl
   ├─ DeploymentUrl
   ├─ RepositoryUrl
   └─ Environment + BranchName
```

---

## CloudFormation Intrinsic Functions Used

```yaml
!Ref              # Reference parameters/resources
!GetAtt          # Get resource attributes
!Sub             # String substitution
!GetAZs          # (not used, for reference)
```

---

## Security Checklist

✅ **No credentials in template**
- GitHub token parameter with NoEcho
- AWS credentials from CLI profile
- No hardcoded API keys

✅ **Least privilege IAM**
- AmplifyServiceRole has managed policy
- Role limited to Amplify service

✅ **Template safe to commit**
- No secrets in YAML
- Parameters documented
- `.gitignore` doesn't need update

✅ **Outputs don't expose secrets**
- Only AppId, domain, URLs (public)
- No credentials in export names

---

## What NOT Created (As Requested)

✅ No AWS Cognito  
✅ No RDS/DynamoDB database  
✅ No Lambda functions  
✅ No API Gateway  
✅ No credentials stored  
✅ No backend services  

---

## Deployment Flow

```
1. Create GitHub Token
   ↓
2. Configure AWS CLI
   ↓
3. Set PowerShell Variables
   ↓
4. Validate Template
   ↓
5. Create CloudFormation Stack
   ↓
6. Monitor Stack Creation (2-5 min)
   ↓
7. Retrieve Outputs
   ↓
8. Visit Deployment URL
   ↓
9. Verify App Loads
   ↓
10. Continuous Deployment Enabled
    (Future pushes auto-deploy)
```

---

## PowerShell Commands Provided

### In `DEPLOY_WITH_CLOUDFORMATION.md`:

1. **GitHub Token Creation** — Manual steps
2. **AWS CLI Verification** — `aws sts get-caller-identity`
3. **Template Validation** — `aws cloudformation validate-template`
4. **Stack Creation** — `aws cloudformation create-stack`
5. **Status Monitoring** — Loop with `describe-stacks`
6. **Output Retrieval** — `aws cloudformation describe-stacks` with query
7. **Stack Update** — `aws cloudformation update-stack`
8. **Stack Deletion** — `aws cloudformation delete-stack`
9. **Job Monitoring** — `aws amplify list-jobs`

### Deployment Script (Full):

**File**: `deploy.ps1` (provided in guide)

**Features**:
- ✅ Validates template
- ✅ Creates stack
- ✅ Monitors progress
- ✅ Shows status updates
- ✅ Displays final URL
- ✅ Error handling

---

## Template Size & Complexity

- **Lines**: ~300 (well-documented)
- **Parameters**: 5 (all configurable)
- **Resources**: 4 (Amplify + IAM + Monitoring)
- **Outputs**: 7 (all useful)
- **Complexity**: Medium (good for learning)

---

## Export Names

**CloudFormation exports** for cross-stack references:

```yaml
${AppName}-AppId                  # clinic-app-13jun-AppId
${AppName}-AppArn                 # clinic-app-13jun-AppArn
${AppName}-DefaultDomain          # clinic-app-13jun-DefaultDomain
${AppName}-${BranchName}-Url      # clinic-app-13jun-main-Url
${AppName}-RepositoryUrl          # clinic-app-13jun-RepositoryUrl
${AppName}-Environment            # clinic-app-13jun-Environment
${AppName}-BranchName             # clinic-app-13jun-BranchName
```

**Use**: Reference in other stacks (future phases)

---

## Stack Management After Creation

### Update Stack
```powershell
aws cloudformation update-stack `
  --stack-name clinic-app-amplify-stack `
  --template-body file://infra/amplify-hosting.yml `
  --parameters ... `
  --capabilities CAPABILITY_NAMED_IAM
```

### Change Environment
```
Update EnvironmentName parameter (dev → staging → prod)
Existing resources preserved
Only changed resources updated
```

### Delete Stack
```powershell
aws cloudformation delete-stack `
  --stack-name clinic-app-amplify-stack

# Amplify app deleted
# IAM role deleted
# All resources cleaned up
```

---

## File Organization

```
clinic-app-13jun/
├── infra/                                   (NEW)
│   ├── amplify-hosting.yml                  (NEW)
│   ├── DEPLOY_WITH_CLOUDFORMATION.md        (NEW)
│   ├── README.md                            (NEW)
│   └── SETUP_SUMMARY.md                     (NEW - this file)
├── README.md                                (UPDATED)
├── package.json
├── next.config.js
├── amplify.yml
├── tsconfig.json
├── tailwind.config.ts
└── ... (other files unchanged)
```

---

## References

### CloudFormation

- [CloudFormation User Guide](https://docs.aws.amazon.com/cloudformation/)
- [CloudFormation Best Practices](https://docs.aws.amazon.com/cloudformation/latest/userguide/best-practices.html)
- [Amplify CloudFormation Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html)

### AWS Amplify

- [Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html)
- [Amplify Console](https://console.aws.amazon.com/amplify/)

### AWS CLI

- [AWS CLI Documentation](https://docs.aws.amazon.com/cli/)
- [CloudFormation Commands](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/)
- [Amplify Commands](https://docs.aws.amazon.com/cli/latest/reference/amplify/)

---

## Before You Deploy

### Checklist

- [ ] Read `infra/README.md` (understand what gets created)
- [ ] Review `infra/amplify-hosting.yml` (understand template)
- [ ] Create GitHub Personal Access Token (Step 1 in guide)
- [ ] Verify AWS CLI configured: `aws sts get-caller-identity`
- [ ] Verify repository pushed to GitHub
- [ ] Read `infra/DEPLOY_WITH_CLOUDFORMATION.md` (deployment guide)
- [ ] Prepare PowerShell terminal
- [ ] Ready to deploy!

---

## Expected Timeline

| Step | Time |
|------|------|
| GitHub token creation | 2 min |
| AWS CLI verification | 1 min |
| Environment variables setup | 1 min |
| Template validation | 1 min |
| Stack creation | 1 min |
| Stack building (monitoring) | 3-5 min |
| Output retrieval | 1 min |
| **Total** | **~15 min** |

---

## Success Indicators

✅ Stack shows `CREATE_COMPLETE`  
✅ Outputs include valid DeploymentUrl  
✅ URL in format: `https://main.d1234567890abc.amplifyapp.com`  
✅ Visiting URL shows your Next.js app  
✅ RTL layout working (sidebar on right)  
✅ Design demo page visible  
✅ No console errors  

---

## Support

**Questions?**
1. Check `infra/README.md` for general info
2. Check `infra/DEPLOY_WITH_CLOUDFORMATION.md` for deployment steps
3. Check AWS documentation links above
4. Check AWS Amplify Console for build logs

---

## What's Next

After successful deployment:

1. ✅ **Verify app loads**
2. ⏳ **Add custom domain** (optional)
3. ⏳ **Phase 2**: Add UI components (if not done)
4. ⏳ **Phase 3**: Add AWS Cognito authentication
5. ⏳ **Phase 4**: Add database and APIs
6. ⏳ **Multiple environments**: Use staging parameter

---

**Status**: ✅ **IaC SETUP COMPLETE**

**Next Step**: Follow `infra/DEPLOY_WITH_CLOUDFORMATION.md` to deploy

