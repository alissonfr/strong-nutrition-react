import { Api } from "./axios-config";

interface Auth {
  token: string;
}

const auth = async (email: string, password: string): Promise<Auth | Error> => {
  try {
    const { data } = await Api.post('/auth/login', { email, password });

    if (data)
      return data;

    return new Error('Erro no login.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro no login.');
  }
};

export const AuthService = {
  auth,
};
