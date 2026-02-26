import type { VercelRequest, VercelResponse } from '@vercel/node';

const DISCORD_API = 'https://discord.com/api/v10';

const FORM_QUESTIONS: { key: string; label: string }[] = [
  { key: 'q1', label: '¿Qué es el rol de entorno y cómo se aplica correctamente en una situación de tiroteo en vía pública?' },
  { key: 'q2', label: 'Explica la diferencia entre IC (In Character) y OOC (Out Of Character) y da un ejemplo práctico de cada uno.' },
  { key: 'q3', label: '¿Qué es el MetaGaming? Describe una situación compleja donde podría ocurrir sin que el jugador se dé cuenta.' },
  { key: 'q4', label: 'Define PowerGaming y explica por qué está prohibido en servidores de roleplay serio.' },
  { key: 'q5', label: '¿Cómo actuarías correctamente si tu personaje recibe una herida de bala en el brazo?' },
  { key: 'q6', label: 'Explica qué es el Fearplay y cómo debe aplicarse ante múltiples atacantes armados.' },
  { key: 'q7', label: '¿Qué es el CK (Character Kill) y en qué situaciones debería aprobarse?' },
  { key: 'q8', label: 'Describe cómo desarrollarías la historia completa de tu personaje antes de entrar al servidor.' },
  { key: 'q9', label: '¿Qué harías si presencias un bug que te beneficia económicamente dentro del servidor?' },
  { key: 'q10', label: 'Explica qué es el Revenge Kill y por qué rompe la experiencia de rol.' },
  { key: 'q11', label: 'En una persecución policial en Los Santos, ¿qué límites de rol deberías respetar?' },
  { key: 'q12', label: '¿Cómo se debe iniciar correctamente un rol agresivo sin caer en PG o MG?' },
  { key: 'q13', label: 'Explica qué es el NLR (New Life Rule) y cómo afecta a tu memoria tras morir.' },
  { key: 'q14', label: 'Si eres policía y un amigo comete un delito IC, ¿cómo actuarías?' },
  { key: 'q15', label: '¿Qué significa interpretar correctamente el entorno de Los Santos y cómo afecta a la inmersión?' },
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
      return res.status(500).json({
        error: 'Failed to fetch member from Discord',
        code: 'DISCORD_MEMBER_FETCH',
        hint: memberRes.status === 401 ? 'Invalid bot token' : memberRes.status === 404 ? 'User or guild not found' : err.slice(0, 200),
      });
    }

    let member: { roles?: string[] };
    try {
      member = (await memberRes.json()) as { roles?: string[] };
    } catch (parseErr) {
      console.error('Discord member JSON parse error:', parseErr);
      return res.status(500).json({ error: 'Invalid Discord API response', code: 'PARSE_ERROR' });
    }
    const userRoles = member.roles || [];

    if (userRoles.includes(revisionRoleId)) {
      return res.status(400).json({
        error: 'already_submitted',
        message: 'Ya has enviado tu solicitud. Espera a que el staff la revise.',
      });
    }

    const header = [
      `**Nueva solicitud de whitelist**`,
      `**Usuario:** ${username} (<@${userId}>)`,
      `**ID:** ${userId}`,
      ``,
    ].join('\n');

    const answersText = FORM_QUESTIONS.map(({ key, label }) => {
      const value = answers[key] ?? '(sin respuesta)';
      return `**${label}**\n${value}\n`;
    }).join('\n');

    const fullContent = header + '**Respuestas:**\n\n' + answersText;
    const maxLen = 1900;
    const chunks: string[] = [];
    let remaining = fullContent;
    while (remaining.length > 0) {
      chunks.push(remaining.slice(0, maxLen));
      remaining = remaining.slice(maxLen);
    }

    for (const chunk of chunks) {
      const sendRes = await fetch(`${DISCORD_API}/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
          ...authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: chunk }),
      });

      if (!sendRes.ok) {
        const err = await sendRes.text();
        console.error('Discord message send error:', sendRes.status, err);
        return res.status(500).json({
          error: 'Failed to send message to channel',
          code: 'DISCORD_SEND_MESSAGE',
          hint: sendRes.status === 403 ? 'Bot lacks Send Messages in channel' : sendRes.status === 404 ? 'Channel not found' : err.slice(0, 200),
        });
      }
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
      let discordMsg = '';
      try {
        const parsed = JSON.parse(err) as { message?: string; code?: number };
        discordMsg = parsed.message || err;
      } catch {
        discordMsg = err;
      }
      return res.status(500).json({
        error: 'Message sent but failed to add role. Contact staff.',
        hint: discordMsg,
        code: addRoleRes.status === 403 ? 'ROLE_HIERARCHY' : undefined,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Solicitud enviada correctamente. El staff la revisará pronto.',
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Whitelist submit error:', err);
    return res.status(500).json({
      error: 'Internal server error',
      code: 'UNEXPECTED',
      hint: msg.slice(0, 200),
    });
  }
}
