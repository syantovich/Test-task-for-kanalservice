import { useDispatch, useSelector } from "react-redux";
import { getAllTable } from "../../store/table/selector";
import { useEffect, useState } from "react";
import * as tableActions from "../../store/table/actions";
import Loading from "../Loading/Loading";
import "./Table.css";
import Filters from "../Filters/Filters";

const Table = () => {
  const [page, setPage] = useState(1);
  const limit = 2; // this variable means the maximum number of displayed elements on the page. You can change this
  const [maxPage, setMaxPage] = useState(1);
  const dispatch = useDispatch();
  const table = useSelector(getAllTable);
  const [loading, setLoading] = useState(true);
  const [tableElement, setTableElemnt] = useState([]);
  const [setting, setSetting] = useState({});

  useEffect(() => {}, []);
  useEffect(() => {
    if (loading) {
      (async () => {
        await dispatch(
          tableActions.newData(
            page,
            limit,
            setLoading,
            setMaxPage,
            setSetting,
            setPage,
            setting
          )
        );
      })();
    }
  }, [page]);

  useEffect(() => {
    // when data from Redux Store change, state will be built
    setTableElemnt(
      table?.map((e) => {
        const date = new Date(e.date);
        //in the next rows create new elements
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
  //when data send on server, you will see animation of loading
  return (
    <div className="table">
      {loading && <Loading />}
      {!loading && (
        <>
          <Filters
            page={page}
            limit={limit}
            setLoading={setLoading}
            setSetting={setSetting}
            setMaxPage={setMaxPage}
            setPage={setPage}
          />
          {table && (
            <div>
              {/*header of table*/}
              <table>
                <thead>
                  <tr>
                    <th>Имя</th>
                    <th>Количество</th>
                    <th>Дистанция</th>
                    <th>Дата</th>
                  </tr>
                </thead>
                {/*Our elements*/}
                <tbody>{tableElement}</tbody>
              </table>
              <div className="pagination">
                {/*here you can see a pagination element*/}
                <div
                  className="prev"
                  onClick={() => {
                    if (page - 1 > 0) {
                      setPage(page - 1);
                      setLoading(true);
                    }
                  }}
                />
                {`${page} из ${maxPage}`}
                <div
                  className="next"
                  onClick={() => {
                    if (page + 1 <= maxPage) {
                      setPage(page + 1);
                      setLoading(true);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Table;
