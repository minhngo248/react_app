//import logo from './logo.svg';
import React from 'react';
//import './App.css';
import MainComponentHome from './components_home/mainComponentHome';
import MainComponentResult from './components_result/mainComponentResult';
import ComponentSearchedResult from './components_searched_result/ComponentSearchedResult';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import ComponentRating from './components_rating/componentRating';
import ComponentBoxOffice from './components_rating/componentBoxOffice';


function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Switch>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" component={MainComponentHome} />
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/result" component={MainComponentResult} />

          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/searchedResult" component={ComponentSearchedResult} />

          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/topRating" component={ComponentRating} />

          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/topBoxOffice" component={ComponentBoxOffice} />
            
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
