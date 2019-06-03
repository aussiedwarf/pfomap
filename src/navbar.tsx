import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



import './game.scss';

export default class Navbar extends React.Component {
  render = () => {
    return(
      <div id="topbar">
        <table id="navBarTable">
          <tbody>
            <tr>
              <td><Link to="/">Map</Link></td>	
              {/*<td><Link to="/settlements">Settlements</Link></td>	*/}	
              {/*<td><Link to="tutorial.html">Tutorial</Link></td>*/}
              <td><Link to="/links">Links</Link></td>	
              {/*<td><Link to="/communityresources">Community Resources</Link></td>*/}
            </tr>
          </tbody>
        </table>
        
        
        
	    </div>
	  )
	}
}

