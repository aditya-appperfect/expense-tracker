import "./assets/Dashboard.css";
import React, {
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import { Color } from "antd/es/color-picker";

function Dashboard() {
  const { state, dispatch } = useContext(ExpenseContext);
  const nav = useNavigate();
  const [newDetails, setNewDetails] = useState({
    title: "",
    amount: null,
    type: "expense",
  });

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      nav("/auth");
    }
  }, []);

  const handleAdd = useCallback(() => {
    const newExpense = {
      title: newDetails.title,
      type: newDetails.type,
      amount: newDetails.amount ?? 0,
    };
    dispatch({ type: "Add", payload: newExpense });
    setNewDetails({
      title: "",
      amount: null,
      type: "expense",
    });
  }, [newDetails]);

  const handleDelete = (id, amount, type) => {
    dispatch({ type: "Delete", payload: { id, amount, type } });
  };

  const handleFilterChange = useCallback((filter) => {
    dispatch({ type: "Filter", payload: filter });
    const tabArray = document.getElementsByClassName("tab");
    for (let tabEle of tabArray) {
      if (tabEle.id == filter) {
        tabEle.classList.add("selected");
      } else {
        tabEle.classList.remove("selected");
      }
    }
  }, []);

  const filterExp = useMemo(() => {
    if (state?.activeFilter == "all") {
      return state?.allExp;
    }
    return state?.allExp?.filter((exp) => exp.type == state.activeFilter);
  }, [state?.allExp, state?.activeFilter]);

  const filterTotal = useMemo(() => {
    if (state?.activeFilter == "all") {
      return state.total;
    }
    let total = 0;
    filterExp?.map((exp) => {
      total += Number(exp.amount);
    });
    return total;
  }, [filterExp]);

  let dataSource = [];
  filterExp.map((exp, index) => {
    dataSource.push({
      key: index,
      Id: exp.id,
      Expense: exp.title,
      Amount: exp.amount,
      Type: exp.type,
    });
  });
  dataSource.push({
    key: "Total",
    Id: "",
    Expense: "Total",
    Amount: filterTotal,
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "Id",
      width: 70,
      align: "center",
    },
    {
      title: "Expense",
      dataIndex: "Expense",
      key: "Expense",
      width: 300,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: 150,
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
      width: 150,
      align: "center",
    },
    {
      render: (text, record) =>
        record.key != "Total" ? (
          <DeleteOutlined
            className="deleteButton"
            onClick={() => {
              handleDelete(record.Id, record.Amount, record.Type);
            }}
          />
        ) : (
          <></>
        ),
      width: 10,
      align: "center",
    },
  ];
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
              setNewDetails((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              });
            }}
            placeholder="Enter Expense title"
          ></Input>
        </div>
        <div className="inputCont">
          <label>Amount:</label>
          <Input
            type="number"
            placeholder="Enter Expense Amount"
            value={newDetails.amount}
            onChange={(e) => {
              setNewDetails((prev) => {
                return {
                  ...prev,
                  amount: e.target.value,
                };
              });
            }}
          ></Input>
        </div>
        <div className="inputCont">
          <label style={{ display: "block" }}>Type:</label>
          <select
            className="dropdown"
            value={newDetails.type}
            onChange={(e) => {
              setNewDetails((prev) => {
                return {
                  ...prev,
                  type: e.target.value,
                };
              });
            }}
            style={{ fontSize: "large", textAlign: "center" }}
          >
            <option>income</option>
            <option>expense</option>
          </select>
        </div>
        <div>
          <button className="button" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
      <div className="tabContainer">
        <span
          className="tab selected"
          id="all"
          onClick={(e) => {
            handleFilterChange(e.target.id);
          }}
        >
          All
        </span>
        <span
          className="tab"
          id="income"
          onClick={(e) => {
            handleFilterChange(e.target.id);
          }}
        >
          income
        </span>
        <span
          className="tab"
          id="expense"
          onClick={(e) => {
            handleFilterChange(e.target.id);
          }}
        >
          expense
        </span>
      </div>
      <Table
        // rowClassName={(record) => {
        //   let type = state.allExp.map((ele) => {
        //     if (ele.id == record.Id) {
        //       return ele.type;
        //     }
        //   });
        //   return type == "income" ? "table-green" : "table-red";
        // }}
        rowClassName={(record) => {
          return record.key == "Total"
            ? "table-black"
            : record.Type == "income"
            ? "table-green"
            : "table-red";
        }}
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />
      ;
    </div>
  );
}

export default Dashboard;
