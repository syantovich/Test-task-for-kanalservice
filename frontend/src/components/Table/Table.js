import { useDispatch, useSelector } from "react-redux";
import { getAllTable } from "../../store/table/selector";
import { useEffect, useState } from "react";
import server_api from "../../api/server_api";
import * as tableActions from "../../store/table/actions";
import Loading from "../Loading/Loading";
import "./Table.css";
import Filters from "../Filters/Filters";

const Table = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [maxPage, setMaxPage] = useState(1);
  const dispatch = useDispatch();
  const table = useSelector(getAllTable);
  const [loading, setLoading] = useState(true);
  const [tableElement, setTableElemnt] = useState([]);

  useEffect(() => {}, []);
  useEffect(() => {
    console.log("render");
    if (loading) {
      (async () => {
        const result = await server_api.getAllDB(page, limit);
        setMaxPage(result.data.maxPage);
        dispatch(tableActions.newData(result.data.elements, setLoading));
      })();
    }
  }, [page]);

  useEffect(() => {
    setTableElemnt(
      table.map((e) => {
        const date = new Date(e.date);
        return (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>{e.numberof}</td>
            <td>{e.distance}</td>
            <td>{`${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${
              date.getMonth() + 1
            }.${date.getFullYear()}`}</td>
          </tr>
        );
      })
    );
  }, [table]);

  return (
    <div className="table">
      {loading && <Loading />}
      {!loading && (
        <>
          <Filters page={page} limit={limit} />
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Количество</th>
                <th>Дистанция</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>{tableElement}</tbody>
          </table>
          <div className="pagination">
            <div
              className="prev"
              onClick={() => {
                console.log(page - 1);
                if (page - 1 > 0) {
                  console.log("prev");
                  setPage(page - 1);
                  setLoading(true);
                }
              }}
            />
            {`${page} из ${maxPage}`}
            <div
              className="next"
              onClick={() => {
                console.log(page + 1);
                if (page + 1 <= maxPage) {
                  console.log("next");
                  setPage(page + 1);
                  setLoading(true);
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default Table;
