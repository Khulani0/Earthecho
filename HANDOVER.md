# Earthecho Designs — Owner's Handover Guide

Plain-language guide to how your website works and how to run it. No code needed.

---

## 1. The big picture

- Your site is built with **Astro** and lives in a **GitHub** repository (`Khulani0/Earthecho`).
- It's hosted on **Vercel**, which rebuilds the site automatically every time something changes in GitHub.
- **No database, no monthly software fees.** Products and gallery photos are files in the repo.
- **Orders happen over WhatsApp** (to 079 680 6971). You confirm delivery and payment with the customer, who pays by EFT.
- Architecture in one line: *static Astro + Git-based CMS + WhatsApp checkout, no database, hosted on Vercel.*

## 2. Where everything lives

| Thing | Where |
| --- | --- |
| The 22 products | `src/content/products/` (one file each) |
| Product photos | `src/assets/products/` |
| Gallery photos | `src/assets/gallery/` + `src/content/gallery/` |
| Business details, WhatsApp number, delivery fee | `src/config.ts` |
| Bank/EFT details (private) | Vercel Environment Variables (not in the code) |
| The pages (home, shop, about…) | `src/pages/` |

## 3. How Sindi adds or edits a product (the CMS)

You have **two ways** to manage products and the gallery. Both save to GitHub and go live in ~1 minute.

### Easiest: Pages CMS (recommended — nothing to set up)
1. Go to **https://app.pagescms.org** and click **Sign in with GitHub**.
2. Approve access to the **Earthecho** repository.
3. Open the project. You'll see **Products** and **Gallery**.
4. Click **Products → Add** (or pick one to edit). Fill in the form:
   - **Product code** — a short unique code, e.g. `EE23` (this becomes the web address; never reuse one).
   - **Name, Price (R), Category, Dimensions, Description.**
   - **Main photo** — drag/drop or tap to upload a clear photo on a **plain white background**.
   - **More photos** — optional extra angles.
   - **In stock** and **Featured on homepage** toggles.
   - **Sort order** — lower numbers appear first.
5. Click **Save**. Done — the new product page builds itself and appears in the shop in about a minute.
6. **Gallery** works the same way: upload a photo, add a caption, save.

> Automatic background removal isn't included — please photograph pieces on a plain background.

### Alternative: your own /admin (branded, needs one-time setup)
There's also a built-in editor at **yourdomain/admin** (Sveltia CMS). It's nicer because it lives on your own address, but it needs a **one-time login setup** by whoever is technical:
1. In GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App.**
   - Homepage URL: your site URL. Authorization callback URL: your auth worker's `/callback` (from step 2).
2. Deploy the free **`sveltia-cms-auth`** Cloudflare Worker (github.com/sveltia/sveltia-cms-auth) and set its `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, and `ALLOWED_DOMAINS`.
3. Put the Worker's URL into `public/admin/config.yml` under `base_url`.
Once done, Sindi just visits `/admin`, clicks **Sign in with GitHub**, and edits.

**Adding another editor (either CMS):** invite them as a **collaborator** on the GitHub repo (GitHub → repo → Settings → Collaborators). They then sign in the same way.

## 4. Config values and what they do

Public settings live in `src/config.ts` — WhatsApp number, Pretoria delivery fee (R150), business details, hours, Facebook & Google links.

Private values live in **Vercel → your project → Settings → Environment Variables**:

| Variable | What it's for |
| --- | --- |
| `EFT_BANK`, `EFT_ACCOUNT_NUMBER`, `EFT_BRANCH_CODE`, `EFT_ACCOUNT_NAME` | Shown ONLY on the order-confirmation screen, never a public page |
| `PUBLIC_FORMSPREE_ID` | Turns on the Contact enquiry form (see below) |

After changing an environment variable in Vercel, click **Redeploy** for it to take effect.

## 5. The Contact enquiry form (optional, free)
Right now the Contact page offers WhatsApp + email. To add a proper form:
1. Sign up free at **https://formspree.io**, create a form, copy its ID (looks like `xyzabcd`).
2. In Vercel, add environment variable `PUBLIC_FORMSPREE_ID` = that ID → Redeploy.
The form then emails you each enquiry. No server needed.

## 6. Your domain (Afrihost → Vercel)
**Yes, this works well.** Keep hosting on Vercel (so Sindi's edits publish automatically) and just point your `.co.za` domain at it:
1. Buy the domain at **Afrihost** (e.g. `earthecho.co.za`). *(Note: a domain is like `earthecho.co.za` — there's no `@`; an address with `@` is an email address.)*
2. In **Vercel → your project → Settings → Domains**, type your domain and click **Add**.
3. Vercel shows you DNS records (usually an **A record** to `76.76.21.21` and/or a **CNAME** to `cname.vercel-dns.com`).
4. In **Afrihost's DNS/ClientZone**, add those records exactly as Vercel shows.
5. Wait for it to verify (minutes to a few hours). Vercel adds **HTTPS automatically** and forces it on.
6. In `astro.config.mjs`, set `site:` to your final domain, and update the CMS config `site_url`. (I can do this for you once you've bought it.)

When people search Google, they'll find **earthecho.co.za**.

## 7. Free Vercel plan — is it enough?
**Yes.** The Vercel **Hobby (free)** plan comfortably runs a static store like this — fast global hosting, automatic HTTPS, auto-deploys. You do **not** need to add a credit card or upgrade to Pro. Ignore those prompts.

## 8. Card payments later (Payfast)
Card-on-site payments are a clean **later** add-on — not built now (as you asked). When you're ready, we add a couple of small serverless functions on Vercel plus **Payfast**, without rebuilding the store. Until then, WhatsApp + EFT is how orders are paid.

## 9. Privacy / cookies (POPIA)
The site uses only **essential storage** (your cart) and **no tracking or advertising cookies**, so a small informational notice is shown once — this is the correct, honest approach under POPIA. The Privacy page explains it.

## 10. If something looks wrong
- Every change is a "commit" in GitHub — nothing is ever lost; you can always see history.
- If a deploy fails, Vercel keeps the **previous working version** live and shows the error in its **Deployments** tab.
- Product data is just files in the repo — nothing is hidden or magic.
