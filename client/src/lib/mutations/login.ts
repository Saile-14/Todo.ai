import { api } from "../axios";

export const Login = async (loginData: {email: string, password: string}) => {
    try {
        const { data } = await api.post('/login', loginData);
        console.log(data);
        return data;
      } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Login failed');
      }
}