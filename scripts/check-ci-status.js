#!/usr/bin/env node

/**
 * CI/CD Status Checker
 * 
 * This script checks the status of CI/CD workflows and provides
 * feedback on the current state of the project.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkLocalStatus() {
  log('\n🔍 Checking Local Project Status...', 'blue');
  
  // Check if package.json exists
  const rootPackage = path.join(process.cwd(), 'package.json');
  const backendPackage = path.join(process.cwd(), 'backend', 'package.json');
  const frontendPackage = path.join(process.cwd(), 'MindEaseFrontend', 'package.json');
  
  if (!fs.existsSync(rootPackage)) {
    log('❌ Root package.json not found', 'red');
    return false;
  }
  
  if (!fs.existsSync(backendPackage)) {
    log('❌ Backend package.json not found', 'red');
    return false;
  }
  
  if (!fs.existsSync(frontendPackage)) {
    log('❌ Frontend package.json not found', 'red');
    return false;
  }
  
  log('✅ All package.json files found', 'green');
  
  // Check for CI/CD workflows
  const workflowsDir = path.join(process.cwd(), '.github', 'workflows');
  if (fs.existsSync(workflowsDir)) {
    const workflows = fs.readdirSync(workflowsDir);
    log(`✅ Found ${workflows.length} CI/CD workflows:`, 'green');
    workflows.forEach(workflow => {
      log(`   - ${workflow}`, 'blue');
    });
  } else {
    log('⚠️  No CI/CD workflows found', 'yellow');
  }
  
  // Check for environment files
  const backendEnv = path.join(process.cwd(), 'backend', '.env');
  const frontendEnv = path.join(process.cwd(), 'MindEaseFrontend', '.env');
  
  if (fs.existsSync(backendEnv)) {
    log('✅ Backend environment file found', 'green');
  } else {
    log('⚠️  Backend environment file not found (run: cp backend/env.example backend/.env)', 'yellow');
  }
  
  if (fs.existsSync(frontendEnv)) {
    log('✅ Frontend environment file found', 'green');
  } else {
    log('⚠️  Frontend environment file not found (run: cp MindEaseFrontend/env.example MindEaseFrontend/.env)', 'yellow');
  }
  
  return true;
}

function checkGitHubStatus(owner, repo) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/actions/runs?per_page=5`,
      headers: {
        'User-Agent': 'MindEase-CI-Check'
      }
    };
    
    https.get(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const runs = JSON.parse(data);
          resolve(runs);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

function displayStatus(runs) {
  log('\n📊 Recent GitHub Actions Status:', 'blue');
  
  if (!runs.workflow_runs || runs.workflow_runs.length === 0) {
    log('❌ No recent workflow runs found', 'red');
    return;
  }
  
  runs.workflow_runs.forEach(run => {
    const status = run.conclusion || run.status;
    const statusColor = status === 'success' ? 'green' : 
                       status === 'failure' ? 'red' : 'yellow';
    const statusIcon = status === 'success' ? '✅' : 
                      status === 'failure' ? '❌' : '⏳';
    
    log(`${statusIcon} ${run.name} (${run.head_branch}) - ${status}`, statusColor);
    log(`   📅 ${new Date(run.created_at).toLocaleString()}`, 'blue');
    log(`   🔗 ${run.html_url}`, 'blue');
    log('');
  });
}

function showNextSteps() {
  log('\n🚀 Next Steps for CI/CD Setup:', 'blue');
  log('1. Push your code to GitHub', 'yellow');
  log('2. Enable GitHub Actions in repository settings', 'yellow');
  log('3. Set up environment secrets:', 'yellow');
  log('   - MONGODB_URI', 'blue');
  log('   - REDIS_URL', 'blue');
  log('   - JWT_SECRET', 'blue');
  log('   - STRIPE_SECRET_KEY', 'blue');
  log('4. Configure deployment environments (staging/production)', 'yellow');
  log('5. Set up monitoring and notifications', 'yellow');
  log('\n📖 See CI_CD_SETUP.md for detailed instructions', 'green');
}

async function main() {
  log('🤖 MindEase CI/CD Status Checker', 'bold');
  log('================================', 'blue');
  
  // Check local status
  const localStatus = checkLocalStatus();
  
  // Try to get GitHub status
  try {
    // Extract owner/repo from git remote or use defaults
    const gitConfig = path.join(process.cwd(), '.git', 'config');
    let owner = 'your-username';
    let repo = 'mindease-mental-health-app';
    
    if (fs.existsSync(gitConfig)) {
      const config = fs.readFileSync(gitConfig, 'utf8');
      const remoteMatch = config.match(/url = https:\/\/github\.com\/([^\/]+)\/([^\/\n]+)/);
      if (remoteMatch) {
        owner = remoteMatch[1];
        repo = remoteMatch[2].replace('.git', '');
      }
    }
    
    log(`\n🔗 Checking GitHub status for ${owner}/${repo}...`, 'blue');
    const runs = await checkGitHubStatus(owner, repo);
    displayStatus(runs);
  } catch (error) {
    log('⚠️  Could not fetch GitHub status (check your internet connection)', 'yellow');
    log(`   Error: ${error.message}`, 'red');
  }
  
  showNextSteps();
  
  log('\n✨ CI/CD Status Check Complete!', 'green');
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    log(`❌ Error: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { checkLocalStatus, checkGitHubStatus }; 