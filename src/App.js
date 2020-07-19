import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import HomePage from './components/HomePage'

import {HomeContext} from "./contexts/HomeContext.js"

import {BrowserRouter as Router, Route} from "react-router-dom"

//plantList, setPlantList, plant, setPlant
function App() {
  return (
    <Router>
    <div className="App">
        <HomeContext.Provider value={{}}>
          <Route exact path ="/" component={Signup} />
          <Route exact path ="/login" component={Login} />
          <PrivateRoute exact path="/homepage" component={HomePage} />
          
        </HomeContext.Provider>
    </div>
    </Router>
  );
}

export default App;
