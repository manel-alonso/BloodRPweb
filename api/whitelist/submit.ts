import type { VercelRequest, VercelResponse } from '@vercel/node';

const DISCORD_API = 'https://discord.com/api/v10';

const FORM_QUESTIONS: { key: string; label: string }[] = [
  { key: 'characterName', label: 'Nombre de personaje' },
  { key: 'age', label: 'Edad' },
  { key: 'experience', label: 'Experiencia en roleplay' },
  { key: 'reason', label: '¿Por qué quieres unirte al servidor?' },
  { key: 'additional', label: 'Información adicional (opcional)' },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body as Record<string, unknown> | undefined;
  const userId = typeof body?.userId === 'string' ? body.userId : null;
  const username = typeof body?.username === 'string' ? body.username : 'Unknown';
  const answers = body?.answers as Record<string, string> | undefined;

  const botToken = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;
  const channelId = process.env.WHITELIST_REVIEW_CHANNEL_ID?.trim();
  const revisionRoleId = process.env.WHITELIST_REVISION_ROLE_ID?.trim();

  if (!userId || !botToken || !guildId || !channelId || !revisionRoleId) {
    return res.status(400).json({
      error: 'Missing required parameters',
      hint: 'Need userId, answers in body, and env: DISCORD_BOT_TOKEN, DISCORD_GUILD_ID, WHITELIST_REVIEW_CHANNEL_ID, WHITELIST_REVISION_ROLE_ID',
    });
  }

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Missing or invalid answers' });
  }

  const authHeader = { Authorization: `Bot ${botToken}` };

  try {
    const memberRes = await fetch(`${DISCORD_API}/guilds/${guildId}/members/${userId}`, {
      headers: authHeader,
    });

    if (memberRes.status === 404) {
      return res.status(400).json({ error: 'User is not in the server' });
    }

    if (!memberRes.ok) {
      const err = await memberRes.text();
      console.error('Discord member fetch error:', memberRes.status, err);
      return res.status(500).json({ error: 'Failed to fetch member' });
    }

    const member = (await memberRes.json()) as { roles: string[] };
    const userRoles = member.roles || [];

    if (userRoles.includes(revisionRoleId)) {
      return res.status(400).json({
        error: 'already_submitted',
        message: 'Ya has enviado tu solicitud. Espera a que el staff la revise.',
      });
    }

    const lines: string[] = [
      `**Nueva solicitud de whitelist**`,
      `**Usuario:** ${username} (<@${userId}>)`,
      `**ID:** ${userId}`,
      ``,
      `**Respuestas:**`,
    ];

    for (const { key, label } of FORM_QUESTIONS) {
      const value = answers[key] ?? '(sin respuesta)';
      lines.push(`**${label}:**\n${value}`);
      lines.push('');
    }

    const messageContent = lines.join('\n');

    const sendRes = await fetch(`${DISCORD_API}/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        ...authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: messageContent.slice(0, 2000),
      }),
    });

    if (!sendRes.ok) {
      const err = await sendRes.text();
      console.error('Discord message send error:', sendRes.status, err);
      return res.status(500).json({ error: 'Failed to send message to channel' });
    }

    const addRoleRes = await fetch(
      `${DISCORD_API}/guilds/${guildId}/members/${userId}/roles/${revisionRoleId}`,
      {
        method: 'PUT',
        headers: authHeader,
      }
    );

    if (!addRoleRes.ok) {
      const err = await addRoleRes.text();
      console.error('Discord add role error:', addRoleRes.status, err);
      return res.status(500).json({
        error: 'Message sent but failed to add role. Contact staff.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Solicitud enviada correctamente. El staff la revisará pronto.',
    });
  } catch (err) {
    console.error('Whitelist submit error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
