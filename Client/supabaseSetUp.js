require('dotenv').config();
const myDatabase = require('@supabase/supabase-js');

const supabase = myDatabase.createClient('https://lnittdgflsxwbofnrpul.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuaXR0ZGdmbHN4d2JvZm5ycHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwOTQ5NzMsImV4cCI6MTk5MDY3MDk3M30.3XFoAVUDDzaoDq7AqkZ3D1lGcnTsIOpzuPQ8fk0J6w0');
// const supabase = myDatabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
export default supabase;
