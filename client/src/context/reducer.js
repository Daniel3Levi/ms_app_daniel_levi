import { ACTIONS } from '../actions/fatchData';

const initialState = {
  images: [],
  category: 'flowers',
  page: 1,
  sortBy: 'id',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case ACTIONS.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case ACTIONS.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case ACTIONS.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
