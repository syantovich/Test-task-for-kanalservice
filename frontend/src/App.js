import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import AddItem from "./components/AddItem/AddItem";

//if you want to add an element to your table go to "http://yourhost(default localhost)/admin/additem"
//in other cases, by going to the address "http://yourhost/somthin or nothing" you will get a rendered table

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin/additem" element={<AddItem />} />
        <Route path="/*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
