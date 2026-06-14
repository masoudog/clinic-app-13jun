# Deploy with CloudFormation

**Status**: Ready for deployment  
**IaC Framework**: AWS CloudFormation (YAML)  
**Template Location**: `infra/amplify-hosting.yml`  
**Deployment Method**: AWS CLI + PowerShell

---

## Prerequisites

1. **AWS Account** with billing enabled
2. **AWS CLI** installed and configured
3. **PowerShell** (Windows Terminal, PowerShell 7+, or Windows PowerShell)
4. **GitHub Personal Access Token** (create below)
5. **Git** repository pushed to GitHub

---

## Step 1: Create GitHub Personal Access Token

**Why**: CloudFormation needs permission to access your GitHub repository.

### In GitHub:

1. Go to: https://github.com/settings/tokens
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. Fill in:
   - **Token name**: `clinic-app-amplify` (or similar)
   - **Expiration**: 90 days (or never)
   - **Scopes** (checkboxes):
     - ✓ `repo` (full control)
     - ✓ `admin:repo_hook` (admin access to hooks)
4. Click: **"Generate token"**
5. **Copy the token** (shows once!)
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

**⚠️ Important**: 
- Save this token somewhere safe
- Don't commit it to Git
- You'll use it in the next step

---

## Step 2: Verify AWS CLI Configuration

**Check AWS CLI is installed and configured:**

```powershell
# Check AWS CLI version
aws --version

# Check AWS credentials are configured
aws sts get-caller-identity
```

**Expected output**:
```
{
    "UserId": "AIDAI...",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:root"
}
```

**If not configured**, run:
```powershell
aws configure
```

Follow prompts:
- AWS Access Key ID: (from AWS console)
- AWS Secret Access Key: (from AWS console)
- Default region: `us-east-1`
- Default output format: `json`

---

## Step 3: Set Environment Variables (PowerShell)

**Store parameters as variables:**

```powershell
# Set your parameters
$appName = "clinic-app-13jun"
$repositoryUrl = "https://github.com/masoudog/clinic-app-13jun"
$branchName = "main"
$githubToken = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  # From Step 1
$environment = "dev"
$stackName = "clinic-app-amplify-stack"
$region = "us-east-1"
$templatePath = "infra/amplify-hosting.yml"
```

**⚠️ Important**:
- Replace `ghp_xxx...` with your actual token
- Keep the `$` prefix (PowerShell variable syntax)
- Don't commit these values to Git

---

## Step 4: Validate CloudFormation Template

**Check template for syntax errors:**

```powershell
aws cloudformation validate-template `
  --template-body file://$templatePath `
  --region $region
```

**Expected output**:
```json
{
    "Description": "AWS Amplify Hosting deployment...",
    "Parameters": [...],
    "Capabilities": ["CAPABILITY_NAMED_IAM"]
}
```

**If error**, fix the YAML syntax and retry.

---

## Step 5: Create CloudFormation Stack

**Deploy the infrastructure:**

```powershell
aws cloudformation create-stack `
  --stack-name $stackName `
  --template-body file://$templatePath `
  --parameters `
    ParameterKey=AppName,ParameterValue=$appName `
    ParameterKey=RepositoryUrl,ParameterValue=$repositoryUrl `
    ParameterKey=BranchName,ParameterValue=$branchName `
    ParameterKey=GitHubAccessToken,ParameterValue=$githubToken `
    ParameterKey=EnvironmentName,ParameterValue=$environment `
  --capabilities CAPABILITY_NAMED_IAM `
  --region $region
```

**Expected output**:
```json
{
    "StackId": "arn:aws:cloudformation:us-east-1:123456789012:stack/clinic-app-amplify-stack/..."
}
```

**Save the StackId** (shows when creating).

---

## Step 6: Monitor Stack Creation

**Watch the stack creation progress:**

```powershell
# Monitor in real-time (Ctrl+C to stop)
while ($true) {
    $status = aws cloudformation describe-stacks `
      --stack-name $stackName `
      --query 'Stacks[0].StackStatus' `
      --output text `
      --region $region
    
    Write-Host "Stack Status: $status"
    
    if ($status -match "COMPLETE" -or $status -match "FAILED") {
        break
    }
    
    Start-Sleep -Seconds 10
}
```

