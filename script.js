/**
 * ==========================================================================
 * SACHIN TOMER - DEVOPS ENGINEER & CLOUD INFRASTRUCTURE SPECIALIST
 * Interactive Azure Pipeline Simulator, Theme Engine, Filtering & Animations
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. THEME SWITCHER (DARK / LIGHT MODE)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-sun';
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-moon';
      }
    }
    localStorage.setItem('portfolio_theme', theme);
  }

  // Initialize
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const newTheme = isLight ? 'dark' : 'light';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} theme`);
    });
  }

  /* --------------------------------------------------------------------------
     2. MOBILE MENU & NAVIGATION
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-bars';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. NAVBAR SCROLL EFFECT & SCROLLSPY
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    // Sticky glass navbar blur
    if (scrollPos > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scrollspy active highlight
    let currentSection = '';
    sections.forEach(section => {
      const top = section.offsetTop - 140;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     4. ANIMATED TYPEWRITER EFFECT
     -------------------------------------------------------------------------- */
  const typewriterElement = document.getElementById('typewriter-text');
  const roles = [
    'DevOps Engineer',
    'Terraform & Cloud Infrastructure Specialist',
    'Azure Cloud & Landing Zone Architect',
    'DevSecOps Consultant',
    'Azure OpenAI & RAG Solutions Explorer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeRole() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at completion
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(typeRole, typingSpeed);
  }

  setTimeout(typeRole, 600);

  /* --------------------------------------------------------------------------
     5. STATS NUMBER COUNTER (ON SCROLL)
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsTriggered = false;

  function runStatsCounter() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection || statsTriggered) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      statsTriggered = true;

      statNumbers.forEach(stat => {
        const rawText = stat.textContent.trim();
        const hasPlus = rawText.includes('+');
        const hasPercent = rawText.includes('%');
        const targetValue = parseFloat(rawText.replace(/[^0-9.]/g, ''));

        if (isNaN(targetValue)) return;

        let startValue = 0;
        const duration = 1600;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = targetValue / totalSteps;

        const counter = setInterval(() => {
          startValue += increment;
          if (startValue >= targetValue) {
            stat.textContent = targetValue + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
            clearInterval(counter);
          } else {
            const formatted = (targetValue % 1 === 0) ? Math.floor(startValue) : startValue.toFixed(1);
            stat.textContent = formatted + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
          }
        }, stepTime);
      });
    }
  }

  window.addEventListener('scroll', runStatsCounter);
  runStatsCounter();

  /* --------------------------------------------------------------------------
     6. INTERACTIVE AZURE CI/CD & TERRAFORM TERMINAL SIMULATOR
     -------------------------------------------------------------------------- */
  const terminalConsole = document.getElementById('terminal-console');
  const btnRunPipeline = document.getElementById('btn-run-pipeline');
  const btnSimulateDrift = document.getElementById('btn-simulate-drift');
  const btnSimulateCVE = document.getElementById('btn-simulate-cve');
  const btnClearTerminal = document.getElementById('btn-clear-terminal');

  const stages = [
    document.getElementById('stage-1'),
    document.getElementById('stage-2'),
    document.getElementById('stage-3'),
    document.getElementById('stage-4'),
    document.getElementById('stage-5'),
    document.getElementById('stage-6')
  ];

  let isPipelineRunning = false;

  function resetStages() {
    stages.forEach(st => {
      if (st) {
        st.classList.remove('active', 'completed', 'failed');
      }
    });
  }

  function appendTerminalLine(text, styleClass = '') {
    if (!terminalConsole) return;
    const line = document.createElement('div');
    line.className = `terminal-line ${styleClass}`;
    line.innerHTML = text;
    terminalConsole.appendChild(line);
    terminalConsole.scrollTop = terminalConsole.scrollHeight;
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function executeFullPipeline() {
    if (isPipelineRunning) return;
    isPipelineRunning = true;
    resetStages();
    if (btnRunPipeline) btnRunPipeline.disabled = true;

    terminalConsole.innerHTML = '';
    appendTerminalLine('<span class="bold cyan">▶ TRIGGER:</span> Azure DevOps YAML Pipeline invoked by commit [main@caf-v2.4]', 'bold');
    appendTerminalLine('Agent: <span class="purple">sify-managed-devops-pool-vmss-02</span> • OS: Ubuntu 22.04 LTS (x64)', 'dim');
    appendTerminalLine('Subscription: <span class="cyan">Enterprise Production Landing Zone (Azure CAF)</span>', 'dim');
    appendTerminalLine('------------------------------------------------------------------------', 'dim');
    await delay(600);

    // STAGE 1: Lint & YAML Validation
    if (stages[0]) stages[0].classList.add('active');
    appendTerminalLine('<span class="yellow">⚡ [STAGE 1/6] Azure DevOps YAML Linting & PowerShell Task Verification</span>');
    await delay(400);
    appendTerminalLine('$ az pipelines validate --pipeline-id 84 --path /azure-pipelines.yml', 'dim');
    appendTerminalLine('✓ Pipeline YAML syntax validated: 0 schema errors', 'green');
    appendTerminalLine('$ tflint --module --config=.tflint.hcl', 'dim');
    appendTerminalLine('✓ Terraform linting passed (reusable modules verified)', 'green');
    if (stages[0]) {
      stages[0].classList.remove('active');
      stages[0].classList.add('completed');
    }
    await delay(700);

    // STAGE 2: Security & Static Analysis (tfsec & Checkov)
    if (stages[1]) stages[1].classList.add('active');
    appendTerminalLine('');
    appendTerminalLine('<span class="yellow">🔒 [STAGE 2/6] DevSecOps Static Analysis (tfsec & Checkov)</span>');
    await delay(400);
    appendTerminalLine('$ tfsec ./terraform/modules/landing-zone --concise-output', 'dim');
    appendTerminalLine('✓ tfsec scanner: 0 critical misconfigurations found', 'green');
    appendTerminalLine('$ checkov -d ./terraform --framework terraform', 'dim');
    appendTerminalLine('✓ Checkov: CIS Microsoft Azure Benchmark v2.0 - 100% Passed (118 checks)', 'green');
    if (stages[1]) {
      stages[1].classList.remove('active');
      stages[1].classList.add('completed');
    }
    await delay(700);

    // STAGE 3: Secret Detection (TruffleHog)
    if (stages[2]) stages[2].classList.add('active');
    appendTerminalLine('');
    appendTerminalLine('<span class="yellow">🔑 [STAGE 3/6] Secret Detection & Azure Key Vault Attestation</span>');
    await delay(400);
    appendTerminalLine('$ trufflehog git file://. --since-commit HEAD~1 --fail', 'dim');
    appendTerminalLine('✓ TruffleHog: 0 private keys or leaked credentials detected', 'green');
    appendTerminalLine('$ az keyvault secret list --vault-name kv-sify-prod-01 --query "[].id" -o tsv', 'dim');
    appendTerminalLine('✓ Secrets & Managed Identities verified with least-privilege RBAC', 'green');
    if (stages[2]) {
      stages[2].classList.remove('active');
      stages[2].classList.add('completed');
    }
    await delay(700);

    // STAGE 4: Terraform Plan with Remote State Lock
    if (stages[3]) stages[3].classList.add('active');
    appendTerminalLine('');
    appendTerminalLine('<span class="yellow">☁ [STAGE 4/6] Terraform Plan with Azure Storage State Lock</span>');
    await delay(400);
    appendTerminalLine('$ terraform init -backend-config="storage_account_name=sifytfstate"', 'dim');
    appendTerminalLine('Acquiring state lease on Azure Blob Storage [container: tfstate, blob: prod.tfstate]... OK', 'dim');
    appendTerminalLine('$ terraform plan -out=tfplan -detailed-exitcode', 'dim');
    appendTerminalLine('Plan: <span class="cyan">6 to add, 1 to change, 0 to destroy.</span> (Hub-spoke network updates)', 'green');
    if (stages[3]) {
      stages[3].classList.remove('active');
      stages[3].classList.add('completed');
    }
    await delay(800);

    // STAGE 5: Azure Policy & Defender for Cloud Compliance
    if (stages[4]) stages[4].classList.add('active');
    appendTerminalLine('');
    appendTerminalLine('<span class="yellow">🛡 [STAGE 5/6] Azure Policy Initiatives & Defender for Cloud Evaluation</span>');
    await delay(400);
    appendTerminalLine('$ az policy state summarize --subscription "Enterprise-Prod"', 'dim');
    appendTerminalLine('✓ Allowed Regions Policy (East US, Central India): COMPLIANT', 'green');
    appendTerminalLine('✓ Mandatory Tags Policy (Owner, CostCenter, Environment): COMPLIANT', 'green');
    appendTerminalLine('✓ Customer-Managed Key (CMK) Encryption at Rest: ENFORCED', 'green');
    if (stages[4]) {
      stages[4].classList.remove('active');
      stages[4].classList.add('completed');
    }
    await delay(700);

    // STAGE 6: Cloud Adoption Framework (CAF) Landing Zone Deployment
    if (stages[5]) stages[5].classList.add('active');
    appendTerminalLine('');
    appendTerminalLine('<span class="yellow">🚀 [STAGE 6/6] Zero-Downtime Deployment & Observability Linkage</span>');
    await delay(400);
    appendTerminalLine('$ terraform apply -auto-approve tfplan', 'dim');
    appendTerminalLine('Applying Azure Firewall rules & Private Endpoints... OK (Done in 38s)', 'cyan');
    appendTerminalLine('Linking diagnostic logs to Azure Log Analytics Workspace & Prometheus...', 'dim');
    appendTerminalLine('========================================================================', 'dim');
    appendTerminalLine('<span class="bold green">✔ PIPELINE EXECUTION COMPLETED: Landing Zone updated with ZERO downtime.</span>', 'bold');
    appendTerminalLine('<span class="dim">Telemetry logged to Azure Monitor. Production SLA remains at 99.9%.</span>', 'dim');

    if (stages[5]) {
      stages[5].classList.remove('active');
      stages[5].classList.add('completed');
    }

    if (btnRunPipeline) btnRunPipeline.disabled = false;
    isPipelineRunning = false;
    showToast('Azure Pipeline Executed Successfully (Zero Downtime)');
  }

  // SIMULATE DRIFT
  async function simulateDrift() {
    if (isPipelineRunning) return;
    isPipelineRunning = true;
    resetStages();
    terminalConsole.innerHTML = '';

    appendTerminalLine('<span class="yellow bold">⚠ SIMULATION: Azure Scheduled Drift Detection Triggered</span>');
    appendTerminalLine('Comparing live Azure ARM resources against Terraform state...', 'dim');
    await delay(600);

    appendTerminalLine('$ terraform plan -detailed-exitcode -refresh-only', 'dim');
    await delay(800);

    appendTerminalLine('<span class="red">✘ DRIFT DETECTED: Azure Portal modification identified out-of-band!</span>', 'bold');
    appendTerminalLine('  ~ azurerm_network_security_rule.allow_ssh', 'yellow');
    appendTerminalLine('    - Ingress source address manually widened from 10.10.0.0/16 to 0.0.0.0/0 in Azure Portal', 'red');
    await delay(600);

    appendTerminalLine('<span class="cyan">⚡ AUTO-REMEDIATION (Policy-as-Code Enforcement):</span>');
    appendTerminalLine('$ terraform apply -auto-approve tfplan-remediate', 'dim');
    await delay(700);

    appendTerminalLine('✓ Out-of-band Azure Portal rule overwritten.', 'green');
    appendTerminalLine('✓ Network Security Group restored to strictly governed CIDR 10.10.0.0/16.', 'green');
    appendTerminalLine('✓ Drift security notification sent to Microsoft Sentinel & PagerDuty.', 'green');
    appendTerminalLine('<span class="bold green">✔ Zero-Drift policy enforced! Azure infrastructure remains compliant.</span>', 'bold');

    isPipelineRunning = false;
    showToast('Drift simulation completed: Auto-remediated');
  }

  // SIMULATE TFSEC MISCONFIGURATION BLOCKER
  async function simulateCVE() {
    if (isPipelineRunning) return;
    isPipelineRunning = true;
    resetStages();
    terminalConsole.innerHTML = '';

    appendTerminalLine('<span class="yellow bold">🛡 SIMULATION: DevSecOps Shift-Left Security Gate Check</span>');
    appendTerminalLine('Scanning incoming developer Pull Request [#58] for Azure security issues...', 'dim');
    await delay(500);

    if (stages[0]) stages[0].classList.add('completed');
    if (stages[1]) stages[1].classList.add('active');

    appendTerminalLine('$ tfsec ./terraform --concise-output', 'dim');
    await delay(700);

    appendTerminalLine('<span class="red bold">✘ CRITICAL VIOLATION: AVD-AZU-0009 (Storage Account Public Access Allowed)</span>');
    appendTerminalLine('  Resource: azurerm_storage_account.customer_data_store', 'red');
    appendTerminalLine('  Issue: allow_nested_items_to_be_public is set to true', 'red');
    appendTerminalLine('  Remediation: Set allow_nested_items_to_be_public = false and enforce private endpoint', 'yellow');
    await delay(600);

    if (stages[1]) {
      stages[1].classList.remove('active');
      stages[1].classList.add('failed');
    }

    appendTerminalLine('<span class="red bold">✘ PULL REQUEST MERGE BLOCKED: DevSecOps gate rejected release.</span>');
    appendTerminalLine('✓ Automated comment posted to Azure DevOps PR with remediation snippet.', 'dim');
    appendTerminalLine('✓ Production data lake remains protected from public exposure.', 'green');

    isPipelineRunning = false;
    showToast('DevSecOps gate simulation: Blocked unencrypted resource');
  }

  if (btnRunPipeline) {
    btnRunPipeline.addEventListener('click', executeFullPipeline);
  }

  if (btnSimulateDrift) {
    btnSimulateDrift.addEventListener('click', simulateDrift);
  }

  if (btnSimulateCVE) {
    btnSimulateCVE.addEventListener('click', simulateCVE);
  }

  if (btnClearTerminal) {
    btnClearTerminal.addEventListener('click', () => {
      if (terminalConsole) {
        terminalConsole.innerHTML = '<div class="terminal-line dim">Terminal console cleared. Ready for next pipeline trigger.</div>';
      }
      resetStages();
    });
  }

  /* --------------------------------------------------------------------------
     7. SKILL CATEGORY & PROJECT FILTER TABS
     -------------------------------------------------------------------------- */
  function setupFilter(tabSelector, itemSelector, dataAttr) {
    const tabs = document.querySelectorAll(tabSelector);
    const items = document.querySelectorAll(itemSelector);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');

        items.forEach(item => {
          const category = item.getAttribute(dataAttr);
          if (filterValue === 'all' || category.includes(filterValue)) {
            item.style.display = 'flex';
            item.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  setupFilter('.skill-filter-tab', '.skill-category-card', 'data-category');
  setupFilter('.project-filter-tab', '.project-card', 'data-category');

  /* --------------------------------------------------------------------------
     8. CLIPBOARD COPY UTILITY & FLOATING TOAST
     -------------------------------------------------------------------------- */
  window.copyToClipboard = function (text, label) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${label} to clipboard!`);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${label} to clipboard!`);
    } catch (err) {
      showToast(`Failed to copy ${label}`);
    }
    document.body.removeChild(tempInput);
  }

  window.showToast = function (message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  };

  /* --------------------------------------------------------------------------
     9. CONTACT FORM INTERACTIVITY
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value || '';
      const email = document.getElementById('contact-email')?.value || '';
      const message = document.getElementById('contact-message')?.value || '';

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Email...';
      }

      // Compose mailto to Sachin Tomer
      const recipient = 'itsachintomer@gmail.com';
      const subject = encodeURIComponent(`Azure DevOps & Cloud Infrastructure Inquiry from ${name}`);
      const body = encodeURIComponent(`Hello Sachin,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`);

      setTimeout(() => {
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
        showToast('Email client opened! Thank you for reaching out.');
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 600);
    });
  }

});
