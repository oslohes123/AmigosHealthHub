const dotenv = require("dotenv");
dotenv.config();
import supabase from './utils/supabaseSetUp';
const port = process.env.PORT;
import app from './index'

// async function supabaseTest(){
//     const {data,error} = await supabase.rpc('hello');
//     if(error) console.error(error);
//     else console.log({data});
//   }
  
  
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    //supabaseTest(); // should have output: { data: 'hello_world' }
  });