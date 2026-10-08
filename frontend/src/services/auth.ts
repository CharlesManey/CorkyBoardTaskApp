import { apiUrl } from "./api";

export interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
  message?: string;
}

async function readAuthResponse(response: Response, fallbackMessage: string): Promise<AuthResponse> {
  let data: AuthResponse;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      `The API returned an empty or invalid response (HTTP ${response.status}). Check that VITE_API_BASE_URL points to your deployed backend.`,
    );
  }

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
}

export async function login(credentials: { email?: string; password?: string }): Promise<AuthResponse> {
  const response = await fetch(apiUrl('/api/user/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  return readAuthResponse(response, 'Login failed');
}

export async function signUp(userData: { username?: string; email?: string; password?: string }): Promise<AuthResponse> {
  const response = await fetch(apiUrl('/api/user/register'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  return readAuthResponse(response, 'Signup failed');
}