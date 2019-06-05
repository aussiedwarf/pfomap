/*******************************************************************************
Copyright (C) 2019 Eden Harris

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

import HexInfo from './hex';
import { g_hexTypesFull } from './hexes';

class Holding{
  name: string = "";
  constructor(a_name: string){
    this.name = a_name;
  }
}

class ResourceConversion{
  from;
  percent;
  to;
  
  constructor (a_from, a_percent, a_to){
    this.from = a_from;
    this.percent = a_percent;
    this.to = a_to;
  }
}

class Outpost{
  name: string = name;
  resource = [];
  
  constructor(a_name: string)
  {
    this.name = a_name;
    /*
    for(var i = 0; i < a_resource.length; i++)
    {
      this.resource.push(new ResourceConversion(a_resource.from, a_resource.percent, a_resource.to));
    }
    */
  }
}

function HexHolding()
{
  this.holding = -1;
  this.plus = 0;
  this.outpostA = -1;
  this.plusA = 0;
  this.skillA = 400;
  this.outpostB = -1;
  this.plusB = 0;
  this.skillB = 400;
  
  /*
  this.resources = new array()
  for(var i = 0; i < 5; i++)
    this.resources[i] = 0;
  */
}


function Resource()
{
  this.crops = 0;
  this.fish = 0;
  this.game = 0;
  this.herds = 0;
  this.ore = 0;
  this.stone = 0;
  this.wood = 0;
}

//0 crops
//1 fish
//2 game
//3 herds
//4 ore
//5 stone
//6 wood

//0 food
//1 ore
//2 stone
//3 trade goods
//4 wood

var g_holdingTypes = new Array;
/* 0*/  g_holdingTypes.push(new Holding("Barracks"));
/* 0*/  g_holdingTypes.push(new Holding("Farm"));
/* 0*/  g_holdingTypes.push(new Holding("Fishery"));
/* 0*/  g_holdingTypes.push(new Holding("Hunting Lodge"));
/* 0*/  g_holdingTypes.push(new Holding("Inn"));
/* 0*/  g_holdingTypes.push(new Holding("Library"));
/* 0*/  g_holdingTypes.push(new Holding("Lumbermill"));
/* 0*/  g_holdingTypes.push(new Holding("Mine"));
/* 0*/  g_holdingTypes.push(new Holding("Quarry"));
/* 0*/  g_holdingTypes.push(new Holding("Ranch"));
/* 0*/  g_holdingTypes.push(new Holding("Sanctum"));
/* 0*/  g_holdingTypes.push(new Holding("Shrine"));
/* 0*/  g_holdingTypes.push(new Holding("Trading Post"));
/* 0*/  g_holdingTypes.push(new Holding("Watchtower"));

var g_outpostTypes = new Array;
/* 0*/  g_outpostTypes.push(new Outpost("Fishing"));      g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(1,0.25,0)); g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(1,0.75,3)); 
/* 1*/  g_outpostTypes.push(new Outpost("Harvesting"));   g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(0,1,0));
/* 2*/  g_outpostTypes.push(new Outpost("Hunting"));      g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(2,0.5,0)); g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(2,0.5,3));
/* 3*/  g_outpostTypes.push(new Outpost("Lumberjack"));   g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(6,1,4));
/* 4*/  g_outpostTypes.push(new Outpost("Mining"));       g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(4,1,1));
/* 5*/  g_outpostTypes.push(new Outpost("Ranching"));     g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(3,0.25,0)); g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(3,0.75,3));
/* 6*/  g_outpostTypes.push(new Outpost("Stonecutting")); g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(5,1,2));
/* 7*/  g_outpostTypes.push(new Outpost("Trading"));      g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(2,0.25,3)); g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(3,0.25,3)); g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(4,0.25,3)); g_outpostTypes[g_outpostTypes.length-1].resource.push(new ResourceConversion(6,0.25,3));


var g_holdings = new Array;

