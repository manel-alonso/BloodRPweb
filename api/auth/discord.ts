import type { VercelRequest, VercelResponse } from '@vercel/node';

const DISCORD_TOKEN_URL = 'https://discord.com/api/oauth2/token';
const DISCORD_USER_URL = 'https://discord.com/api/v10/users/@me';

function getAvatarUrl(userId: string, avatarHash: string | null): string {
  if (avatarHash) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=128`;
  }
  const defaultIndex = Number(BigInt(userId) >> 22n) % 6;
  return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const code = typeof req.query.code === 'string' ? req.query.code : req.body?.code;
  const redirectUri =
    typeof req.query.redirect_uri === 'string'
      ? req.query.redirect_uri
      : req.body?.redirect_uri;

  const clientId = process.env.DISCORD_CLIENT_ID || process.env.VITE_DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;

  if (!code || !redirectUri || !clientId || !clientSecret) {
    return res.status(400).json({
      error: 'Missing required parameters',
      hint: 'Need code, redirect_uri, and env: DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET',
    });
  }

  try {
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const tokenRes = await fetch(DISCORD_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenParams.toString(),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error('Discord token error:', tokenRes.status, err);
      return res.status(400).json({ error: 'Failed to exchange code for token' });
    }

    const tokenData = (await tokenRes.json()) as { access_token: string };
    const accessToken = tokenData.access_token;

    const userRes = await fetch(DISCORD_USER_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      const err = await userRes.text();
      console.error('Discord user error:', userRes.status, err);
      return res.status(400).json({ error: 'Failed to fetch user' });
    }

    const user = (await userRes.json()) as {
      id: string;
      username: string;
      avatar: string | null;
    };

    const avatarUrl = getAvatarUrl(user.id, user.avatar);
    return res.status(200).json({
      username: user.username,
      avatar: avatarUrl,
      id: user.id,
    });
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
