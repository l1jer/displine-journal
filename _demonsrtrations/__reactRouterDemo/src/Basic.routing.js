import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <NavLink to="/about" activeClassName="about">
                {/* <a href="/about" aria-current="page" class="about">About</a> */}
                {/* 同等于 html 里面 active */}
                About
              </NavLink>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/allcontact">All Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Switch 查找子Route们和renders来定义第一个就是当前URL */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          {/* 当Switch找到当前URL则立即渲染, 其它会被无视 */}
          {/* The more specific path="/contact/:id" comes before path="/contact/", so that route will render when viewing an individual contact. 即越详细的地址先被渲染*/}
          <Route path="/contact/:id">
            <Contact />
          </Route>
          {/*  */}
          <Route path="/allcontact">
            <AllContact />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/allcontact">
            <AllContact />
          </Route>
          {/* <Route path="/"> 永远都会匹配这个地址, 所以这个在<Switch>的最后 */}
          {/* 另一个解决方式即 <Route exact path="/">, 它会匹配 whole url */}
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Homepage() {
  return <h2>Homepage</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Contact() {
  return <h2>Contact</h2>;
}

function AllContact() {
  return <h2>All Contact</h2>;
}
