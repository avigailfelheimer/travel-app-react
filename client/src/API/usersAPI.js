const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'שגיאה בהתחברות');
  // data = { success: true, user, token }
  return { user: data.user, token: data.token };
};

export const registerUser = async (userName, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'שגיאה בהרשמה');
  // data = { user, token }
  return { user: data.user, token: data.token };
};
