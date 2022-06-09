import * as tableActions from "../../store/table/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./AddItem.css";

const AddItem = () => {
  const [numberOf, setNumberOf] = useState();
  const [distance, setDistance] = useState();
  const [date, setDate] = useState();
  const [name, setName] = useState();
  const dispatch = useDispatch();
  return (
    <div className="addingElement">
      <label className="label">
        <span> Name</span>
        <input
          className="input"
          type="text"
          onChange={(value) => setName(value.target.value)}
        />
      </label>
      <label className="label">
        <span>NumberOf</span>
        <input
          className="input"
          type="number"
          name="numberOf"
          onChange={(value) => setNumberOf(value.target.value)}
        />
      </label>
      <label className="label">
        <span>distance</span>
        <input
          className="input"
          type="number"
          onChange={(value) => setDistance(value.target.value)}
        />
      </label>
      <label className="label">
        <span>date</span>
        <input
          type="date"
          className="input"
          onChange={(value) => setDate(value.target.value)}
        />
      </label>
      <button
        onClick={() => {
          dispatch(tableActions.addNewElem({ date, name, numberOf, distance }));
        }}
      >
        Добавить элемент в БД
      </button>
    </div>
  );
};
export default AddItem;
