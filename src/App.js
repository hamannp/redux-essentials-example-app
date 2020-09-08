import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { PostsList } from './features/posts/postsList'
import { AddPostsForm } from './features/posts/AddPostsForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostsForm } from './features/posts/EditPostsForm'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostsForm/>
                <PostsList/>
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostsForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
