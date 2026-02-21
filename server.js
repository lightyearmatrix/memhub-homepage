import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials!');
    console.error('Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// Serve Vite build output
app.use(express.static(path.join(__dirname, 'dist')));

// API: Waitlist submission
app.post('/api/waitlist', async (req, res) => {
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

        // Remove undefined values
        Object.keys(submission).forEach(key => {
            if (submission[key] === undefined) delete submission[key];
        });

        console.log('Inserting waitlist submission:', JSON.stringify(submission));

        const { data, error } = await supabase
            .from('waitlist_submissions')
            .insert([submission])
            .select();

        if (error) {
            console.error('Supabase insert error:', JSON.stringify(error));
            throw error;
        }

        console.log('New waitlist submission saved:', submission.email);

        res.json({
            success: true,
            message: 'Successfully added to waitlist',
            submissionId: data[0]?.id
        });
    } catch (error) {
        console.error('Error saving submission:', error.message || JSON.stringify(error));
        res.status(500).json({
            success: false,
            message: 'Error processing submission',
            error: error.message
        });
    }
});

// API: Expert application
app.post('/api/expert-apply', async (req, res) => {
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

        // Remove undefined values
        Object.keys(submission).forEach(key => {
            if (submission[key] === undefined) delete submission[key];
        });

        console.log('Inserting expert application:', JSON.stringify(submission));

        const { data, error } = await supabase
            .from('expert_applications')
            .insert([submission])
            .select();

        if (error) {
            console.error('Supabase insert error:', JSON.stringify(error));
            throw error;
        }

        console.log('New expert application saved:', email);

        res.json({
            success: true,
            message: 'Application received'
        });
    } catch (error) {
        console.error('Error saving expert application:', error.message || JSON.stringify(error));
        res.status(500).json({
            success: false,
            message: 'Error processing application',
            error: error.message
        });
    }
});

// API: View submissions
app.get('/api/submissions', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('waitlist_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase query error:', JSON.stringify(error));
            throw error;
        }

        res.json({
            success: true,
            count: data.length,
            submissions: data
        });
    } catch (error) {
        console.error('Error reading submissions:', error.message || JSON.stringify(error));
        res.status(500).json({
            success: false,
            message: 'Error reading submissions',
            error: error.message
        });
    }
});

// API: Health check — tests Supabase connectivity
app.get('/api/health', async (req, res) => {
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
            status: supabaseStatus,
            url: supabaseUrl,
            keyPrefix: supabaseKey?.substring(0, 15) + '...'
        }
    });
});

// SPA fallback: all non-API routes serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, () => {
    console.log('='.repeat(60));
    console.log(`SuperMem Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log('Supabase URL:', supabaseUrl);
    console.log('='.repeat(60));
});
