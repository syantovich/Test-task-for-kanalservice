import { useEffect, useState } from "react";
import "./Filters.css";
import { useDispatch } from "react-redux";
import server_api from "../../api/server_api";
import * as action from "../../store/table/actions";

const Filters = ({
  page,
  limit,
  setLoading,
  setSetting,
  setMaxPage,
  setPage,
}) => {
  const [column, setColumn] = useState(undefined);
  const [condition, setCondition] = useState("=");
  const [text, setText] = useState("");
  const [resultLength, setResultLength] = useState(0);
  const dispatch = useDispatch();
  //function to looking a count of elements with your conditional of search when you change one
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

        const result = await server_api.getAllDB(page, limit, setting);
        setResultLength(result.data.maxPage);
      })();
    } catch {
      setResultLength(0);
    }
  };
  useEffect(() => {
    if (!!column) {
      checkLength();
    }
  }, [column, condition, text]);
  return (
    <div className="select">
      <select
        onChange={(el) => {
          setColumn(el.target.value);
          setText("");
        }}
        defaultValue="null"
      >
        <option disabled value="null">
          Колонка для фильтрации
        </option>
        <option value="name">Имя</option>
        <option value="numberOf">Количество</option>
        <option value="distance">Дистанция</option>
      </select>
      {/*when you didn't choose the column to search you can't choose a conditional and you can't write a text for search*/}
      <select
        disabled={!column}
        onChange={(el) => {
          setCondition(el.target.value);
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
      {column === "name" && (
        <input
          type="text"
          disabled={!column}
          onChange={(el) => {
            setText(el.target.value);
          }}
        />
      )}
      {column !== "name" && (
        <input
          type="number"
          disabled={!column}
          onChange={(el) => {
            setText(el.target.value);
          }}
        />
      )}
      {/*when you conditional some result you can click and show results*/}
      <button
        disabled={!column || !resultLength}
        onClick={() => {
          dispatch(
            action.newData(
              1,
              limit,
              setLoading,
              setMaxPage,
              setSetting,
              setPage,
              {
                column,
                condition,
                text,
              }
            )
          );
        }}
      >
        Применить ({resultLength})
      </button>
    </div>
  );
};
export default Filters;
