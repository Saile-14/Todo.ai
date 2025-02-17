import { currentUserAtom } from '@/lib/atoms';
import { useAtom } from 'jotai';
import { Navigate } from 'react-router';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [currentUser] = useAtom(currentUserAtom)

  if (currentUser == null) {
    return <Navigate to="/login" replace />;
  } else {}

  return <>{children}</>;
};

export default ProtectedRoute;