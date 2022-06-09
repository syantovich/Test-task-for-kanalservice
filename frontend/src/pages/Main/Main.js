import { useEffect, useState } from "react";
import server_api from "../../api/server_api";
import { useDispatch, useSelector } from "react-redux";
import * as tableActions from "../../store/table/actions";
import Table from "../../components/Table/Table";
import "./Main.css";

const Main = () => {
  const [numberOf, setNumberOf] = useState();
  const [distance, setDistance] = useState();
  const [date, setDate] = useState();
  const [name, setName] = useState();
  const dispatch = useDispatch();

  return (
    <main>
      <label>
        Name
        <input type="text" onChange={(value) => setName(value.target.value)} />
      </label>
      <label>
        NumberOf
        <input
          type="number"
          name="numberOf"
          onChange={(value) => setNumberOf(value.target.value)}
        />
      </label>
      <label>
        distance
        <input
          type="number"
          onChange={(value) => setDistance(value.target.value)}
        />
      </label>
      <label>
        date
        <input type="date" onChange={(value) => setDate(value.target.value)} />
      </label>
      <button
        onClick={() => {
          dispatch(tableActions.addNewElem({ date, name, numberOf, distance }));
        }}
      >
        click
      </button>
      <Table />
    </main>
  );
};
export default Main;
