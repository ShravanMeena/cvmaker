import { RESUME_DATA } from "./types";

export const resumeAction = (data) => {
  return {
    type: RESUME_DATA,
    payload: data,
  };
};
