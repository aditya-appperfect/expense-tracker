export const fetchExpenditure = async (params, tag = "all") => {
  console.log(params)
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/expenditure/?tag=${tag}`,
      {
        method: "GET",
        headers: {
          Token: params[1],
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch expenditure:", error);
    throw error;
  }
};

export const addExpenditure = async (token, newExpense) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/expenditure/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        credentials: "include",
        body: JSON.stringify(newExpense),
      }
    );

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to add expenditure:", error);
    throw error;
  }
};

export const deleteExpenditure = async (token, expenseId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/expenditure/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        credentials: "include",
        body: JSON.stringify({ expenseid: expenseId }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to delete expenditure:", error);
    throw error;
  }
};
