import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppAppBar from '../marketing-page/components/AppAppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useAuth } from '../contexts/AuthContext';
import { useWhitelistStatus } from '../contexts/WhitelistStatusContext';
import { assetUrl } from '../utils/assetUrl';

const YOUTUBE_VIDEO_ID = 'oTmImIk9Ukk';
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;

const DISCORD_INVITE = (import.meta.env.VITE_DISCORD_INVITE_URL as string) || 'https://discord.gg';

const FORM_FIELDS: { key: string; label: string; required: boolean }[] = [
  { key: 'q1', label: '¿Qué es el rol de entorno y cómo se aplica correctamente en una situación de tiroteo en vía pública?', required: true },
  { key: 'q2', label: 'Explica la diferencia entre IC (In Character) y OOC (Out Of Character) y da un ejemplo práctico de cada uno.', required: true },
  { key: 'q3', label: '¿Qué es el MetaGaming? Describe una situación compleja donde podría ocurrir sin que el jugador se dé cuenta.', required: true },
  { key: 'q4', label: 'Define PowerGaming y explica por qué está prohibido en servidores de roleplay serio.', required: true },
  { key: 'q5', label: '¿Cómo actuarías correctamente si tu personaje recibe una herida de bala en el brazo?', required: true },
  { key: 'q6', label: 'Explica qué es el Fearplay y cómo debe aplicarse ante múltiples atacantes armados.', required: true },
  { key: 'q7', label: '¿Qué es el CK (Character Kill) y en qué situaciones debería aprobarse?', required: true },
  { key: 'q8', label: 'Describe cómo desarrollarías la historia completa de tu personaje antes de entrar al servidor.', required: true },
  { key: 'q9', label: '¿Qué harías si presencias un bug que te beneficia económicamente dentro del servidor?', required: true },
  { key: 'q10', label: 'Explica qué es el Revenge Kill y por qué rompe la experiencia de rol.', required: true },
  { key: 'q11', label: 'En una persecución policial en Los Santos, ¿qué límites de rol deberías respetar?', required: true },
  { key: 'q12', label: '¿Cómo se debe iniciar correctamente un rol agresivo sin caer en PG o MG?', required: true },
  { key: 'q13', label: 'Explica qué es el NLR (New Life Rule) y cómo afecta a tu memoria tras morir.', required: true },
  { key: 'q14', label: 'Si eres policía y un amigo comete un delito IC, ¿cómo actuarías?', required: true },
  { key: 'q15', label: '¿Qué significa interpretar correctamente el entorno de Los Santos y cómo afecta a la inmersión?', required: true },
];

type WhitelistStatus = 'whitelisted' | 'pending' | 'not_in_server' | 'unknown';

interface WhitelistResponse {
  status: WhitelistStatus;
  message: string;
  roles?: string[];
  hasSubmittedRevision?: boolean;
}

