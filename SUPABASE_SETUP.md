# 🛠️ SUPABASE SETUP GUIDE — APEX TUNING OS

Follow these 3 simple steps to connect **Apex Tuning OS** to your production Supabase database.

---

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and click **"New Project"**.
2. Select your desired region and database password.
3. Once provisioned, navigate to **Project Settings -> API** and copy your:
   - `Project URL`
   - `anon / public` API Key

---

## 2. Execute SQL Schemas
1. Open your project's **SQL Editor** in the Supabase Dashboard.
2. Open the file `supabase/schema.sql` included in this package, copy its entire contents, paste it into the SQL Editor, and click **RUN**.
3. Open `supabase/seed.sql`, paste its contents into a new query tab, and click **RUN** to load sample work orders, dyno sweeps, workshop bays, and inventory.

---

## 3. Configure Local Environment Variables
Create a `.env` file in the root of your project:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Restart your Vite development server:

```bash
npm run dev
```

---

## 🔐 Admin Passkey Demo Gate
To test the built-in workshop management portal:
1. Navigate to `/` and click **[ WORKSHOP PASS ]** in the top navigation bar.
2. Click **1-Click Auto-Fill (`apextuning2026`)** or manually input `apextuning2026`.
3. Manage live queued tickets, AWD chassis dyno sweeps, workshop lift bays, and supplier parts inventory.
