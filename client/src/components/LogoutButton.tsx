import { currentUserAtom } from '@/lib/atoms';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router';

const LogoutButton = () => {

  const [_, setCurrentUser] = useAtom(currentUserAtom)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null)
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;