import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { cryptoHistoryReducer, portfolioListReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';

const loggerMiddleware = storeAPI => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', storeAPI.getState())
  return result
}

const rootReducer = combineReducers({
  portfolio: portfolioListReducer,
  cryptoHistory: cryptoHistoryReducer
});
const store = createStore(rootReducer, { }, composeWithDevTools(
  applyMiddleware(thunk, loggerMiddleware)
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