**Possible statuses**:
- `CREATE_IN_PROGRESS` — Creating resources
- `CREATE_COMPLETE` — Success ✅
- `CREATE_FAILED` — Error (see events for details)
- `ROLLBACK_IN_PROGRESS` — Rolling back after failure

---

## Step 7: Check for Errors

**If stack creation fails:**

```powershell
# See detailed events
aws cloudformation describe-stack-events `
  --stack-name $stackName `
  --query 'StackEvents[].{Time:Timestamp,Status:ResourceStatus,Reason:ResourceStatusReason}' `
  --output table `
  --region $region
```

**Common errors**:
- **Invalid token**: GitHub token invalid or expired
- **Repository not found**: URL incorrect or token doesn't have access
- **Role error**: AWS account lacks permissions

---

## Step 8: Get CloudFormation Outputs

**Retrieve deployment information:**

```powershell
# Get all outputs
aws cloudformation describe-stacks `
  --stack-name $stackName `
  --query 'Stacks[0].Outputs' `
  --output table `
  --region $region
```

**Expected outputs**:
```
OutputKey          OutputValue
─────────────────  ────────────────────────────────────────
AmplifyAppId       d1234567890abc
DefaultDomain      d1234567890abc.amplifyapp.com
BranchUrl          https://main.d1234567890abc.amplifyapp.com
DeploymentUrl      https://main.d1234567890abc.amplifyapp.com
RepositoryUrl      https://github.com/masoudog/clinic-app-13jun
Environment        dev
BranchName         main
```

**Copy the DeploymentUrl** — that's your live app!

---

## Step 9: Access Your Live App

**Visit the deployment URL:**

```powershell
# Option 1: Display URL
$outputs = aws cloudformation describe-stacks `
  --stack-name $stackName `
  --query 'Stacks[0].Outputs[?OutputKey==`DeploymentUrl`].OutputValue' `
  --output text `
  --region $region

Write-Host "Your app is live at: $outputs"

# Option 2: Open in browser (Windows)
Start-Process $outputs
```

**Verify**:
- ✓ Page loads (may take 1-2 min for first build)
- ✓ Sidebar on RIGHT (RTL layout)
- ✓ Persian text (فارسی)
- ✓ Design demo page shows
- ✓ No console errors (F12)

---

## Step 10: Monitor Amplify Deployment

**Check the actual build/deployment status:**

```powershell
# Get Amplify App ID
$appId = aws cloudformation describe-stacks `
  --stack-name $stackName `
  --query 'Stacks[0].Outputs[?OutputKey==`AmplifyAppId`].OutputValue' `
  --output text `
  --region $region

# Monitor branch deployment
aws amplify list-jobs `
  --app-id $appId `
  --branch-name $branchName `
  --query 'jobSummaries[0].{Status:status,CreatedAt:createTime,Url:jobArn}' `
  --output table `
  --region $region
```

**Or** visit AWS Amplify Console:
- https://console.aws.amazon.com/amplify/
- Select your app from the list
- Watch build progress in real-time

---

## Complete Deployment Script (Copy & Paste)

**Save as `deploy.ps1` and run:**

```powershell
# CloudFormation Deployment Script for Clinic App

# ============= CONFIGURATION =============
$appName = "clinic-app-13jun"
$repositoryUrl = "https://github.com/masoudog/clinic-app-13jun"
$branchName = "main"
$githubToken = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  # TODO: Replace with your token
$environment = "dev"
$stackName = "clinic-app-amplify-stack"
$region = "us-east-1"
$templatePath = "infra/amplify-hosting.yml"

# ============= VALIDATION =============
Write-Host "Validating CloudFormation template..." -ForegroundColor Cyan

$validation = aws cloudformation validate-template `
  --template-body file://$templatePath `
  --region $region

