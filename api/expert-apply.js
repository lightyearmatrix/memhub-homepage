import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const submission = {
      name: req.body.name,
      email: req.body.email,
      linkedin: req.body.linkedIn,
      expertise: req.body.expertise,
      experience: req.body.experience,
      outcomes: req.body.outcomes,
      open_to_supervising: req.body.openToSupervising,
      has_clients: req.body.hasClients,
      from_source: 'expert',
      created_at: new Date().toISOString()
    };

    Object.keys(submission).forEach(key => {
      if (submission[key] === undefined) delete submission[key];
    });

    const { data, error } = await supabase
      .from('expert_applications')
      .insert([submission])
      .select();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Application received'
    });
  } catch (error) {
    console.error('Error saving expert application:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error processing application',
      error: error.message
    });
  }
}
