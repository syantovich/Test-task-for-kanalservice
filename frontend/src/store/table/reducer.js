import { TABLE_ACTIONS } from "./actions";

const initialState = [];

export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case TABLE_ACTIONS.addAll: {
      return action.payload;
    }
    case TABLE_ACTIONS.addNewElem: {
      console.log(state);
      const newArr = [...state];
      newArr.push(action.payload);
      return newArr;
    }
    default:
      return state;
  }
};
