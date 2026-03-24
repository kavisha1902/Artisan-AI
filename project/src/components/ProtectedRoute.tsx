import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  allowedUserType?: 'artisan' | 'ngo';
}

export default function ProtectedRoute({ allowedUserType }: ProtectedRouteProps) {
  const { isAuthenticated, userType, isGuestMode } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedUserType && userType !== allowedUserType) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {isGuestMode && (
        <div className="bg-accent-mustard text-white py-2 px-4 text-center text-sm">
          <span className="font-semibold">Demo Mode:</span> Limited features available. 
          <button className="ml-2 underline" onClick={() => window.location.href = '/artisan/signup'}>
            Upgrade to Full Account
          </button>
        </div>
      )}
      <Outlet />
    </>
  );
}

