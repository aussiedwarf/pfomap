//Copyright Eden Harris 2019

import Mouse from './mouse';
import { initHoldings, seletctHolding } from './holdings';
import { g_settlements, g_npcSettlements, g_alliances, g_territory, g_hexTowers, g_hexBorders } from './settlements';
import { g_landmarks, g_hexRegions, g_hexTypes, g_regions, g_hexFeatures, g_hexTypesFull } from './hexes';
import HexInfo from './hex';
import { vec3, vec4, mat4 } from 'gl-matrix';

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
import * as imageWorldMap from './images/WorldMap.jpg';
import * as imageCastle from './images/castle.png';
import * as imageLion from './images/lion.png';
import * as imageRuins from './images/ruins.png';
import * as imageTower from './images/tower.png';
import * as imageX from './images/x.png';

var g_hex = new HexInfo();


//https://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable: any)
{
	 var query = window.location.search.substring(1);
	 var vars = query.split("&");
	 for (var i=0;i<vars.length;i++) 
	 {
		 var pair = vars[i].split("=");
		 if(pair[0] == variable){return pair[1];}
	 }
	 return "";
}




function HexAnimation()
{
  this.startPercent = 0;
  this.startTime = 0;
  this.percent = 0;
  this.type = 0; //0 for animate down, 1 for animate up
  this.length = 1000;//time in milliseconds
  this.hex;//hex coords
  this.style = 0;//0 yellow, 1 blue
}


export default class Game {
  
  mapLoaded: boolean = false;
  windowLoaded: boolean = false;
  loaded: number = 0;
  
  gl: boolean = false;
  
  mouse: Mouse = new Mouse();
  
  zoom: number = 1;
  zoomVel: number = 1.04;
  maxZoom: number = 4;
  minZoom: number = 1/20;
  zoomIn: boolean = false;
  zoomOut: boolean = false;
  
  endTimeStart: number = 0;	//frame timing
  
  size: vec4;
  matrixProjection: mat4 = mat4.create();//new Mat4x4();
  matrixViewport: mat4 = mat4.create();//new Mat4x4();
  matrixView: mat4 = mat4.create();//new Mat4x4();
  mvp: mat4 = mat4.create();//new Mat4x4();
  invMvp: mat4 = mat4.create();//new Mat4x4();
  cameraPosition: vec4 = vec4.fromValues(0,0,0,1);//new Vec4(0,0,0,1);
  highlightedHex: vec4 = vec4.fromValues(0,0,0,1);//new Vec4(0,0,0,1);
  selectedHex: vec4 = vec4.fromValues(0,0,0,1);//new Vec4(0,0,0,1);
	selected: boolean = false;
  
  enabledIcons: boolean = true;
  enabledDrawHexCoords = false;
  enabledDrawAlliance = false;
  enabledDrawGrid = true;
  enabledDrawHexTypes = true;
  enabledDrawAlignment = false;
  enabledDrawControllingTowers = true;
  enabledDrawRegions = false;
  enabledDrawBorders = false;
  enabledDrawLandmarks: boolean = true;
  enabledDrawBulk = false;
  
  redraw: boolean = false;
  enabledDrawPaper = false;
  
  animation: Array<any>;
  
  hexRegionLines: Array<any>;
  hexLandmarks: Array<number>;
  
  hexBorderLines: Array<any> = [];
  
  canvas: HTMLCanvasElement;
  context2d: CanvasRenderingContext2D;
  
  map: HTMLImageElement;
  iconFighter: HTMLImageElement;
  iconCleric: HTMLImageElement;
  iconCoin: HTMLImageElement;
  iconRogue: HTMLImageElement;
  iconWizard: HTMLImageElement;
  iconCraft: HTMLImageElement;
  iconCastle: HTMLImageElement;
  iconLion: HTMLImageElement;
  iconRuins: HTMLImageElement;
  iconVillage: HTMLImageElement;
  iconX: HTMLImageElement;
  iconTower: HTMLImageElement;
  iconStar: HTMLImageElement;
  iconClanmoot: HTMLImageElement;
  iconPointOfInterest: HTMLImageElement;
  iconTotem: HTMLImageElement;
  iconSkullCrossbones: HTMLImageElement;
  iconMonument: HTMLImageElement;
  iconMonolith: HTMLImageElement;
  iconWaterfall: HTMLImageElement;
  
  constructor(a_canvas: HTMLCanvasElement){
    /*
    this.paperTime = 0;
    this.paperCanvas = document.createElement('canvas');
    this.paperTopLeft = g_hex.hexToPixel(vec4.add(vec4.create(), g_hex.hexTopLeftCoordFull, vec4.fromValues(-1,-1,0,0)));
    this.paperBottomRight = g_hex.hexToPixel(vec4.fromValues(
    	g_hex.hexTopLeftCoordFull[0] + g_hex.hexDimFull[0], 
    	g_hex.hexTopLeftCoordFull[1] + g_hex.hexDimFull[1]));
    this.paperBottomRight[0] += g_hex.hexSize[0];
    this.paperBottomRight[1] += g_hex.hexSize[1];
    	
    this.paperCanvas.width = this.paperBottomRight[0] - this.paperTopLeft[0];
    this.paperCanvas.height = this.paperBottomRight[1] - this.paperTopLeft[1];
    
    this.simplex = new SimplexNoise();
    this.simplexf = new FastSimplexNoise();
    
    this.CreatePaper(this.paperCanvas);
    */
    this.canvas = a_canvas;
    var canvas = a_canvas;
    var context = null;
  
    /*
    this.imagePaperLoaded = false;
    this.imagePaper = new Image();
    this.imagePaper.onload = function(){
    	app.imagePaperLoaded = true;
    	};
    
    var url = this.paperCanvas.toDataURL("image/png");
    
    this.imagePaper.src = url;
    */
    try {
      // Try to grab the standard context. If it fails, fallback to experimental.
      //context = canvas.getContext("webgl", {alpha:false}) || canvas.getContext("experimental-webgl", {alpha:false}) || canvas.getContext("3d", {alpha:false});
    	//this.gl = true;
    }
    catch(e) {}
    
    
    // If we don't have a GL context, give up now
    if (!context) 
    {
      context = canvas.getContext("2d");
      this.context2d = context;
    }
  

  
    /*todo
    this.size = new Vec4(window.innerWidth, window.innerHeight,0,1);
    */
    this.size = vec4.fromValues(window.innerWidth, window.innerHeight,0,1);
    
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //get hex position as url variable
    
    const posxText = getQueryVariable("x");
    const posyText = getQueryVariable("y");
    const zoomText = getQueryVariable("zoom");
    let zoom: number = parseFloat(zoomText);
    const isSelected = getQueryVariable("selected");
    
    //center camera and select hex
    if(posxText && posyText)
    {
    	let posx = parseInt(posxText);
    	let posy = parseInt(posyText);
    	
    	
    	if(posx < g_hex.hexTopLeftCoord[0])
    		posx = g_hex.hexTopLeftCoord[0];
    	if(posx > g_hex.hexTopLeftCoord[0] + g_hex.hexDim[0])
    		posx = g_hex.hexTopLeftCoord[0] + g_hex.hexDim[0];
    		
    	if(posy < g_hex.hexTopLeftCoord[1])
    		posy = g_hex.hexTopLeftCoord[1];
    	if(posy > g_hex.hexTopLeftCoord[1] + g_hex.hexDim[1])
    		posy = g_hex.hexTopLeftCoord[1] + g_hex.hexDim[1];
    		
    	if(g_hex.validHex(vec4.fromValues(posx,posy,0,1)))
    	{
    	
			  if(zoom)
			  {
				  if(zoom > this.maxZoom)
        		zoom = this.maxZoom;
    		
      		if(zoom < this.minZoom)
        		zoom = this.minZoom;
        		
        	this.zoom = zoom;
			  }
			  
			  //hex to position
			  var p = g_hex.hexToPixel(vec4.fromValues(posx,posy,0,1));
		  
			  this.cameraPosition[0] = p[0] - canvas.width/2/this.zoom + g_hex.hexSize[0]/2;
			  this.cameraPosition[1] = p[1] - canvas.height/2/this.zoom + g_hex.hexSize[1]/2;
		  
			  if(isSelected == "true")
			  {
				  this.selectedHex[0] = posx;
				  this.selectedHex[1] = posy;
		  
				  this.selected = true;
			  }
			  
			  
    	}
    }
  
    this.map = new Image();
    this.iconFighter = new Image();
    this.iconCleric = new Image();
    this.iconCoin = new Image();
    this.iconRogue = new Image();
    this.iconWizard = new Image();
    this.iconCraft = new Image();
    this.iconCastle = new Image();
    this.iconLion = new Image();
    this.iconRuins = new Image();
    this.iconVillage = new Image();
    this.iconX = new Image();
    this.iconTower = new Image();
    this.iconStar = new Image();
    this.iconClanmoot = new Image();
    this.iconPointOfInterest = new Image();
    this.iconTotem = new Image();
    this.iconSkullCrossbones = new Image();
    this.iconMonument = new Image();
    this.iconMonolith = new Image();
    this.iconWaterfall = new Image();
    
    const self = this;
    this.map.onload = () => {
      this.mapLoaded  = true;
      //this.enabledDrawHexTypes = false;
      this.loaded++;
      //self.Update();
      this.calculateMatricies();
    };
  
    canvas.onload = () => {
    	this.calculateMatricies();
    	//self.redraw = true;
    }
    
    this.animation = [];
    
    /*
    window.onload=function()
    {
      this.windowLoaded = true;
      this.Init();
    }
    */
    
    this.loaded = 0;
  
    this.iconFighter.src = imageFighter;
    this.iconCleric.src = imageCleric;
    this.iconRogue.src = imageRogue;
    this.iconWizard.src = imageWizard;
    this.iconCraft.src = imageCraft;
    this.iconCoin.src = imageCoin;
    this.iconCastle.src = imageCastle;
    this.iconLion.src = imageLion;
    this.iconRuins.src = imageRuins;
    this.iconVillage.src = imageVillage;
    this.iconX.src = imageX;
    this.iconTower.src = imageTower;
    this.iconStar.src = imageStar;
    this.iconClanmoot.src = imageClanmoot;
    this.iconPointOfInterest.src = imagePOI;
    this.iconTotem.src = imageTotem;
    this.iconSkullCrossbones.src = imageSkull;
    this.iconMonument.src = imageMonument;
    this.iconMonolith.src = imageMonolith;
    this.iconWaterfall.src = imageWaterfall;
    
    canvas.onselectstart = function(){return false};
    
    this.map.onload = ()=>{this.render()};
    this.map.src = imageWorldMap;
    
  
  
    this.hexRegionLines = [];
    this.hexBorderLines = [];
    
    
  
    canvas.onmousedown = this.mouseDownEvent;
    canvas.onmouseup = this.mouseUpEvent;
    canvas.onmousemove = this.mouseMoveEvent;
    canvas.ondblclick = this.mouseDoubleClick;
    canvas.onkeydown = this.keyDown;
    canvas.onkeyup = this.keyUp;
    //c.addEventListener("keydown", this.KeyHandle.bind(this), false);
    //c.addEventListener("keyup", this.KeyHandle.bind(this), false);
    
    if(canvas.addEventListener)
    {
      canvas.addEventListener("mousewheel",this.mouseScrollEvent,false);
      canvas.addEventListener("DOMMouseScroll",this.mouseScrollEvent,false);
      
      canvas.addEventListener("touchmove", this.touchMoveEvent,false); 
      canvas.addEventListener("touchstart", this.touchStartEvent,false); 
      canvas.addEventListener("touchend", this.touchEndEvent,false); 
    }
    //else 
    //{
      //canvas.addEventListener("onmousewheel",this.mouseScrollEvent,false);
      //canvas.attachEvent("onmousewheel",this.mouseScrollEvent,false);
    //}
  
    
  
  
   	this.initTowers();
   	
   	this.hexLandmarks = new Array(g_hex.hexDim[0] * g_hex.hexDim[1]);
   	this.initLandmarks();
   	initHoldings(g_hex);
	  this.initTraining();
	  this.initSettlementTypes();
    
    /*
    cbViewCoordinates = document.getElementById("cbViewCoordinates");
    cbViewCoordinates.onclick = function()
    {
      if(cbViewCoordinates.checked == true)
        self.drawHexCoords = true;
      else
        self.drawHexCoords = false;
    }
    */
    this.makeRegionLines();
    //this.MakeBorderLines();
    
    this.init();
  
  }
  
