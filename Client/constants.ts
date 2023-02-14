export const  supabaseURL: string = "https://lnittdgflsxwbofnrpul.supabase.co";
export const anonKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuaXR0ZGdmbHN4d2JvZm5ycHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwOTQ5NzMsImV4cCI6MTk5MDY3MDk3M30.3XFoAVUDDzaoDq7AqkZ3D1lGcnTsIOpzuPQ8fk0J6w0";

export const enum searchMethods  {
    instantSearch = 0,
    nutrientSearch= 1,
    brandedSearch= 2,
}
export interface SearchCriteria {
    value:String,
    code:searchMethods,
}



