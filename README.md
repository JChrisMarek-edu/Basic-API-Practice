1. What is the purpose of using `.env`
    The `.env` or environment file is used to contain configurations for the project. It can help organize a project by keeping values needed by multiple files in one place. 

2. How does this work:
```javascript
if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
}
```
    If the query object contains a minPrice or maxPrice value the price attribute in the filter object is set to an empty object. Then if the query has a minPrice value the price attribute is set to an object that contains a $gte value equal to the number value of query's minPrice attribute. In other words all prices greater than or equal to the minPrice are accepted through the filter. If maxPrice is also in query then similarly all prices less than or equal to the value of maxPrice are accepted through the filter. If both are selected then both attributes are added to filter and only the price values between the minPrice and maxPrice are accepted through the filter.

3. What is the program `seed.js` used for?
    The `seed.js` file is used to populate the initial values of a system. In this case the seed program inserts all the javascript objects from the `movies.js` file into the table. 

4. Try all API routes using Postman

5. In terms of code what is the difference between `put` and `patch`
    Both `put` and `patch` are types of update commands. The primary difference is that `put` replaces the whole object that is targeted for update while `patch` only replaces the provided attributes of the object. 