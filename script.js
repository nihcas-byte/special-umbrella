/* ==========================================================================
   script.js — Sachin Tomer DevOps Portfolio
   Interactive Pipeline Terminal, Typewriter, Theme Switcher & Form Handling
   ========================================================================== */

(function () {
  'use strict';

  /* ── 1. Theme Toggle ─────────────────────────────── */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('sachin_portfolio_theme') || 'dark';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
      themeBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
    }
    localStorage.setItem('sachin_portfolio_theme', theme);
  }

  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── 2. Scroll Progress & Active Nav Link ────────── */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progress-bar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (scrolled / total) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = pct + '%';
    }

    if (navbar) {
      navbar.classList.toggle('scrolled', scrolled > 30);
    }

    // Scrollspy
    let currentId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (scrolled >= top) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }, { passive: true });

  /* ── 3. Mobile Navigation Menu ───────────────────── */
  const burger = document.getElementById('nav-burger');
  const navLinksList = document.getElementById('nav-links');

  if (burger && navLinksList) {
    burger.addEventListener('click', () => {
      navLinksList.classList.toggle('open');
    });

    navLinksList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
      });
    });
  }

  /* ── 4. Fixed Typewriter Effect ─────────────────── */
  const typewriterSpan = document.getElementById('typewriter');
  const phrases = [
    'DevOps Engineer',
    'Terraform Specialist',
    'Azure Cloud Architect',
    'DevSecOps Practitioner',
    'Cloud Automation Engineer'
  ];

  if (typewriterSpan) {
    let pIdx = 0;
    let cIdx = 0;
    let isDeleting = false;
    const typeSpeed = 75;
    const deleteSpeed = 35;
    const pauseTime = 1800;

    function runTypewriter() {
      const currentPhrase = phrases[pIdx];

      if (isDeleting) {
        cIdx--;
        typewriterSpan.textContent = currentPhrase.slice(0, cIdx);
        if (cIdx === 0) {
          isDeleting = false;
          pIdx = (pIdx + 1) % phrases.length;
          setTimeout(runTypewriter, 350);
          return;
        }
        setTimeout(runTypewriter, deleteSpeed);
      } else {
        cIdx++;
        typewriterSpan.textContent = currentPhrase.slice(0, cIdx);
        if (cIdx === currentPhrase.length) {
          isDeleting = true;
          setTimeout(runTypewriter, pauseTime);
          return;
        }
        setTimeout(runTypewriter, typeSpeed);
      }
    }

    setTimeout(runTypewriter, 500);
  }

  /* ── 5. DevSecOps Terminal Simulator ─────────────── */
  const termOutput = document.getElementById('terminal-output');
  const termButtons = document.querySelectorAll('.btn-terminal');
  let isExecuting = false;

  const pipelines = {
    full: [
      { text: '$ az pipelines validate --pipeline-id 120 --path /azure-pipelines.yml', cls: 'term-dim', delay: 200 },
      { text: '✔ Azure DevOps YAML syntax: Validated (0 errors)', cls: 'term-green', delay: 350 },
      { text: '$ tfsec ./terraform/modules/landing-zone --concise-output', cls: 'term-dim', delay: 250 },
      { text: '✔ tfsec scanner: 0 high/critical issues identified', cls: 'term-green', delay: 400 },
      { text: '$ checkov -d ./terraform --framework terraform', cls: 'term-dim', delay: 200 },
      { text: '✔ Checkov: CIS Microsoft Azure Benchmark v2.0 - 100% Passed', cls: 'term-green', delay: 450 },
      { text: '$ trufflehog git file://. --since-commit HEAD~1', cls: 'term-dim', delay: 250 },
      { text: '✔ TruffleHog: 0 credentials leaked; Managed Identities validated', cls: 'term-green', delay: 350 },
      { text: '$ terraform plan -out=tfplan -detailed-exitcode', cls: 'term-dim', delay: 300 },
      { text: 'Acquired state lock on Azure Storage [container: tfstate]... OK', cls: 'term-dim', delay: 250 },
      { text: 'Plan: 4 to add, 1 to change, 0 to destroy (Hub-spoke network rules)', cls: 'term-orange', delay: 400 },
      { text: '$ az policy state summarize --subscription "Enterprise-CAF-Prod"', cls: 'term-dim', delay: 250 },
      { text: '✔ Mandatory Tags & Allowed Regions (East US, Central India): COMPLIANT', cls: 'term-green', delay: 350 },
      { text: '🚀 Landing Zone Deployment completed with ZERO downtime.', cls: 'term-orange', delay: 200 }
    ],
    lint: [
      { text: '$ yamllint azure-pipelines.yml --strict', cls: 'term-dim', delay: 200 },
      { text: '✔ YAML schema formatted according to Azure DevOps specification.', cls: 'term-green', delay: 300 },
      { text: '$ tflint --recursive --minimum-failure-severity=error', cls: 'term-dim', delay: 250 },
      { text: '✔ 18 reusable Terraform modules validated cleanly.', cls: 'term-green', delay: 300 }
    ],
    scan: [
      { text: '$ tfsec ./terraform --concise-output', cls: 'term-dim', delay: 200 },
      { text: '✔ Storage account public access: BLOCKED', cls: 'term-green', delay: 300 },
      { text: '$ trufflehog git file://. --since-commit HEAD~1 --fail', cls: 'term-dim', delay: 250 },
      { text: '✔ No plaintext secrets found. Using Azure Key Vault & Managed Identities.', cls: 'term-green', delay: 300 }
    ],
    terraform: [
      { text: '$ terraform init -backend-config="storage_account_name=sifytfstate"', cls: 'term-dim', delay: 200 },
      { text: 'Initializing remote backend state in Azure Blob Storage... OK', cls: 'term-dim', delay: 300 },
      { text: '$ terraform plan -detailed-exitcode', cls: 'term-dim', delay: 350 },
      { text: 'Plan: 2 to add, 0 to change, 0 to destroy. (NSG security rules applied)', cls: 'term-orange', delay: 300 }
    ],
    deploy: [
      { text: '$ terraform apply -auto-approve tfplan', cls: 'term-dim', delay: 250 },
      { text: 'Applying Azure Firewall rules & Private Endpoints...', cls: 'term-dim', delay: 400 },
      { text: 'Linking diagnostic logs to Azure Log Analytics Workspace & Prometheus...', cls: 'term-dim', delay: 350 },
      { text: '✔ Zero-downtime Cloud Adoption Framework (CAF) update applied.', cls: 'term-green', delay: 200 }
    ]
  };

  async function executePipeline(type) {
    if (isExecuting || !termOutput) return;
    isExecuting = true;
    termOutput.innerHTML = '';

    const lines = pipelines[type] || pipelines.full;

    for (const step of lines) {
      await new Promise((r) => setTimeout(r, step.delay));
      const lineDiv = document.createElement('div');
      lineDiv.className = `term-line ${step.cls || ''}`;
      lineDiv.textContent = step.text;
      termOutput.appendChild(lineDiv);
      termOutput.scrollTop = termOutput.scrollHeight;
    }

    isExecuting = false;
  }

  termButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isExecuting) return;
      termButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const pipelineType = btn.getAttribute('data-pipeline');
      executePipeline(pipelineType);
    });
  });

  /* ── 6. Contact Form ─────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sendBtn = document.getElementById('send-btn');
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }

      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.textContent = 'Message Prepared ✓';
      }

      const subject = encodeURIComponent(`DevOps & Azure Inquiry from ${name}`);
      const body = encodeURIComponent(`Hello Sachin,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`);

      setTimeout(() => {
        window.location.href = `mailto:contact@sachintomer.dev?subject=${subject}&body=${body}`;
        contactForm.reset();
        if (sendBtn) {
          sendBtn.disabled = false;
          sendBtn.textContent = 'Send Message →';
        }
      }, 500);
    });
  }

})();
