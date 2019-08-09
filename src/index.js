import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import reducers from './reducer.js'
import './config'
import Register from './container/register/register.js';
import AuthRoute from './component/authroute/authroute.js'
import Login from './container/login/login.js'
import BossInfo from './component/bossinfo/bossinfo.js'
import Geniusinfo from './component/geniusinfo/geniusinfo.js'
import Dashboard from './component/dashboard/dashboard.js'
import Chat from './component/chat/chat.js'
// import * as serviceWorker from './serviceWorker';
const store = createStore(reducers,compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))
 
// function Boss(){
//   return <h2>boss页面</h2>
// }

ReactDOM.render(
  (<Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path="/bossinfo" component={BossInfo}></Route>
            <Route path="/geniusinfo" component={Geniusinfo}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/chat/:user" component={Chat}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
        </div>
      </BrowserRouter>
  </Provider>),
  document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
