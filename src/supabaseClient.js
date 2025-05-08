// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your own Supabase project credentials
const supabaseUrl = 'https://supabase.com/dashboard/project/wechfyubcqkbkfvnvgka';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlY2hmeXViY3FrYmtmdm52Z2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxOTk0MjAsImV4cCI6MjA1OTc3NTQyMH0.D1l-HwnCNBsQTe8w2_tx1sJgSX6pfmYijocf69nrquk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
