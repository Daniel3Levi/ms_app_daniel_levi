export const ACTIONS = {
  SET_IMAGES: 'SET_IMAGES',
  SET_PAGE: 'SET_PAGE',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_SORT_BY: 'SET_SORT_BY',
};

// send initial request / user request to server side try get current dataList by params.
export const fetchImagesWithParams = (category, page, sortBy) => {
  const urlQuery = `http://localhost:5001/api/images?category=${category}&page=${page}&sortBy=${sortBy}`;
  return async (dispatch) => {
    const response = await fetch(urlQuery);
    try {
      const data = await response.json();
      // console.log(data);
      dispatch(getImages(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export function getImages(images) {
  return {
    type: ACTIONS.SET_IMAGES,
    payload: images,
  };
}

export const getPage = (page) => {
  return {
    type: ACTIONS.SET_PAGE,
    payload: page,
  };
};

export const pageReset = () => {
  return {
    type: ACTIONS.SET_PAGE,
    payload: 1,
  };
};

export const getCategory = (category) => {
  return {
    type: ACTIONS.SET_CATEGORY,
    payload: category,
  };
};

export const getSortBy = (sortBy) => {
  return {
    type: ACTIONS.SET_SORT_BY,
    payload: sortBy,
  };
};
