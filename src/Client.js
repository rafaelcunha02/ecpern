import { createClient } from '@supabase/supabase-js';

const supabaseKey = process.env.REACT_APP_DB_KEY;
const supabaseUrl = 'https://olssegxvsjfzoxdqounk.supabase.co';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;