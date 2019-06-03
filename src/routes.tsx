
import * as React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import App from './app';
import {ExternalLinks, CommunityResources} from './app';
import Settlements from './settlements_info';

export const routes = (
  <Router>
      <Switch>
          
          <Route exact path="/" component={App} />
          <Route path="/settlements" component={Settlements} />
          <Route path="/links" component={ExternalLinks} />
          <Route path="/communityresources" component={CommunityResources} />
          
      </Switch>
  </Router>
)
