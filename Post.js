const { createStore, combineReducers } = require('redux');

// initial state for posts
const initialPostState = {
	posts: [],
};

// initial state for user
const initialUserState = {
  users: [],
}

// action types
const ADD_POST = 'ADD_POST';
const REMOVE_POST = 'REMOVE_POST';
const ADD_USER = 'ADD_USER';

// add post actions
const addPostAction = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  }
}

// remove post action
const removePostAction = (id) => {
  return {
    type: REMOVE_POST,
    payload: id,
  }
}

// add user action
const addUserAction = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  }
}

// post reducer
const postReducer = (state = initialPostState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				posts: [...state.posts, action.payload],
			};
		case REMOVE_POST:
			return {
				posts: state.posts.filter((post) => post.id !== action.payload),
			};
		default:
			return state;
	}
};

// user reducer
const userReducer = (state = initialUserState, action) => {
  switch(action.type) {
    case ADD_USER:
      return {
        users: [...state.users, action.payload]
      }
    default:
      return state;
  }
}

// root reducer
const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer
})

// store
const store = createStore(rootReducer);

// subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log(data.posts);
  console.log( data.users);
})

// post dispatches
store.dispatch(addPostAction({
  id: 1,
  title: 'Best Course',
}))
store.dispatch(addPostAction({
  id: 2,
  title: 'How to master redux',
}))
store.dispatch(addPostAction({
  id: 3,
  title: 'Redux is very good',
}))
store.dispatch(removePostAction(3));

// users dispatches
store.dispatch(addUserAction({
  id: 1,
  name: 'john',
  email: 'john@gmail.com'
}))