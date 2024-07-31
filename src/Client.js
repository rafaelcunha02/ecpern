import { createClient } from '@supabase/supabase-js';

const supabaseKey = process.env.REACT_APP_DB_KEY;
const supabaseUrl = 'https://olssegxvsjfzoxdqounk.supabase.co';

if (!supabaseKey) {
  throw new Error('Missing Supabase key. Please set REACT_APP_DB_KEY in your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;