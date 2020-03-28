import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>Home Page</h1>
        </Route>
        <Route exact path="/search">
          <h1>Search Results Page</h1>
        </Route>
        <Route exact path="/create">
          <h1>Create a Post Page</h1>
        </Route>
        <Route exact path="/post/:postType/:postID/:postTitle">
          <h1>Post Page</h1>
        </Route>
        <Route exact path="/user/:username">
          <h1>User Profile Page</h1>
        </Route>
        <Route path="*">
          <h1>Page not found</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
