import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import './App.css';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import FileView from './component/FileHandler/FileView';
// import SideIcons from './component/sideIcons';
import UserService from "./component/AuthHandler/user.service";
import Login from './component/AccessControl/Login'
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./component/AuthHandler/auth.service";
import Register from "./component/AccessControl/Register";
import { ToastContainer } from "react-toastify";
import UserTable from "./component/UserManage/UserTable"

// import { Container } from "react-bootstrap";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: null,
      currentUser: null,
      isLogin: false
    };
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);
    this.FileHandler = this.FileHandler.bind(this)

    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
  }

  clearTimeout() {
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    this.logoutTimeout = setTimeout(this.logout, 15 * 60 * 1000);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  logout() {
    // Send a logout request to the API
    AuthService.logout();
    // this.destroy(); // Cleanup
  }

  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }


  async componentDidMount() {
    const user = AuthService.getCurrentUser();
    UserService.getUserInfo();
    if (user) {
      var fileList = [];
      fileList = await UserService.getListFile();
      UserService.getUserInfo();
      this.setState({
        fileList: fileList,
        currentUser: user
      });
    }
  }

  FileHandler(file) {
    // UserService.getUserInfo();
    this.setState({
      fileList: file
    });
  }


  render() {
    const { currentUser, fileList } = this.state;
    return (
      <div className="App">
        {
          currentUser ? (
            localStorage.getItem('role') === 'USER' ? (
              <>
                <Header />
                <div className="app__main">
                  <ToastContainer />
                  <Sidebar FileHandler={this.FileHandler} />
                  <FileView fileList={fileList} FileHandler={this.FileHandler} />
                  {/* <SideIcons /> */}
                  {/* <ContextMenuComponent target="#fileItem" items={this.menuItems} /> */}
                </div>
              </>
            ) : (
              <>
                <Header />
                <div className="admin-table-content">
                  <div className="container mt-3">
                    <UserTable />
                  </div>
                </div>
              </>
            )
          ) : (
            <>
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <Routes>
                    {/* <Route path="/" element={<App />} /> */}
                    <Route index element={<Login />} />
                    <Route path="/sign-in" element={<Login />} />
                    <Route path="/sign-up" element={<Register />} />
                  </Routes>
                </div>
              </div>
            </>
          )
        }
      </div>
    );
  }
}

export default App;
