const { createStore, applyMiddleware } = require("redux");
const thunk = require('redux-thunk').default;
const axios = require('axios');


// initial state           
const initialState = {
  posts: [],
  error: '',
  loading: false,
}

// types
const REQUEST_STARTS = 'REQUEST_STARTS';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_FAILURE = 'REQUEST_FAILURE';

// actions
const fetchPostsStart = () => {
  return {
    type: REQUEST_STARTS
  }
}

const fetchPostsSuccess = (posts) => {
  return {
		type: REQUEST_SUCCESS,
    payload: posts,
	};
}

const fetchPostsFailure = (err) => {
  return {
		type: REQUEST_FAILURE,
    payload: err,
	};
}

// action to mimic the request
const fetchPosts = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchPostsStart())
      const { data } = await axios.get(
				'https://jsonplaceholder.typicode.com/posts'
			);
      dispatch(fetchPostsSuccess(data));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message))
    }
  }
}

// reducers
const postReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_STARTS:
      return {
        ...state,
        loading: true,
      }
    case REQUEST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      }
    case REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}

// store
const store = createStore(
	postReducer,
  applyMiddleware(thunk)
);

// subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log(data);
})

// dispatch
store.dispatch(fetchPosts());