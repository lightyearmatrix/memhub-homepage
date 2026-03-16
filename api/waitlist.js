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
      email: req.body.email,
      website: req.body.website || undefined,
      building_for: req.body.buildingFor || undefined,
      company_size: req.body.companySize || undefined,
      region: req.body.region || undefined,
      security_preference: req.body.securityPreference || undefined,
      from_source: req.body.fromSource || 'io',
      created_at: new Date().toISOString(),
      name: req.body.name || undefined,
      company: req.body.company || undefined,
      help_with: req.body.helpWith || undefined,
      start_timing: req.body.startTiming || undefined,
      preference: req.body.preference || undefined,
      notes: req.body.notes || undefined,
    };

    Object.keys(submission).forEach(key => {
      if (submission[key] === undefined) delete submission[key];
    });

    const { data, error } = await supabase
      .from('waitlist_submissions')
      .insert([submission])
      .select();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Successfully added to waitlist',
      submissionId: data[0]?.id
    });
  } catch (error) {
    console.error('Error saving submission:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error processing submission',
      error: error.message
    });
  }
}
