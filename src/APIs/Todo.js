const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const giveErrorChance = () => {
  const chance = Math.random();
  if (chance > 0.5) {
    throw Error("Some thing went wrong, (It is to test SWR Rollback)");
  }
  return;
};

export const getTodo = async () => {
  await delay();
  const res = await fetch(process.env.REACT_APP_API_URL, { method: "GET" });
  const data = await res.json();
  return data.sort((a, b) => b.id - a.id);
};

export const addTodo = async ({ userId, title, completed }) => {
  await delay();
  giveErrorChance();
  const res = await fetch(process.env.REACT_APP_API_URL, {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      title: title,
      completed: completed,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const updateTodo = async (todo) => {
  await delay();
  giveErrorChance();
  const res = await fetch(`${process.env.REACT_APP_API_URL}/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...todo,
    }),
  });
  const data = await res.json();
  return data;
};

export const deleteTodo = async (id) => {
  await delay();
  giveErrorChance();
  const res = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
