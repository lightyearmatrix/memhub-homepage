require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 3000;

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
        const submission = {
            email: req.body.email,
            website: req.body.website,
            building_for: req.body.buildingFor,
            company_size: req.body.companySize,
            use_cases: req.body.useCases,
            other_use_case: req.body.otherUseCase,
            from_source: req.body.from,  // Ad tracking source
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

app.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🚀 Supermem Waitlist Server running on http://localhost:${PORT}');
    console.log('📝 Form available at: http://localhost:${PORT}/supermem-waitlist.html');
    console.log('📊 View submissions at: http://localhost:${PORT}/api/submissions');
    console.log('💚 Health check: http://localhost:${PORT}/api/health');
    console.log('='.repeat(60));
    console.log('✅ Supabase connected:', supabaseUrl);
    console.log('='.repeat(60));
});

