# 🎭 Playwright TypeScript E2E Automation Framework

End-to-end UI automation framework built using **Playwright + TypeScript + Page Object Model (POM)**.

This project demonstrates scalable test design, architecture, and CI/CD integration using GitHub Actions.

---

## 🚀 Overview

This framework automates key user journeys of the **Jupiter Toys** web application.

It is designed with:
- **Maintainability** → Page Object Model (OOP)
- **Scalability** → Modular test structure
- **Reliability** → Built-in retries, tracing, screenshots
- **CI/CD Ready** → GitHub Actions integration

---

## 🧪 Test Coverage

| Test Case | Description |
|----------|------------|
| **TC1** | Contact form validation (error handling) |
| **TC2** | Successful form submission using dynamic test data |
| **TC3** | Shopping cart validation (price, subtotal, total) |

---

## 🏗️ Framework Design

- **Language:** TypeScript  
- **Test Framework:** Playwright  
- **Design Pattern:** Page Object Model (POM)  
- **Test Data:** Faker (dynamic data generation)  
- **Reporting:** HTML + JUnit  
- **CI/CD:** GitHub Actions  

---

## 📂 Project Structure
├── pages/ # Page Objects (POM)
├── tests/ # Test specs
├── playwright.config.ts
├── package.json
└── .github/workflows/


---

## ⚙️ Setup & Execution (Quick Start)

### Clone the repository
```bash
git clone git@github.com:amarnath08/Jupiter_Playwright.git
cd Jupiter_Playwright

### Install dependencies
npm install

### Run all tests:
npm test

### Run individual test cases:
npm run test:tc1   # Contact Form Validation
npm run test:tc2   # Successful Submission
npm run test:tc3   # Cart Verification

### View report
npx playwright show-report