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
```typescript
let output = await instantSearch("apple");
console.log(output.common[0]) // for common food
console.log(output.common[1]) // for branded food
```
### Branded search

```typescript
let output = await brandedSearch("apple");
output.foods[0]
```

### Nutrient for food

```typescript
let output = await brandedSearch("apple");
output.foods[0]
```




Add this to the function and run