var g_bulkFood = 0
var g_bulkOre = 0;
var g_bulkStone = 0;
var g_bulkTrade = 0;
var g_bulkWood = 0;

var g_bulkFoodCosts = 0
var g_bulkOreCosts = 0;
var g_bulkStoneCosts = 0;
var g_bulkTradeCosts = 0;
var g_bulkWoodCosts = 0;

var g_bulkFoodIncome = 0
var g_bulkOreIncome = 0;
var g_bulkStoneIncome = 0;
var g_bulkTradeIncome = 0;
var g_bulkWoodIncome = 0;



export function initHoldings(a_hexInfo: HexInfo) {
/*
  var selectHolding = document.getElementById("selectHolding");
  
  for(var i = 0; i < g_holdingTypes.length; i++)
  {
    var opt = document.createElement('option');
    opt.value = i+1;
    opt.innerHTML = g_holdingTypes[i].name;
    selectHolding.appendChild(opt);
  }
  
  var selectOutpostA = document.getElementById("selectOutpost1");
  
  for(var i = 0; i < g_outpostTypes.length; i++)
  {
    var opt = document.createElement('option');
    opt.value = i+1;
    opt.innerHTML = g_outpostTypes[i].name;
    selectOutpostA.appendChild(opt);
  }
  
  var selectOutpostB = document.getElementById("selectOutpost2");
  
  for(var i = 0; i < g_outpostTypes.length; i++)
  {
    var opt = document.createElement('option');
    opt.value = i+1;
    opt.innerHTML = g_outpostTypes[i].name;
    selectOutpostB.appendChild(opt);
  }
  */
  
  for(var i = 0; i < a_hexInfo.hexDim[0] * a_hexInfo.hexDim[1]; i++)
    g_holdings.push(new HexHolding());
  
}



function calculateBase(a_resource, a_type)
{
  switch(a_type)
  {
    case 0:
      a_resource.fish = 500;
      a_resource.game = 200;
      a_resource.wood = 200;
      break;
      
    case 1:
      a_resource.crops = 400;
      a_resource.herds = 300;
      a_resource.ore = 200;
      break;
      
    case 2:
      a_resource.wood = 400;
      a_resource.game = 300;
      a_resource.stone = 200;
      break;
    
    case 3:
      a_resource.stone = 400;
      a_resource.ore = 300;
      a_resource.herds = 200;
      break;
      
    case 4:
      a_resource.ore = 400;
      a_resource.stone = 300;
      a_resource.game = 200;
      break;
      
    case 5:
      a_resource.fish = 400;
      a_resource.wood = 300;
      a_resource.ore = 200;
      break;
      
    case 6:
      a_resource.ore = 400;
      break;
  }
}

//0 = water
//1 = crops
//2 = forest
//3 = hills
//4 = mountain
//5 = swamp
//6 = meteror

//0 crops
//1 fish
//2 game
//3 herds
//4 ore
//5 stone
//6 wood
function calculateResources(a_resource, a_hex, a_hexInfo: HexInfo)
{
  if(a_hexInfo.validHexFull(a_hex))
  {
    //check neighbours
    var coord = a_hex[0] - a_hexInfo.hexTopLeftCoordFull[0] + (a_hex[1] - a_hexInfo.hexTopLeftCoordFull[1]) * a_hexInfo.hexDimFull[0];
    var type = g_hexTypesFull[coord];
    
    calculateBase(a_resource, type);
    
    for(var i = 0; i < 6; i++)
    {
      var hex = a_hexInfo.getNextHex(a_hex, i);
      var c = hex[0] - a_hexInfo.hexTopLeftCoordFull[0] + (hex[1] - a_hexInfo.hexTopLeftCoordFull[1]) * a_hexInfo.hexDimFull[0];
      
      if(a_hexInfo.validHexFull(hex))
      {
        var r = new Resource();
        calculateBase(r, g_hexTypesFull[c]);
        
        a_resource.crops += r.crops/6;
        a_resource.fish += r.fish/6;
        a_resource.game += r.game/6;
        a_resource.herds += r.herds/6;
        a_resource.ore += r.ore/6;
        a_resource.stone += r.stone/6;
        a_resource.wood += r.wood/6;
      }
    }
    
  }
}


