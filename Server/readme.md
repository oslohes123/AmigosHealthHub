# Error fixes

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

Add this to the function and run
