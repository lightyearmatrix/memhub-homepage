import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  let supabaseStatus = 'unknown';
  try {
    const { error } = await supabase.from('waitlist_submissions').select('email').limit(1);
    supabaseStatus = error ? `error: ${error.message}` : 'connected';
  } catch (e) {
    supabaseStatus = `error: ${e.message}`;
  }

  res.json({
    success: true,
    message: 'Server is running',
    supabase: {
      status: supabaseStatus
    }
  });
}
