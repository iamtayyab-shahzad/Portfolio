# Developer Portfolio

Premium personal portfolio for a software developer and AI/product builder. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Edit the site (admin dashboard)

The dashboard is **only for you**, and only on your computer.

1. Run `npm run dev`
2. Open [http://localhost:3000/admin](http://localhost:3000/admin)
3. Change name, projects, photos, skills, blog, testimonials, SEO — then save

It will **not** work on the live website. Production returns 404 for `/admin`, `/keystatic`, and `/api/keystatic`. Search engines are told not to index those paths. There is no Admin link in the public navigation.

Use `localhost` — opening the admin from another device on your network is blocked.

## Content files

The dashboard writes JSON in `content/`. You can still edit those files directly if you prefer.

| What | File / folder |
| --- | --- |
| Name, bio, email, socials, SEO | `content/site.json` |
| Case studies | `content/projects/` |
| Skills | `content/skills.json` |
| What I build | `content/services.json` |
| Process | `content/process.json` |
| Testimonials / clients | `content/testimonials.json` |
| Blog settings | `content/blog.json` |
| Blog posts | `content/posts/` |

Uploaded images go in `public/images/`.

## Contact form

The form is UI-only. Connect a real service in `components/contact/ContactForm.tsx` where the TODO comment is.
