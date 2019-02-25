import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./microModules/setAuthToken";
import { setCurrentUser, logoutUser } from "./action/authAction";

import store from "./store";
import { Provider } from "react-redux";
import PrivateRouter from "./microModules/PrivateRouter";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/loginRedister/Register";
import Login from "./components/loginRedister/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExp from "./components/add-certificate/AddExp";
import AddEdu from "./components/add-certificate/AddEdu";
import Profiles from "./components/views-profiles/Profiles";
import Profile from "./components/views-profiles/singer-profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/comment/Post";
import NotFound from "./components/notFound/NotFound";
import "./App.css";

// KIỂM TRA TOKEN
if (localStorage.jwtToken) {
  //GỌI TOKEN ĐÓ BẰNG HEARDER VỚI Authorization
  setAuthToken(localStorage.jwtToken);
  // GIẢI MÃ THÔG TIN USER
  const decode = jwt_decode(localStorage.jwtToken);
  //GỌI NGƯỜI DÙNG ĐÃ XÁC THỰC
  store.dispatch(setCurrentUser(decode));
  // KiỂM TRA TOKEN HẾT HẠN
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    // TỰ THOÁT KHỎI USER
    store.dispatch(logoutUser());
    // TRỞ LẠI LOGIN
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container-fluid">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRouter exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRouter
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRouter
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRouter
                  exact
                  path="/add-experience"
                  component={AddExp}
                />
              </Switch>
              <Switch>
                <PrivateRouter exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRouter exact path="/comment/:id" component={Post} />
              </Switch>
              <Switch>
                <PrivateRouter exact path="/add-education" component={AddEdu} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
