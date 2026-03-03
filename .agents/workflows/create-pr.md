---
description: Create a PR from develop to main with all pre-requisite checks
---

# Create PR: develop → main

This workflow ensures code quality and a clean git state before opening a Pull Request from `develop` into `main`.

---

## Pre-requisites

- You must be on the `develop` branch before starting.
- The GitHub CLI (`gh`) must be installed and authenticated (`gh auth status`).
- The project must have a `package.json` with lint and build scripts defined.

---

## Steps

### 1. Confirm you are on the `develop` branch

```bash
git checkout develop
```

Verify the current branch is `develop`. If not, switch to it.

### 2. Pull latest changes from remote `develop`

```bash
git pull origin develop
```

Ensure local `develop` is up-to-date with the remote before doing anything else.

### 3. Pull latest `main` and rebase `develop` on top of it

```bash
git fetch origin main
git rebase origin/main
```

This keeps the `develop` branch up-to-date with `main` and avoids merge conflicts in the PR.
If rebase conflicts arise, resolve them, then run `git rebase --continue`.

### 4. Run the linter

```bash
npm run lint
```

Fix any linting errors before proceeding. Do not commit or push with lint failures.

### 5. Run the TypeScript type-check

```bash
npx tsc --noEmit
```

Ensure there are no type errors. Fix any issues before proceeding.

### 6. Run the production build to verify it compiles successfully

```bash
npm run build
```

A successful build confirms the code is production-ready. Fix any build errors before continuing.

### 7. Stage all changes

```bash
git add .
```

Review what is staged with `git status` to make sure only intended files are included.

### 8. Commit staged changes with a descriptive message

```bash
git commit -m "feat: <your short, descriptive commit message here>"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:
- `feat:` for new features
- `fix:` for bug fixes
- `chore:` for maintenance tasks
- `refactor:` for code restructuring
- `docs:` for documentation changes

### 9. Push the `develop` branch to remote

```bash
git push origin develop
```

### 10. Open a Pull Request from `develop` into `main` using the GitHub CLI

```bash
gh pr create \
  --base main \
  --head develop \
  --title "feat: <short description of changes>" \
  --body "## Summary

Describe what this PR does and why.

## Changes
-
-

## Testing
- [ ] Linter passes
- [ ] TypeScript type-check passes
- [ ] Production build succeeds

## Screenshots (if applicable)
"
```

This opens a PR with a pre-filled body template. You can also omit `--title` and `--body` to fill them in interactively.

### 11. Verify the PR was created

```bash
gh pr view --web
```

This opens the newly created PR in your browser so you can review it.

---

## Checklist Before Merging

- [ ] CI/CD checks pass (if any are configured)
- [ ] At least one reviewer has approved (if required)
- [ ] No merge conflicts with `main`
- [ ] PR description is filled out clearly
