---
description: Run a full security audit of the portfolio (dependencies, secrets, CSP headers, code review)
---

# Security Audit Workflow

This workflow performs a layered security audit across the entire codebase.
Run it from the project root: `/Users/vaibhavgupta/python_projects/portfolio-vaibhav`.

---

## Step 1 — Dependency vulnerability scan (npm audit)

// turbo
```bash
npm audit --audit-level=low 2>&1 | tee /tmp/audit_report.txt
```

Review the output for **high** or **critical** severities.
Fix available issues with:
```bash
npm audit fix
```
For major-version bumps (e.g. vite → 7.x) evaluate breaking changes first:
```bash
npm audit fix --force
```

---

## Step 2 — Outdated dependency check

// turbo
```bash
npm outdated 2>&1 | tee /tmp/outdated_report.txt
```

Prioritise updating packages flagged as **security-related** (e.g. `vite`, `@supabase/supabase-js`).

---

## Step 3 — Secret / credential scanning

Scan for accidentally committed secrets (API keys, passwords, tokens) across **all git history**.

// turbo
```bash
# Check whether .env was ever committed
git log --all --oneline --follow -- .env 2>/dev/null

# Grep the full history for common secret patterns
git log --all -p -- '*.env' '*.env.*' 2>/dev/null | head -80

# Search source tree for hardcoded credentials
grep -rn \
  -e "password\s*=" \
  -e "secret\s*=" \
  -e "api_key\s*=" \
  -e "SUPABASE_KEY\s*=" \
  -e "eyJ" \
  --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
  src/ 2>/dev/null | grep -v node_modules
```

**If any secret is found in git history:**
1. Rotate the exposed credential immediately on the provider's dashboard.
2. Remove it from history: `git filter-repo --path <file> --invert-paths` (requires `pip install git-filter-repo`).
3. Force-push the cleaned history to all remotes.

---

## Step 4 — Verify .gitignore guards secrets

// turbo
```bash
# Confirm .env is properly ignored
git check-ignore -v .env .env.local 2>&1

# Confirm no env files are tracked
git ls-files | grep -E '\.env'
```

Expected: `.env` and `.env.local` should be listed as ignored and **not** tracked.

---

## Step 5 — CSP & HTTP security header verification (production)

After deploying, verify that all security headers are present:

// turbo
```bash
# Replace URL with the actual live domain when available
SITE_URL="https://your-portfolio.netlify.app"
curl -sI "$SITE_URL" | grep -Ei \
  "content-security-policy|x-frame-options|x-content-type-options|strict-transport-security|referrer-policy|permissions-policy"
```

All six headers should appear in the output. A missing header = an open finding.

For local verification of `netlify.toml` header configuration:
```bash
npx netlify-cli dev &
sleep 5
curl -sI http://localhost:8888 | grep -Ei \
  "content-security-policy|x-frame-options|x-content-type-options"
```

---

## Step 6 — Static source-code security review (manual checklist)

Run through each file category:

### 6a. Contact form (`src/components/Contact.tsx`)
- [ ] Input validation present (length limits, email regex)
- [ ] Rate limiting in place (client-side ≥ server-side RLS on Supabase)
- [ ] No raw server errors exposed to the user (`console.error` is acceptable; `alert(error)` is not)
- [ ] Supabase client created once at module scope (not inside render)
- [ ] `maxLength` attributes set on all `<input>` and `<textarea>` fields

### 6b. External links (`Hero.tsx`, `Footer.tsx`, `Projects.tsx`)
- [ ] All `target="_blank"` links include `rel="noopener noreferrer"`
- [ ] No `javascript:` protocol hrefs

### 6c. Navigation (`Navigation.tsx`)
- [ ] `document.querySelector` used with static, hardcoded selectors only (no user-controlled input fed into it)

### 6d. `index.html`
- [ ] `Content-Security-Policy` meta tag present (belt-and-suspenders with netlify.toml headers)
- [ ] `X-Frame-Options` meta tag present
- [ ] Title is descriptive (not a placeholder like "temp-app")

### 6e. `netlify.toml`
- [ ] `[[headers]]` block present with all six security headers
- [ ] `Strict-Transport-Security` has `max-age` ≥ 31536000 (1 year)
- [ ] `Content-Security-Policy` restricts `default-src` to `'self'`

### 6f. `package.json`
- [ ] No `postinstall` scripts that run untrusted code
- [ ] `private: true` set (prevents accidental npm publish)

---

## Step 7 — Supabase RLS (Row-Level Security) check

Log in to your Supabase dashboard and verify:

- [ ] The `contact_messages` table has **RLS enabled**
- [ ] There is an **INSERT-only** policy for the `anon` role:
  ```sql
  CREATE POLICY "Allow anonymous inserts"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);
  ```
- [ ] There is **no SELECT / UPDATE / DELETE** policy for the `anon` role (reads are admin-only)

---

## Step 8 — Generate audit report

// turbo
```bash
echo "=== npm audit ===" > /tmp/security_audit_$(date +%Y%m%d).txt
cat /tmp/audit_report.txt >> /tmp/security_audit_$(date +%Y%m%d).txt
echo "\n=== Outdated packages ===" >> /tmp/security_audit_$(date +%Y%m%d).txt
cat /tmp/outdated_report.txt >> /tmp/security_audit_$(date +%Y%m%d).txt
echo "Audit report saved to /tmp/security_audit_$(date +%Y%m%d).txt"
```

---

## Severity Legend

| Severity | Action |
|----------|--------|
| 🔴 Critical / High | Fix immediately before next deploy |
| 🟡 Moderate | Fix within current sprint |
| 🟢 Low / Info | Track in backlog |
