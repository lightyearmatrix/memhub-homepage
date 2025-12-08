# Supermem Waitlist Server - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to finish setting up

#### Get Your Credentials

1. Go to your project settings: `Settings` → `API`
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (the `anon` `public` key)

#### Create Environment File

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 3. Create Database Table

Go to your Supabase project → SQL Editor, and run this SQL:

```sql
-- Create waitlist_submissions table
CREATE TABLE waitlist_submissions (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    website TEXT,
    building_for TEXT,
    company_size TEXT,
    use_cases JSONB,
    other_use_case TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_waitlist_email ON waitlist_submissions(email);
CREATE INDEX idx_waitlist_created ON waitlist_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for your API)
CREATE POLICY "Allow public inserts" ON waitlist_submissions
    FOR INSERT TO anon
    WITH CHECK (true);

-- Create policy to allow your service to read all data
CREATE POLICY "Allow service role to read" ON waitlist_submissions
    FOR SELECT TO service_role
    USING (true);
```

### 4. Run the Server

```bash
npm start
```

Or for development:

```bash
node server.js
```

## 🌐 Server Configuration

The server runs on **port 8080** and listens on **all network interfaces (0.0.0.0)**, which means:
- Accessible locally via `http://localhost:8080`
- Accessible from other devices on the same network via `http://YOUR_LOCAL_IP:8080`
- Find your local IP: 
  - macOS/Linux: `ifconfig | grep "inet "`
  - Windows: `ipconfig`

## 📝 API Endpoints

### POST /api/waitlist
Submit a new waitlist entry

**Request Body:**
```json
{
  "email": "user@example.com",
  "website": "https://example.com",
  "buildingFor": "company",
  "companySize": "11-50",
  "useCases": ["onboarding", "search"],
  "otherUseCase": "Custom use case description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully added to waitlist",
  "submissionId": 123
}
```

### GET /api/submissions
View all submissions (for testing/admin)

**Response:**
```json
{
  "success": true,
  "count": 42,
  "submissions": [...]
}
```

### GET /api/health
Check server and Supabase connection status

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "supabase": {
    "connected": true,
    "url": "https://xxxxx.supabase.co"
  }
}
```

## 🔒 Security Notes

1. The `.env` file is in `.gitignore` - never commit it to git
2. The `anon` key is safe to use in client-side code
3. Row Level Security (RLS) is enabled to protect your data
4. For production, consider adding rate limiting

## 📊 Viewing Data in Supabase

1. Go to your Supabase project
2. Click on `Table Editor` in the sidebar
3. Select `waitlist_submissions` table
4. You'll see all submissions with filters and search

## 🛠️ Troubleshooting

### "Missing Supabase credentials" error
- Make sure `.env` file exists
- Check that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly
- Don't use quotes around the values in `.env`

### "relation 'waitlist_submissions' does not exist"
- Run the SQL commands in Step 3 to create the table

### Can't insert data
- Check that Row Level Security policies are set up correctly
- Make sure the "Allow public inserts" policy exists

### CORS errors
- The server already has CORS enabled
- If issues persist, check your Supabase project settings

## 📦 Project Structure

```
memery-homepage/
├── server.js              # Express server with Supabase
├── package.json           # Dependencies
├── .env                   # Your credentials (not in git)
├── .env.example          # Template for credentials
├── supermem-waitlist.html # Waitlist form
└── SETUP.md              # This file
```

## 🎉 Next Steps

- Add email notifications when someone joins waitlist
- Create an admin dashboard to view submissions
- Add analytics tracking
- Set up automated backups in Supabase

