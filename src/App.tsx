import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Link, Route } from "react-router-dom";
import Ed from "./components/Ed";
import Head from "./components/Head";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import { ToastContainer, toast } from "react-toastify";
import Addnew from "./components/Addnew";

function App() {
  // const birthday=()=>{
  //   let dt=new Date()
  //   if(dt==)
  // }
  return (
    <>
      <ToastContainer />

      <Route path="/header" component={Head} exact />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} exact />

        <Route path="/table" component={Ed} exact />
        <Route path="/signup" component={Signup} exact />
        {/* <Route  component={PageNotFound} /> */}
        <Route path="/addnew" component={Addnew} exact />
      </Switch>
    </>
  );
}

export default App;
