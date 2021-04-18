import { RESUME_DATA } from "../action/types";

const initialState = {};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESUME_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default resumeReducer;
