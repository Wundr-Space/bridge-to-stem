import { useEffect, useState, useCallback, createContext, useContext, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface AuthState {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Map roles to their dashboard routes
const ROLE_DASHBOARDS: Record<AppRole, string> = {
  corporate: "/corporate-dashboard",
  school: "/school-dashboard",
  mentor: "/mentor-dashboard",
};

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/corporate-signup",
  "/mentor-signup",
  "/school-signup",
  "/for-corporates",
  "/for-schools",
  "/for-mentors",
  "/for-students",
  "/terms",
  "/privacy",
  "/forgot-password",
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    role: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const fetchUserRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching role:", error);
      }

      setAuthState((prev) => ({
        ...prev,
        role: data?.role ?? null,
        isLoading: false,
        isAuthenticated: true,
      }));
    } catch (error) {
      console.error("Error in fetchUserRole:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setAuthState((prev) => ({
        ...prev,
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
      }));

      // Defer role fetch to avoid deadlock
      if (session?.user) {
        setTimeout(() => {
          fetchUserRole(session.user.id);
        }, 0);
      } else {
        setAuthState((prev) => ({
          ...prev,
          role: null,
          isLoading: false,
          isAuthenticated: false,
        }));
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState((prev) => ({
        ...prev,
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
      }));

      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserRole]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setAuthState({
      user: null,
      session: null,
      role: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  const refreshRole = useCallback(async () => {
    if (authState.user) {
      await fetchUserRole(authState.user.id);
    }
  }, [authState.user, fetchUserRole]);

  return (
    <AuthContext.Provider value={{ ...authState, signOut, refreshRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  // Fallback for components not wrapped in AuthProvider
  const [fallbackState, setFallbackState] = useState<AuthState>({
    user: null,
    session: null,
    role: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    if (context) return;

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setFallbackState((prev) => ({
        ...prev,
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
      }));

      if (session?.user) {
        setTimeout(async () => {
          const { data } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", session.user.id)
            .maybeSingle();

          setFallbackState((prev) => ({
            ...prev,
            role: data?.role ?? null,
            isLoading: false,
          }));
        }, 0);
      } else {
        setFallbackState((prev) => ({
          ...prev,
          role: null,
          isLoading: false,
          isAuthenticated: false,
        }));
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setFallbackState((prev) => ({
        ...prev,
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
      }));

      if (session?.user) {
        const { data } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .maybeSingle();

        setFallbackState((prev) => ({
          ...prev,
          role: data?.role ?? null,
          isLoading: false,
        }));
      } else {
        setFallbackState((prev) => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, [context]);

  if (context) {
    return context;
  }

  return {
    ...fallbackState,
    signOut: async () => {
      await supabase.auth.signOut();
    },
    refreshRole: async () => {},
  };
}

export function useRequireRole(requiredRole: AppRole) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.user) {
        // Not logged in - redirect to login with return URL
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      } else if (auth.role && auth.role !== requiredRole) {
        // Logged in but wrong role - redirect to their correct dashboard
        const correctDashboard = ROLE_DASHBOARDS[auth.role];
        navigate(correctDashboard);
      }
    }
  }, [auth.isLoading, auth.user, auth.role, requiredRole, navigate, location.pathname]);

  return auth;
}

export function useRequireAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.user) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    }
  }, [auth.isLoading, auth.user, navigate, location.pathname]);

  return auth;
}

export function useRedirectIfAuthenticated(defaultRedirect?: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated && auth.role) {
      // Get redirect URL from query params or use role-based dashboard
      const params = new URLSearchParams(location.search);
      const redirectTo = params.get("redirect") || defaultRedirect || ROLE_DASHBOARDS[auth.role];
      navigate(redirectTo);
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.role, navigate, location.search, defaultRedirect]);

  return auth;
}

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}?`)
  );
}

export function getDashboardForRole(role: AppRole): string {
  return ROLE_DASHBOARDS[role];
}
