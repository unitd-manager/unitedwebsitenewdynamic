# United Technologies website

## Run locally

Requirements: Node.js 20+ and a MySQL 8 database.

1. Create a database and an application user in MySQL:

   ```sql
   CREATE DATABASE unitedwebsite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'unitedwebsite_app'@'localhost' IDENTIFIED BY 'use-a-strong-password';
   GRANT ALL PRIVILEGES ON unitedwebsite.* TO 'unitedwebsite_app'@'localhost';
   ```

2. Copy `.env.example` to `.env` and set the database, admin, and existing SMTP values.
   Use a unique, long admin password. Never commit `.env`.
3. Install and start the app:

   ```powershell
   Copy-Item .env.example .env
   npm install
   npm run dev
   ```

   The Express server creates the CMS table and inserts the initial home-page,
   navigation, product, service, blog, and testimonial content the first time
   it connects. Database connection errors are logged; the API reports an
   unavailable CMS. Homepage sections do not fall back to hard-coded content.
4. Open `http://localhost:8080/admin` and sign in with `ADMIN_USERNAME` and
   `ADMIN_PASSWORD`.

## Content API

- `GET /api/content?type=service` returns published content for the website.
- `GET /api/content/:type/:slug` returns one published item.
- `/api/admin/content` provides authenticated list, create/update, and delete
  operations. Admin sessions are held in an HTTP-only, same-site cookie.
- Supported content types are `page`, `navigation`, `product`, `service`,
  `blog`, and `testimonial`. Each item's additional fields are stored as a JSON
  object and edited in the admin's JSON field.
- Testimonial records use `content.placement` with `trusted-partners` or
  `carousel` to select the homepage section.

The homepage's copy, section lists, logos, hero background, and brand image are
managed in the `page` record with slug `home`. Blog entries, services,
testimonials, products, and the `main` navigation are read from their own
published MySQL records. On startup, image files in `public/` and `src/assets/`
are imported into `cms_assets`; imported image modules and `/images/...` URLs
are served from the database. Admin image fields support uploading PNG, JPEG,
WebP, GIF, and AVIF files, with the uploaded bytes stored in MySQL.
