import "../assets/Dashboard.css";
import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { Input, Spin, Table } from "antd";

function Dashboard() {
  const nav = useNavigate();
  const {
    state,
    dispatch,
    handleAddExpense,
    handleDeleteExpense,
    setActiveFilter,
    activeFilter,
  } = useContext(ExpenseContext);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Token"));
    if (!token) {
      nav("/auth");
    }
  }, [nav]);

  const [newDetails, setNewDetails] = useState({
    title: "",
    amount: 0,
    exptype: "expense",
  });

  const handleAddClick = () => {
    handleAddExpense({
      title: newDetails.title,
      exptype: newDetails.exptype,
      amount: Number(newDetails.amount),
    });
    setNewDetails({
      title: "",
      amount: 0,
      exptype: "expense",
    });
  };

  const handleDeleteClick = (exp) => {
    handleDeleteExpense(exp.expenseid, exp.amount);
  };

  const columns = [
    {
      title: "Id",
      key: "id",
      width: 70,
      align: "center",
      render: (text, record, index) =>
        record.key !== "Total" ? index + 1 : null,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "Title",
      width: 300,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "Amount",
      width: 150,
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "exptype",
      key: "exptype",
      width: 150,
      align: "center",
    },
    {
      render: (text, record) =>
        record.key !== "Total" ? (
          <DeleteOutlined
            className="deleteButton"
            onClick={() => {
              handleDeleteClick(record);
            }}
          />
        ) : null,
      width: 50,
      align: "center",
    },
  ];

  const getDataSourceWithTotal = (data) => {
    const dataWithTotal = [
      ...data,
      {
        expenseid: "Total",
        key: "Total",
        title: "Total",
        amount: state.total,
        exptype: "",
      },
    ];
    return dataWithTotal;
  };

  return (
    <div className="container">
      <h1 className="heading">Expense Tracker</h1>
      <div className="content">
        <div className="inputCont">
          <label>Title</label>
          <Input
            type="text"
            value={newDetails.title}
            onChange={(e) => {
              setNewDetails((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
            placeholder="Enter Expense title"
          />
        </div>
        <div className="inputCont">
          <label>Amount:</label>
          <Input
            type="number"
            placeholder="Enter Expense Amount"
            value={newDetails.amount}
            onChange={(e) => {
              setNewDetails((prev) => ({
                ...prev,
                amount: e.target.value,
              }));
            }}
          />
        </div>
        <div className="inputCont">
          <label style={{ display: "block" }}>Type:</label>
          <select
            className="dropdown"
            value={newDetails.exptype}
            onChange={(e) => {
              setNewDetails((prev) => ({
                ...prev,
                exptype: e.target.value,
              }));
            }}
            style={{ fontSize: "large", textAlign: "center" }}
          >
            <option value="income">income</option>
            <option value="expense">expense</option>
          </select>
        </div>
        <div>
          <button className="button" onClick={handleAddClick}>
            Add
          </button>
        </div>
      </div>
      <div className="tabContainer">
        <span
          className={`tab ${activeFilter === "all" ? "selected" : ""}`}
          id="all"
          onClick={() => setActiveFilter("all")}
        >
          All
        </span>
        <span
          className={`tab ${activeFilter === "income" ? "selected" : ""}`}
          id="income"
          onClick={() => setActiveFilter("income")}
        >
          Income
        </span>
        <span
          className={`tab ${activeFilter === "expense" ? "selected" : ""}`}
          id="expense"
          onClick={() => setActiveFilter("expense")}
        >
          Expense
        </span>
      </div>
      {state.loading ? (
        <div style={{ marginLeft: "25vw", marginTop: "10vh" }}>
          <Spin></Spin>
        </div>
      ) : (
        <Table
          rowClassName={(record) =>
            record.key === "Total"
              ? "table-black"
              : record.exptype === "income"
              ? "table-green"
              : "table-red"
          }
          dataSource={getDataSourceWithTotal(state.allExp)} // Use filtered data here
          columns={columns}
          pagination={{ pageSize: 10, position: ["bottomCenter"] }}
        />
      )}
    </div>
  );
}

export default Dashboard;
