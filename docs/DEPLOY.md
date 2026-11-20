# Publish Offbeat, step by step

You do not need a paid hosting service, database or AI account to publish the game.

## The normal GitHub setup

1. Sign in to [GitHub](https://github.com). Create a **public** repository named `offbeat-arcade`. Public repositories support Pages on GitHub Free.
2. Put the files from this project into the repository's top level, preserving `src/`, `data/`, `scripts/`, `tests/` and `.github/workflows/`. Do not upload the ZIP itself or put everything inside an extra `offbeat-arcade` folder. The repository should show `index.html` and `package.json` at its top level. Do not upload `.git`, `dist`, local `work/` or any secrets.
3. Open **Settings → Pages**. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Open **Actions → Check and deploy arcade → Run workflow**, choose `main`, then run it. If the initial push already triggered a run before Pages was enabled, rerun after step 3.
5. Wait for the check and deploy jobs to turn green. The deployment job shows the actual website link. Your project address will be `https://YOUR-USERNAME.github.io/offbeat-arcade/`.
6. Open the link on your phone and computer. Play a daily puzzle, refresh to check progress saving, then try Unlimited.

With the prepared repository in this project, the intended link is `https://Arthura0121.github.io/offbeat-arcade/`. The GitHub deployment result is authoritative; a link in a README is not proof of publication.

## Easiest way to upload with GitHub Desktop

If browser upload skips the hidden `.github` folder, use [GitHub Desktop](https://desktop.github.com/): **File → Add local repository**, select the project, commit the files, and **Publish repository** with “Keep this code private” unchecked. If the repository is already on GitHub, clone it first and copy this project's files into the clone without copying its `.git` folder. Commit and push. You only need GitHub Desktop for changing the code; players simply visit the link.

A branch-based alternative needs no Actions workflow: upload the built contents of `dist/` to a `gh-pages` branch and select **Deploy from a branch → gh-pages → /(root)** in Pages settings. Upload the contents of `dist`, not the containing folder. Rebuild and replace those files for each change; this route does not run the automated checks unless you run them yourself.

## A cleaner free address

GitHub also supports a single user site at `https://YOUR-USERNAME.github.io/` if its repository is named exactly `YOUR-USERNAME.github.io`. That removes the project suffix, but first check whether that repository already hosts something you want to keep. The supplied relative asset paths work at either address.

## Your own domain, optionally

GitHub does not charge extra to connect a domain. Registering and renewing a domain normally costs money, so the `github.io` address is the zero-cost choice.

For a domain you already own, such as `play.example.com`:

1. Verify ownership in GitHub **account Settings → Pages**, following the TXT-record instructions GitHub gives you.
2. In the repository's **Settings → Pages → Custom domain**, enter `play.example.com` and save **before changing DNS**.
3. At your domain provider, create a **CNAME** record with host `play` and target `Arthura0121.github.io` (substitute the actual owner's GitHub hostname if different). Do not include `https://` or `/offbeat-arcade/`.
4. Wait for GitHub's DNS check and certificate to succeed; then enable **Enforce HTTPS**. DNS may take up to 24 hours.
5. For an apex address like `example.com`, use GitHub's current documented A/AAAA or ALIAS/ANAME records rather than the subdomain CNAME instructions. Avoid wildcard records.

The included Actions deployment does not need a `CNAME` file. Configure the domain in Pages settings. Do not add a domain placeholder to the repository.

## Updating the arcade

Edit files, commit, and push to `main`. The workflow tests the game rules and rebuilds before publishing. Pull requests run the checks without deploying. Change puzzle-bank versions deliberately: editing the bank can change today's puzzle. Gameplay and progress do not need any cloud database.

## If something goes wrong

- **404 website:** verify Pages source, successful deploy job and exact URL including the repository suffix. Publishing can take a few minutes.
- **Blank page:** preserve the directory structure and check that `src/`, `data/`, `style.css` and `index.html` were deployed together. Use HTTPS, not a file opened from Downloads.
- **Workflow disabled or permission error:** enable Actions for the repository; use GitHub's standard Actions policy. The Pages deploy job requests `pages: write` and `id-token: write` only for publishing. The optional AI job has read-only repository access.
- **Daily hasn't changed:** it resets at 00:00 UTC, which is a different local hour depending on your timezone. Returning home reloads the current day; a move made in yesterday's open puzzle starts today's edition.
- **Progress disappears:** browser private mode or disabled storage can prevent saving. Progress is local to each browser and device.

Sources, checked November 19, 2026: [GitHub Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [custom domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
