import * as React from 'react';

export type WhitelistStatus = 'whitelisted' | 'pending' | 'not_in_server' | 'unknown' | null;

interface WhitelistStatusContextValue {
  status: WhitelistStatus;
  hasSubmittedRevision?: boolean;
  setStatus: (status: WhitelistStatus, hasSubmittedRevision?: boolean) => void;
  label: string;
}

const WhitelistStatusContext = React.createContext<WhitelistStatusContextValue | null>(null);

function getLabel(status: WhitelistStatus, hasSubmittedRevision?: boolean): string {
  if (status === 'pending' && hasSubmittedRevision) return 'En revisión';
  switch (status) {
    case 'whitelisted':
      return 'En la whitelist';
    case 'pending':
      return 'Pendiente';
    case 'not_in_server':
      return 'No en servidor';
    case 'unknown':
      return 'Desconocido';
    default:
      return '';
  }
}

export function WhitelistStatusProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatusState] = React.useState<WhitelistStatus>(null);
  const [hasSubmittedRevision, setHasSubmittedRevision] = React.useState(false);

  const setStatus = React.useCallback(
    (newStatus: WhitelistStatus, hasSubmitted?: boolean) => {
      setStatusState(newStatus);
      setHasSubmittedRevision(hasSubmitted ?? false);
    },
    []
  );

  const value = React.useMemo(
    () => ({
      status,
      hasSubmittedRevision,
      setStatus,
      label: getLabel(status, hasSubmittedRevision),
    }),
    [status, hasSubmittedRevision, setStatus]
  );

  return (
    <WhitelistStatusContext.Provider value={value}>
      {children}
    </WhitelistStatusContext.Provider>
  );
}

export function useWhitelistStatus() {
  const context = React.useContext(WhitelistStatusContext);
  return context ?? { status: null, setStatus: () => {}, label: '' };
}