  init = () => {
    /*
    if(typeof(extraApp) !== 'undefined')
    {
    	extraApp.ExtraInit();
    }
    */
    
    this.calculateMatricies();
    
    this.render();
  }
  
  
  updateHexInfo = () => {
	  var hex;
	  if(this.selected)
    {
    	hex = vec4.clone(this.selectedHex);
    }
    else
    {
    	hex = vec4.clone(this.highlightedHex);
    }
    
    var content = "<b>Hex:</b> "+ hex[0] + ", "  + hex[1];
    
    
    var pos = vec4.transformMat4(vec4.create(), vec4.fromValues(this.mouse.x, this.mouse.y,0,1), this.invMvp);
    pos = this.pixelToLatLong(pos );
    
    content = content + "<br><b>Lat/Long:</b> " + pos[0].toFixed(2) + ", " + pos[1].toFixed(2);
    
    var coord = hex[0] - g_hex.hexTopLeftCoord[0] + (hex[1] - g_hex.hexTopLeftCoord[1]) * g_hex.hexDim[0];
    var type = g_hexTypes[coord];
    content = content + "<br><b>Hex Type:</b> ";
    
  
  
    switch(type)
    {
      case 0:
        content = content + "Water"
        break;
      case 1:
        content = content + "Croplands"
        break;
      case 2:
        content = content + "Forest"
        break;
      case 3:
        content = content + "Hills"
        break;
      case 4:
        content = content + "Mountains"
        break;
      case 5:
        content = content + "Swamp"
        break;
      case 6:
        content = content + "Meteor"
        break;
      default:
        content = content + "Unknown"
    }
    
    var region = g_regions[g_hexRegions[coord]].name;
    content = content + "<br><b>Region:</b> " + region;
    
    
    var feature = g_hexFeatures[coord];
    
    if(feature & 1)
    {
    	content = content + "<br>Monster Hex";
    }
  
    if(feature & 2)
    {
    	content = content + "<br>Monster Home Hex";
    }
    
    if(feature & 4)
    {
    	content = content + "<br>Badlands Hex";
    }
    
    if(feature & 32)
    {
    	content = content + "<br>Empty settlement hex";
    }
    /*
    if(feature & 256)
    {
    	var i = g_hexTowers[coord];
    	var settlement;
    	if(i == 256)
    		settlement = "Unknown";
    	else
    		settlement = g_settlements[i].name;
    	content = content + "<br>Tower: " + settlement;
    }
    */
    if(feature & 512)
    {
    	content = content + "<br>Patrolled";
    }
  
    //settlement info
    var index = -1;
    for(var i = 0; i < g_settlements.length; i++)
    {
      if(g_settlements[i].hex[0] == hex[0] && g_settlements[i].hex[1] == hex[1])
      {
        index = i;
      }
    }
    
    if(index >= 0)
    {
      content = content + "<br><b>Settlement:</b> " + g_settlements[index].name + 
        "<br><b>Alignment:</b> " + g_settlements[index].alignment + 
        "<br><b>Population:</b> " + g_settlements[index].population +
        "<br><b>Training Level:</b> " + g_settlements[index].level + 
        /*"<br>Towers: " + g_settlements[index].numTowers  + */
        "<br><b>Alliances:</b> ";
        
      if(g_settlements[index].alliance.length == 0)
      {
        content = content + "None"
      }
      else
      {
        for(var i = 0; i < g_settlements[index].alliance.length; i++)
        {
          if(i>0)
            content += ", " + g_alliances[g_settlements[index].alliance[i]].name;
          else
            content += g_alliances[g_settlements[index].alliance[i]].name;
        }
      }
    
      //buildings
      //content += "<br><b>Buildings:</b> " + g_settlements[index].buildings;
      
      //training
      content += "<br><b>Training:</b> ";
      
      if(g_settlements[index].training.alchemist)
      	content += "Alchemist ";
      if(g_settlements[index].training.apothecary)
      	content += "Apothecary ";
      if(g_settlements[index].training.arcanist)
      	content += "Arcanist ";
      if(g_settlements[index].training.artificer)
      	content += "Artificer ";
      if(g_settlements[index].training.armorsmith)
      	content += "Armorsmith ";
      if(g_settlements[index].training.bowyer)
      	content += "Bowyer ";
      if(g_settlements[index].training.cleric)
      	content += "Cleric ";
      if(g_settlements[index].training.dreadnaught)
      	content += "Dreadnaught ";
      if(g_settlements[index].training.engineer)
      	content += "Engineer ";
      if(g_settlements[index].training.expert)
      	content += "Expert ";
      if(g_settlements[index].training.fighter)
      	content += "Fighter ";
      if(g_settlements[index].training.freeholder)
      	content += "Freeholder ";
      if(g_settlements[index].training.geologist)
      	content += "Geologist ";
      if(g_settlements[index].training.iconographer )
      	content += "Iconographer  ";
      if(g_settlements[index].training.leatherworker)
      	content += "Leatherworker ";
      if(g_settlements[index].training.library)
      	content += "Library ";
      if(g_settlements[index].training.jeweller)
      	content += "Jeweller ";
      if(g_settlements[index].training.occultist)
      	content += "Occultist ";
      if(g_settlements[index].training.rogue)
      	content += "Rogue ";
      if(g_settlements[index].training.sawyer)
      	content += "Sawyer ";
      if(g_settlements[index].training.seminary)
      	content += "Seminary ";
      if(g_settlements[index].training.skirmisher)
      	content += "Skirmisher ";
      if(g_settlements[index].training.smelter)
      	content += "Smelter ";
      if(g_settlements[index].training.tailor)
      	content += "Tailor ";
      if(g_settlements[index].training.tanner)
      	content += "Tanner ";
      if(g_settlements[index].training.warWizard)
      	content += "War Wizard ";
      if(g_settlements[index].training.weaponsmith)
      	content += "Weaponsmith ";
      if(g_settlements[index].training.weaver)
      	content += "Weaver ";
      if(g_settlements[index].training.wizard)
      	content += "Wizard ";
      
      content = content + "<br><b>Website:</b> <a href=\"" + g_settlements[index].website + "\">" + g_settlements[index].website + "</a>";
    }
    else
    {
      for(var i = 0; i < g_npcSettlements.length; i++)
      {
        if(g_npcSettlements[i].hex[0] == hex[0] && g_npcSettlements[i].hex[1] == hex[1])
        {
          index = i;
        }
      }
    
      if(index >= 0)
      {
        content = content + "<br>NPC Settlement: " + g_npcSettlements[index].name;
      }
    }
    
    //Territory
    var territory = g_territory[coord];
    content += "<br><b>Territory:</b> "
    if(territory >= 0)
    {
    	content += g_alliances[territory].name;
    }
    else
    {
    	content += "Unclaimed";
    }
    
    //Landmarks
    if(this.hexLandmarks[coord] >= 0)
    {
    	var i = this.hexLandmarks[coord];
    	
    	while(i < g_landmarks.length && g_landmarks[i].hex[0] == hex[0] && g_landmarks[i].hex[1] == hex[1])
    	{
    		if(g_landmarks[i].type == 4)
    		{
    			content = content + "<br>Player Name: " + g_landmarks[i].name;
    		}
    		else
    			content = content + "<br>" + g_landmarks[i].name;
    			
    		if(g_landmarks[i].text.length > 0)
    			content = content + "<br>" + g_landmarks[i].text;
    		i++;
    	}
    }
  
    //if(typeof(extraApp) !== 'undefined')
    //	content = extraApp.ExtraText(content, coord);
    
    //if(this.drawBulk)
    //	content = UpdateHoldingsText(content, hex)
    
    document.getElementById("hexinfo").innerHTML = content;
  }
    