function updateHoldingsText(a_text, a_hex, a_hexInfo: HexInfo)
{
  
  var resource = new Resource();
  
  calculateResources(resource, a_hex, a_hexInfo);
  
  a_text += "<p>Bulk Food: " + g_bulkFood + " (" + g_bulkFoodIncome + " - " + g_bulkFoodCosts + ")";
  a_text += "<br>Bulk Ore: " + g_bulkOre + " (" + g_bulkOreIncome + " - " + g_bulkOreCosts + ")";
  a_text += "<br>Bulk Stone: " + g_bulkStone + " (" + g_bulkStoneIncome + " - " + g_bulkStoneCosts + ")";
  a_text += "<br>Bulk Trade: " + g_bulkTrade + " (" + g_bulkTradeIncome + " - " + g_bulkTradeCosts + ")";
  a_text += "<br>Bulk Wood: " + g_bulkWood + " (" + g_bulkWoodIncome + " - " + g_bulkWoodCosts + ")";
  
  a_text += "<br>";
  
  if(resource.crops)
    a_text += "<br>Crops: " + resource.crops;
  if(resource.fish)
    a_text += "<br>Fish: " + resource.fish;
  if(resource.game)
    a_text += "<br>Game: " + resource.game;
  if(resource.herds)
    a_text += "<br>Herds: " + resource.herds;
  if(resource.ore)
    a_text += "<br>Ore: " + resource.ore;
  if(resource.stone)
    a_text += "<br>Stone: " + resource.stone;
  if(resource.wood)
    a_text += "<br>wood: " + resource.wood;
  
  
  return a_text;
}


export function changeHolding(a_selected: boolean)
{
  if(a_selected)
	{
    /*
    c = app.selectedHex[0] - g_hex.hexTopLeftCoord[0] + (app.selectedHex[1] - g_hex.hexTopLeftCoord[1]) * g_hex.hexDim[0];
    g_holdings[c].holding = document.getElementById("selectHolding").value-1;
  
    g_holdings[c].outpostA = document.getElementById("selectOutpost1").value-1;
    g_holdings[c].outpostB = document.getElementById("selectOutpost2").value-1;
  
    g_holdings[c].plus = parseInt(document.getElementById("selectHoldingPlus").value);
    g_holdings[c].plusA = parseInt(document.getElementById("selectOutpost1Plus").value);
    g_holdings[c].plusB = parseInt(document.getElementById("selectOutpost2Plus").value);
    g_holdings[c].skillA = parseInt(document.getElementById("textOutpost1Skill").value);
    g_holdings[c].skillB = parseInt(document.getElementById("textOutpost2Skill").value);
  
    calculateHoldings();
    */
    
    /*
    this.holding = -1;
    this.plus = 0;
    this.outpostA = -1;
    this.plusA = 0;
    this.skillA = 400;
    this.outpostB = -1;
    this.plusB = 0;
    this.skillB = 400;
    */
  }
  
}


export function seletctHolding()
{
  /*
	if(app.selected)
	{
	  
	  var c = app.selectedHex[0] - g_hex.hexTopLeftCoord[0] + (app.selectedHex[1] - g_hex.hexTopLeftCoord[1]) * g_hex.hexDim[0];
	  h = g_holdings[c];
	  
	  document.getElementById("selectHolding").value = h.holding+1;
    document.getElementById("selectOutpost1").value = h.outpostA+1;
    document.getElementById("selectOutpost2").value = h.outpostB+1;
    
    document.getElementById("selectHoldingPlus").value = h.plus;
    document.getElementById("selectOutpost1Plus").value = h.plusA;
    document.getElementById("selectOutpost2Plus").value = h.plusB;
    document.getElementById("textOutpost1Skill").value = h.skillA;
    document.getElementById("textOutpost2Skill").value = h.skillB;
    
	}
	*/
}

