import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Practice, Auth, Todo } from "./pages";
import { ExpenseProvider } from './context/ExpenseContext'

function App() {
  return (
    <ExpenseProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </ExpenseProvider>
  );
}

export default App;
