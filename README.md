1. What is the purpose of using `.env` \
    The `.env` or environment file is used to contain configurations for the project. It can help organize a project by keeping values needed by multiple files in one place. 

2. How does this work: \
```javascript
if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
}
```
\
    If the query object contains a minPrice or maxPrice value the price attribute in the filter object is set to an empty object. Then if the query has a minPrice value the price attribute is set to an object that contains a $gte value equal to the number value of query's minPrice attribute. In other words all prices greater than or equal to the minPrice are accepted through the filter. If maxPrice is also in query then similarly all prices less than or equal to the value of maxPrice are accepted through the filter. If both are selected then both attributes are added to filter and only the price values between the minPrice and maxPrice are accepted through the filter.

3. What is the program `seed.js` used for?\
    The `seed.js` file is used to populate the initial values of a system. In this case the seed program inserts all the javascript objects from the `movies.js` file into the table. 

4. Try all API routes using Postman\
<img width="3840" height="2016" alt="Browser Movies Table" src="https://github.com/user-attachments/assets/6cb75609-29ff-4b9e-8762-ca40f3444ab9" />
<img width="3840" height="2016" alt="API health" src="https://github.com/user-attachments/assets/f1016649-daee-4c9f-8f76-4d1a14b8cc6a" />
<img width="3840" height="2016" alt="API Products" src="https://github.com/user-attachments/assets/5203f35c-63ac-4679-b76a-c710e9ff8813" />
<img width="3840" height="2016" alt="API Director Query" src="https://github.com/user-attachments/assets/c4a9ec83-e827-4763-89e1-2f096ccbf8ba" />
<img width="3840" height="2016" alt="API Year Range Query" src="https://github.com/user-attachments/assets/1efb6fb4-7a31-4f9b-9521-d1c63cb31d8b" />
<img width="3840" height="2016" alt="API ID Query" src="https://github.com/user-attachments/assets/8b5db9e7-da18-4c0c-b6c4-fdc850ef660c" />
<img width="3840" height="2016" alt="API Post Example" src="https://github.com/user-attachments/assets/61dd5166-d205-4b81-87ae-419ae8a3bc70" />
<img width="3840" height="2016" alt="API Put Example" src="https://github.com/user-attachments/assets/43f6da6a-a60f-49d8-963f-1cca5e1e5102" />
<img width="3840" height="2016" alt="API Patch Example" src="https://github.com/user-attachments/assets/8c4bf72c-feb6-4eca-8b64-430fb12f7413" />
<img width="3840" height="2016" alt="API Delete Example" src="https://github.com/user-attachments/assets/cea44ae7-e6c8-43a4-a04f-d5358127ad7b" />

5. In terms of code what is the difference between `put` and `patch`\
    Both `put` and `patch` are types of update commands. The primary difference is that `put` replaces the whole object that is targeted for update while `patch` only replaces the provided attributes of the object. 
