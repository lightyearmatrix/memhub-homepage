require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';  // Listen on all network interfaces

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Missing Supabase credentials!');
    console.error('Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
    console.error('See .env.example for reference');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Endpoint to handle form submissions
app.post('/api/waitlist', async (req, res) => {
    try {
        const email = req.body.email;

        // Check if email already exists
        const { data: existingSubmission, error: checkError } = await supabase
            .from('waitlist_submissions')
            .select('email')
            .eq('email', email)
            .single();

        if (checkError && checkError.code !== 'PGRST116') {
            // PGRST116 means no rows found, which is fine
            // Any other error should be thrown
            throw checkError;
        }

        // If email already exists, return success without inserting
        if (existingSubmission) {
            console.log('ℹ️  Email already exists:', email);
            return res.json({
                success: true,
                message: 'Successfully added to waitlist',
                alreadyExists: true
            });
        }

        // Email doesn't exist, proceed with insertion
        const submission = {
            email: req.body.email,
            website: req.body.website,
            building_for: req.body.buildingFor,
            company_size: req.body.companySize,
            // New fields from WaitlistModal
            region: req.body.region,
            security_preference: req.body.securityPreference,
            from_source: 'io',  // Ad tracking source
            created_at: new Date().toISOString()
        };

        // Insert into Supabase
        const { data, error } = await supabase
            .from('waitlist_submissions')
            .insert([submission])
            .select();

        if (error) {
            throw error;
        }

        console.log('✅ New waitlist submission:', submission.email);

        res.json({
            success: true,
            message: 'Successfully added to waitlist',
            submissionId: data[0]?.id
        });
    } catch (error) {
        console.error('❌ Error saving submission:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error processing submission',
            error: error.message
        });
    }
});

// Endpoint to view all submissions (for testing)
app.get('/api/submissions', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('waitlist_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        res.json({
            success: true,
            count: data.length,
            submissions: data
        });
    } catch (error) {
        console.error('❌ Error reading submissions:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error reading submissions',
            error: error.message
        });
    }
});

// Success page route
app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/success.html');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        supabase: {
            connected: !!supabaseUrl && !!supabaseKey,
            url: supabaseUrl
        }
    });
});

app.listen(PORT, HOST, () => {
    console.log('='.repeat(60));
    console.log(`🚀 Supermem Waitlist Server running on http://localhost:${PORT}`);
    console.log(`🌐 Server accessible from network on http://${HOST}:${PORT}`);
    console.log(`📝 Form available at: http://localhost:${PORT}/index.html`);
    console.log(`📊 View submissions at: http://localhost:${PORT}/api/submissions`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
    console.log('='.repeat(60));
    console.log('✅ Supabase connected:', supabaseUrl);
    console.log('='.repeat(60));
});

