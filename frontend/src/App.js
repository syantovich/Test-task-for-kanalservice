import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Loading from "./components/Loading/Loading";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  );
}

export default App;
