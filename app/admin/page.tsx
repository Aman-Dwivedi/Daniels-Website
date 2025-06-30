'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Server, Clock, Activity, LogOut, User } from 'lucide-react';

interface AdminMessage {
  title: string;
  message: string;
  timestamp: string;
  status: string;
  adminInfo?: {
    username: string;
    lastLogin: string;
  };
}

interface ServerStatus {
  server: string;
  uptime: number;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
  authenticatedUser: string;
}

interface AdminUser {
  id: string;
  username: string;
  role: string;
  lastLogin: string;
}

export default function AdminPage() {
  const [message, setMessage] = useState<AdminMessage | null>(null);
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const getAuthToken = () => {
    return localStorage.getItem('adminToken');
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    const token = getAuthToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Fetch admin message
      const messageResponse = await fetch('http://localhost:5000/api/admin/message', { headers });
      if (!messageResponse.ok) {
        if (messageResponse.status === 401 || messageResponse.status === 403) {
          logout();
          return;
        }
        throw new Error('Failed to fetch message from backend');
      }
      const messageData = await messageResponse.json();
      setMessage(messageData);

      // Fetch server status
      const statusResponse = await fetch('http://localhost:5000/api/admin/status', { headers });
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        setStatus(statusData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async () => {
    const token = getAuthToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        logout();
        return;
      }

      const data = await response.json();
      setUser(data.admin);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const formatMemory = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Welcome back, {user.username}!
              </p>
            </div>
            <Button 
              onClick={logout} 
              variant="outline" 
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* User Info */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {user.username}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Role: {user.role} • Last login: {new Date(user.lastLogin).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center mb-6">
            <Button 
              onClick={fetchData} 
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>

          {/* Error State */}
          {error && (
            <Card className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Server className="h-5 w-5" />
                  <span className="font-medium">Connection Error</span>
                </div>
                <p className="mt-2 text-red-700 dark:text-red-300">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Main Message Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Backend Message
              </CardTitle>
              <CardDescription>
                Authenticated message from the Node.js backend server
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2"></div>
                </div>
              ) : message ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {message.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                      {message.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      Status: {message.status}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400">No message available</p>
              )}
            </CardContent>
          </Card>

          {/* Server Status Card */}
          {status && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Server Status
                </CardTitle>
                <CardDescription>
                  Real-time backend server information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-sm font-medium text-green-800 dark:text-green-200">
                      Server Status
                    </div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400 capitalize">
                      {status.server}
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Uptime
                    </div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {formatUptime(status.uptime)}
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      Memory Used
                    </div>
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {formatMemory(status.memory.heapUsed)}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Authenticated as: <span className="font-medium">{status.authenticatedUser}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 