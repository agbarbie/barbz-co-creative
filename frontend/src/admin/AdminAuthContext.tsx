import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api } from '../api/client';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

interface AuthResponse {
  user: AdminUser;
  token: string;
}

interface AdminAuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('barbz_admin_user');
    const token = localStorage.getItem('barbz_token');
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post<AuthResponse>('/auth/login', { email, password });
    if (res.user.role !== 'admin') {
      throw new Error('This account does not have admin access.');
    }
    localStorage.setItem('barbz_token', res.token);
    localStorage.setItem('barbz_admin_user', JSON.stringify(res.user));
    setUser(res.user);
  }

  function logout() {
    localStorage.removeItem('barbz_token');
    localStorage.removeItem('barbz_admin_user');
    setUser(null);
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
