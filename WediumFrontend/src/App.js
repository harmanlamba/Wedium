import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import Home from './components/home';
import CreatePost from './components/create-post';
import PostDetail from './components/post-detail';
import Profile from './components/profile';

export const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/create">
              <CreatePost />
            </Route>
            <Route exact path="/post/:postType/:postId/:postTitle">
              <PostDetail />
            </Route>
            <Route exact path="/post/:postType" component={Home} />
            <Route exact path="/profile" component={Profile}/>
            <Route path="*">
              <h1>Page not found</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
