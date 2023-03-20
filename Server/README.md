# Error fixes

## Node version 18.14.0

## On linux

If you get an error saying supabase start is not running but it is
Do it with a sudo at start and then it will work

## Running edge function locally with env files

1. superbase start
2. Create file ./supabase/.env.local file
3. Inside there enter your api keys
4. Serve up the edge function on docker using

```bash
sudo supabase functions serve FoodSearch --env-file ./supabase/.env.local
```

5. Then add the food calls examples

## Testing Food Calls

### Instant search

```typescript
let output = await instantSearch("apple");
console.log(output.common[0]); // for common food
console.log(output.common[1]); // for branded food
```

### Branded search

```typescript
let output = await brandedSearch("apple");
output.foods[0];
```

### Nutrient for food

```typescript
let output = await brandedSearch("apple");
output.foods[0];
```

Add this to the function and run

# Invoking functions through curl

```shell
// To invoke:
curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data '{"value":"ban","code":0}'
// For the edge function created on supabase

curl -L -X POST 'https://lnittdgflsxwbofnrpul.functions.supabase.co/FoodSearch'
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuaXR0ZGdmbHN4d2JvZm5ycHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwOTQ5NzMsImV4cCI6MTk5MDY3MDk3M30.3XFoAVUDDzaoDq7AqkZ3D1lGcnTsIOpzuPQ8fk0J6w0'
--data '{"value":"banana,"code":1}'
```