if ($LASTEXITCODE -ne 0) {
    Write-Host "Template validation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Template valid" -ForegroundColor Green

# ============= DEPLOYMENT =============
Write-Host "`nCreating CloudFormation stack..." -ForegroundColor Cyan

$stackId = aws cloudformation create-stack `
  --stack-name $stackName `
  --template-body file://$templatePath `
  --parameters `
    ParameterKey=AppName,ParameterValue=$appName `
    ParameterKey=RepositoryUrl,ParameterValue=$repositoryUrl `
    ParameterKey=BranchName,ParameterValue=$branchName `
    ParameterKey=GitHubAccessToken,ParameterValue=$githubToken `
    ParameterKey=EnvironmentName,ParameterValue=$environment `
  --capabilities CAPABILITY_NAMED_IAM `
  --region $region `
  --query 'StackId' `
  --output text

Write-Host "✓ Stack creation started" -ForegroundColor Green
Write-Host "Stack ID: $stackId`n" -ForegroundColor Yellow

# ============= MONITORING =============
Write-Host "Monitoring stack creation (press Ctrl+C to cancel)..." -ForegroundColor Cyan

$maxAttempts = 120  # 20 minutes with 10-second intervals
$attempt = 0

while ($attempt -lt $maxAttempts) {
    $status = aws cloudformation describe-stacks `
      --stack-name $stackName `
      --query 'Stacks[0].StackStatus' `
      --output text `
      --region $region
    
    Write-Host "[$((Get-Date).ToString('HH:mm:ss'))] Status: $status"
    
    if ($status -eq "CREATE_COMPLETE") {
        Write-Host "`n✓ Stack creation complete!" -ForegroundColor Green
        break
    }
    elseif ($status -match "CREATE_FAILED|ROLLBACK_COMPLETE") {
        Write-Host "`n✗ Stack creation failed!" -ForegroundColor Red
        Write-Host "`nStack events:" -ForegroundColor Yellow
        aws cloudformation describe-stack-events `
          --stack-name $stackName `
          --query 'StackEvents[?ResourceStatus==`CREATE_FAILED`]' `
          --output table `
          --region $region
        exit 1
    }
    
    Start-Sleep -Seconds 10
    $attempt++
}

if ($attempt -eq $maxAttempts) {
    Write-Host "`n⚠ Timeout: Stack creation is taking longer than expected" -ForegroundColor Yellow
    Write-Host "Check AWS Amplify Console for status: https://console.aws.amazon.com/amplify/"
}

# ============= OUTPUTS =============
Write-Host "`nRetrieving deployment outputs..." -ForegroundColor Cyan

$outputs = aws cloudformation describe-stacks `
  --stack-name $stackName `
  --query 'Stacks[0].Outputs' `
  --output table `
  --region $region

Write-Host $outputs

# ============= SUMMARY =============
$deploymentUrl = aws cloudformation describe-stacks `
  --stack-name $stackName `
  --query 'Stacks[0].Outputs[?OutputKey==`DeploymentUrl`].OutputValue' `
  --output text `
  --region $region

Write-Host "`n" -ForegroundColor Green
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║         DEPLOYMENT COMPLETE! 🎉                        ║" -ForegroundColor Green
Write-Host "╠════════════════════════════════════════════════════════╣" -ForegroundColor Green
Write-Host "║ Your app is live at:                                   ║" -ForegroundColor Green
Write-Host "║ $deploymentUrl" -ForegroundColor Yellow
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host "`nWhat's next?" -ForegroundColor Cyan
Write-Host "1. Visit the URL above to verify your app loads"
Write-Host "2. Check AWS Amplify Console: https://console.aws.amazon.com/amplify/"
Write-Host "3. For custom domain, use Amplify Console → Domain Management"
```

**Usage**:
```powershell
# Make it executable
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Run the script
.\deploy.ps1
```

---

## Individual Commands for Manual Deployment

**If you prefer to run commands manually:**

### 1. Validate Template
```powershell
aws cloudformation validate-template `
  --template-body file://infra/amplify-hosting.yml `
  --region us-east-1
```

### 2. Create Stack
```powershell
aws cloudformation create-stack `
  --stack-name clinic-app-amplify-stack `
  --template-body file://infra/amplify-hosting.yml `
  --parameters `
    ParameterKey=AppName,ParameterValue=clinic-app-13jun `
    ParameterKey=RepositoryUrl,ParameterValue=https://github.com/masoudog/clinic-app-13jun `
    ParameterKey=BranchName,ParameterValue=main `
    ParameterKey=GitHubAccessToken,ParameterValue=ghp_xxxxxx `
    ParameterKey=EnvironmentName,ParameterValue=dev `
  --capabilities CAPABILITY_NAMED_IAM `
  --region us-east-1
```

### 3. Check Stack Status
```powershell
aws cloudformation describe-stacks `
  --stack-name clinic-app-amplify-stack `
  --query 'Stacks[0].StackStatus' `
  --output text `
  --region us-east-1
```

### 4. Get Outputs
```powershell
aws cloudformation describe-stacks `
  --stack-name clinic-app-amplify-stack `
  --query 'Stacks[0].Outputs' `
  --output table `
  --region us-east-1
```

### 5. Delete Stack (if needed)
```powershell
aws cloudformation delete-stack `
  --stack-name clinic-app-amplify-stack `
  --region us-east-1
```

---

## Troubleshooting

### Stack Creation Fails

**Check events**:
```powershell
aws cloudformation describe-stack-events `
  --stack-name clinic-app-amplify-stack `
  --output table `
  --region us-east-1
```

**Common issues**:
- **InvalidToken**: GitHub token invalid → regenerate at https://github.com/settings/tokens
- **RepositoryNotFound**: Wrong URL or token lacks access → verify repository URL
- **AccessDenied**: AWS account lacks IAM permissions → check AWS user/role

### App Shows Blank Page After Deploy

1. Wait 2-5 minutes (first build takes time)
2. Refresh browser (Ctrl+R or Cmd+R)
3. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. Check browser console (F12) for errors

### Build Fails in Amplify

Visit AWS Amplify Console:
1. https://console.aws.amazon.com/amplify/
2. Select your app
3. Click "Deployments" tab
4. Click failed deployment to see logs

---

## Stack Management

### Update Stack (Change Parameters)

```powershell
aws cloudformation update-stack `
  --stack-name clinic-app-amplify-stack `
  --template-body file://infra/amplify-hosting.yml `
  --parameters `
    ParameterKey=AppName,ParameterValue=clinic-app-13jun `
    ParameterKey=RepositoryUrl,UsePreviousValue=true `
    ParameterKey=BranchName,UsePreviousValue=true `
    ParameterKey=GitHubAccessToken,UsePreviousValue=true `
    ParameterKey=EnvironmentName,ParameterValue=prod `
  --capabilities CAPABILITY_NAMED_IAM `
  --region us-east-1
```

### Delete Stack

```powershell
aws cloudformation delete-stack `
  --stack-name clinic-app-amplify-stack `
  --region us-east-1

# Monitor deletion
aws cloudformation wait stack-delete-complete `
  --stack-name clinic-app-amplify-stack `
  --region us-east-1

Write-Host "Stack deleted successfully"
```

---

## CloudFormation Outputs Reference

| Output | Purpose |
|--------|---------|
| `AmplifyAppId` | Your Amplify app ID (save for reference) |
| `DefaultDomain` | Amplify's default domain (e.g., d123.amplifyapp.com) |
| `BranchUrl` | URL for your deployed branch |
| `DeploymentUrl` | Full URL to access your live app |
| `RepositoryUrl` | Your GitHub repository URL |
| `Environment` | Deployment environment (dev/staging/prod) |
| `BranchName` | Deployed Git branch name |

---

## What CloudFormation Creates

✅ **AWS::Amplify::App** — Amplify application  
✅ **AWS::Amplify::Branch** — Branch (main)  
✅ **AWS::IAM::Role** — Service role for Amplify  
✅ **AWS::CloudWatch::Alarm** — Build failure notifications (optional)

---

## What NOT Created (As Requested)

✅ No AWS Cognito  
✅ No RDS/DynamoDB database  
✅ No Lambda functions  
✅ No API Gateway  
✅ No credentials stored in template  

---

## Next Steps

After successful deployment:

1. ✅ **Verify app loads** — Visit DeploymentUrl
2. ⏳ **Add custom domain** — Amplify Console → Domain Management
3. ⏳ **Phase 2**: Add UI components (if not done)
4. ⏳ **Phase 3**: Add AWS Cognito authentication
5. ⏳ **Phase 4**: Add database and APIs

---

## Additional Resources

- **CloudFormation User Guide**: https://docs.aws.amazon.com/cloudformation/
- **Amplify Console**: https://console.aws.amazon.com/amplify/
- **AWS CLI Documentation**: https://docs.aws.amazon.com/cli/
- **GitHub Personal Tokens**: https://github.com/settings/tokens

---

**Ready to deploy?** 

Ensure you have:
- ✅ GitHub Personal Access Token (Step 1)
- ✅ AWS CLI configured (Step 2)
- ✅ PowerShell ready

Then proceed with Step 3 (Set Environment Variables) and beyond!

