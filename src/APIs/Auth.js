export const loginUser = async (email, pass) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    withCredentials: true,
    body: JSON.stringify({
      email: email,
      pass: pass,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const signupUser = async (email, pass) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
    method: "POST",
    credentials: "include",
    withCredentials: true,
    body: JSON.stringify({
      email: email,
      pass: pass,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
