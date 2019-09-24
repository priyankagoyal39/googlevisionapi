import actionTypes from "../actionTypes";

const INITIAL_STATE = {
    faceAnnotation: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.GET_FACEANNOTATION_SUCCESS:
      return {
          ...state,
          faceAnnotation: action.payload
      }
    default:
      return state;
  }
}
