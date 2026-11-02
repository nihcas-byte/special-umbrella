/* =============================================
   script.js — Sachin Tomer Portfolio
   ============================================= */

(function () {
  'use strict';

  /* ── Theme Toggle ──────────────────────────── */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);
  themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeBtn.textContent = next === 'dark' ? '🌙' : '☀️';
  });

  /* ── Navbar scroll ─────────────────────────── */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progress-bar');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (scrolled / total) * 100 : 0;

    progressBar.style.width = pct + '%';
    navbar.classList.toggle('scrolled', scrolled > 40);

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(s => {
      if (scrolled >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  /* ── Mobile Menu ───────────────────────────── */
  const burger = document.getElementById('nav-burger');
  const navLinks = document.getElementById('nav-links');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ── Typewriter ────────────────────────────── */
  const phrases = [
    'DevOps Engineer',
    'Azure Architect',
    'Terraform Expert',
    'DevSecOps Builder',
    'Cloud Automation',
  ];
  const el = document.getElementById('typewriter');
  if (el) {
    let pIdx = 0, cIdx = 0, deleting = false;
    const typeSpeed = 80, deleteSpeed = 45, pauseMs = 1800;

    function tick() {
      const phrase = phrases[pIdx];
      if (deleting) {
        cIdx--;
        el.textContent = phrase.slice(0, cIdx);
        if (cIdx === 0) {
          deleting = false;
          pIdx = (pIdx + 1) % phrases.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, deleteSpeed);
      } else {
        cIdx++;
        el.textContent = phrase.slice(0, cIdx);
        if (cIdx === phrase.length) {
          deleting = true;
          setTimeout(tick, pauseMs);
          return;
        }
        setTimeout(tick, typeSpeed);
      }
    }
    setTimeout(tick, 600);
  }

  /* ── Reveal on scroll ──────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
    observer.observe(el);
  });

  /* ── Contact Form ──────────────────────────── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('send-btn');
      btn.textContent = 'Sent ✓';
      btn.style.background = '#22c55e';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  /* ── Terminal Simulator ────────────────────── */
  const terminalOutput = document.getElementById('terminal-output');
  if (!terminalOutput) return;

  const pipelines = {
    full: {
      label: '▶ Run Pipeline',
      steps: [
        { type: 'cmd', text: '$ azure-pipeline --env prod --branch main' },
        { type: 'info', text: '── Stage 1: YAML Lint ─────────────────────' },
        { type: 'output', text: 'Validating azure-pipeline.yml ...' },
        { type: 'success', text: '✓ YAML valid — 0 errors, 0 warnings' },
        { type: 'info', text: '── Stage 2: Security Scan ─────────────────' },
        { type: 'output', text: 'Running tfsec on ./infra ...' },
        { type: 'success', text: '✓ tfsec: 0 CRITICAL, 0 HIGH issues' },
        { type: 'output', text: 'Running Checkov on ./terraform ...' },
        { type: 'success', text: '✓ Checkov: Passed 47/47 checks' },
        { type: 'output', text: 'Running TruffleHog --only-verified ...' },
        { type: 'success', text: '✓ TruffleHog: No secrets detected' },
        { type: 'info', text: '── Stage 3: Terraform Plan ────────────────' },
        { type: 'cmd', text: '$ terraform init -backend-config=prod.tfvars' },
        { type: 'success', text: '✓ Backend initialized (Azure Storage)' },
        { type: 'cmd', text: '$ terraform plan -out=tfplan' },
        { type: 'output', text: '  ~ azurerm_firewall_policy_rule_collection  (update)' },
        { type: 'output', text: '  + azurerm_policy_assignment  (create)' },
        { type: 'warn',   text: '  Plan: 2 to add, 1 to change, 0 to destroy.' },
        { type: 'info', text: '── Stage 4: Azure Policy ──────────────────' },
        { type: 'output', text: 'Evaluating compliance for scope /subscriptions/prod ...' },
        { type: 'success', text: '✓ 98.4% compliant (64/65 resources)' },
        { type: 'info', text: '── Stage 5: CAF Deploy ────────────────────' },
        { type: 'cmd', text: '$ terraform apply tfplan -auto-approve' },
        { type: 'output', text: 'Applying Landing Zone changes ...' },
        { type: 'success', text: '✓ azurerm_firewall_policy_rule_collection updated' },
        { type: 'success', text: '✓ azurerm_policy_assignment created' },
        { type: 'success', text: '✓ Apply complete! 2 added, 1 changed, 0 destroyed.' },
        { type: 'success', text: '🚀 Pipeline complete — 40% faster than baseline.' },
      ]
    },
    lint: {
      label: 'YAML Lint',
      steps: [
        { type: 'cmd', text: '$ yamllint azure-pipeline.yml' },
        { type: 'output', text: 'Linting pipeline definition ...' },
        { type: 'output', text: 'Checking indentation, syntax, and schema ...' },
        { type: 'success', text: '✓ No issues found in azure-pipeline.yml' },
        { type: 'cmd', text: '$ python -m py_compile pipeline_helper.py' },
        { type: 'success', text: '✓ Python scripts: syntax OK' },
      ]
    },
    scan: {
      label: 'Security Scan',
      steps: [
        { type: 'cmd', text: '$ tfsec ./infra --format json' },
        { type: 'output', text: 'Scanning Terraform for misconfigurations ...' },
        { type: 'success', text: '✓ tfsec: 0 CRITICAL  0 HIGH  1 LOW' },
        { type: 'warn',   text: '  LOW  azurerm_storage_account — consider enabling versioning' },
        { type: 'cmd', text: '$ checkov -d ./terraform --quiet' },
        { type: 'output', text: 'Evaluating 47 Checkov policies ...' },
        { type: 'success', text: '✓ Passed: 47  Failed: 0  Skipped: 0' },
        { type: 'cmd', text: '$ trufflehog git file://. --only-verified' },
        { type: 'output', text: 'Scanning commit history for secrets ...' },
        { type: 'success', text: '✓ No verified secrets detected.' },
      ]
    },
    terraform: {
      label: 'Terraform',
      steps: [
        { type: 'cmd', text: '$ terraform init -backend-config=prod.tfvars' },
        { type: 'success', text: '✓ Initialized provider azurerm ~> 3.0' },
        { type: 'success', text: '✓ Backend initialized: Azure Storage Account' },
        { type: 'cmd', text: '$ terraform validate' },
        { type: 'success', text: '✓ Configuration is valid.' },
        { type: 'cmd', text: '$ terraform plan -out=tfplan -var-file=prod.tfvars' },
        { type: 'output', text: 'Refreshing state from Azure ...' },
        { type: 'output', text: '  ~ azurerm_firewall_policy_rule_collection (update in-place)' },
        { type: 'output', text: '  + azurerm_policy_assignment (create)' },
        { type: 'warn',   text: '  Plan: 2 to add, 1 to change, 0 to destroy.' },
        { type: 'success', text: '✓ Plan saved to tfplan' },
      ]
    },
    deploy: {
      label: 'CAF Deploy',
      steps: [
        { type: 'info', text: '── CAF Landing Zone Deploy ────────────────' },
        { type: 'cmd', text: '$ terraform apply tfplan -auto-approve' },
        { type: 'output', text: 'Provisioning management groups ...' },
        { type: 'success', text: '✓ Management group hierarchy applied' },
        { type: 'output', text: 'Deploying hub-spoke network topology ...' },
        { type: 'success', text: '✓ Hub VNet + Firewall configured' },
        { type: 'success', text: '✓ Spoke peerings established' },
        { type: 'output', text: 'Applying Zero Trust network policies ...' },
        { type: 'success', text: '✓ NSG + Firewall rules enforced' },
        { type: 'output', text: 'Configuring Azure Policy assignments ...' },
        { type: 'success', text: '✓ 12 policies assigned to prod subscription' },
        { type: 'success', text: '🚀 CAF Landing Zone deployed successfully.' },
      ]
    },
  };

  let activeKey = 'full';
  let animTimer = null;

  function clearTerminal() {
    if (animTimer) clearTimeout(animTimer);
    terminalOutput.innerHTML = '';
  }

  function appendLine(type, text) {
    const div = document.createElement('div');
    div.className = 'terminal-line';

    if (type === 'cmd') {
      div.innerHTML = `<span class="t-prompt">›</span><span class="t-cmd">${escHtml(text.replace(/^\$ /, ''))}</span>`;
    } else {
      const cls = {
        output: 't-output',
        success: 't-success',
        warn: 't-warn',
        error: 't-error',
        info: 't-info',
      }[type] || 't-output';
      div.innerHTML = `<span class="${cls}">${escHtml(text)}</span>`;
    }

    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function runPipeline(key) {
    clearTerminal();
    activeKey = key;
    const pipeline = pipelines[key];
    if (!pipeline) return;

    let i = 0;
    function next() {
      if (i >= pipeline.steps.length) return;
      const step = pipeline.steps[i++];
      appendLine(step.type, step.text);
      const delay = step.type === 'cmd' ? 220 : 90;
      animTimer = setTimeout(next, delay);
    }
    next();
  }

  // Bind buttons
  document.querySelectorAll('.btn-terminal').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-terminal').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      runPipeline(btn.dataset.pipeline);
    });
  });

  // Auto-run on section enter
  const termSection = document.getElementById('terminal');
  if (termSection) {
    const termObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runPipeline('full');
        termObs.unobserve(termSection);
      }
    }, { threshold: 0.3 });
    termObs.observe(termSection);
  }

})();
