import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/products', async (req, res) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}