/*

Holding Output Formula	(Hex resource Rating*Outpost Effort*portion of total resource production for that outpost)/800
Example for a Hunting Lodge 	(600 game rating * 20 Effort * 50%)/800 = 7.5
All buildings set to 20 Effort currently, eventually will be equak to the square root of the skills of all the workers at the outpost	
*/

function calculateHoldings(a_hexInfo: HexInfo)
{

  /*
  g_bulkFood = 0
  g_bulkOre = 0;
  g_bulkStone = 0;
  g_bulkTrade = 0;
  g_bulkWood = 0;
  
  g_bulkFoodCosts = 0
  g_bulkOreCosts = 0;
  g_bulkStoneCosts = 0;
  g_bulkTradeCosts = 0;
  g_bulkWoodCosts = 0;

  g_bulkFoodIncome = 0
  g_bulkOreIncome = 0;
  g_bulkStoneIncome = 0;
  g_bulkTradeIncome = 0;
  g_bulkWoodIncome = 0;
  
  for(var y = a_hexInfo.hexTopLeftCoord[1]; y < a_hexInfo.hexDim[1]; y++)
  {
    for(var x = a_hexInfo.hexTopLeftCoord[0]; x < a_hexInfo.hexDim[0]; x++)
    {
      var hex = vec4.fromValues(x,y,0,1)
      
      if(a_hexInfo.validHex(hex))
      {
        var c = x - a_hexInfo.hexTopLeftCoord[0] + (y - a_hexInfo.hexTopLeftCoord[1]) * a_hexInfo.hexDim[0];
        
        if(g_holdings[c].holding >= 0)
        {
          switch(g_holdings[c].holding)
          {
            case 0: //barracks

              g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkWoodCosts += 10;
              break;
              
            case 1: //farm
              if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 1 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5)
                g_bulkFoodIncome += 2 * (g_holdings[c].plus+1);
              if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 1 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5)
                g_bulkFoodIncome += 2 * (g_holdings[c].plus+1);
            
              g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkTradeCosts += 10;
              break;
              
            case 2: //fishery
              if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5 || g_holdings[c].outpostA == 7)
                g_bulkTradeIncome += 4 * (g_holdings[c].plus+1);
              if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5 || g_holdings[c].outpostB == 7)
                g_bulkTradeIncome += 4 * (g_holdings[c].plus+1);
            
              g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkTradeCosts += 10;
              break;
              
            case 3: //hunting lodge
              if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5 || g_holdings[c].outpostA == 7)
                g_bulkTradeIncome += (g_holdings[c].plus+1);
              if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5 || g_holdings[c].outpostB == 7)
                g_bulkTradeIncome += (g_holdings[c].plus+1);
                
              if(g_holdings[c].outpostA == 3)
                g_bulkWoodIncome += (g_holdings[c].plus+1);
              if(g_holdings[c].outpostB == 3)
                g_bulkWoodIncome += (g_holdings[c].plus+1);
              
              g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkOreCosts += 10; //<--IS THIS CORRECT
              break;
              
            case 4: //inn
              if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5 || g_holdings[c].outpostA == 7)
                g_bulkTradeIncome += (g_holdings[c].plus+1);
              if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5 || g_holdings[c].outpostB == 7)
                g_bulkTradeIncome += (g_holdings[c].plus+1);
            
              g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkFoodCosts += 10;
              break;
              
            case 5: //library
              g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkStoneCosts += 10; //<--IS THIS CORRECT
              break;
              
            case 6: //lumbermill
              if(g_holdings[c].outpostA == 3)
                g_bulkWoodIncome += 2 * (g_holdings[c].plus+1);
              if(g_holdings[c].outpostB == 3)
                g_bulkWoodIncome += 2 * (g_holdings[c].plus+1);
            
              g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkOreCosts += 10; //<--IS THIS CORRECT
              break;
              
            case 7: //mine
              if(g_holdings[c].outpostA == 4)
                g_bulkOreIncome += 2 * (g_holdings[c].plus+1);
              if(g_holdings[c].outpostB == 4)
                g_bulkOreIncome += 2 * (g_holdings[c].plus+1);
              
              g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkWoodCosts += 10; //<--IS THIS CORRECT
              break;
              
            case 8: //quarry
              if(g_holdings[c].outpostA == 6)
                g_bulkStoneIncome += 2 *(g_holdings[c].plus+1);
              if(g_holdings[c].outpostB == 6)
                g_bulkStoneIncome += 2 *(g_holdings[c].plus+1);
              
              g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkStoneCosts += 10; //<--IS THIS CORRECT
              break;
              
            case 9: //ranch
              switch(g_holdings[c].plus)
              {
                case 0:
                  if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5 || g_holdings[c].outpostA == 7)
                    g_bulkTradeIncome += 2;
                  if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5 || g_holdings[c].outpostB == 7)
                    g_bulkTradeIncome += 2;
                  break;
                case 1:
                  if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5 || g_holdings[c].outpostA == 7)
                    g_bulkTradeIncome += 3;
                  if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5 || g_holdings[c].outpostB == 7)
                    g_bulkTradeIncome += 3;
                  
                  if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 1 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5)
                    g_bulkFoodIncome += 1;
                  if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 1 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5)
                    g_bulkFoodIncome += 1;
                    
                  break;
                case 2:
                  if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5 || g_holdings[c].outpostA == 7)
                    g_bulkTradeIncome += 4;
                  if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5 || g_holdings[c].outpostB == 7)
                    g_bulkTradeIncome += 4;
                  
                  if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 1 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5)
                    g_bulkFoodIncome += 2;
                  if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 1 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5)
                    g_bulkFoodIncome += 2;
                    
                  break;
                case 3:
                  if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5 || g_holdings[c].outpostA == 7)
                    g_bulkTradeIncome += 6;
                  if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5 || g_holdings[c].outpostB == 7)
                    g_bulkTradeIncome += 6;
                  
                  if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 1 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5)
                    g_bulkFoodIncome += 2;
                  if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 1 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5)
                    g_bulkFoodIncome += 2;
                    
                  break;
                case 4:
                  if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5 || g_holdings[c].outpostA == 7)
                    g_bulkTradeIncome += 7;
                  if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5 || g_holdings[c].outpostB == 7)
                    g_bulkTradeIncome += 7;
                  
                  if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 1 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5)
                    g_bulkFoodIncome += 3;
                  if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 1 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5)
                    g_bulkFoodIncome += 3;
                    
                  break;
                case 5:
                  if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5 || g_holdings[c].outpostA == 7)
                    g_bulkTradeIncome += 8;
                  if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5 || g_holdings[c].outpostB == 7)
                    g_bulkTradeIncome += 8;
                  
                  if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 1 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5)
                    g_bulkFoodIncome += 4;
                  if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 1 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5)
                    g_bulkFoodIncome += 4;
                    
                  break;
              }
              
              g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkStoneCosts += 10; //<--IS THIS CORRECT
              break;
              
            case 10: //sanctum
              g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkStoneCosts += 10; //<--IS THIS CORRECT
              break;
              
            case 11: //shrine
              g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkStoneCosts += 10;
              break;
              
            case 12: //trading post
              if(g_holdings[c].outpostA == 0 || g_holdings[c].outpostA == 2 || g_holdings[c].outpostA == 5 || g_holdings[c].outpostA == 7)
                g_bulkTradeIncome += (g_holdings[c].plus+1);
              if(g_holdings[c].outpostB == 0 || g_holdings[c].outpostB == 2 || g_holdings[c].outpostB == 5 || g_holdings[c].outpostB == 7)
                g_bulkTradeIncome += (g_holdings[c].plus+1);
            
              g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkOreCosts += 10;
              break;
              
            case 13: //watchtower
              g_bulkOreCosts += 10;
              if(g_holdings[c].plus >= 1)
                g_bulkWoodCosts += 10;
              if(g_holdings[c].plus >= 2)
                g_bulkFoodCosts += 10;
              if(g_holdings[c].plus >= 3)
                g_bulkTradeCosts += 10;
              if(g_holdings[c].plus >= 4)
                g_bulkStoneCosts += 10;
              if(g_holdings[c].plus >= 5)
                g_bulkOreCosts += 10;
              break;
          }
          
          var resource = new Resource();
          calculateResources(resource, hex, a_hexInfo);
        
          if(g_holdings[c].outpostA >= 0)
          {
            for(var i = 0; i < g_outpostTypes[g_holdings[c].outpostA].resource.length; i++)
            {
              var r = 0;
              //0 crops
              //1 fish
              //2 game
              //3 herds
              //4 ore
              //5 stone
              //6 wood
              switch(g_outpostTypes[g_holdings[c].outpostA].resource[i].from)
              {
                case 0:
                  r = resource.crops;
                  break;
                case 1:
                  r = resource.fish;
                  break;
                case 2:
                  r = resource.game;
                  break;
                case 3:
                  r = resource.herds;
                  break;
                case 4:
                  r = resource.ore;
                  break;
                case 5:
                  r = resource.stone;
                  break;
                case 6:
                  r = resource.wood;
                  break;
              }
              var effort = Math.sqrt(g_holdings[c].skillA) + g_holdings[c].plusA * 8;
              
              r = r * effort * g_outpostTypes[g_holdings[c].outpostA].resource[i].percent / 800;
              switch(g_outpostTypes[g_holdings[c].outpostA].resource[i].to)
              {
                case 0:
                  g_bulkFoodIncome += r;
                  break;
                case 1:
                  g_bulkOreIncome += r;
                  break;
                case 2:
                  g_bulkStoneIncome += r;
                  break;
                case 3:
                  g_bulkTradeIncome += r;
                  break;
                case 4:
                  g_bulkWoodIncome += r;
                  break;
              }
            }
          }
          
          if(g_holdings[c].outpostB >= 0)
          {
            for(var i = 0; i < g_outpostTypes[g_holdings[c].outpostB].resource.length; i++)
            {
              var r = 0;
              //0 crops
              //1 fish
              //2 game
              //3 herds
              //4 ore
              //5 stone
              //6 wood
              switch(g_outpostTypes[g_holdings[c].outpostB].resource[i].from)
              {
                case 0:
                  r = resource.crops;
                  break;
                case 1:
                  r = resource.fish;
                  break;
                case 2:
                  r = resource.game;
                  break;
                case 3:
                  r = resource.herds;
                  break;
                case 4:
                  r = resource.ore;
                  break;
                case 5:
                  r = resource.stone;
                  break;
                case 6:
                  r = resource.wood;
                  break;
              }
              var effort = Math.sqrt(g_holdings[c].skillB) + g_holdings[c].plusB * 8;
              
              r = r * effort * g_outpostTypes[g_holdings[c].outpostB].resource[i].percent / 800;
              switch(g_outpostTypes[g_holdings[c].outpostB].resource[i].to)
              {
                case 0:
                  g_bulkFoodIncome += r;
                  break;
                case 1:
                  g_bulkOreIncome += r;
                  break;
                case 2:
                  g_bulkStoneIncome += r;
                  break;
                case 3:
                  g_bulkTradeIncome += r;
                  break;
                case 4:
                  g_bulkWoodIncome += r;
                  break;
              }
            }
          }
        
        }
      
      }
      
    }
  }
  
  g_bulkFood = g_bulkFoodIncome - g_bulkFoodCosts;
  g_bulkOre = g_bulkOreIncome - g_bulkOreCosts;
  g_bulkStone = g_bulkStoneIncome - g_bulkStoneCosts;
  g_bulkTrade = g_bulkTradeIncome - g_bulkTradeCosts;
  g_bulkWood = g_bulkWoodIncome - g_bulkWoodCosts;
  

  */
}

