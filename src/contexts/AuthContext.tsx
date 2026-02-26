import * as React from 'react';

const AUTH_STORAGE_KEY = 'bloodrp_auth';

export interface AuthUser {
  username: string;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
}

interface AuthContextValue extends AuthState {
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

function loadStoredUser(): AuthUser | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as AuthUser;
      return parsed?.username ? parsed : null;
    }
  } catch {
    // ignore
  }
  return null;
}

function saveUser(user: AuthUser | null) {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = React.useState<AuthUser | null>(loadStoredUser);

  const setUser = React.useCallback((newUser: AuthUser | null) => {
    setUserState(newUser);
    saveUser(newUser);
  }, []);

  const logout = React.useCallback(() => {
    setUserState(null);
    saveUser(null);
  }, []);

  const value = React.useMemo(
    () => ({ user, setUser, logout }),
    [user, setUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
