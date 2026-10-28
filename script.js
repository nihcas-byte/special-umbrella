/**
 * ==========================================================================
 * ENTERPRISE DEVOPS & CLOUD ARCHITECT PORTFOLIO - CORE ENGINE
 * Interactive Terminal Simulator, Theme Engine, Filtering & Animations
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
    'Senior DevOps & Cloud Architect',
    'Platform & Reliability Engineer (SRE)',
    'Kubernetes & GitOps Specialist',
    'Infrastructure as Code (Terraform) Lead',
    'Enterprise DevSecOps Practitioner'
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
  runStatsCounter(); // Check initial position

  /* --------------------------------------------------------------------------
     6. INTERACTIVE CI/CD & TERRAFORM TERMINAL SIMULATOR
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
    appendTerminalLine('<span class="bold cyan">▶ TRIGGER:</span> Production CI/CD Pipeline invoked by commit [main@4f8b92a]', 'bold');
    appendTerminalLine('Runner: <span class="purple">enterprise-runner-aks-cluster-01</span> • Architecture: linux/amd64', 'dim');
    appendTerminalLine('Environment: <span class="cyan">Production Multi-Region (AWS & Azure)</span>', 'dim');
    appendTerminalLine('------------------------------------------------------------------------', 'dim');
    await delay(600);

    // STAGE 1: Lint & Static Code Analysis
    if (stages[0]) stages[0].classList.add('active');
    appendTerminalLine('<span class="yellow">⚡ [STAGE 1/6] Code Quality & Static Analysis</span>');
    await delay(400);
    appendTerminalLine('$ hadolint ./Dockerfile --ignore DL3008', 'dim');
    appendTerminalLine('✓ Dockerfile validated: 0 syntax issues', 'green');
    appendTerminalLine('$ tflint --recursive --minimum-failure-severity=error', 'dim');
    appendTerminalLine('✓ Terraform linting passed (84 modules verified)', 'green');
    appendTerminalLine('$ sonar-scanner -Dsonar.projectKey=enterprise-platform', 'dim');
    appendTerminalLine('✓ SonarQube Quality Gate: PASSED (Bugs: 0, Security Hotspots: 0, Coverage: 88.4%)', 'green');
    if (stages[0]) {
      stages[0].classList.remove('active');
      stages[0].classList.add('completed');
    }
    await delay(700);

    // STAGE 2: Security & DevSecOps Secret Scan
    if (stages[1]) stages[1].classList.add('active');
    appendTerminalLine('');
    appendTerminalLine('<span class="yellow">🔒 [STAGE 2/6] DevSecOps Secret & Vulnerability Scan</span>');
    await delay(400);
    appendTerminalLine('$ trufflehog git file://. --since-commit HEAD~1', 'dim');
    appendTerminalLine('✓ TruffleHog: 0 private keys or leaked credentials detected', 'green');
    appendTerminalLine('$ tfsec ./terraform --concise-output', 'dim');
    appendTerminalLine('✓ tfsec IaC Static Scanner: 0 High/Critical misconfigurations', 'green');
    if (stages[1]) {
      stages[1].classList.remove('active');
      stages[1].classList.add('completed');
    }
    await delay(700);

    // STAGE 3: Terraform Enterprise IaC
    if (stages[2]) stages[2].classList.add('active');
    appendTerminalLine('');
    appendTerminalLine('<span class="yellow">☁ [STAGE 3/6] Infrastructure as Code (Terraform Enterprise)</span>');
    await delay(400);
    appendTerminalLine('$ terraform init -backend-config="key=prod/infra.tfstate"', 'dim');
    appendTerminalLine('Acquiring state lock on AWS DynamoDB / Azure Blob Storage... OK', 'dim');
    appendTerminalLine('Terraform initialized with 14 providers.', 'dim');
    appendTerminalLine('$ terraform plan -out=tfplan -detailed-exitcode', 'dim');
    appendTerminalLine('Plan: <span class="cyan">4 to add, 2 to change, 0 to destroy.</span> (Zero unwanted drift detected)', 'green');
    if (stages[2]) {
      stages[2].classList.remove('active');
      stages[2].classList.add('completed');
    }
    await delay(800);

    // STAGE 4: Policy as Code (OPA & Checkov)
    if (stages[3]) stages[3].classList.add('active');
    appendTerminalLine('');
    appendTerminalLine('<span class="yellow">🛡 [STAGE 4/6] Policy as Code & Enterprise Compliance</span>');
    await delay(400);
    appendTerminalLine('$ checkov -f tfplan --framework terraform_plan', 'dim');
    appendTerminalLine('✓ CIS Benchmark (AWS/Azure v2.0): 100% Passed (142 checks)', 'green');
    appendTerminalLine('$ opa eval --data ./policies/ingress-tls.rego --input tfplan', 'dim');
    appendTerminalLine('✓ Mandatory TLS 1.3 & Encrypted Volumes: ENFORCED', 'green');
    if (stages[3]) {
      stages[3].classList.remove('active');
      stages[3].classList.add('completed');
    }
    await delay(700);

    // STAGE 5: Container Build & Cryptographic Signing
    if (stages[4]) stages[4].classList.add('active');
    appendTerminalLine('');
    appendTerminalLine('<span class="yellow">📦 [STAGE 5/6] Multi-Arch Image Build & Cosign Attestation</span>');
    await delay(400);
    appendTerminalLine('$ docker buildx build --platform linux/amd64,linux/arm64 -t registry/app:v2.14.0 .', 'dim');
    appendTerminalLine('✓ Image digest: sha256:7b5d1e43a992bc9f... built in 18.4s', 'dim');
    appendTerminalLine('$ trivy image --severity HIGH,CRITICAL registry/app:v2.14.0', 'dim');
    appendTerminalLine('✓ Trivy Vulnerability Scan: 0 Critical, 0 High CVEs', 'green');
    appendTerminalLine('$ cosign sign --key k8s://kms/prod-cosign-key registry/app:v2.14.0', 'dim');
    appendTerminalLine('✓ Supply-Chain Security: Signature & SBOM successfully published', 'green');
    if (stages[4]) {
      stages[4].classList.remove('active');
      stages[4].classList.add('completed');
    }
    await delay(800);

    // STAGE 6: GitOps ArgoCD Sync & Kubernetes Rollout
    if (stages[5]) stages[5].classList.add('active');
    appendTerminalLine('');
    appendTerminalLine('<span class="yellow">🚀 [STAGE 6/6] GitOps Sync & Canary Rollout (ArgoCD & EKS/AKS)</span>');
    await delay(400);
    appendTerminalLine('$ git commit -am "chore(gitops): update image tag v2.14.0" && git push origin main', 'dim');
    appendTerminalLine('$ argocd app sync enterprise-banking-core --prune', 'dim');
    appendTerminalLine('ArgoCD Controller: Fetching desired Git manifest revision [v2.14.0]...', 'cyan');
    appendTerminalLine('Applying progressive canary traffic shift: [10% -> 25% -> 50% -> 100%]', 'dim');
    appendTerminalLine('$ kubectl rollout status deployment/core-service -n production --timeout=90s', 'dim');
    appendTerminalLine('✓ deployment "core-service" successfully rolled out with ZERO downtime.', 'green');
    appendTerminalLine('========================================================================', 'dim');
    appendTerminalLine('<span class="bold green">✔ PIPELINE EXECUTION SUCCESSFUL: All 6 stages completed in 42.1s</span>', 'bold');
    appendTerminalLine('<span class="dim">Telemetry sent to Prometheus / Datadog. PagerDuty status: HEALTHY (99.99% SLA).</span>', 'dim');

    if (stages[5]) {
      stages[5].classList.remove('active');
      stages[5].classList.add('completed');
    }

    if (btnRunPipeline) btnRunPipeline.disabled = false;
    isPipelineRunning = false;
    showToast('CI/CD Pipeline Completed Successfully (Zero Downtime)');
  }

  // DRIFT SIMULATION
  async function simulateDrift() {
    if (isPipelineRunning) return;
    isPipelineRunning = true;
    resetStages();
    terminalConsole.innerHTML = '';

    appendTerminalLine('<span class="yellow bold">⚠ SIMULATION: Scheduled Infrastructure Drift Detection Triggered</span>');
    appendTerminalLine('Checking live cloud state vs Terraform remote backend...', 'dim');
    await delay(600);

    appendTerminalLine('$ terraform plan -detailed-exitcode -refresh-only', 'dim');
    await delay(800);

    appendTerminalLine('<span class="red">✘ DRIFT DETECTED: Live state differs from Git-committed IaC!</span>', 'bold');
    appendTerminalLine('  ~ module.security_groups.aws_security_group_rule.ingress_443', 'yellow');
    appendTerminalLine('    - Ingress CIDR manually modified in AWS Console from 10.0.0.0/16 to 0.0.0.0/0', 'red');
    appendTerminalLine('  ~ module.aks_cluster.kubernetes_cluster.node_pool', 'yellow');
    appendTerminalLine('    - Max pods auto-scale setting altered out-of-band', 'yellow');
    await delay(600);

    appendTerminalLine('<span class="cyan">⚡ AUTO-REMEDIATION (Zero Drift Enforcement Policy):</span>');
    appendTerminalLine('$ terraform apply -auto-approve tfplan-remediate', 'dim');
    await delay(700);

    appendTerminalLine('✓ Overwrote manual AWS console modifications.', 'green');
    appendTerminalLine('✓ Security group restored to strictly governed CIDR 10.0.0.0/16.', 'green');
    appendTerminalLine('✓ Drift Alert sent to Slack #cloud-secops with CloudTrail audit log.', 'green');
    appendTerminalLine('<span class="bold green">✔ Drift auto-corrected! Production environment remains 100% compliant.</span>', 'bold');

    isPipelineRunning = false;
    showToast('Drift simulation completed: Auto-remediated');
  }

  // CVE DETECTION SIMULATION
  async function simulateCVE() {
    if (isPipelineRunning) return;
    isPipelineRunning = true;
    resetStages();
    terminalConsole.innerHTML = '';

    appendTerminalLine('<span class="yellow bold">🛡 SIMULATION: DevSecOps Shift-Left Security Gate Check</span>');
    appendTerminalLine('Scanning incoming developer PR [#142] for vulnerabilities...', 'dim');
    await delay(500);

    if (stages[0]) stages[0].classList.add('completed');
    if (stages[1]) stages[1].classList.add('active');

    appendTerminalLine('$ trivy fs --security-checks vuln,config,secret .', 'dim');
    await delay(700);

    appendTerminalLine('<span class="red bold">✘ HIGH SEVERITY CVE IDENTIFIED: CVE-2024-3094 (xz-utils)</span>');
    appendTerminalLine('  Package: liblzma5: 5.6.0-0.2', 'red');
    appendTerminalLine('  Remediation: Upgrade package to >= 5.6.1 in base Docker image', 'yellow');
    appendTerminalLine('  Policy Violation: Enterprise DevSecOps blocks merge of HIGH/CRITICAL CVEs', 'red');
    await delay(600);

    if (stages[1]) {
      stages[1].classList.remove('active');
      stages[1].classList.add('failed');
    }

    appendTerminalLine('<span class="red bold">✘ PULL REQUEST MERGE REJECTED: Security gate failed.</span>');
    appendTerminalLine('✓ Automated PR comment generated with upgrade instructions & dependency tree.', 'dim');
    appendTerminalLine('✓ Production remained protected from supply-chain threat.', 'green');

    isPipelineRunning = false;
    showToast('Security gate simulation: Blocked vulnerable build');
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

      // Compose mailto
      const recipient = 'devops.consultant.lead@example.com';
      const subject = encodeURIComponent(`DevOps & Cloud Inquiry from ${name}`);
      const body = encodeURIComponent(`Hello,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`);

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
