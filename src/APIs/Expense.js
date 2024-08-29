const token = JSON.parse(localStorage.getItem("Token"));
export const fetchExpenditure = async ([activeFilter, token]) => {
  try {
    const userRoles = JSON.parse(localStorage.getItem("Role"));
    let url;
    if (userRoles == "admin") {
      url = `${process.env.REACT_APP_BACKEND_URL}/expenditure/admin/?tag=${activeFilter}`;
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/expenditure/?tag=${activeFilter}`;
    }
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Token: token,
      },
      credentials: "include",
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch expenditure:", error);
    throw error;
  }
};

export const addExpenditure = async (newExpense) => {
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

export const deleteExpenditure = async (expenseId) => {
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
