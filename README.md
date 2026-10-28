# Senior DevOps & Cloud Infrastructure Architect Portfolio

> **Production-Ready Enterprise Portfolio & ATS Resume for GitHub Pages**  
> Tailored for **10+ Years of Comprehensive IT Experience** and **5+ Years Dedicated in DevOps, Kubernetes, Terraform & Cloud Architecture**.

[![Deploy to GitHub Pages](https://github.com/nihcas-byte/special-umbrella/actions/workflows/deploy.yml/badge.svg)](https://github.com/nihcas-byte/special-umbrella/actions/workflows/deploy.yml)

---

## 🚀 Live Demo & Hosting

- **Live URL**: [https://nihcas-byte.github.io/special-umbrella/](https://nihcas-byte.github.io/special-umbrella/)
- **Repository**: [https://github.com/nihcas-byte/special-umbrella](https://github.com/nihcas-byte/special-umbrella)

---

## 🌟 Key Features

Inspired by modern high-impact engineering portfolios (e.g. `ramjish.github.io`):

1. **Cyber-Cloud Glassmorphic Design System**:
   - Deep slate aesthetic with ambient radial gradients and glowing neon accents (`#06b6d4`, `#3b82f6`, `#10b981`).
   - One-click **Dark / Light Theme Toggle** with persistent `localStorage` preference.
   - Fully responsive for mobile, tablet, and ultra-wide screens.

2. **Interactive CI/CD & Terraform Pipeline Simulator**:
   - Live visual multi-stage pipeline flow:
     1. `Lint & SAST` (Hadolint, tflint, SonarQube Quality Gate)
     2. `DevSecOps Scan` (TruffleHog credential leak detection, tfsec)
     3. `Terraform IaC` (Remote state locking, Terraform Plan)
     4. `Policy as Code` (Checkov CIS benchmarks, OPA Gatekeeper)
     5. `Build & Cosign` (Multi-arch Docker buildx, cryptographic supply chain signing)
     6. `GitOps ArgoCD` (Progressive canary traffic rollout to Kubernetes EKS/AKS)
   - Real-time scenario triggers:
     - ⚡ **Run Full Pipeline**: Watch automated step-by-step terminal execution.
     - ⚠ **Simulate Terraform Drift**: Simulates out-of-band console change and automated zero-drift remediation.
     - 🛡 **Simulate DevSecOps CVE Blocker**: Demonstrates policy gate blocking high-severity CVEs before production.

3. **10+ Years Career Journey Progression**:
   - Visual timeline demonstrating evolutionary IT maturity:
     - **Lead DevOps & Cloud Platform Architect** (2022 – Present | 5+ yrs DevOps Leadership)
     - **Senior DevOps & Cloud Engineer** (2019 – 2022 | Cloud & CI/CD Modernization)
     - **Senior Systems & Infrastructure Automation Engineer** (2016 – 2019 | Linux, VMware, Ansible)
     - **Systems & Network Operations Engineer** (2014 – 2016 | Cisco, TCP/IP, 24/7 Operations)

4. **Categorized Skills Matrix & Filterable Case Studies**:
   - Interactive filtering across Cloud Platforms, Kubernetes, Terraform IaC, CI/CD, DevSecOps, and Observability.
   - 6 in-depth architectural case studies with problem, solution, tech stack, and quantifiable business outcomes.

5. **Standalone ATS-Friendly Resume (`resume.html`)**:
   - Recruiter-optimized, clean typography designed to pass automated ATS parsers.
   - One-click **"Print / Save as PDF"** button with custom `@media print` styling (no headers, buttons, or margins clipped).

6. **Automated GitHub Pages CI/CD Workflow**:
   - Pre-configured `.github/workflows/deploy.yml` using official GitHub Actions (`actions/deploy-pages@v4`) for zero-touch deployment upon pushing to `main`.

---

## 📁 Repository Structure

```text
special-umbrella/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions automated deployment to Pages
├── index.html                # Main interactive portfolio page
├── resume.html               # ATS-friendly printable resume page
├── style.css                 # Cyber-cloud glassmorphism design system
├── script.js                 # Terminal simulator, theme switcher, filters & toasts
└── README.md                 # Setup & customization guide
```

---

## 🛠️ Quick Personalization Guide (2 Minutes)

All personal details are organized cleanly in `index.html` and `resume.html`. Simply open them and replace the placeholders:

| Information | Current Default | File & Location |
| :--- | :--- | :--- |
| **Your Name** | `DevOps Architect` / `Cloud & DevOps Lead` | `index.html` (`<title>`, `.brand-logo`, `.hero-title`, `.profile-card`) and `resume.html` |
| **Email** | `devops.lead.architect@example.com` | `index.html` (Hero, Contact card, mailto) and `resume.html` |
| **Phone** | `+1 (555) 019-2834` | `index.html` (Hero, Contact card) and `resume.html` |
| **Location** | `San Francisco, CA / Remote Worldwide` | `index.html` and `resume.html` |
| **LinkedIn URL** | `https://linkedin.com` | `index.html` and `resume.html` |
| **GitHub URL** | `https://github.com/nihcas-byte/special-umbrella` | `index.html` and `resume.html` |
| **Certification IDs** | `AWS-PSA-9482104`, `CKA-2100-84912`, etc. | `index.html` (`#certifications` section) and `resume.html` |

---

## 🚢 How to Deploy to GitHub Pages

### Step 1: Initialize Git & Push to GitHub
Run the following commands in PowerShell from `c:\Projects\special-umbrella`:

```powershell
git init
git add .
git commit -m "feat: initial release of 10+ yr IT / 5+ yr DevOps portfolio"
git branch -M main
git remote add origin https://github.com/nihcas-byte/special-umbrella.git
git push -u origin main
```

### Step 2: Enable GitHub Pages in your Repository Settings
1. Navigate to your GitHub repository: [https://github.com/nihcas-byte/special-umbrella](https://github.com/nihcas-byte/special-umbrella)
2. Click on **Settings** &rarr; **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - Set **Source** to **GitHub Actions**.
4. The `.github/workflows/deploy.yml` workflow will automatically run and publish your site!
5. Your portfolio will be live at:
   **`https://nihcas-byte.github.io/special-umbrella/`**

---

## 💻 Local Preview
To preview locally in your browser:
- Double-click `index.html` or open with any browser:
  ```powershell
  Start-Process "index.html"
  ```
- Or run a quick lightweight local server:
  ```powershell
  python -m http.server 8000
  # Then visit http://localhost:8000 in your browser
  ```

---

## 📜 License
MIT License — Free to use, customize, and share.
