const BASE_URL = 'http://localhost:3000';

export const loginUser = async (email, password) => {
  console.log(email, password);
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  console.log(res);
  return res.json();
};

export const registerUser = async (userData) => {
  console.log('sending user:', userData);
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  console.log(res);
  console.log('User registered successfully');
  return res.json();
};