  update = () => {
	  const startTime = Date.now();
	  
	  let redraw = false;
	  
    const canvas = this.canvas;
    const context = this.context2d;
    
    if(this.zoomIn || this.zoomOut)
    	this.calculateZoom();
    
    if(this.size[0] != window.innerWidth || this.size[1] != window.innerHeight )
    {
    	canvas.width  = window.innerWidth;
    	canvas.height = window.innerHeight;
    	
    	this.size[0] = canvas.width;
    	this.size[1] = canvas.height;
    	
    	this.calculateMatricies();
    }
    
    //if(!this.redraw)
    //  return;
    
    const t = Date.now();
    
    context.fillStyle = "rgb(255,255,255)"
    context.fillRect(0,0,canvas.width,canvas.height);
    
    
    
    
	  
    //this.CalculateMatricies();
    /*todo
    var a = this.mvp.MultiplyVec4(new Vec4(-g_hex.mapSize.x/2,-g_hex.mapSize.y/2,0,1));
    var b = this.mvp.MultiplyVec4(new Vec4(g_hex.mapSize.x/2,g_hex.mapSize.y/2,0,1));
    */
    const a = vec4.transformMat4(vec4.create(), vec4.fromValues(-g_hex.mapSize[0]/2,-g_hex.mapSize[1]/2,0,1), this.mvp);
    const b = vec4.transformMat4(vec4.create(), vec4.fromValues(g_hex.mapSize[0]/2,g_hex.mapSize[1]/2,0,1), this.mvp);
    
    if(this.enabledDrawPaper)
    	this.drawPaper(context);
    
  
    if(this.enabledDrawHexTypes)
    {
      this.drawHexTypes(context);
    }
    else
      context.drawImage(this.map, a[0], a[1], b[0] - a[0], b[1] - a[1]);
    
      
    //if(typeof(extraApp) !== 'undefined')
    //	extraApp.DrawExtra();
    	
    //if(this.drawAlliance)
    //  this.DrawAlliances(context);
      
    if(this.enabledDrawBorders)
    	this.drawBorders(context);
    	
    if(this.enabledDrawLandmarks)
    	this.drawLandmarks(context);
      
    //if(this.enabledDrawHexTypes)
      this.drawFeatures(context);
      
    
    if(this.enabledDrawGrid)
    {
      //this.DrawGrid(6,"rgba(0, 127, 255, 0.333)");
      this.drawGrid(2,"rgba(255, 255, 255, 0.333)", context);
    }
    
      
    
   
    if(this.enabledDrawBorders)
    {
    	this.drawControllingTowers();
    }
    
    
    
    if(this.enabledDrawRegions)
    {
    	this.drawRegions();
    }
    
    //draw icons
    if(this.enabledIcons)
    {
      for(var i = 0; i < g_settlements.length; i++)
      {
        this.drawIcons(g_settlements[i]);
      }
    }
    
  
    
    //var m = this.invMvp.MultiplyVec4(new Vec4(this.mouse.x, this.mouse.y, 0, 1));
    
    //m = g_hex.PixelToHex(m);
    
    this.drawText(context);
    
    //if(typeof(extraApp) !== 'undefined')
    //	extraApp.DrawTextExtra();
	  

    //draw hex selection
    this.mouseOverHex(t);
    const len = this.animation.length;
    //var count = 0;
    for(let i = 0; i < this.animation.length; i++)
    {
      //var text = count.toString() + ": " + this.animation[i].hex.x.toString() + ", " + this.animation[i].hex.y.toString();
      //context.fillText(text, 10 , 10+ count *10);
      
      if(this.animation[i].type == 0)
      {
        this.animation[i].percent = 1 - (t - this.animation[i].startTime)/this.animation[i].length;
      }
      else
      {
        this.animation[i].percent = 1;//(t - this.animation[i].startTime)/this.animation[i].length;
      }
      
      if(this.animation[i].percent > 1)
        this.animation[i].percent = 1;
      
      if(this.animation[i].percent < 0)
      {
        this.animation.splice(i,1);
        i--;
      }
      else
      {
        //render hex
        const hex = vec4.clone(this.animation[i].hex); 
        
        if(g_hex.validHex(hex))
        {
          let pos = g_hex.hexToPixel(hex); 
          /*todo
          pos = this.mvp.MultiplyVec4(pos);
          */
          pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
          let percent =  this.animation[i].percent;
          percent*=percent;
          const p2 = percent*0.5;
          const p3 = p2 * 0.5;
          const p4 = p3 * 0.5;
          
          if(this.animation[i].style == 1)
          {
          	this.drawHex(pos, 8, "rgba(  0, 255, 255, "+p4+")");
					  this.drawHex(pos, 6, "rgba(  0, 255, 255, "+p3+")");
					  this.drawHex(pos, 4, "rgba(  0, 255, 255, "+p2+")");
					  this.drawHex(pos, 2, "rgba(127, 255, 255, "+percent+")");
          }
          else
          {
					  this.drawHex(pos, 8, "rgba(255, 255, 0, "+p4+")");
					  this.drawHex(pos, 6, "rgba(255, 255, 0, "+p3+")");
					  this.drawHex(pos, 4, "rgba(255, 255, 0, "+p2+")");
					  this.drawHex(pos, 2, "rgba(255, 255, 255, "+percent+")");
				  }
        }
      }
      //count++;
    }
  
    if(this.selected)
    {
    	var pos = g_hex.hexToPixel(this.selectedHex); 
    	/*todo
		  pos = this.mvp.MultiplyVec4(pos);
		  */
		  pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
		  var percent = 1;
		  percent*=percent;
		  var p2 = percent*0.5;
		  var p3 = p2 * 0.5;
		  var p4 = p3 * 0.5;
          
    	this.drawHex(pos, 8, "rgba(  0, 255, 255, "+p4+")");
		  this.drawHex(pos, 6, "rgba(  0, 255, 255, "+p3+")");
		  this.drawHex(pos, 4, "rgba(  0, 255, 255, "+p2+")");
		  this.drawHex(pos, 2, "rgba(127, 255, 255, "+percent+")");
    }
    
    
      
    context.font="10px Arial";
    context.fillStyle = "rgba(0, 0, 0, 255)"
    //context.fillText("Pathfinder Online Image and place name copyright Goblinworks inc, remaining material copyright Eden Harris 2015", 300, canvas.height-10);
    
    
    if(this.animation.length < 1)
      redraw = false;
    else if (this.animation.length < 2)
    {
      if(this.animation[0].percent == 1)
        redraw = false;
      else
      	redraw = true;
    }
    else
    	redraw = true;
    	
    if(this.zoomIn || this.zoomOut)
    	redraw = true;
    
    this.redraw = false;
    
    //time of this function
    const endTime = Date.now();
    let time = endTime - startTime;
    context.fillText(time.toString(), canvas.width-30, canvas.height-10);
    
    //time inbetween last frame
    time = startTime - this.endTimeStart;
    this.endTimeStart = endTime;
    context.fillText(time.toString(), canvas.width-30, canvas.height-20);
    
    //time to create paper
    //if(this.enabledDrawPaper)
    //	context.fillText(this.paperTime, canvas.width-30, canvas.height-30);
    
    if(redraw)
    {
    	this.render();
    }
    /*
    context.beginPath();
    context.strokeStyle = "rgba(255, 0, 0, 1.0)";
    context.rect(pos.x-1,pos.y-1,3,3);
    context.stroke();
    */

  }
  
  todo = () => {
    
    /*
    var cbViewGrid = document.getElementById("cbViewGrid");
    cbViewGrid.onclick = function()
    {
      if(cbViewGrid.checked == true)
        self.drawGrid = true;
      else
        self.drawGrid = false;
      self.redraw = true;
    }
    */
    
    
    /*
    var cbViewAlliances = document.getElementById("cbViewAlliances");
    cbViewAlliances.onclick = function()
    {
      if(cbViewAlliances.checked == true)
        self.drawAlliance = true;
      else
        self.drawAlliance = false;
      self.redraw = true;
    }
    */
    
    
    /*
    var cbViewTerritory = document.getElementById("cbViewTerritory");
    cbViewTerritory.onclick = function()
    {
      if(cbViewTerritory.checked == true)
        self.drawControllingTowers = true;
      else
        self.drawControllingTowers = false;
      self.redraw = true;
    }
    */
  
  
    var cbViewBulk = document.getElementById("cbViewBulk");
    cbViewBulk.onclick = () => {
      if((cbViewBulk as any).checked == true)
        this.enabledDrawBulk = true;
      else
        this.enabledDrawBulk = false;
      
      
      var resources = document.getElementById("resources");
      if(resources.style.visibility == "hidden")
      {
      	resources.style.visibility = "visible";
      	resources.style.height = "auto"
      }
      else
      {
      	resources.style.visibility = "hidden";
      	resources.style.height = "0px";
      }
      
      this.render();
    }
    
  }
  
  drawPaper = (a_context: any) => {
  }
  
  keyDown = (a_event) => {

  }

  keyUp = (a_event) => {

  }
  
  mouseDoubleClick = (a_eventData) => {
	  var canvas=this.canvas;
    var rect = canvas.getBoundingClientRect();
    var borderWidth = canvas.style.borderWidth;
    

    var x = a_eventData.clientX - rect.left;
    var y = a_eventData.clientY - rect.top;

    if (a_eventData.button == 0) 
    {
      var pos = vec4.fromValues(x,y,0,1);
		  pos = vec4.transformMat4(vec4.create(), pos, this.invMvp);
		  var hex = g_hex.pixelToHex(pos);
	  
		  var valid = g_hex.validHex(hex);
		  
		  if(valid)
		  {
			  this.selected = true;
			  this.selectedHex = vec4.clone(hex);
		  
			  //this.redraw = true;
			  
			  if(this.enabledDrawBulk)
				  seletctHolding();
				  
			  this.render();
		  }
    }
  }
  
  mouseDownEvent = (a_eventData) => {

    var canvas=document.getElementById("canvas");
    var rect = canvas.getBoundingClientRect();
    var borderWidth = canvas.style.borderWidth;

    var mouseX = a_eventData.clientX - rect.left;
    var mouseY = a_eventData.clientY - rect.top;

    if (a_eventData.button == 0) 
    {
      this.mouse.leftDown = true;
      this.mouse.leftDownX = mouseX;
      this.mouse.leftDownY = mouseY;
    }

    
    this.calculateMatricies();
  } 


  mouseUpEvent = (a_event) => {
    var canvas=document.getElementById("canvas");
    
    if (a_event.button == 1) {
      this.mouse.middleDown = false;
    }
    
    if (a_event.button == 0) {
      this.mouse.leftDown = false;
    }
    
    if(this.selected)
    {
    	var t = Date.now();
    	this.selected = false;
    	
    	var animation = new HexAnimation();
		  animation.startTime = t;
		  animation.type = 0;
		  animation.style = 1;
		  animation.hex = vec4.clone(this.selectedHex);
		  this.animation.push(animation);
    	
    	this.render();
    }
    
  }
  

  calculateZoom = () => {
	  var c=this.canvas;
    var rect = c.getBoundingClientRect();
    var borderWidth = c.style.borderWidth;

    var mouseX = c.width/2;
    var mouseY = c.height/2;
        
    var oldScale = mat4.create();
    oldScale[0] = this.zoom;
    oldScale[5] = this.zoom;
    
    var v = vec4.fromValues(mouseX, mouseY, 0, 1);
    var p = vec4.transformMat4(vec4.create(), v, this.invMvp); //model space point
    

    if(this.zoomIn)
	  {
		  this.zoom *= this.zoomVel;
      if(this.zoom > this.maxZoom)
        this.zoom = this.maxZoom;
	  }

	  if(this.zoomOut)
	  {
		  this.zoom *= 1.0/this.zoomVel;
      if(this.zoom < this.minZoom)
        this.zoom = this.minZoom;
	  }

    //v = R * P * S * V * p
    //v = T * V * p
    
    //v = s * (Vx +px)
    //v = t * (Wx +px)
    
    //s * (px + Vx) = t * (px + Wx)
    //s * px + s * Vx = t * px + t * Wx
    //s * px + s * Vx - t * px = t * Wx
    //s * (px + Vx) - t * px = t * Wx
    //s * (px + Vx) / t - px = Wx

    
    var scale = mat4.create();
    scale[0] = this.zoom;
    scale[1] = this.zoom;

    
    var view = mat4.create();
    view[12] = oldScale[0] * (p[0] + this.matrixView[12]) / this.zoom - p[0];
    view[13] = oldScale[5] * (p[1] + this.matrixView[13]) / this.zoom - p[1];
    
    var camera = mat4.invert(mat4.create(), view);
    this.cameraPosition[0] = camera[12];
    this.cameraPosition[1] = camera[13];
    this.cameraPosition[2] = camera[14];

    
    this.calculateMatricies();
  }

  touchMoveEvent = (a_event) => {
    a_event.preventDefault();
    
    var redraw = false;
    
    var canvas=document.getElementById("canvas");
    var rect = canvas.getBoundingClientRect();
    var borderWidth = canvas.style.borderWidth;
    
    var touch = a_event.targetTouches[0];

    var x = touch.pageX - rect.left;
    var y = touch.pageY - rect.top;

    if(this.mouse.leftDown == true)
    {
      this.moveCamera(this.mouse.x, this.mouse.y, x, y);
      redraw = true;
    }
    
    var pos = vec4.fromValues(x,y,0,1);
    pos = vec4.transformMat4(vec4.create(), pos, this.invMvp);
    var hex = g_hex.pixelToHex(pos);
    
    var valid = g_hex.validHex(hex);
    
    if((hex[0] != this.highlightedHex[0] || hex[1] != this.highlightedHex[1]) && valid )
    {
      this.highlightedHex = vec4.clone(hex);
      
      this.updateHexInfo();
      redraw = true;
    }
    
    this.mouse.x = x;
    this.mouse.y = y;
    
    if(redraw)
	  {
		  this.render();
	  }
  }


