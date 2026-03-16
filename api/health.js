import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.json({
      success: true,
      message: 'Server is running',
      supabase: { status: 'missing credentials' }
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

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
    supabase: { status: supabaseStatus }
  });
}
