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

## 10. SEO monitoring (all free)

Your store already ships strong SEO: sitemap, robots.txt, product + LocalBusiness
structured data, per-page titles/descriptions, share images, fast static pages,
mobile-first, HTTPS. To *monitor* it, all free:

1. **Google Search Console** (the essential one). Go to
   search.google.com/search-console → add your domain. Verify either by:
   - **DNS TXT record** at Afrihost (easiest), or
   - **HTML tag**: copy the content value Google gives you into the Vercel env var
     `PUBLIC_GSC_VERIFICATION`, then Redeploy.
   Then **submit your sitemap**: `https://earthecho.co.za/sitemap-index.xml`.
   Use its **URL Inspection** tool to confirm product/category pages are indexed.
   Search Console itself shows your keywords, clicks, and average position — this
   replaces paid tools (Semrush/Ahrefs) for a small store.
2. **Privacy-friendly analytics (cookieless):** two free options that DON'T break
   the "no tracking cookies" promise:
   - **Vercel Web Analytics** — turn it on in your Vercel project → Analytics tab.
   - **Cloudflare Web Analytics** — free at cloudflare.com; paste its token into
     the Vercel env var `PUBLIC_CF_ANALYTICS_TOKEN` and Redeploy.
   (We deliberately did **not** use Google Analytics — it sets cookies and would
   require a consent banner.)

## 11. Security — what actually applies here (all free)

Your store is a **static site on Vercel** — there is no WordPress, no server, no
database, and no public login to attack. So the common advice you'll read about
**Wordfence / Solid Security / Shopify security apps / malware scanners does NOT
apply** and isn't needed. What matters here:

1. **Security headers — already done.** `vercel.json` sends HSTS (forces HTTPS),
   a Content-Security-Policy, `X-Content-Type-Options`, `X-Frame-Options`
   (anti-clickjacking), a strict Referrer-Policy and Permissions-Policy. This is
   the professional baseline and it's live automatically.
2. **Protect your accounts (this is the real risk).** Because edits flow through
   GitHub → Vercel, the thing to secure is those *accounts*:
   - Turn on **Two-Factor Authentication (2FA)** on **GitHub** and **Vercel**.
   - Only add people you trust as **repo collaborators**; remove them when done.
3. **Optional extra shield — Cloudflare (free):** you can route your domain's DNS
   through Cloudflare for a free Web Application Firewall + DDoS protection and
   bot blocking. It's optional (Vercel already gives you HTTPS, a global CDN and
   DDoS protection); if you use it, point Afrihost's nameservers to Cloudflare and
   add your Vercel records there instead.
4. **Your own computer:** since you log into GitHub/Vercel from it, keep it clean
   with a free tool like **Bitdefender Free** or **Malwarebytes Free** to stop
   password-stealing malware. This is the one piece of the advice you pasted that
   is worth doing.
5. **Dependencies:** the project currently has **0 known vulnerabilities**
   (`npm audit`). Vercel rebuilds cleanly from the repo every time.

## 12. If something looks wrong
- Every change is a "commit" in GitHub — nothing is ever lost; you can always see history.
- If a deploy fails, Vercel keeps the **previous working version** live and shows the error in its **Deployments** tab.
- Product data is just files in the repo — nothing is hidden or magic.
