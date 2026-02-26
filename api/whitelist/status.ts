import type { VercelRequest, VercelResponse } from '@vercel/node';

const DISCORD_API = 'https://discord.com/api/v10';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = typeof req.query.userId === 'string' ? req.query.userId : null;
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;
  const whitelistRoleIds = (process.env.WHITELIST_ROLE_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const revisionRoleId = process.env.WHITELIST_REVISION_ROLE_ID?.trim();

  if (!userId || !botToken || !guildId) {
    return res.status(400).json({
      error: 'Missing required parameters',
      hint: 'Need userId in query, and env: DISCORD_BOT_TOKEN, DISCORD_GUILD_ID',
    });
  }

  try {
    const memberRes = await fetch(`${DISCORD_API}/guilds/${guildId}/members/${userId}`, {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    });

    if (memberRes.status === 404) {
      return res.status(200).json({
        status: 'not_in_server',
        message: 'No estás en el servidor de Discord.',
        roles: [],
      });
    }

    if (!memberRes.ok) {
      const err = await memberRes.text();
      console.error('Discord member fetch error:', memberRes.status, err);
      return res.status(500).json({
        error: 'Failed to fetch member',
        status: 'unknown',
      });
    }

    const member = (await memberRes.json()) as { roles: string[] };
    const userRoles = member.roles || [];

    const isWhitelisted =
      whitelistRoleIds.length === 0
        ? false
        : userRoles.some((roleId) => whitelistRoleIds.includes(roleId));
    const hasSubmittedRevision =
      !!revisionRoleId && userRoles.includes(revisionRoleId);

    return res.status(200).json({
      status: isWhitelisted ? 'whitelisted' : 'pending',
      message: isWhitelisted
        ? 'Estás en la whitelist del servidor.'
        : hasSubmittedRevision
          ? 'Tu solicitud está en revisión. Espera a que el staff te responda.'
          : 'Tu solicitud está pendiente o no tienes el rol de whitelist.',
      roles: userRoles,
      hasSubmittedRevision,
    });
  } catch (err) {
    console.error('Whitelist API error:', err);
    return res.status(500).json({
      error: 'Internal server error',
      status: 'unknown',
    });
  }
}
