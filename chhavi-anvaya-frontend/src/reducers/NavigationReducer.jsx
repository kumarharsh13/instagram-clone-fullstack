export const SET_ACTIVE_VIEW = "SET_ACTIVE_VIEW";

function NavigationReducer(state, action) {
  switch (action.type) {
    case SET_ACTIVE_VIEW:
      return {
        ...state,
        activeView: action.payload,
      };
    default:
      return state;
  }
}

export default NavigationReducer;
