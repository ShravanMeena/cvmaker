import React, { Component } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Builder from "./pages/Builder";
import Landing from "./pages/Landing";
import Resume from "./pages/Resume";
import Register from "./pages/Register";
import Login from "./pages/Login";

// redux ofline or redux persist
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact strict path='/cv/design' component={Builder} />
              <Route exact strict path='/resume/:id' component={Resume} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}
