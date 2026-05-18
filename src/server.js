const express = require('express');
const path = require('path');
require('dotenv').config();

const { ConnectToDatabase, ToObjectId, CloseDatabase } = require('./db');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

function BuildProductQuery(query) {
  const filter = {};


  if (query.name) {
    filter.name = { $regex: query.name, $options: 'i' };
  }

  if (query.minYear || query.maxYear) {
    filter.year = {};
    if (query.minYear) filter.year.$gte = Number(query.minYear);
    if (query.maxYear) filter.year.$lte = Number(query.maxYear);
  }

  if (query.minMinutes || query.maxMinutes) {
    filter.minutes = {};
    if (query.minMinutes) filter.minutes.$gte = Number(query.minMinutes);
    if (query.maxMinutes) filter.minutes.$lte = Number(query.maxMinutes);
  }

  if (query.director) {
    filter.director = { $regex: query.director, $options: 'i' };
  }

  return filter;
}

function ValidateProduct(product) {
  if (!product.name || typeof product.name !== 'string') {
    return 'Movie name is required.';
  }
  if (typeof product.year !== 'number' || product.year < 0) {
    return 'Movie year must be a non-negative number.';
  }
  if (typeof product.minutes !== 'number' || product.minutes < 0) {
    return 'Movie minutes must be a non-negative integer.';
  }
  if (!product.director || typeof product.director !== 'string') {
    return 'Movie director is required.';
  }
  return null;
}

app.get('/api/health', async (request, response) => {
  const collection = await ConnectToDatabase();
  const count = await collection.countDocuments();
  response.json({ status: 'ok', database: process.env.DB_NAME, products: count });
});

app.get('/api/products', async (request, response) => {
  const collection = await ConnectToDatabase();
  const filter = BuildProductQuery(request.query);
  const products = await collection.find(filter).sort({ name: 1 }).toArray();
  response.json(products);
});

app.get('/api/products/:id', async (request, response) => {
  const id = ToObjectId(request.params.id);
  if (!id) {
    return response.status(400).json({ error: 'Invalid movie id.' });
  }

  const collection = await ConnectToDatabase();
  const product = await collection.findOne({ _id: id });

  if (!product) {
    return response.status(404).json({ error: 'Movie not found.' });
  }

  response.json(product);
});

app.post('/api/products', async (request, response) => {
  const product = {
    name: request.body.name,
    year: Number(request.body.year),
    minutes: Number(request.body.minutes),
    director: String(request.body.director)
  };

  const error = ValidateProduct(product);
  if (error) {
    return response.status(400).json({ error });
  }

  try {
    const collection = await ConnectToDatabase();
    const result = await collection.insertOne(product);
    response.status(201).json({ ...product, _id: result.insertedId });
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).json({ error: 'A movie with this name already exists.' });
    }
    throw error;
  }
});

app.put('/api/products/:id', async (request, response) => {
  const id = ToObjectId(request.params.id);
  if (!id) {
    return response.status(400).json({ error: 'Invalid movie id.' });
  }

  const product = {
    name: request.body.name,
    year: Number(request.body.year),
    minutes: Number(request.body.minutes),
    director: String(request.body.director)
  };

  const error = ValidateProduct(product);
  if (error) {
    return response.status(400).json({ error });
  }

  const collection = await ConnectToDatabase();
  const result = await collection.findOneAndUpdate(
    { _id: id },
    { $set: product },
    { returnDocument: 'after' }
  );

  if (!result) {
    return response.status(404).json({ error: 'Movie not found.' });
  }

  response.json(result);
});

app.patch('/api/products/:id', async (request, response) => {
  const id = ToObjectId(request.params.id);
  if (!id) {
    return response.status(400).json({ error: 'Invalid movie id.' });
  }

  const updates = {};
  if (request.body.name !== undefined) updates.name = request.body.name;
  if (request.body.year !== undefined) updates.year = Number(request.body.year);
  if (request.body.minutes !== undefined) updates.minutes = Number(request.body.minutes);
  if (request.body.director !== undefined) updates.director = String(request.body.director)
  
  const collection = await ConnectToDatabase();
  const result = await collection.findOneAndUpdate(
    { _id: id },
    { $set: updates },
    { returnDocument: 'after' }
  );

  if (!result) {
    return response.status(404).json({ error: 'Movie not found.' });
  }

  response.json(result);
});

app.delete('/api/products/:id', async (request, response) => {
  const id = ToObjectId(request.params.id);
  if (!id) {
    return response.status(400).json({ error: 'Invalid movie id.' });
  }

  const collection = await ConnectToDatabase();
  const result = await collection.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    return response.status(404).json({ error: 'Movie not found.' });
  }

  response.status(204).send();
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({ error: 'Server error.' });
});

const server = app.listen(port, () => {
  console.log(`Movies API running on http://localhost:${port}`);
});

process.on('SIGTERM', async () => {
  await CloseDatabase();
  server.close();
});
