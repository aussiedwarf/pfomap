import Game from './game';

import Navbar from './navbar';

import * as React from 'react';

import * as imageCoin from './images/coin.png';
import * as imageCraft from './images/craft.png';
import * as imageCleric from './images/cleric.png';
import * as imageFighter from './images/fighter.png';
import * as imageRogue from './images/rogue.png';
import * as imageWizard from './images/wizard.png';
import * as imageClanmoot from './images/clanmoot.png';
import * as imageVillage from './images/village.png';
import * as imageStar from './images/star.png';
import * as imageWaterfall from './images/waterfall.png';
import * as imageSkull from './images/skullcrossbones.png';
import * as imagePOI from './images/pointofinterest.png';
import * as imageTotem from './images/totem.png';
import * as imageMonument from './images/monument.png';
import * as imageMonolith from './images/monolith.png';

import './game.scss';

export class ExternalLinks extends React.Component {
  render = () => {
    return(
      <div>
        <Navbar />
        <div id="fullbody">
          <a href="https://goblinworks.com/">Goblinworks</a> Official Goblinworks and pathfinder online website.
          <p /><a href="http://paizo.com/">Paizo</a> Pathfinder tabletop publisher.
          <p /><a href="http://goblinary.com/">Goblinary</a> Website with information on all the feats, recipes and items in game.
          <p /><a href="http://www.pfogis.org/">Unofficial Pathfinder Online Atlas</a> Map of PFO.
          <p /><a href="http://pfo.pathfinderwiki.com/">Pathfinder Online Wiki</a> Wiki for the game.
        </div>
      </div>
      
    )
  }
}

export class CommunityResources extends React.Component {
  render = () => {
    return(
      <div>
        <Navbar />
      </div>
    )
  }
}

type State = {
  viewTypesState: boolean,
  viewHexTypesState: boolean,
  viewLandmarksState: boolean,
  viewBordersState: boolean,
  viewAlignmentState: boolean,
  viewRegionsState: boolean
};

export default class App extends React.Component {
  state: State;

  game: Game = null;
  canvas: HTMLCanvasElement;

  constructor(props: any){
    super(props);
    this.state = {
      viewTypesState: true,
      viewHexTypesState: true,
      viewLandmarksState: true,
      viewBordersState: false,
      viewAlignmentState: false,
      viewRegionsState: false
    }
  }
  
  
  componentDidMount = () => {
    this.game = new Game(this.canvas);
  }
  
  setCanvas = (a_canvas: HTMLCanvasElement) => {
    this.canvas = a_canvas;
  }

  viewTypesChange = (a_event: React.ChangeEvent<HTMLInputElement>) => {
    this.game.enabledIcons = !this.state.viewTypesState;
    this.game.render();
    this.setState({viewTypesState: !this.state.viewTypesState});
  }

  viewHexTypesChange = (a_event: React.ChangeEvent<HTMLInputElement>) => {
    this.game.enabledDrawHexTypes = !this.state.viewHexTypesState;
    this.game.render();
    this.setState({viewHexTypesState: !this.state.viewHexTypesState});
  }

  viewLandmarksChange = (a_event: React.ChangeEvent<HTMLInputElement>) => {
    this.game.enabledDrawLandmarks = !this.state.viewLandmarksState;
    this.game.render();
    this.setState({viewLandmarksState: !this.state.viewLandmarksState});
  }

  viewBordersChange = (a_event: React.ChangeEvent<HTMLInputElement>) => {
    this.game.enabledDrawBorders = !this.state.viewBordersState;
    this.game.render();
    this.setState({viewBordersState: !this.state.viewBordersState});
  }

  viewAlignmentChange = (a_event: React.ChangeEvent<HTMLInputElement>) => {
    this.game.enabledDrawAlignment = !this.state.viewAlignmentState;
    this.game.render();
    this.setState({viewAlignmentState: !this.state.viewAlignmentState});
  }

  viewRegionsChange = (a_event: React.ChangeEvent<HTMLInputElement>) => {
    this.game.enabledDrawRegions = !this.state.viewRegionsState;
    this.game.render();
    this.setState({viewRegionsState: !this.state.viewRegionsState});
  }

  zoomInOnDown = () => {
    this.game.zoomIn = true;
    this.game.render();
  }

  zoomInOnUp = () => {
    this.game.zoomIn = false;
    this.game.render();
  }

  zoomOutOnDown = () => {
    this.game.zoomOut = true;
    this.game.render();
  }

  zoomOutOnUp = () => {
    this.game.zoomOut = false;
    this.game.render();
  }
  
