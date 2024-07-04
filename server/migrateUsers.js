require('dotenv').config();
// Import the Supabase client
const { createClient } = require('@supabase/supabase-js');
const supabaseKey = process.env.DB_KEY;
const supabaseUrl = process.env.DB_HOST_PROTOCOL;


console.log('Creating Supabase client...');

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabase client created.');

async function migrateUsers() {
  console.log('Starting user migration...');

  // Fetch all users from your User table
  const { data: users, error } = await supabase.from('Users').select('*').limit(1);
  if (error) {
    console.error('Error fetching users:', error);
    return;
  }

  // For each user...
  for (const user of users) {
    // ...create a Supabase authentication user for them.
    const { error } = await supabase.auth.api.createUser(user.email, user.password);
    if (error) {
      console.error('Error creating user:', error);
    }
  }

  console.log('Finished user migration.');
}

migrateUsers();