  touchStartEvent = (a_event) => {
    var canvas=document.getElementById("canvas");
    var rect = canvas.getBoundingClientRect();
    var borderWidth = canvas.style.borderWidth;
    
    var touch = a_event.targetTouches[0];

    this.mouse.x = touch.pageX - rect.left;
    this.mouse.y = touch.pageY - rect.top;
    
    this.mouse.leftDown = true;
  }


  touchEndEvent = (a_event) => {
    this.mouse.leftDown = false;
    
    if(this.selected)
    {
    	var t = Date.now();
    	this.selected = false;
    	
    	var animation = new HexAnimation();
		  animation.startTime = t;
		  animation.type = 0;
		  animation.style = 1;
		  animation.hex = vec4.clone(this.selectedHex);
		  this.animation.push(animation);
    	
    	this.render();
    }
  }


  mouseMoveEvent = (a_eventData) => {
	  var redraw = false;
    var canvas=document.getElementById("canvas");
    var rect = canvas.getBoundingClientRect();
    var borderWidth = canvas.style.borderWidth;
    
    var x = a_eventData.clientX - rect.left;
    var y = a_eventData.clientY - rect.top;
    
    
    if(this.mouse.leftDown == true)
    {
      this.moveCamera(this.mouse.x, this.mouse.y, x, y);
      redraw = true;
    }
    
    var pos = vec4.fromValues(x,y,0,1);
    pos = vec4.transformMat4(vec4.create(), pos, this.invMvp);
    var hex = g_hex.pixelToHex(pos);
    
    var valid = g_hex.validHex(hex);
    
    if((hex[0] != this.highlightedHex[0] || hex[1] != this.highlightedHex[1]) && valid )
    {
      this.highlightedHex = vec4.clone(hex);
      
      
      redraw = true;
    }

    this.mouse.x = x;
    this.mouse.y = y;
    
    this.updateHexInfo();
    
    if(redraw)
	  {
		  this.render();
	  }
    
  }

  mouseScrollEvent = (a_eventData) => {
    a_eventData.preventDefault();
    
    var wheelData = a_eventData.detail ? a_eventData.detail * -1 : a_eventData.wheelDelta / 40;

    var c=document.getElementById("canvas");
    var rect = c.getBoundingClientRect();
    var borderWidth = c.style.borderWidth;

    var mouseX = a_eventData.clientX - rect.left;
    var mouseY = a_eventData.clientY - rect.top;
        
    var oldScale = mat4.create();
    oldScale[0] = this.zoom;
    oldScale[5] = this.zoom;
    
    var v = vec4.fromValues(mouseX, mouseY, 0, 1);
    var p = vec4.transformMat4(vec4.create(), v, this.invMvp); //model space point
    

    if(wheelData > 0)
    {
      this.zoom *= this.zoomVel;
      if(this.zoom > this.maxZoom)
        this.zoom = this.maxZoom;
    }
    else if(wheelData < 0)
    {
      this.zoom *= 1.0/this.zoomVel;
      if(this.zoom < this.minZoom)
        this.zoom = this.minZoom;
    }

    //v = R * P * S * V * p
    //v = T * V * p
    
    //v = s * (Vx +px)
    //v = t * (Wx +px)
    
    //s * (px + Vx) = t * (px + Wx)
    //s * px + s * Vx = t * px + t * Wx
    //s * px + s * Vx - t * px = t * Wx
    //s * (px + Vx) - t * px = t * Wx
    //s * (px + Vx) / t - px = Wx

    
    var scale = mat4.create();
    scale[0] = this.zoom;
    scale[5] = this.zoom;
    /*todo
    scale.Scale(vec4.fromValues(this.zoom,this.zoom,1,1));
    */
    
    var view = mat4.create();
    view[12] = oldScale[0] * (p[0] + this.matrixView[12]) / this.zoom - p[0];
    view[13] = oldScale[5] * (p[1] + this.matrixView[13]) / this.zoom - p[1];
    
    var camera = mat4.invert(mat4.create(), view);//view.Inverse();
    this.cameraPosition[0] = camera[12];
    this.cameraPosition[1] = camera[13];
    this.cameraPosition[2] = camera[14];

    
    this.calculateMatricies();
    
    this.render();
    
  }

  mouseOverHex = (a_t) => {
    var redraw = false;
    var v = vec4.fromValues(this.mouse.x, this.mouse.y, 0, 1);
    var p = vec4.transformMat4(vec4.create(), v, this.invMvp); //model space point
    
    var hex = g_hex.pixelToHex(p);
    
    //check animation list for hex
    var found = false;
    for(var i = 0; i < this.animation.length; i++)
    {
      if(this.animation[i].hex[0] == hex[0] && this.animation[i].hex[1] == hex[1] && this.animation[i].style == 0)
      {
        found = true;
        this.animation[i].type = 1;
      }
      else
      {
        //swap to down
        if(this.animation[i].type == 1 && this.animation[i].style == 0)
        {
          this.animation[i].startTime = a_t;
          this.animation[i].type = 0;
        }
      }
    }
    
    //add animation
    if(found == false)
    {
      var animation = new HexAnimation();
      animation.startTime = a_t;
      animation.type = 1;
      animation.hex = vec4.clone(hex);
      this.animation.push(animation);
      
      redraw = true;
    }
    
    if(redraw)
	  {
		  this.render();
	  }
   
  }

  screenToWorld = (a_in) => {
    var pos = vec4.transformMat4(vec4.create(), a_in, this.invMvp);
    return pos;
  }

  moveCamera = (a_px, a_py, a_nx, a_ny) => { //prev, new
    var start   = this.screenToWorld(vec4.fromValues(a_px, a_py, 0, 1));
    var finish  = this.screenToWorld(vec4.fromValues(a_nx, a_ny, 0, 1));
    
    var move = vec4.sub(vec4.create(), start, finish);//start.Sub(finish);
    
    this.cameraPosition = vec4.add(vec4.create(), this.cameraPosition, move);//this.cameraPosition.Add(move);
    this.cameraPosition[3]=1;
    
    this.calculateMatricies();
    
    
  }


  calculateMatricies = () => {
    var canvas = this.canvas;
    //var context = canvas.getContext("2d");
    
    //canvas.width  = window.innerWidth;
    //canvas.height = window.innerHeight;
    /*todo
    this.matrixView.LookAt(new Vec4(this.cameraPosition.x,this.cameraPosition.y,1,1), new Vec4(this.cameraPosition.x,this.cameraPosition.y,0,1), new Vec4(0,1,0,1));
    */
    var center = vec4.clone(this.cameraPosition);
    this.cameraPosition[2] = 1;
    center[2] = 0;
    mat4.lookAt(this.matrixView, (this.cameraPosition as any), (center as any), vec3.fromValues(0,1,0));
    
    /*todo
    this.matrixViewport.SetIdentity();
    this.matrixViewport.v[0].x = canvas.width/2;
    this.matrixViewport.v[1].y = canvas.height/2;
    this.matrixViewport.v[3].x = canvas.width/2;
    this.matrixViewport.v[3].y = canvas.height/2;
    */
    mat4.identity(this.matrixViewport);
    this.matrixViewport[0] = canvas.width/2;
    this.matrixViewport[5] = canvas.height/2;
    this.matrixViewport[12] = canvas.width/2;
    this.matrixViewport[13] = canvas.height/2;
    
    
    //this.matrixProjection.OrthoProjection(canvas.width, canvas.height, 0.1, 10);
    mat4.ortho(this.matrixProjection, 0, canvas.width, 0, canvas.height, 0.1, 10);
    
    /*todo
    var scale = new Mat4x4();
    scale.v[0].x = this.zoom;
    scale.v[1].y = this.zoom;
    */
    var scale = mat4.create();
    scale[0] = this.zoom;
    scale[5] = this.zoom;
    
    /*todo
    this.mvp = this.matrixViewport.Multiply(this.matrixProjection);
    this.mvp = this.mvp.Multiply(scale);
    this.mvp = this.mvp.Multiply(this.matrixView);
    */
    mat4.mul(this.mvp, this.matrixViewport, this.matrixProjection);
    var temp = mat4.mul(mat4.create(), this.mvp, scale);
    mat4.mul(this.mvp, temp, this.matrixView);
    
    /*todo
    this.invMvp = this.mvp.Inverse();
    */
    mat4.invert(this.invMvp, this.mvp);
  }


  pixelToLatLong = (a_pos) => {
	  var offset = g_hex.hexToPixel(vec4.fromValues(0,0,0,1));
	  offset[0] += g_hex.hexWidth;
	  offset[1] += g_hex.hexSize[1]/2;
	  
	  var pos = vec4.clone(a_pos);
	  pos[0] -= offset[0];
	  pos[1] -= offset[1];
	  
	  //values found experimentally
	  pos[0] *= 0.7676 / g_hex.hexSize[0];
	  pos[1] *= 0.672 / g_hex.hexSize[1];
	  
	  return pos;
	  
  }


  initTowers = () => {
	  //add towers to grid
	  for(var i = 0; i < g_settlements.length; i++)
	  {
		  g_settlements[i].numTowers = g_settlements[i].towers.length;
		  for(var j = 0; j < g_settlements[i].towers.length; j++)
		  {
			  var x = g_settlements[i].towers[j][0] - g_hex.hexTopLeftCoord[0];
			  var y = g_settlements[i].towers[j][1] - g_hex.hexTopLeftCoord[1];
			  var index =  x + y * g_hex.hexDim[0];
			  g_hexTowers[index] = i;
		  }
	  }
  }


  initLandmarks = () => {
	  for(var i = 0; i < g_hex.hexDim[0] * g_hex.hexDim[1]; i++)
	  {
		  this.hexLandmarks[i] = -1;
	  }

	  for(var i = 0; i < g_landmarks.length; i++)
	  {
		  var hex = vec4.clone(g_landmarks[i].hex);
		  var coord = hex[0] - g_hex.hexTopLeftCoord[0] + (hex[1] - g_hex.hexTopLeftCoord[1]) * g_hex.hexDim[0];
		  if(this.hexLandmarks[coord] < 0)
			  this.hexLandmarks[coord] = i;
	  }
  }