  render = () => {
    return(
      <div>
        
        <div id="myDiv">
          <div id="menu">
            Pathfinder Online Map
            <p />Last Update: 9th June, 2017
            <br />Territory Update: 8th October, 2016
            <p />Left click and drag to scroll, use the scroll wheel to zoom and double click on a hex to keep it highlighted.
            <p />

            <input type="checkbox" 
              id="cbViewTypes" 
              name="viewTypes" 
              value="viewTypes" 
              checked={this.state.viewTypesState} 
              onChange={this.viewTypesChange}/> View settlement types<br />
            
            <input type="checkbox" 
              id="cbViewHexTypes" 
              name="viewHexTypes" 
              value="viewHexTypes" 
              checked={this.state.viewHexTypesState}
              onChange={this.viewHexTypesChange}/> View hex types<br />

            <input type="checkbox" 
              id="cbViewLandmarks" 
              name="viewLandmarks" 
              value="viewLandmarks" 
              checked={this.state.viewLandmarksState}
              onChange={this.viewLandmarksChange}/> View landmarks<br/>

            <input type="checkbox" 
              id="cbViewBorders" 
              name="viewBorders" 
              value="viewBorders"
              checked={this.state.viewBordersState}
              onChange={this.viewBordersChange}/> View territory<br/>
            

            <input type="checkbox" 
              id="cbViewAlignment" 
              name="viewAlignment" 
              value="viewAlignment"
              checked={this.state.viewAlignmentState}
              onChange={this.viewAlignmentChange}/> View alignment and level<br/>


            <input type="checkbox" 
              id="cbViewRegions" 
              name="viewRegions" 
              value="viewRegions"
              checked={this.state.viewRegionsState}
              onChange={this.viewRegionsChange}/> View regions<br/>
            {/*
            <input type="checkbox" 
              id="cbViewBulk" 
              name="viewBulk" 
              value="viewBulk"
              checked={this.state.viewAlignmentState}
              onChange={this.viewAlignmentChange}/> Bulk resource calculator (alpha)<br/>
            */}
            <br />
            <div id="hexinfo">
            
            </div>    
          </div>
        </div>
        
        
		    
		    <Navbar />
		  
		    <div id="copyright">
		    &copy 2011-2015 Goblinworks, Inc. Goblinworks, the Goblinworks logo, and Goblin Squad are trademarks of Goblinworks. Paizo Inc., Paizo,the Paizo golem logo, Pathfinder, the Pathfinder logo, and Pathfinder Society are registered trademarks of Paizo Inc., and Pathfinder Roleplaying Game, Pathfinder Campaign Setting, Pathfinder Adventure Path, Pathfinder Player Companion, Pathfinder Modules, Pathfinder Tales, Pathfinder Battles, Pathfinder Online, and PaizoCon are trademarks of Paizo Inc., and are used by Goblinworks under license.
		    </div>
		    <div id="navigation">
          <div className="alignRight">
            <button type="button" className="button" id="bZoomIn" onMouseDown={this.zoomInOnDown} onMouseUp={this.zoomInOnUp}>Zoom In</button>
            <button type="button" className="button" id="bZoomOut" onMouseDown={this.zoomOutOnDown} onMouseUp={this.zoomOutOnUp}>Zoom Out</button>
          </div>
        </div>
      
        <div id="legendouter">
          <canvas id="canvas" tabIndex={1} 
          ref={this.setCanvas}>
			      Your browser does not support the canvas element. Please upgrade to the latest version of your browser or use Google Chrome or Firefox.
		      </canvas>
		    
          <div id="legend">
		        <div id="legendhead">
		          <div id="legendvert">
		            Legend
		          </div>
		        </div>
		        <div id="legendcontent">
		          <img src={imageCoin} /> Auction House
		          <br /><img src={imageCraft} /> Crafting
		          <br /><img src={imageCleric} /> Cleric Training
		          <br /><img src={imageFighter} /> Fighter Training
		          <br /><img src={imageRogue} /> Rogue Training
		          <br /><img src={imageWizard} /> Wizard Training
		          <br /><img src={imageClanmoot} /> PC Settlement
		          <br /><img src={imageVillage} /> NPC Settlement
		          <br /><img src={imageStar} /> NPC Town
		          <br /><img src={imageWaterfall} /> Unclaimed Settlement Hex
		          <br /><img src={imageSkull} /> Inactive Settlement
		          <br /><img src={imagePOI} /> Protected Hex
		          <br /><img src={imageTotem} /> Fanes
		          <br /><img src={imageMonument} /> Location Achievement
		          <br /><img src={imageMonolith} /> Unmarked Achievement
		        </div>
		      </div>
		    </div>
		    
        
        
        

      </div>
    )
  }
}

