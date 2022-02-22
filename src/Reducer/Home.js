import { rough } from "../js/actions";

const Test = (
  state = {
    roughList: [],
  },
  Action
) => {
  switch (Action.type) {
    case rough.roughGet:
      return {
        ...state,
        roughList: Action.payload,
      };

    default:
      return state;
  }
};

export default Test;
