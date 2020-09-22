import React from 'react';
import './styles.scss';
import { MedicsViewComponent } from './components/view/MedicsViewComponent';
import { OnDutyViewComponent } from './components/view/OnDutyViewComponent';
import { PharmaciesViewComponent } from './components/view/PharmaciesViewComponent';
import { MdMenu } from "react-icons/md";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {AppFooter , AppTitle} from './components/ui';

//Todo: maybe add title to route components


function App() {
  
  return (
    <div id="App">
      <Router>
        <div id="Header">
          <div className="icon">
            <MdMenu />
          </div>
          <AppTitle />
        </div>
        <div id="ViewPanel">
          <div className="scrollable">
            <Route path="/" title="On duty" exact component={OnDutyViewComponent} />
            <Route path="/medics" exact component={MedicsViewComponent} />
            <Route path="/pharmacies" exact component={PharmaciesViewComponent} />
          </div>
        </div>
        <AppFooter />
      </Router>
    </div>
  );
}

export default App;
