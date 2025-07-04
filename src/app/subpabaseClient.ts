import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gvxkeiqldnrpnkdvqshh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2eGtlaXFsZG5ycG5rZHZxc2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzUzNDYsImV4cCI6MjA2Mjk1MTM0Nn0.syNX2Bg9mpSlyNINgFchOIIsQ-nMKRDvKipTOnxOG70';

export const supabase = createClient(supabaseUrl, supabaseKey);