import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function Nested() {
  return(
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
            <Link to="/about">About</Link>
            </li>
            <li>
            <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </nav>

      {/* Switch 查找子Route们和renders来定义第一个就是当前URL */}
      <Switch>
        <Route path="/about"><About /></Route>
        <Route path="/topics"><Topics /></Route>
        <Route path="/"><Homepage /></Route>
      </Switch>
      </div>
    </Router>
  );
}

function Homepage(){
  return <h2>Homepage</h2>;
}

function About(){
  return <h2>About</h2>;
}

function Topics(){
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/pops-v-state`}>Props v. state</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>

    </div>
  );
}

function Topic(){
  let{topicId}=useParams();
  return <h3>Requested topic ID: {topicId}</h3>
}