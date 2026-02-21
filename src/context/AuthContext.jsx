import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginRequest, registerRequest } from '../services/auth';

const AuthContext = createContext(null);
const TOKEN_KEY = 'mjltechs_token';
const USER_KEY = 'mjltechs_user';

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const loadStoredAuth = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = safeParse(localStorage.getItem(USER_KEY));
  if (token && user) {
    return { token, user };
  }
  return { token: null, user: null };
};

const inferRole = (email = '') => {
  const value = email.toLowerCase();
  if (value.includes('admin')) return 'admin';
  if (value.includes('dev')) return 'developer';
  return 'client';
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => loadStoredAuth());
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuth(loadStoredAuth());
    setReady(true);
  }, []);

  const persist = (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  const clear = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await loginRequest(credentials);
      const data = response?.data ?? {};
      const nextUser = data.user ?? {
        name: data.name ?? 'MJLTechs User',
        email: credentials.email,
        role: data.role ?? inferRole(credentials.email),
        company: data.company
      };
      const nextToken =
        data.token ?? data.accessToken ?? `mock-token-${Date.now()}`;
      persist(nextToken, nextUser);
      setAuth({ token: nextToken, user: nextUser });
      return { success: true };
    } catch (error) {
      if (!error.response) {
        const nextUser = {
          name: credentials.name ?? 'MJLTechs User',
          email: credentials.email,
          role: inferRole(credentials.email),
          company: credentials.company
        };
        const nextToken = `mock-token-${Date.now()}`;
        persist(nextToken, nextUser);
        setAuth({ token: nextToken, user: nextUser });
        return { success: true, fallback: true };
      }
      const message =
        error.response?.data?.message ??
        'Unable to sign in. Please check your credentials.';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const response = await registerRequest(payload);
      const data = response?.data ?? {};
      const nextUser = data.user ?? {
        name: payload.name,
        email: payload.email,
        role: payload.role ?? inferRole(payload.email),
        company: payload.company
      };
      const nextToken =
        data.token ?? data.accessToken ?? `mock-token-${Date.now()}`;
      persist(nextToken, nextUser);
      setAuth({ token: nextToken, user: nextUser });
      return { success: true };
    } catch (error) {
      if (!error.response) {
        const nextUser = {
          name: payload.name,
          email: payload.email,
          role: payload.role ?? inferRole(payload.email),
          company: payload.company
        };
        const nextToken = `mock-token-${Date.now()}`;
        persist(nextToken, nextUser);
        setAuth({ token: nextToken, user: nextUser });
        return { success: true, fallback: true };
      }
      const message =
        error.response?.data?.message ??
        'Unable to create account. Please try again.';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clear();
    setAuth({ token: null, user: null });
  };

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      isAuthenticated: Boolean(auth.token),
      login,
      register,
      logout,
      loading,
      ready
    }),
    [auth, loading, ready]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};