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

