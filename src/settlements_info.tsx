/*******************************************************************************
Copyright (C) 2020 Eden Harris

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*******************************************************************************/

import * as React from 'react';

import Navbar from './navbar';

export default class Settlements extends React.Component {
	
	initialize = () => {
    var content = "";
    /*
    for(var i = 0; i < g_settlements.length; i++)
    {
      if(g_settlements[i].active)
      {
        content += "<h2>" + g_settlements[i].name + "</h2>";
        content += "<b>Alignment</b>: " + g_settlements[i].alignment;
        content += "<br><b>Population</b>: " + g_settlements[i].population;
        content += "<br><b>Level</b>: " + g_settlements[i].level;
        content += "<br><b>Holdings</b>: " + g_settlements[i].towers.length;
        content += "<br><b>Buildings</b>: " + g_settlements[i].buildings;
        content += "<br><b>Website</b>: <a href=\"" + g_settlements[i].website + "\">" + g_settlements[i].website + "</a>";
        content += "<br><b>Description</b>: " + g_settlements[i].description;
      }
      
    }
    
    document.getElementById("fullbody").innerHTML = content;
    */
  }
	
	render = () => {
	  return(
	    <div>
	      <Navbar />
	      <div id="fullbody">
        </div>
	    </div>
	  )
  }
}

