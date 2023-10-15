import { Api } from "./axios-config";

interface Auth {
  token: string;
}

const auth = async (email: string, password: string): Promise<Auth> => {
  return await Api.post('/auth/login', { email, password });
};

export const AuthService = {
  auth,
};
