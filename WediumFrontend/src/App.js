import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import Home from './components/home';
import CreatePost from './components/create-post';
import PostDetail from './components/post-detail';
import Profile from './components/profile';
import PageNotFound from './components/page-error';

export const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={CreatePost} />
            <Route
              exact
              path="/post/:postType/:postId/:postTitle"
              component={PostDetail}
            />
            <Route exact path="/post/:postType" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
