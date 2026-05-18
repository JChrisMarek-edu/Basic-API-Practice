1. What is the purpose of using `.env`

2. How does this work:
```javascript
if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
}
```

3. What is the program `seed.js` used for?

4. Try all API routes using Postman

5. In terms of code what is the difference between `put` and `patch`