function getApiUrl(): string {
  const base = import.meta.env.BASE_URL || '/';
  return (
    (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ||
    window.location.origin + (base === '/' ? '' : base.replace(/\/$/, ''))
  );
}

export default function WhitelistPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [data, setData] = useState<WhitelistResponse | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { setStatus: setWhitelistStatus } = useWhitelistStatus();

  const fetchStatus = useCallback(async () => {
    if (!user?.id) return;
    setStatus('loading');
    setErrorDetail(null);
    try {
      const res = await fetch(
        `${getApiUrl()}/api/whitelist/status?userId=${encodeURIComponent(user.id)}`
      );
      if (res.ok) {
        const json = (await res.json()) as WhitelistResponse;
        setData(json);
        setStatus('success');
        setWhitelistStatus(json.status, json.hasSubmittedRevision);
      } else {
        setErrorDetail(`api_${res.status}`);
        setStatus('error');
        if (import.meta.env.DEV) {
          console.error('Whitelist API error:', res.status, await res.text());
        }
      }
    } catch (err) {
      setErrorDetail('network');
      setStatus('error');
      if (import.meta.env.DEV) {
        console.error('Whitelist fetch failed:', err);
      }
    }
  }, [user?.id, setWhitelistStatus]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!user.id) {
      setStatus('error');
      setErrorDetail('no_id');
      return;
    }

    fetchStatus();
  }, [user, navigate, fetchStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || submitStatus === 'submitting') return;

    const answers: Record<string, string> = {};
    for (const { key } of FORM_FIELDS) {
      answers[key] = formValues[key] ?? '';
    }

    setSubmitStatus('submitting');
    setSubmitError(null);

    try {
      const res = await fetch(`${getApiUrl()}/api/whitelist/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          username: user.username,
          answers,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success) {
        setSubmitStatus('success');
        fetchStatus();
      } else {
        setSubmitStatus('error');
        let msg = json.message || json.error || 'Error al enviar. Inténtalo más tarde.';
        if (json.code === 'ROLE_HIERARCHY') {
          msg += ' El staff debe mover el rol del bot por encima del rol WhitelistRevision en Configuración del servidor > Roles.';
        }
        setSubmitError(msg);
      }
    } catch {
      setSubmitStatus('error');
      setSubmitError('Error de conexión. Inténtalo más tarde.');
    }
  };

  if (!user) return null;

  const statusColor =
    data?.status === 'whitelisted'
      ? 'success'
      : data?.status === 'pending'
        ? 'warning'
        : data?.status === 'not_in_server'
          ? 'error'
          : 'default';

  const statusLabel =
    data?.status === 'whitelisted'
      ? 'En la whitelist'
      : data?.status === 'pending'
        ? data?.hasSubmittedRevision
          ? 'En revisión'
          : 'Pendiente'
        : data?.status === 'not_in_server'
          ? 'No estás en el servidor'
          : 'Desconocido';

  const showForm =
    data?.status === 'pending' &&
    !data?.hasSubmittedRevision &&
    submitStatus !== 'success';

  return (
    <>
      <AppAppBar />
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: 'calc(var(--template-frame-height, 0px) + 120px)',
          pb: 4,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Box
            component="iframe"
            src={YOUTUBE_EMBED_URL}
            title="Blood RP background"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '56.25vw',
              minHeight: '100vh',
              minWidth: '177.78vh',
              transform: 'translate(-50%, -50%) scale(1.15)',
              filter: 'blur(6px)',
              border: 'none',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.9) 100%)',
            }}
          />
        </Box>

        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 1,
            maxHeight: 'calc(100vh - 140px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            py: 2,
            '&::-webkit-scrollbar': { width: 8 },
            '&::-webkit-scrollbar-track': { bgcolor: 'rgba(0,0,0,0.2)' },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'rgba(255,255,255,0.3)',
              borderRadius: 4,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
            },
          }}
        >
          <Card
            variant="outlined"
            sx={{
              p: 4,
              textAlign: 'center',
              borderColor: 'rgba(255,255,255,0.12)',
              backgroundColor: 'rgba(18,18,18,0.85)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <CardContent sx={{ '&:last-child': { pb: 4 } }}>
              <Box
                component="img"
                src={assetUrl('LOGO_png.png')}
                alt="Blood RP"
                sx={{
                  height: 48,
                  width: 'auto',
                  maxWidth: 160,
                  objectFit: 'contain',
                  mb: 3,
                }}
              />
              <Typography
                variant="h5"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700, color: '#fff' }}
              >
                Estado de Whitelist
              </Typography>

              {status === 'loading' && (
                <>
                  <CircularProgress sx={{ my: 3, color: '#fff' }} />
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,255,255,0.8)' }}
                  >
                    Comprobando tu estado...
                  </Typography>
                </>
              )}

              {status === 'success' && data && (
                <>
                  <Chip
                    label={statusLabel}
                    color={statusColor}
                    sx={{
                      mb: 2,
                      fontWeight: 700,
                      fontSize: '1rem',
                      py: 1.5,
                      px: 2,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, color: 'rgba(255,255,255,0.8)' }}
                  >
                    {data.message}
                  </Typography>

                  {data.status === 'not_in_server' && (
                    <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                      <Button
                        variant="contained"
                        color="primary"
                        href={DISCORD_INVITE}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Unirse al Discord
                      </Button>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={fetchStatus}
                        sx={{ borderColor: 'rgba(255,255,255,0.3)' }}
                      >
                        Actualizar estado
                      </Button>
                    </Stack>
                  )}

                  {data.status === 'pending' && data.hasSubmittedRevision && (
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      Recibirás una respuesta en Discord cuando el staff revise tu solicitud.
                    </Typography>
                  )}

                  {showForm && (
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{
                        textAlign: 'left',
                        mt: 3,
                        '& .MuiTextField-root': { mb: 2 },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: '#fff', mb: 2, fontWeight: 600 }}
                      >
                        Completa el formulario para solicitar la whitelist:
                      </Typography>
                      {FORM_FIELDS.map(({ key, label, required }) => (
                        <Box key={key} sx={{ mb: 3 }}>
                          <Typography
                            component="label"
                            htmlFor={`whitelist-${key}`}
                            sx={{
                              display: 'block',
                              color: 'rgba(255,255,255,0.9)',
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              mb: 1,
                            }}
                          >
                            {label}
                            {required && ' *'}
                          </Typography>
                          <TextField
                            id={`whitelist-${key}`}
                            fullWidth
                            required={required}
                            multiline
                            minRows={4}
                            placeholder="Escribe tu respuesta..."
                            value={formValues[key] ?? ''}
                            onChange={(e) =>
                              setFormValues((prev) => ({ ...prev, [key]: e.target.value }))
                            }
                            variant="outlined"
                            InputProps={{
                              sx: {
                                color: '#fff',
                                alignItems: 'flex-start',
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                '&.Mui-focused fieldset': { borderColor: 'rgba(255,255,255,0.7)' },
                              },
                            }}
                            sx={{
                              '& .MuiOutlinedInput-input': {
                                color: '#fff',
                                '&::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1 },
                              },
                            }}
                          />
                        </Box>
                      ))}
                      {submitError && (
                        <Typography
                          variant="body2"
                          sx={{ color: '#f44336', mb: 2 }}
                        >
                          {submitError}
                        </Typography>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submitStatus === 'submitting'}
                        fullWidth
                      >
                        {submitStatus === 'submitting'
                          ? 'Enviando...'
                          : 'Enviar solicitud'}
                      </Button>
                    </Box>
                  )}

                  {submitStatus === 'success' && (
                    <Typography
                      variant="body1"
                      sx={{ color: '#4caf50', mt: 2, fontWeight: 500 }}
                    >
                      ¡Solicitud enviada! El staff la revisará pronto.
                    </Typography>
                  )}
                </>
              )}

              {status === 'error' && (
                <>
                  <Typography
                    variant="body1"
                    sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}
                  >
                    {errorDetail === 'no_id'
                      ? 'Tu sesión no tiene los datos necesarios. Cierra sesión e inicia sesión de nuevo con Discord para ver tu estado de whitelist.'
                      : errorDetail === 'network'
                        ? 'No se pudo conectar con el servidor. Si estás en local, añade VITE_API_URL en .env apuntando a tu despliegue en Vercel.'
                        : 'No se pudo conectar con el servidor. Inténtalo más tarde.'}
                  </Typography>
                  {errorDetail === 'no_id' && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        localStorage.removeItem('bloodrp_auth');
                        const base = import.meta.env.BASE_URL || '/';
                        window.location.href = base === '/' ? '/' : base;
                      }}
                      sx={{ mb: 2 }}
                    >
                      Cerrar sesión e iniciar de nuevo
                    </Button>
                  )}
                </>
              )}

              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate('/')}
                sx={{ mt: 3, borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Volver al inicio
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