  initTraining = () => {
	  //add training
	  
	  //for each settlement
	  for(var s = 0; s < g_settlements.length; s++)
	  {
		  //for each building
		  for(var b = 0; b < g_settlements[s].buildings.length; b++)
		  {
			  var level = g_settlements[s].level;
			  
			  //add training with each building
			  if(g_settlements[s].buildings[b] == "Garrison")
			  {
				  g_settlements[s].training.fighter = level;
				  g_settlements[s].training.dreadnaught = level;
				  g_settlements[s].training.skirmisher = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Cathedral of Justice")
			  {
				  g_settlements[s].training.cleric = level;
				  g_settlements[s].training.seminary = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Cathedral of Law")
			  {
				  g_settlements[s].training.cleric = level;
				  g_settlements[s].training.seminary = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Cathedral of Efficiency")
			  {
				  g_settlements[s].training.cleric = level;
				  g_settlements[s].training.seminary = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Cathedral of Good")
			  {
				  g_settlements[s].training.cleric = level;
				  g_settlements[s].training.seminary = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Cathedral of Nature")
			  {
				  g_settlements[s].training.cleric = level;
				  g_settlements[s].training.seminary = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Cathedral of Freedom")
			  {
				  g_settlements[s].training.cleric = level;
				  g_settlements[s].training.seminary = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Cathedral of Chaos")
			  {
				  g_settlements[s].training.cleric = level;
				  g_settlements[s].training.seminary = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Cathedral of Depravity")
			  {
				  g_settlements[s].training.cleric = level;
				  g_settlements[s].training.seminary = level;
			  }
			  else if(g_settlements[s].buildings[b] == "University")
			  {
				  g_settlements[s].training.wizard = level;
				  g_settlements[s].training.warWizard = level;
				  g_settlements[s].training.occultist = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Guild House")
			  {
				  g_settlements[s].training.expert = level;
				  g_settlements[s].training.freeholder = level;
				  g_settlements[s].training.rogue = level;
				  g_settlements[s].training.skirmisher = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Auction House")
			  {
				  g_settlements[s].training.auction = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Seminary")
			  {
				  g_settlements[s].training.seminary = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Occultist School")
			  {
				  g_settlements[s].training.occultist = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Skirmisher School")
			  {
				  g_settlements[s].training.skirmisher = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Dreadnaught School")
			  {
				  g_settlements[s].training.dreadnaught = level;
			  }
			  else if(g_settlements[s].buildings[b] == "War Wizard School")
			  {
				  g_settlements[s].training.warWizard = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Wizard Academy")
			  {
				  g_settlements[s].training.wizard = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Fighter Collage")
			  {
				  g_settlements[s].training.fighter = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Thieves Guild")
			  {
				  g_settlements[s].training.rogue = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Temple of Iomedae")
			  {
				  g_settlements[s].training.cleric = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Temple of Abadar")
			  {
				  g_settlements[s].training.cleric = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Temple of Asmodeus")
			  {
				  g_settlements[s].training.cleric = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Temple of Desna")
			  {
				  g_settlements[s].training.cleric = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Temple of Gorum")
			  {
				  g_settlements[s].training.cleric = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Temple of Gozreh")
			  {
				  g_settlements[s].training.cleric = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Temple of Lamashtu")
			  {
				  g_settlements[s].training.cleric = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Temple of Norgorber")
			  {
				  g_settlements[s].training.cleric = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Temple of Saranrae")
			  {
				  g_settlements[s].training.cleric = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Workshop")
			  {
				  g_settlements[s].training.expert = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Workhouse")
			  {
				  g_settlements[s].training.freeholder = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Smith")
			  {
				  g_settlements[s].training.weaponsmith = level;
				  g_settlements[s].training.armorsmith = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Spellwright")
			  {
				  g_settlements[s].training.artificer = level;
				  g_settlements[s].training.iconographer = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Cooperative")
			  {
				  g_settlements[s].training.bowyer = level;
				  g_settlements[s].training.leatherworker = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Boutique")
			  {
				  g_settlements[s].training.jeweller = level;
				  g_settlements[s].training.tailor = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Lab")
			  {
				  g_settlements[s].training.alchemist = level;
				  g_settlements[s].training.engineer = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Geologist")
			  {
				  g_settlements[s].training.geologist = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Arcanist's Workshop")
			  {
				  g_settlements[s].training.arcanist = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Apothecary")
			  {
				  g_settlements[s].training.apothecary = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Sawmill")
			  {
				  g_settlements[s].training.sawyer = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Smeltmill")
			  {
				  g_settlements[s].training.smelter = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Tannery")
			  {
				  g_settlements[s].training.tanner = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Loom")
			  {
				  g_settlements[s].training.weaver = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Woodshop")
			  {
				  g_settlements[s].training.bowyer = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Alchemist's Lab")
			  {
				  g_settlements[s].training.alchemist = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Armorer")
			  {
				  g_settlements[s].training.armorsmith = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Weaponmaster")
			  {
				  g_settlements[s].training.weaponsmith = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Iconographer")
			  {
				  g_settlements[s].training.iconographer = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Jewellers")
			  {
				  g_settlements[s].training.jeweller = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Leatherworkers")
			  {
				  g_settlements[s].training.leatherworker = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Tailors")
			  {
				  g_settlements[s].training.tailor = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Institute")
			  {
				  g_settlements[s].training.engineer = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Artificer's Workshop")
			  {
				  g_settlements[s].training.artificer = level;
			  }
			  else if(g_settlements[s].buildings[b] == "Library")
			  {
				  g_settlements[s].training.library = level;
			  }
			  else
				  g_settlements[s].training.error++;
		  }
	  }
  }


  initSettlementTypes = () => {
	  ///craft 	= 1st bit
	  //fighter = 2nd bit
	  //cleric	= 3rd bit
	  //rogue   = 4th bit
	  //wizard  = 5th bit
	  //coin		= 6th bit
	  var craft = 	1;
	  var fighter = 2;
	  var cleric = 	4;
	  var rogue = 	8;
	  var wizard =  16;
	  var auction = 32;
	  
	  for(var s = 0; s < g_settlements.length; s++)
	  {
		  g_settlements[s].numTypes = 0;
		  g_settlements[s].type = 0;
		  
		  if(g_settlements[s].training.fighter && 
			  g_settlements[s].training.dreadnaught && 
			  g_settlements[s].training.skirmisher)
		  {
			  g_settlements[s].type |= fighter;
		  }
		  
		  if(g_settlements[s].training.cleric && 
			  g_settlements[s].training.seminary)
		  {
			  g_settlements[s].type |= cleric;
		  }
		  
		  if(g_settlements[s].training.wizard && 
			  g_settlements[s].training.warWizard &&
			  g_settlements[s].training.occultist)
		  {
			  g_settlements[s].type |= wizard;
		  }
		  
		  if(g_settlements[s].training.auction)
		  {
			  g_settlements[s].type |= auction;
		  }
		
		  if(g_settlements[s].training.rogue &&
			  g_settlements[s].training.skirmisher)
		  {
			  g_settlements[s].type |= rogue;
		  }
		  
		  if(g_settlements[s].training.expert &&
	      g_settlements[s].training.freeholder &&
	      g_settlements[s].training.arcanist &&
	      g_settlements[s].training.weaponsmith &&
	      g_settlements[s].training.armorsmith &&
	      g_settlements[s].training.bowyer &&
	      g_settlements[s].training.leatherworker &&
	      g_settlements[s].training.jeweller &&
	      g_settlements[s].training.tailor &&
	      g_settlements[s].training.alchemist &&
	      g_settlements[s].training.engineer &&
	      g_settlements[s].training.geologist &&
	      g_settlements[s].training.apothecary &&
	      g_settlements[s].training.sawyer &&
	      g_settlements[s].training.smelter &&
	      g_settlements[s].training.tanner &&
	      g_settlements[s].training.weaver &&
	      g_settlements[s].training.iconographer &&
	      g_settlements[s].training.artificer)
		  {
			  g_settlements[s].type |= craft;
		  }
		  
		  
		  //count bits
		  for(var i = 0; i < 31; i++)
		  {
			  g_settlements[s].numTypes += (g_settlements[s].type >> i) & 1;
		  }
	  }
  }


  makeBorderLines = () => {
	  var hex = vec4.fromValues(0,0,0,1);
    for(var y = 0; y < g_hex.hexDim[1]; y++)
    {
      for(var x = 0; x < g_hex.hexDim[0]; x++)
      {
        var index = x + y * g_hex.hexDim[0];
        hex[0] = x + g_hex.hexTopLeftCoord[0];
        hex[1] = y + g_hex.hexTopLeftCoord[1];
        
        if(g_hex.validHex(hex))
        {      
				  var next = g_hex.getNextHex(hex, 0);
			  
				  if(g_hex.validHex(next))
				  {
					  var ind = next[0] - g_hex.hexTopLeftCoord[0] + (next[1] - g_hex.hexTopLeftCoord[1]) * g_hex.hexDim[0];
					  if(g_hexBorders[index] != g_hexBorders[ind])
					  {
						  var c1 = g_hex.hexToPixel(hex);
						  c1[0] += g_hex.hexWidth/2;
						  var c2 = vec4.clone(c1);
						  c2[0] += g_hex.hexWidth;
					  
						  this.hexBorderLines.push(c1)
						  this.hexBorderLines.push(c2);
					  }
				  }
			  
				  next = g_hex.getNextHex(hex, 1);
				  if(g_hex.validHex(next))
				  {
					  if(g_hexBorders[index] != g_hexBorders[next[0] - g_hex.hexTopLeftCoord[0] + (next[1] - g_hex.hexTopLeftCoord[1]) * g_hex.hexDim[0]])
					  {
						  var c1 = g_hex.hexToPixel(hex);
						  c1[0] += g_hex.hexSize[0]/4*3;
						  var c2 = vec4.clone(c1);
						  c2[0] += g_hex.hexWidth/2;
						  c2[1] += g_hex.hexSize[1]/2;
					  
						  this.hexBorderLines.push(c1)
						  this.hexBorderLines.push(c2);
					  }
				  }
			  
				  next = g_hex.getNextHex(hex, 2);
				  if(g_hex.validHex(next))
				  {
					  if(g_hexBorders[index] != g_hexBorders[next[0] - g_hex.hexTopLeftCoord[0] + (next[1] - g_hex.hexTopLeftCoord[1]) * g_hex.hexDim[0]])
					  {
						  var c1 = g_hex.hexToPixel(hex);
					  
						  c1[0] += g_hex.hexSize[0];
						  c1[1] += g_hex.hexSize[1]/2;
						  var c2 = vec4.clone(c1);
						  c2[0] -= g_hex.hexWidth/2;
						  c2[1] += g_hex.hexSize[1]/2;
					  
						  this.hexBorderLines.push(c1)
						  this.hexBorderLines.push(c2);
					  }
				  }
			  }
      }
    } 
  }


  makeRegionLines = () => {
    //this.hexRegionLines
    var hex = vec4.fromValues(0,0,0,1);
    for(var y = 0; y < g_hex.hexDim[1]; y++)
    {
      for(var x = 0; x < g_hex.hexDim[0]; x++)
      {
        var index = x + y * g_hex.hexDim[0];
        hex[0] = x + g_hex.hexTopLeftCoord[0];
        hex[1] = y + g_hex.hexTopLeftCoord[1];
        
        if(g_hex.validHex(hex))
        {      
				  var next = g_hex.getNextHex(hex, 0);
			  
				  if(g_hex.validHex(next))
				  {
					  var ind = next[0] - g_hex.hexTopLeftCoord[0] + (next[1] - g_hex.hexTopLeftCoord[1]) * g_hex.hexDim[0];
					  if(g_hexRegions[index] != g_hexRegions[ind])
					  {
						  var c1 = g_hex.hexToPixel(hex);
						  c1[0] += g_hex.hexWidth/2;
						  var c2 = vec4.clone(c1);
						  c2[0] += g_hex.hexWidth;
					  
						  this.hexRegionLines.push(c1)
						  this.hexRegionLines.push(c2);
					  }
				  }
			
				  next = g_hex.getNextHex(hex, 1);
				  if(g_hex.validHex(next))
				  {
					  if(g_hexRegions[index] != g_hexRegions[next[0] - g_hex.hexTopLeftCoord[0] + (next[1] - g_hex.hexTopLeftCoord[1]) * g_hex.hexDim[0]])
					  {
						  var c1 = g_hex.hexToPixel(hex);
						  c1[0] += g_hex.hexSize[0]/4*3;
						  var c2 = vec4.clone(c1);
						  c2[0] += g_hex.hexWidth/2;
						  c2[1] += g_hex.hexSize[1]/2;
					  
						  this.hexRegionLines.push(c1)
						  this.hexRegionLines.push(c2);
					  }
				  }
			  
				  next = g_hex.getNextHex(hex, 2);
				  if(g_hex.validHex(next))
				  {
					  if(g_hexRegions[index] != g_hexRegions[next[0] - g_hex.hexTopLeftCoord[0] + (next[1] - g_hex.hexTopLeftCoord[1]) * g_hex.hexDim[0]])
					  {
						  var c1 = g_hex.hexToPixel(hex);
					  
						  c1[0] += g_hex.hexSize[0];
						  c1[1] += g_hex.hexSize[1]/2;
						  var c2 = vec4.clone(c1);
						  c2[0] -= g_hex.hexWidth/2;
						  c2[1] += g_hex.hexSize[1]/2;
					  
						  this.hexRegionLines.push(c1)
						  this.hexRegionLines.push(c2);
					  }
				  }
			  }
      }
    } 
  }


  drawBorders = (a_context) => {
	  //var canvas = document.getElementById("canvas");
    //var context = canvas.getContext("2d");
    
    var alpha = "";
  
    if(this.enabledDrawHexTypes)
    	alpha = "0.825";
    else
    	alpha = "0.333";
    
    for(var y = 0; y < g_hex.hexDim[1]; y++)
    {
      for(var x = 0; x < g_hex.hexDim[0]; x++)
      {
        if(g_hex.validHex(vec4.fromValues(x + g_hex.hexTopLeftCoord[0],y + g_hex.hexTopLeftCoord[1],0,1)))
        {
          var pos = g_hex.hexToPixel(vec4.fromValues(x + g_hex.hexTopLeftCoord[0], y + g_hex.hexTopLeftCoord[1],0,1));
          pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
        

          var index = x+y*g_hex.hexDim[0];

				  var territory = g_territory[index];
				  if(territory >= 0)
					  this.drawHexFill(pos, "rgba(" + g_alliances[territory].color + "," + alpha + ")", a_context);
        }
      }
    }
    
    /*
    for(var i = 0; i < this.hexBorderLines.length; i += 2)
    {
      var c1 = this.mvp.MultiplyVec4(this.hexBorderLines[i]);
      var c2 = this.mvp.MultiplyVec4(this.hexBorderLines[i+1]);
      context.strokeStyle = "rgba(255,255,255,1.0)";
    	context.lineWidth = 2;
    
      context.beginPath();
      context.moveTo(c1.x, c1.y);
      context.lineTo(c2.x, c2.y);
      context.stroke();
      
      
      context.strokeStyle = "rgba(255,255,255,0.5)";
    	context.lineWidth = 4;
    
      context.beginPath();
      context.moveTo(c1.x, c1.y);
      context.lineTo(c2.x, c2.y);
      context.stroke();
      
      context.strokeStyle = "rgba(255,255,255,0.25)";
    	context.lineWidth = 6;
    
      context.beginPath();
      context.moveTo(c1.x, c1.y);
      context.lineTo(c2.x, c2.y);
      context.stroke();
      
      context.strokeStyle = "rgba(255,255,255,0.125)";
    	context.lineWidth = 8;
    
      context.beginPath();
      context.moveTo(c1.x, c1.y);
      context.lineTo(c2.x, c2.y);
      context.stroke();

    }
    */
  }


  drawRegions = () => {
    var canvas = this.canvas;
    var context = this.context2d;
    
    
  
    for(var i = 0; i < this.hexRegionLines.length; i += 2)
    {
      var c1 = vec4.transformMat4(vec4.create(), this.hexRegionLines[i], this.mvp);
      var c2 = vec4.transformMat4(vec4.create(), this.hexRegionLines[i+1], this.mvp);
      context.strokeStyle = "rgba(255,255,255,1.0)";
    	context.lineWidth = 2;
    
      context.beginPath();
      context.moveTo(c1[0], c1[1]);
      context.lineTo(c2[0], c2[1]);
      context.stroke();
      
      
      context.strokeStyle = "rgba(255,255,255,0.5)";
    	context.lineWidth = 4;
    
      context.beginPath();
      context.moveTo(c1[0], c1[1]);
      context.lineTo(c2[0], c2[1]);
      context.stroke();
      
      context.strokeStyle = "rgba(255,255,255,0.25)";
    	context.lineWidth = 6;
    
      context.beginPath();
      context.moveTo(c1[0], c1[1]);
      context.lineTo(c2[0], c2[1]);
      context.stroke();
      
      context.strokeStyle = "rgba(255,255,255,0.125)";
    	context.lineWidth = 8;
    
      context.beginPath();
      context.moveTo(c1[0], c1[1]);
      context.lineTo(c2[0], c2[1]);
      context.stroke();

    }
    
  }


  drawGrid = (a_width, a_color, a_context) => {
    //g_hex.hexWidth = 25;
    //g_hex.hexSize = new Vec4(g_hex.hexWidth*2,g_hex.hexWidth * math.sqrt(3),0,0);
    //g_hex.hexOffset = new Vec4(100,30,0,0);
    //g_hex.hexTopLeftCoord = new Vec4(-23,-8,0,0);
    //g_hex.hexDim = new Vec4(30,29,0,0); //dimensions
    //g_hex.hexTop = 1; //up 0 or down 1
    
    var hexWidth = this.mvp[0] * g_hex.hexWidth;
    
    var hexSize = vec4.fromValues(hexWidth*2,hexWidth * Math.sqrt(3),0,0);
    var hexOffset = vec4.transformMat4(vec4.create(), g_hex.hexOffset, this.mvp);
    
    var c1 = vec4.transformMat4(vec4.create(), vec4.fromValues(-g_hex.mapSize[0]/2 + g_hex.hexOffset[0], -g_hex.mapSize[1]/2 + g_hex.hexOffset[1],0,1), this.mvp);
    //var c2 = this.mvp.MultiplyVec4(new Vec4(this.map.width/2,this.map.height/2,0,1));
    
    //c1.x += hexWidth * g_hex.hexDim.x;
    //c1.y += hexWidth * g_hex.hexDim.y;
    
    a_context.strokeStyle = a_color;
    a_context.lineWidth = a_width;
    a_context.beginPath();
    for(var y = 0; y < g_hex.hexDim[1]; y++)
    {
      var top1 = c1[1] + y * hexSize[1];
      var top2 = top1 + hexSize[1]/2;
        
      for(var x = 0; x < g_hex.hexDim[0]; x++)
      {
      
        var left1 = c1[0] + x * hexWidth/2*3;
        var left2 = left1 + hexWidth/2;
        
      
      
        if(x % 2 == 0)
        {
          //horizontal bars
          a_context.moveTo(left2, top1);
          a_context.lineTo(left2 + hexWidth, top1);
          
          //diagonal top
          a_context.moveTo(left2 + hexWidth, top1);
          a_context.lineTo(left1 + hexSize[0], top2);
          
          a_context.moveTo(left2, top1);
          a_context.lineTo(left1, top2);
          
          //diagonal bottom
          a_context.moveTo(left1, top2);
          a_context.lineTo(left2, c1[1] + (y+1) * hexSize[1]);
          
          a_context.moveTo(left1 + hexSize[0], top2);
          a_context.lineTo(left2 + hexWidth, c1[1] + (y+1) * hexSize[1]);
          
          
        }
        else
        {
          //horizontal bars
          a_context.moveTo(c1[0] + (x-1) * hexWidth/2*3 + hexSize[0], top2);
          a_context.lineTo(c1[0] + (x-1) * hexWidth/2*3 + hexSize[0] + hexWidth, top2);
        }
        
      }
    }
  
    //bottom
    for(var x = 0; x < g_hex.hexDim[0]; x+=2)
    {
      a_context.moveTo(c1[0] + x * hexWidth/2*3 + hexWidth/2, c1[1] + (g_hex.hexDim[1]) * hexSize[1]);
      a_context.lineTo(c1[0] + x * hexWidth/2*3 + hexWidth/2 + hexWidth, c1[1] + (g_hex.hexDim[1]) * hexSize[1]);
    }
    
    a_context.stroke();
  }


  drawHex = (a_pos, a_width, a_color) => {
    var canvas = this.canvas;
    var context = this.context2d;
    
    context.strokeStyle = a_color;
    context.lineWidth = a_width;
    
    context.beginPath();
    
    context.moveTo(a_pos[0] + g_hex.hexWidth/2*this.zoom, a_pos[1]);
    context.lineTo(a_pos[0] + g_hex.hexWidth/2*3*this.zoom, a_pos[1]);
    context.lineTo(a_pos[0] + g_hex.hexSize[0]*this.zoom, a_pos[1] + g_hex.hexSize[1]/2*this.zoom);
    context.lineTo(a_pos[0] + g_hex.hexWidth/2*3*this.zoom, a_pos[1] + g_hex.hexSize[1]*this.zoom);
    context.lineTo(a_pos[0] + g_hex.hexWidth/2*this.zoom, a_pos[1] + g_hex.hexSize[1]*this.zoom);
    context.lineTo(a_pos[0], a_pos[1] + g_hex.hexSize[1]/2*this.zoom);
    context.closePath();
    context.stroke();
  }

  drawHexFill = (a_pos, a_color, a_context) => {
    //var canvas = document.getElementById("canvas");
    //var context = canvas.getContext("2d");
    
    //context.strokeStyle = a_color;
    //context.lineWidth = a_width;
    a_context.fillStyle = a_color;
    
    a_context.beginPath();
    
    /*todo
    context.moveTo(a_pos.x + g_hex.hexWidth/2*this.zoom, a_pos.y);
    context.lineTo(a_pos.x + g_hex.hexWidth/2*3*this.zoom, a_pos.y);
    context.lineTo(a_pos.x + g_hex.hexSize.x*this.zoom, a_pos.y + g_hex.hexSize.y/2*this.zoom);
    context.lineTo(a_pos.x + g_hex.hexWidth/2*3*this.zoom, a_pos.y + g_hex.hexSize.y*this.zoom);
    context.lineTo(a_pos.x + g_hex.hexWidth/2*this.zoom, a_pos.y + g_hex.hexSize.y*this.zoom);
    context.lineTo(a_pos.x, a_pos.y + g_hex.hexSize.y/2*this.zoom);
    */
    a_context.moveTo(a_pos[0] + g_hex.hexWidth/2*this.zoom, a_pos[1]);
    a_context.lineTo(a_pos[0] + g_hex.hexWidth/2*3*this.zoom, a_pos[1]);
    a_context.lineTo(a_pos[0] + g_hex.hexSize[0]*this.zoom, a_pos[1] + g_hex.hexSize[1]/2*this.zoom);
    a_context.lineTo(a_pos[0] + g_hex.hexWidth/2*3*this.zoom, a_pos[1] + g_hex.hexSize[1]*this.zoom);
    a_context.lineTo(a_pos[0] + g_hex.hexWidth/2*this.zoom, a_pos[1] + g_hex.hexSize[1]*this.zoom);
    a_context.lineTo(a_pos[0], a_pos[1] + g_hex.hexSize[1]/2*this.zoom);
    
    a_context.closePath();
    a_context.fill();
  }

  drawHexHollow = (a_pos, a_width, a_color) => {
	  var canvas = this.canvas;
    var context = this.context2d;
    
    context.strokeStyle = a_color;
    context.lineWidth = a_width;
    
    //var w = 1/Math.sqrt(3)*a_width/2;
    //var l = Math.sqrt((a_width/2)*(a_width/2) - w*w);
    var x = a_width*Math.sqrt(3)/4;
    var y = a_width/4;
  
    context.beginPath();
    
    context.moveTo(a_pos[0] + g_hex.hexWidth/2*this.zoom, a_pos[1] + a_width/2);
    context.lineTo(a_pos[0] + g_hex.hexWidth/2*3*this.zoom, a_pos[1] + a_width/2);
    
    context.moveTo(a_pos[0] + g_hex.hexWidth/2*3*this.zoom - x, a_pos[1] + y);
    context.lineTo(a_pos[0] + g_hex.hexSize[0]*this.zoom - x, a_pos[1] + g_hex.hexSize[1]/2*this.zoom + y);
    
    context.moveTo(a_pos[0] + g_hex.hexSize[0]*this.zoom - x, a_pos[1] + g_hex.hexSize[1]/2*this.zoom - y);
    context.lineTo(a_pos[0] + g_hex.hexWidth/2*3*this.zoom - x, a_pos[1] + g_hex.hexSize[1]*this.zoom - y);
    
    context.moveTo(a_pos[0] + g_hex.hexWidth/2*3*this.zoom, a_pos[1] + g_hex.hexSize[1]*this.zoom - a_width/2);
    context.lineTo(a_pos[0] + g_hex.hexWidth/2*this.zoom, a_pos[1] + g_hex.hexSize[1]*this.zoom - a_width/2);
    
    context.moveTo(a_pos[0] + g_hex.hexWidth/2*this.zoom + x, a_pos[1] + g_hex.hexSize[1]*this.zoom - y);
    context.lineTo(a_pos[0] + x, a_pos[1] + g_hex.hexSize[1]/2*this.zoom - y);
    
    context.moveTo(a_pos[0] + x, a_pos[1] + g_hex.hexSize[1]/2*this.zoom + y);
    context.lineTo(a_pos[0] + g_hex.hexWidth/2*this.zoom + x, a_pos[1] + y);
    
    //context.lineTo(a_pos.x + g_hex.hexSize.x*this.zoom - l/*a_width/2*/, a_pos.y + g_hex.hexSize.y/2*this.zoom);
    //context.lineTo(a_pos.x + g_hex.hexWidth/2*3*this.zoom - w, a_pos.y + g_hex.hexSize.y*this.zoom - a_width/2);
    //context.lineTo(a_pos.x + g_hex.hexWidth/2*this.zoom + w, a_pos.y + g_hex.hexSize.y*this.zoom - a_width/2);
    //context.lineTo(a_pos.x + l /*a_width/2*/, a_pos.y + g_hex.hexSize.y/2*this.zoom);
    //context.closePath();
    context.stroke();
  }

  drawHexTypes = (a_context) => {
    //var canvas = document.getElementById("canvas");
    //var context = canvas.getContext("2d");
    
    for(var y = 0; y < g_hex.hexDimFull[1]; y++)
    {
      for(var x = 0; x < g_hex.hexDimFull[0]; x++)
      {
        if(g_hex.validHexFull(vec4.fromValues(x + g_hex.hexTopLeftCoordFull[0],y + g_hex.hexTopLeftCoordFull[1],0,1)))
        {
          var pos = g_hex.hexToPixel(vec4.fromValues(x + g_hex.hexTopLeftCoordFull[0], y + g_hex.hexTopLeftCoordFull[1],0,1));
          pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
        
          var color;
        
          var index = x+y*g_hex.hexDimFull[0];
          switch(g_hexTypesFull[index])
          {
            case 0: //water
              color = "rgb(204,229,255)"
              break;
            case 1: //crop
              color = "rgb(160,215,107)"
              break;
            case 2: //forest
              color = "rgb(122,173,67)"
              break;
            case 3: //hills
              color = "rgb(195,210,99)"
              break;
            case 4: //mountain
              color = "rgb(178,128,0)"
              break;
            case 5:  //swamp
              color = "rgb(173,222,165)"
              break;
            case 6:  //meteor
              color = "rgb(112,112,112)"
              break;
            default:
              color = "rgb(255,255,255)"
          }
        
          this.drawHexFill(pos, color, a_context);
          
          
        }
      }
    }
  }

  drawFeatures = (a_context) => {
	  //var canvas = document.getElementById("canvas");
    //var context = canvas.getContext("2d");
    
	  //Features
    var size = g_hex.hexSize[0]/2;
    for(var y = 0; y < g_hex.hexDim[1]; y++)
    {
      for(var x = 0; x < g_hex.hexDim[0]; x++)
      {
        if(g_hex.validHex(vec4.fromValues(x + g_hex.hexTopLeftCoord[0],y + g_hex.hexTopLeftCoord[1],0,1)))
        {
          var pos = g_hex.hexToPixel(vec4.fromValues(x + g_hex.hexTopLeftCoord[0], y + g_hex.hexTopLeftCoord[1],0,1));
          pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
        
          var index = x+y*g_hex.hexDim[0];
          
          //draw icons
          if(g_hexFeatures[index] & 1)
          {
            var img = this.iconLion;
            a_context.drawImage(img, pos[0] + (g_hex.hexSize[0]/2 - size/2) * this.zoom, 
              pos[1] + (g_hex.hexSize[1]/2 - img.height/img.width*size/2) * this.zoom, 
              size * this.zoom, img.height/img.width*size * this.zoom);
          }
          if(g_hexFeatures[index] & 2)
          {
            var img = this.iconCastle;
            a_context.drawImage(img, pos[0] + (g_hex.hexSize[0]/2 - size/2) * this.zoom, 
              pos[1] + (g_hex.hexSize[1]/2 - img.height/img.width*size/2) * this.zoom, 
              size * this.zoom, img.height/img.width*size * this.zoom);
          }
          
          if(g_hexFeatures[index] & 4)
          {
            var img = this.iconRuins;
            a_context.drawImage(img, pos[0] + (g_hex.hexSize[0]/2 - size/2) * this.zoom, 
              pos[1] + (g_hex.hexSize[1]/2 - img.height/img.width*size/2) * this.zoom, 
              size * this.zoom, img.height/img.width*size * this.zoom);
          }
          
          if(g_hexFeatures[index] & 8)
          {
            var img = this.iconVillage;
            a_context.drawImage(img, pos[0] + (g_hex.hexSize[0]/2 - size/2) * this.zoom, 
              pos[1] + (g_hex.hexSize[1]/2 - img.height/img.width*size/2) * this.zoom, 
              size * this.zoom, img.height/img.width*size * this.zoom);
          }
          if(g_hexFeatures[index] & 16)
          {
            var img = this.iconStar;
            a_context.drawImage(img, pos[0] + (g_hex.hexSize[0]/2 - size/2) * this.zoom, 
              pos[1] + (g_hex.hexSize[1]/2 - img.height/img.width*size/2) * this.zoom, 
              size * this.zoom, img.height/img.width*size * this.zoom);
          }
          
          if(g_hexFeatures[index] & 32)
          {
            var img = this.iconWaterfall;
            a_context.drawImage(img, pos[0] + (g_hex.hexSize[0]/2 - size/2) * this.zoom, 
              pos[1] + (g_hex.hexSize[1]/2 - img.height/img.width*size/2) * this.zoom, 
              size * this.zoom, img.height/img.width*size * this.zoom);
          }
          
          if(g_hexFeatures[index] & 64)
          {
            var img = this.iconClanmoot;
            a_context.drawImage(img, pos[0] + (g_hex.hexSize[0]/2 - size/2) * this.zoom, 
              pos[1] + (g_hex.hexSize[1]/2 - img.height/img.width*size/2) * this.zoom, 
              size * this.zoom, img.height/img.width*size * this.zoom);
          }
          if(g_hexFeatures[index] & 128)
          {
            var img = this.iconX;
            a_context.drawImage(img, pos[0] + (g_hex.hexSize[0]/2 - size/2) * this.zoom, 
              pos[1] + (g_hex.hexSize[1]/2 - img.height/img.width*size/2) * this.zoom, 
              size * this.zoom, img.height/img.width*size * this.zoom);
          }
          /*
          if(g_hexFeatures[index] & 256)
          {
            var img = this.iconTower;
            a_context.drawImage(img, pos[0] + (g_hex.hexSize[0]/2 - size/2) * this.zoom, 
              pos[1] + (g_hex.hexSize[1]/2 - img.height/img.width*size/2) * this.zoom, 
              size * this.zoom, img.height/img.width*size * this.zoom);
          }
          */
          if(g_hexFeatures[index] & 512)
          {
            var img = this.iconPointOfInterest;
            a_context.drawImage(img, pos[0] + (g_hex.hexSize[0]/2 - size/2) * this.zoom, 
              pos[1] + (g_hex.hexSize[1]/2 - img.height/img.width*size/2) * this.zoom, 
              size * this.zoom, img.height/img.width*size * this.zoom);
          }
        }
      }
    }
  }

  drawLandmarkText = (a_context: CanvasRenderingContext2D) => {
	  //var canvas = document.getElementById("canvas");
    //var context = canvas.getContext("2d");
    
	  //Landmarks
    for(var i = 0; i < g_landmarks.length; i++)
	  {
		  var hex = vec4.clone(g_landmarks[i].hex);
		  var pos = g_hex.hexToPixel(hex);
		  pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
		  
		  switch(g_landmarks[i].type)
		  {
			  case 1:
				  a_context.font="11px Arial";
    			a_context.fillStyle = "rgba(255,255,255,1)";
    			var width = a_context.measureText(g_landmarks[i].name).width;
    			a_context.fillText(g_landmarks[i].name, pos[0] - width/2 + g_hex.hexSize[0]/2 * this.zoom, pos[1]+11);
    			break;
    		case 2:
				  a_context.font="11px Arial";
    			a_context.fillStyle = "rgba(255,255,255,1)";
    			var width = a_context.measureText(g_landmarks[i].name).width;
    			a_context.fillText(g_landmarks[i].name, pos[0] - width/2 + g_hex.hexSize[0]/2 * this.zoom, pos[1]+11);
    			break;
    		case 3:
				  a_context.font="11px Arial";
    			a_context.fillStyle = "rgba(255,255,255,1)";
    			var width = a_context.measureText(g_landmarks[i].name).width;
    			a_context.fillText(g_landmarks[i].name, pos[0] - width/2 + g_hex.hexSize[0]/2 * this.zoom, pos[1]+11);
    			break;
			  case 4:
				  a_context.font="11px Arial";
    			a_context.fillStyle = "rgba(255,255,255,1)";
    			var width = a_context.measureText(g_landmarks[i].name).width;
    			a_context.fillText(g_landmarks[i].name, pos[0] - width/2 + g_hex.hexSize[0]/2 * this.zoom, pos[1]+11);
    			break;
    		case 5:
    			a_context.font="11px Arial";
    			a_context.fillStyle = "rgba(255,255,255,1)";
    			var width = a_context.measureText(g_landmarks[i].name).width;
    			a_context.fillText(g_landmarks[i].name, pos[0] - width/2 + g_hex.hexSize[0]/2 * this.zoom, pos[1]+11);
    			break;
			  default:
				  break;
		  }
	  }
  }

  drawLandmarks = (a_context) => {
	  //var canvas = document.getElementById("canvas");
    //var context = canvas.getContext("2d");
    
	  //Landmarks
    for(var i = 0; i < g_landmarks.length; i++)
	  {
		  var hex = vec4.clone(g_landmarks[i].hex);
		  var pos = g_hex.hexToPixel(hex);
		  pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
		  
		  var drawIcon = false;
		  
		
		  var icon;
		  switch(g_landmarks[i].type)
		  {
			  case 1:
				  icon = this.iconTotem;
				  drawIcon = true;
				  break;
			  case 2:
				  icon = this.iconMonument;
				  drawIcon = true;
				  break;
			  case 3:
				  icon = this.iconMonolith;
				  drawIcon = true;
				  break;
			  case 4:
				  //a_context.font="11px Arial";
    			//a_context.fillStyle = "rgba(0, 0, 0, 255)"
    			//var width = a_context.measureText(g_landmarks[i].name).width;
    			//a_context.fillText(g_landmarks[i].name, pos.x - width/2 + g_hex.hexSize.x/2 * this.zoom, pos.y+11);
    			break;
    		case 5:
    			//a_context.font="11px Arial";
    			//a_context.fillStyle = "rgba(0, 0, 0, 255)"
    			//var width = a_context.measureText(g_landmarks[i].name).width;
    			//a_context.fillText(g_landmarks[i].name, pos.x - width/2 + g_hex.hexSize.x/2 * this.zoom, pos.y+11);
    			break;
			  default:
				  break;
		  }
		  
		  if(drawIcon)
		  {
			  a_context.drawImage(icon, pos[0] + (g_hex.hexSize[0]/2 - g_hex.hexSize[0]/1.5/2) * this.zoom, 
					  pos[1] + (g_hex.hexSize[1]/2 - g_hex.hexSize[1]/1.5/2)* this.zoom, 
					  g_hex.hexSize[0]/1.5 * this.zoom, g_hex.hexSize[1]/1.5 * this.zoom);
		  }
	  }
  }

  drawControllingTowers = () => {
	  for(var i = 0; i < g_settlements.length; i++)
	  {
		  var hex = vec4.clone(g_settlements[i].hex);
			  
		  var pos = g_hex.hexToPixel(hex);
		  pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
		  
		  var color = "rgb(" + g_settlements[i].color[0] + "," + g_settlements[i].color[1] + "," + g_settlements[i].color[2] + ")";
			  
		  //this.DrawHex(pos, 2, "rgba("+g_settlements[i].color.x+","+g_settlements[i].color.y+","+g_settlements[i].color.z+", 1.0)");
		  //this.DrawHex(pos, 4, "rgba("+g_settlements[i].color.x+","+g_settlements[i].color.y+","+g_settlements[i].color.z+", 0.5)");
		  //this.DrawHex(pos, 6, "rgba("+g_settlements[i].color.x+","+g_settlements[i].color.y+","+g_settlements[i].color.z+", 0.25)");
		  //this.DrawHex(pos, 8, "rgba("+g_settlements[i].color.x+","+g_settlements[i].color.y+","+g_settlements[i].color.z+", 0.125)");	
		  this.drawHexHollow(pos, 4, color);
	  
		  for(var j = 0; j < g_settlements[i].towers.length; j++)
		  {
			  hex = g_settlements[i].towers[j];
			  
			  pos = g_hex.hexToPixel(hex);
			  pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
			  
			  this.drawHexHollow(pos, 4, color);
			  
			  //this.DrawHex(pos, 2, "rgba("+g_settlements[i].color.x+","+g_settlements[i].color.y+","+g_settlements[i].color.z+", 1.0)");
			  //this.DrawHex(pos, 4, "rgba("+g_settlements[i].color.x+","+g_settlements[i].color.y+","+g_settlements[i].color.z+", 0.5)");
			  //this.DrawHex(pos, 6, "rgba("+g_settlements[i].color.x+","+g_settlements[i].color.y+","+g_settlements[i].color.z+", 0.25)");
			  //this.DrawHex(pos, 8, "rgba("+g_settlements[i].color.x+","+g_settlements[i].color.y+","+g_settlements[i].color.z+", 0.125)");
		  }
	  }
  }

  drawIcons = (a_settlement) => {
    var canvas = this.canvas;
    var context = this.context2d;
    
    var hex = g_hex.hexToPixel(a_settlement.hex);
    hex[0] += g_hex.hexSize[0]/2;
    hex[1] += g_hex.hexSize[1]/2;
    var pos = vec4.transformMat4(vec4.create(), hex, this.mvp);
    
    var img = new Array();

    var count = 0;
    for(var i = 0; i < a_settlement.numTypes; i++)
    {
    	//craft
		  if(a_settlement.type & 1)
		  {
			  img[count] = this.iconCraft;
			  count++;
		  }
		  //fighter
		  if(a_settlement.type & 2)
		  {
			  img[count] = this.iconFighter;
			  count++;
		  }
		  //cleric
		  if(a_settlement.type & 4)
		  {
			  img[count] = this.iconCleric;
			  count++;
		  }
		  //rogue
		  if(a_settlement.type & 8)
		  {
			  img[count] = this.iconRogue;
			  count++;
		  }
		  //wizard
		  if(a_settlement.type & 16)
		  {
			  img[count] = this.iconWizard;
			  count++;
		  }
		  //coin
		  if(a_settlement.type & 32)
		  {
			  img[count] = this.iconCoin;
			  count++;
		  }
		  
		  if(a_settlement.numTypes == 1)
		  {
			  context.drawImage(img[0], pos[0] - (img[0].width/2) * this.zoom, 
				  pos[1] - (img[0].height/2 - g_hex.hexSize[1]/2) * this.zoom, 
				  img[0].width * this.zoom, img[0].height * this.zoom);
		  }
		  else if(a_settlement.numTypes == 2)
		  {
			  context.drawImage(img[0], pos[0] - (img[0].width/2 - g_hex.hexSize[0]/2) * this.zoom, 
				  pos[1] - (img[0].height/2) * this.zoom, 
				  img[0].width * this.zoom, img[0].height * this.zoom);
				  
			  context.drawImage(img[1], pos[0] - (img[1].width/2 + g_hex.hexSize[0]/2) * this.zoom, 
				  pos[1] - (img[1].height/2) * this.zoom, 
				  img[1].width * this.zoom, img[1].height * this.zoom);
		  }
		  else if(a_settlement.numTypes == 3)
		  {
			  context.drawImage(img[0], pos[0] - (img[0].width/2 - g_hex.hexSize[0]/2) * this.zoom, 
				  pos[1] - (img[0].height/2) * this.zoom, 
				  img[0].width * this.zoom, img[0].height * this.zoom);
				  
			  context.drawImage(img[1], pos[0] - (img[1].width/2 + g_hex.hexSize[0]/2) * this.zoom, 
				  pos[1] - (img[1].height/2) * this.zoom, 
				  img[1].width * this.zoom, img[1].height * this.zoom);
				  
			  context.drawImage(img[2], pos[0] - (img[2].width/2) * this.zoom, 
				  pos[1] - (img[2].height/2 - g_hex.hexSize[1]/2) * this.zoom, 
				  img[2].width * this.zoom, img[2].height * this.zoom);
		  }
		  else if(a_settlement.numTypes == 4)
		  {
			  context.drawImage(img[0], pos[0] - (img[0].width/2 - g_hex.hexSize[0]/2) * this.zoom, 
				  pos[1] - (img[0].height/2) * this.zoom, 
				  img[0].width * this.zoom, img[0].height * this.zoom);
				  
			  context.drawImage(img[1], pos[0] - (img[1].width/2 + g_hex.hexSize[0]/2) * this.zoom, 
				  pos[1] - (img[1].height/2) * this.zoom, 
				  img[1].width * this.zoom, img[1].height * this.zoom);
				  
			  context.drawImage(img[2], pos[0] - (img[2].width/2 - g_hex.hexSize[0]/3) * this.zoom, 
				  pos[1] - (img[2].height/2 - g_hex.hexSize[1]/2) * this.zoom, 
				  img[2].width * this.zoom, img[2].height * this.zoom);
				  
			  context.drawImage(img[3], pos[0] - (img[3].width/2 + g_hex.hexSize[0]/3) * this.zoom, 
				  pos[1] - (img[3].height/2 - g_hex.hexSize[1]/2) * this.zoom, 
				  img[3].width * this.zoom, img[3].height * this.zoom);
		  }

    }
    
      
    if(!a_settlement.active)
    {
    	context.drawImage(this.iconSkullCrossbones, pos[0] - (g_hex.hexSize[0]/1.5/2) * this.zoom, 
			  pos[1] - (g_hex.hexSize[1]/1.5/2)* this.zoom, 
			  g_hex.hexSize[0]/1.5 * this.zoom, g_hex.hexSize[1]/1.5 * this.zoom);
    }
      
  }


  drawAlliances = (a_context) => {
    for(var i = 0; i < g_settlements.length; i++)
    {
      for(var j = 0; j < g_settlements[i].alliance.length; j++)
      {
        var index = g_settlements[i].alliance[j];
        var color;
        if(this.enabledDrawHexTypes)
          color = g_alliances[index].color + ",0.5";
        else
          color = g_alliances[index].color + ",0.5";
        
        var pos = g_hex.hexToPixel(g_settlements[i].hex); 
        pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
        
        this.drawHexFill(pos, "rgba("+color+")", a_context);
      }
    }
  }



  drawText = (a_context: CanvasRenderingContext2D) => {
    //var canvas = document.getElementById("canvas");
    //var context = canvas.getContext("2d");
    
    a_context.font="12px Arial";
    a_context.fillStyle = "rgba(255,255,255,1)";
    
    //settlement text
    for(var i = 0; i < g_settlements.length; i++)
    {
      
      var pos = g_hex.hexToPixel(g_settlements[i].hex);
      pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
      
      //settlement name
      //if(this.enabledDrawHexTypes)
      {
        a_context.font="bold 14px Arial";
        if(g_settlements[i].training.error)
        	 a_context.fillStyle = "rgba(255,0,0,1)";
        
        var width = a_context.measureText(g_settlements[i].name).width;
      
        a_context.fillText(g_settlements[i].name, pos[0] - width/2 + g_hex.hexSize[0]/2 * this.zoom, pos[1] + 14);
        
        if(g_settlements[i].training.error)
        	 a_context.fillStyle = "rgba(255,255,255,1)";
      }
      
      if(this.enabledDrawAlignment)
      {
        a_context.font="12px Arial";
        var width = a_context.measureText(g_settlements[i].alignment).width;
      
        a_context.fillText(g_settlements[i].alignment, pos[0] - width/2 + g_hex.hexSize[0]/2 * this.zoom, 
          pos[1] + g_hex.hexSize[1] * this.zoom);
          
        width = a_context.measureText("Level " + g_settlements[i].level).width;
        
        a_context.fillText("Level " + g_settlements[i].level, pos[0] - width/2 + g_hex.hexSize[0]/2 * this.zoom, 
          pos[1] + g_hex.hexSize[1] * this.zoom -12);
      }
      
    }
    
    //npc settlements
    //if(this.enabledDrawHexTypes)
    {
      a_context.font="bold 14px Arial";
    
      for(var i = 0; i < g_npcSettlements.length; i++)
      {
        var pos = g_hex.hexToPixel(g_npcSettlements[i].hex);
        pos = vec4.transformMat4(vec4.create(), pos, this.mvp);
        
        var width = a_context.measureText(g_npcSettlements[i].name).width;
      
        a_context.fillText(g_npcSettlements[i].name, pos[0] - width/2 + g_hex.hexSize[0]/2 * this.zoom, pos[1] + 14);
      }
    }
    
    if(this.enabledDrawLandmarks)
    	this.drawLandmarkText(a_context);
  }
  
  render = () => {
    if(!this.redraw)
	  {
		  this.redraw = true;	
		  requestAnimationFrame(this.update);
	  }
	}


}

