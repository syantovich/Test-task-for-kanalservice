import server_api from "../../api/server_api";

export const TABLE_ACTIONS = {
  addAll: "[Table Add All]",
  addNewElem: "[Table Add One]",
};

export const newData = (elements, set) => (dispatch) => {
  set(false);
  dispatch({ type: TABLE_ACTIONS.addAll, payload: elements });
};
export const countElementWithSettings = (settings) => (dispatch) => {};
export const addNewElem =
  ({ date, name, numberOf, distance }) =>
  async (dispatch) => {
    try {
      const result = await server_api.add({ numberOf, distance, date, name });
      dispatch({
        type: TABLE_ACTIONS.addNewElem,
        payload: {
          date,
          name,
          numberof: numberOf,
          distance,
          id: result.data.id,
        },
      });
    } catch {
      console.log("error");
    }
  };
