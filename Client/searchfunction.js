"use strict";
exports.__esModule = true;
var supabase_js_1 = require("@supabase/supabase-js");
var constants_ts_1 = require("./constants.ts");
// Create a single supabase client for interacting with your database
var supabase = (0, supabase_js_1.createClient)(constants_ts_1.supabaseURL, constants_ts_1.anonKey);
var _a = await supabase.functions.invoke("FoodSearch", {
    body: { value: "banana", code: constants_ts_1.searchMethods.nutrientSearch }
}), data = _a.data, error = _a.error;
console.log(data);
console.log("----------------");
console.log(error);
