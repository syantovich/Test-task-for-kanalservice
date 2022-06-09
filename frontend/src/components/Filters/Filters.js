import { useEffect, useState } from "react";
import "./Filters.css";
import { useDispatch } from "react-redux";
import server_api from "../../api/server_api";

const Filters = ({ page, limit }) => {
  const [column, setColumn] = useState(undefined);
  const [condition, setCondition] = useState("=");
  const [text, setText] = useState("");
  const [resultLength, setResultLength] = useState(0);
  const dispatch = useDispatch();
  const checkLength = () => {
    try {
      (async () => {
        const setting =
          column !== undefined
            ? {
                column,
                condition,
                text,
                wm: "count",
              }
            : {};
        console.log(setting);
        const result = await server_api.getAllDB(page, limit, setting);
        console.log(result);
        setResultLength(result.data.maxPage);
      })();
    } catch {
      setResultLength(0);
    }
  };
  useEffect(() => {
    if (!!column) {
    }
  }, [column, condition, text]);
  return (
    <div className="select">
      <select
        onChange={(el) => {
          setColumn(el.target.value);
          checkLength();
        }}
        defaultValue="null"
      >
        <option disabled value="null">
          Колонка для фильтрации
        </option>
        <option value="name">Имя</option>
        <option value="numberOf">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <select
        disabled={!column}
        onChange={(el) => {
          setCondition(el.target.value);
          checkLength();
        }}
      >
        <option value="=">Равно</option>
        <option value="includes" disabled={column !== "name"}>
          Включает в себя
        </option>
        <option value=">" disabled={column === "name"}>
          Больше
        </option>
        <option value="<" disabled={column === "name"}>
          Меньше
        </option>
      </select>
      <input
        type="text"
        disabled={!column}
        onChange={(el) => {
          setText(el.target.value);
          checkLength();
        }}
      />
      <button disabled={!column}>Применить ({resultLength})</button>
    </div>
  );
};
export default Filters;
