import { Hono } from 'hono';
import axios from 'axios';
import { cors } from 'hono/cors';

const app = new Hono();

// CORSを有効化
app.use('*', cors({
  origin: 'https://yoshinon-gacha.pages.dev',
  credentials: true
}));

// プロキシエンドポイント
app.get('/api/proxy', async (c) => {
  const targetUrl = c.req.query('url');
  if (!targetUrl) {
    return c.json({ error: 'URL is required.' }, 400);
  }

  try {
    const { data: html } = await axios.get(targetUrl);
    return c.text(html); // HTMLをそのまま返す
  } catch (error) {
    console.error('Failed to fetch target URL:', error);
    return c.json({ error: 'Failed to fetch the target URL.' }, 500);
  }
});

export default app;
