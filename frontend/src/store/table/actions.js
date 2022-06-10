import server_api from "../../api/server_api";

export const TABLE_ACTIONS = {
  addAll: "[Table Add All]",
  addNewElem: "[Table Add One]",
};

export const newData =
  (page, limit, setLoading, setMaxPage, setSetting, setPage, setting) =>
  async (dispatch) => {
    try {
      //here you can see sending post request to server for getting a elements with your settings
      const result = await server_api.getAllDB(page, limit, setting);
      //sometimes some user can add an element in and if something change you will get an actual information
      setMaxPage(result.data.maxPage);
      setPage(+result.data.page);
      dispatch({ type: TABLE_ACTIONS.addAll, payload: result.data.elements });
      if (setting) {
        setSetting(setting);
      }
      setLoading(false);
    } catch {
      setMaxPage(1);
      setPage(1);
      dispatch({ type: TABLE_ACTIONS.addAll, payload: null });
      setSetting({});
    }
  };
export const addNewElem =
  ({ date, name, numberOf, distance }) =>
  async () => {
    try {
      await server_api.add({ numberOf, distance, date, name });
      alert("OK");
    } catch {
      alert("Something wrong");
    }
  };
