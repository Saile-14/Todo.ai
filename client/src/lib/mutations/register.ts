import { api } from "../axios";

export const Register = async (registerData: {email: string, password: string}) => {
    try {
        const { data } = await api.post('/register', registerData);
        return data;
      } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Registration failed');
      }
}