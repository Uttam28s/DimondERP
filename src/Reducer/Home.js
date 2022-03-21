import {rough} from "../js/actions";
import {office} from "../js/actions";
import {factory} from "../js/actions";

const reducerState = (
  state = {
    roughList: [],
    roughPreference: [],
    sortingData: [],
    unUsedRough: [],
    officeList: [],
    officeSubGet: [],
    factoryList: {}
  },
  Action
) => {
  console.log('Action', Action)
  switch (Action.type) {

    case rough.roughGet:
      return {
        ...state,
        roughList: Action.payload,
      };
    case rough.roughPreference:
      return {
        ...state,
        roughPreference: Action.payload,
      };
    case rough.sortingData:
      return {
        ...state,
        sortingData: Action.payload,
      };
    case rough.unUsedRough:
      return {
        ...state,
        unUsedRough: Action.payload,
      };
    case office.officeGet:
      return {
        ...state,
        officeList: Action.payload,
      };
    case office.officeSubGet:
      return {
        ...state,
        officeSubGet: Action.payload,
      };
    case factory.factoryGet:
      return {
        ...state,
        factoryList: Action.payload,
      };

    default:
      return state;
  }
};

export default reducerState;
