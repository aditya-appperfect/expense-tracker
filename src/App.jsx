import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Practice, Auth } from "./pages";
import { ExpenseProvider } from './context/ExpenseContext'
//Dashboard - graphs
//Expense Page -  edit, tags, search, filter

function App() {
  return (
    <ExpenseProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </ExpenseProvider>
  );
}

export default App;
