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

import { vec4 } from 'gl-matrix';

class Alliance{
  name: string;
  color: any;
  alignment: string;
  pos: any;
  
  constructor(a_name: string, a_color: any, a_alignment: string){
	  this.name = a_name;
	  this.color = a_color;
	  this.alignment = a_alignment;
	  this.pos;	//place to put text
  }
}

//training available
class Training{
	error: number = 0;
	fighter: number = 0;
	dreadnaught: number = 0;
	skirmisher: number = 0;
	cleric: number = 0;
	seminary: number = 0;
	wizard: number = 0
	warWizard: number = 0;
	occultist: number = 0;
	expert: number = 0;
	freeholder: number = 0;
	rogue: number = 0;
	arcanist: number = 0;
	weaponsmith: number = 0;
	armorsmith: number = 0;
	bowyer: number = 0;
	leatherworker: number = 0;
	jeweller: number = 0;
	tailor: number = 0;
	alchemist: number = 0;
	engineer: number = 0;
	geologist: number = 0;
	apothecary: number = 0;
	sawyer: number = 0;
	smelter: number = 0;
	tanner: number = 0;
	weaver: number = 0;
	iconographer: number = 0;
	artificer: number = 0;
	auction: number = 0;
	library: number = 0;
}

class Settlement{
  name: string;
  alignment: string;
  numTowers: number;
  population: number;
  level: number;
  hex: vec4;
  type: any;
  numTypes: number;
  alliance: Array<any>;
  website: string;
  towers: Array<any>
  color: vec4;
  buildings: Array<any>;
  description: string;
  training: Training;
  active: boolean;

  constructor(a_name: string, a_alignment: string, a_x: number, a_y: number, 
    a_towers: number, a_population: number, a_level: number, a_type: any, 
    a_numTypes: number, a_color: vec4, a_active?: boolean){
    
	  this.name = a_name;
	  this.alignment = a_alignment;
	  this.numTowers = a_towers;
	  this.population = a_population;
	  this.level = a_level;
	  this.hex = vec4.fromValues(a_x, a_y, 0, 1);
	  //craft 	= 1st bit
	  //fighter = 2nd bit
	  //cleric	= 3rd bit
	  //rogue   = 4th bit
	  //wizard  = 5th bit
	  //coin		= 6th bit
	  this.type = a_type;
	  this.numTypes = a_numTypes;
	  this.alliance = new Array();
	  this.website = "";
	  this.towers = new Array();
	  this.color = vec4.clone(a_color);
	  this.buildings = new Array();
	  this.description = "";
	  this.training = new Training();
	  
	  if(a_active === undefined)
		  this.active = true;
	  else
		  this.active = a_active;
  }
  
  AddAlliance = (a_alliance: string) => {
	  let index = -1;
	  for(let i = 0; i < g_alliances.length; i++)
	  {
		  if(g_alliances[i].name == a_alliance)
			  index = i;
	  }
	  this.alliance.push(index);
  }
}

class NpcSettlement{
  name: string;
  hex: vec4;
  
  constructor(a_name: string, a_x: number, a_y: number){
	  this.name = a_name;
	  this.hex = vec4.fromValues(a_x, a_y, 0, 1);
  }
}

export var g_alliances = new Array();
export var g_settlements = new Array();
export var g_npcSettlements = new Array();

/* 0*/ g_alliances.push(new Alliance("Dominion of the Northern Marches", "102,51,153", ""));
/* 1*/ g_alliances.push(new Alliance("Corbenik", "0,255,0", ""));
/* 2*/ g_alliances.push(new Alliance("Aeonian League", "0,223,223", ""));
/* 3*/ g_alliances.push(new Alliance("Everbloom Alliance", "0,127,255", ""));
/* 4*/ g_alliances.push(new Alliance("Nation of Kathalphas", "127,0,0", "Chaotic Neutral"));
/* 5*/ g_alliances.push(new Alliance("Empire of Xeilias", "255,0,0", "Lawful Evil"));
/* 6*/ g_alliances.push(new Alliance("Northern Coalition", "255,127,0", ""));
/* 7*/ g_alliances.push(new Alliance("Emerald Lodge", "0,127,0", ""));
/* 8*/ g_alliances.push(new Alliance("University Commons", "255,255,255", ""));
/* 9*/ g_alliances.push(new Alliance("Phaeros", "127,0,127", ""));
/*10*/ g_alliances.push(new Alliance("Hammerfall", "0,63,191", ""));
/*11*/ g_alliances.push(new Alliance("Keeper's Pass", "0,0,255", ""));
/*12*/ g_alliances.push(new Alliance("Brighthaven Alliance", "0,0,127", ""));
/*13*/ g_alliances.push(new Alliance("Dominion of the Northern Marches and High Road Covenant", "63,63,63", ""));
/*14*/ g_alliances.push(new Alliance("Greystone Keep", "63,127,193", ""));
/*15*/ g_alliances.push(new Alliance("Sigil", "255,127,255", ""));
/*16*/ g_alliances.push(new Alliance("Forgeholm", "255,255,0", ""));
/*17*/ g_alliances.push(new Alliance("Brighthaven Alliance and Aeonian League", "63,63,63", ""));
/*18*/ g_alliances.push(new Alliance("Brighthaven Alliance and Keeper's Pass", "63,63,63", ""));
/*19*/ g_alliances.push(new Alliance("Brighthaven Alliance, Keeper's Pass, Phaeros", "63,63,63", ""));
/*20*/ g_alliances.push(new Alliance("CONTESTED, Brighthaven Alliance, High Road Covenant", "0,0,0", ""));
/*21*/ g_alliances.push(new Alliance("Dun Baile, High Road Covenant", "63,63,63", ""));
/*22*/ g_alliances.push(new Alliance("Brighthaven Alliance, Phaeros", "63,63,63", ""));
/*23*/ g_alliances.push(new Alliance("Mediash, Callambea", "63,63,63", ""));
/*24*/ g_alliances.push(new Alliance("Brighthaven Alliance, Dominion of the Northern Marches", "63,63,63", ""));




//a_name, a_alignment, a_x, a_y, a_towers, a_population, a_level, a_type, a_numTypes, a_color, a_active
/* 0*/ g_settlements.push(new Settlement("Alderwag"					  , "Neutral Good"	  , -15,  -6, 2,  83, 18, 1|8  		, 2, vec4.fromValues(191,191,  0,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Dominion of the Northern Marches"); g_settlements[g_settlements.length-1].website = "http://dominion.guildlaunch.com/";
/* 1*/ g_settlements.push(new Settlement("Concordia"					, ""	              ,  -3, 	 3, 1,  14, 10, 0   		, 0, vec4.fromValues(191,127,  0,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Dominion of the Northern Marches"); g_settlements[g_settlements.length-1].AddAlliance("Brighthaven Alliance"); 
/* 2*/ g_settlements.push(new Settlement("Aragon"						  , "Chaotic Neutral"	,  -6, 	 2, 3, 171, 19, 2|8|16	, 3, vec4.fromValues(255,191,191,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Nation of Kathalphas"); g_settlements[g_settlements.length-1].AddAlliance("Northern Coalition"); g_settlements[g_settlements.length-1].website = "http://unnamedcompany.guildlaunch.com/";
/* 3*/ g_settlements.push(new Settlement("Staalgard"					, ""		          	,  -1, 	-5, 2, 	84, 20, 32			, 1, vec4.fromValues(127,127,  0,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Dominion of the Northern Marches"); g_settlements[g_settlements.length-1].website = "http://dominion.guildlaunch.com/";
/* 4*/ g_settlements.push(new Settlement("Sylva"						  , "True Neutral"		,  -7,  14, 0, 142, 14, 1|2|4|8 , 4, vec4.fromValues(127,  0,255,1)));					g_settlements[g_settlements.length-1].AddAlliance("Aeonian League"); g_settlements[g_settlements.length-1].website = "http://www.echowoodsmen.com";
/* 5*/ g_settlements.push(new Settlement("Blackwood Glade"		, "Chaotic Good"		,  -3, 	15, 0, 	59, 10, 0 			, 0, vec4.fromValues(127,127,255,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Brighthaven Alliance");
/* 6*/ g_settlements.push(new Settlement("Brighthaven"				, "Neutral Good"		,	  4, 	11,10, 365, 10, 2|4|8|16, 4, vec4.fromValues(  0,  0,255,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Brighthaven Alliance"); g_settlements[g_settlements.length-1].website = "http://tinyurl.com/TheEmpyreanOrder";
/* 7*/ g_settlements.push(new Settlement("Callambea"					, "Lawful Neutral"	,  -9, 	-2, 1, 135, 15, 4|32		, 2, vec4.fromValues(255,127, 63,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Empire of Xeilias"); g_settlements[g_settlements.length-1].AddAlliance("Northern Coalition"); g_settlements[g_settlements.length-1].website = "http://beyond-pfo.com/"
/* 8*/ g_settlements.push(new Settlement("Canis Castrum"			, "Lawful Neutral"	, -14,	 9, 7,  92, 18, 8|32		, 2, vec4.fromValues( 31,255,255,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Aeonian League"); g_settlements[g_settlements.length-1].website = "http://www.caniscastrum.com/";
/* 9*/ g_settlements.push(new Settlement("Sigil"			  			, "Chaotic"	        , -18,  17, 0, 	57, 10, 32 			, 1, vec4.fromValues(255,191,255,1))); 				g_settlements[g_settlements.length-1].website = "http://commons.audacity.company/";
/*10*/ g_settlements.push(new Settlement("Hangman's Hollow"	  , ""								, -11,   7, 0, 	 1, 10, 0   		, 0, vec4.fromValues(255, 63,255,1)));					g_settlements[g_settlements.length-1].AddAlliance("Aeonian League");
/*11*/ g_settlements.push(new Settlement("Corvus Citadel"			, ""								, -19, 	12, 0, 	 6, 10, 0   		, 0, vec4.fromValues(255,  0,255,1)));					g_settlements[g_settlements.length-1].AddAlliance("Aeonian League");
/*12*/ g_settlements.push(new Settlement("Emerald Lodge"			, "Good"						,  -6,   9, 7, 132, 14, 2|32  	, 2, vec4.fromValues(  0,255,  0,1))); 				g_settlements[g_settlements.length-1].website = "http://emeraldlodge.guildlaunch.com/";
/*13*/ g_settlements.push(new Settlement("Forgeholm"					, "Lawful Neutral"	,   4,  -5, 5, 142, 14, 2|8 		, 2, vec4.fromValues(255,255,  0,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Dominion of the Northern Marches"); g_settlements[g_settlements.length-1].website = "forgeholm.guildlaunch.com";
/*14*/ g_settlements.push(new Settlement("Mediash"					  , "Chaotic Neutral"	,  -5,  -2, 2, 	24, 10, 0   		, 0, vec4.fromValues(255, 63, 63,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Nation of Kathalphas"); g_settlements[g_settlements.length-1].AddAlliance("Northern Coalition"); 
/*15*/ g_settlements.push(new Settlement("Golgotha"					  , "Lawful Evil"			,  -6,   6, 5, 269, 15, 0   		, 0, vec4.fromValues(191,  0,  0,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Empire of Xeilias"); g_settlements[g_settlements.length-1].AddAlliance("Northern Coalition"); g_settlements[g_settlements.length-1].website = "http://xeilias.com/";
/*16*/ g_settlements.push(new Settlement("Caer Coedwig"				, ""	  						, -13,  -4, 0, 	84, 16, 4|32 		, 2, vec4.fromValues(255,255, 63,1)));        g_settlements[g_settlements.length-1].AddAlliance("Dominion of the Northern Marches"); g_settlements[g_settlements.length-1].website = "http://dominion.guildlaunch.com/";
/*17*/ g_settlements.push(new Settlement("Hammerfall"				  , "Chaotic Good"  	,  -3,  12, 7,  97, 19, 1|4|8|32, 4, vec4.fromValues(  0,127,127,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Brighthaven Alliance"); g_settlements[g_settlements.length-1].website = "http://hammerfall-pfo.guildlaunch.com/";
/*18*/ g_settlements.push(new Settlement("Corbenik"						, "Lawful Good"			, -13, 	 3, 0, 	19, 10, 0   		, 0, vec4.fromValues(255,127,127,1)));				g_settlements[g_settlements.length-1].AddAlliance("Corbenik"); g_settlements[g_settlements.length-1].website = "http://coalroad.com/";
/*19*/ g_settlements.push(new Settlement("Marketstead"	  		, ""							  , -16, 	13, 0, 	 1, 10, 0   		, 0, vec4.fromValues(191,127,127,1)));					g_settlements[g_settlements.length-1].AddAlliance("Aeonian League");
/*20*/ g_settlements.push(new Settlement("Hope's End"				  , "Lawful Evil"			, -10,  13, 5, 	72, 18, 2|4|8|16, 4, vec4.fromValues(  0,191,191,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Aeonian League"); g_settlements[g_settlements.length-1].website = "http://hopes-end.com/pages/About";
/*21*/ g_settlements.push(new Settlement("Dun Baile"			    , "Lawful Neutral"	,  -9, 	 5, 0, 	90, 10, 0   		, 0, vec4.fromValues(191,127,191,1)));
/*22*/ g_settlements.push(new Settlement("Keeper's Pass"			, "Neutral Good"	  ,   1,  14, 7, 172, 19, 1|8|32	, 3, vec4.fromValues(  0,127,255,1))); 				g_settlements[g_settlements.length-1].website = "http://www.kotcguild.com";
/*23*/ g_settlements.push(new Settlement("Carpe Noctem"		    , ""	              ,   1,   4, 0,  77, 18, 0 			, 0, vec4.fromValues(255,111,  0,1)));				
/*24*/ g_settlements.push(new Settlement("Everwatch"		      , ""	              , -14, 	 6, 0, 	 8, 10, 0   		, 0, vec4.fromValues(127, 63,127,1)));        g_settlements[g_settlements.length-1].AddAlliance("Brighthaven Alliance");
/*25*/ g_settlements.push(new Settlement("Ozem's Vigil"			  , "Lawful Good"	    , -11,  -6, 9, 294, 20, 2|4  		, 2, vec4.fromValues(255,255,127,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Dominion of the Northern Marches"); g_settlements[g_settlements.length-1].website = "http://dominion.guildlaunch.com/";
/*26*/ g_settlements.push(new Settlement("Phaeros"			  		, "True Neutral"	  ,   0,  17,12, 133, 20, 4|16   	, 2, vec4.fromValues(191,191,255,1))); 				g_settlements[g_settlements.length-1].website = "http://khaiognos.org";
/*27*/ g_settlements.push(new Settlement("Greystone Keep"			, ""								,  -9,  18, 5,  45, 13, 0     	, 0, vec4.fromValues(191,191,191,1))); 			  g_settlements[g_settlements.length-1].AddAlliance("Aeonian League"); g_settlements[g_settlements.length-1].website = "http://khaiognos.org";
/*28*/ g_settlements.push(new Settlement("High Road"					, "Neutral Good"	  , -17,  -3,10,  50, 16, 2|8|16	, 3, vec4.fromValues(  0,127,  0,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Dominion of the Northern Marches"); g_settlements[g_settlements.length-1].website = "http://dominion.guildlaunch.com/";
/*29*/ g_settlements.push(new Settlement("Sunholm"			  		, "Neutral Good"	  , -17,   9, 4, 	44, 10, 0 	  	, 0, vec4.fromValues(191,255,255,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Aeonian League"); g_settlements[g_settlements.length-1].website = "http://the-phoenix-brotherhood.guildlaunch.com/";
/*30*/ g_settlements.push(new Settlement("Talonguard"				  , "Neutral Good"	  , -19,   2, 5, 158, 18, 1|4|32	, 3, vec4.fromValues(127,255,127,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Dominion of the Northern Marches"); g_settlements[g_settlements.length-1].website = "http://dominion.guildlaunch.com/";
/*31*/ g_settlements.push(new Settlement("Tavernhold"					, "Chaotic Good"	  , -19,  -6, 6,  81, 14, 2|4 		, 2, vec4.fromValues(127,255,  0,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Dominion of the Northern Marches"); g_settlements[g_settlements.length-1].website = "http://dominion.guildlaunch.com/";
/*32*/ g_settlements.push(new Settlement("Veggr Tor"			    , ""								, -16, 	 1, 0, 	79, 10, 0   		, 0, vec4.fromValues(255,191,  0,1))); 				g_settlements[g_settlements.length-1].AddAlliance("Dominion of the Northern Marches"); g_settlements[g_settlements.length-1].website = "http://dominion.guildlaunch.com/";
/*33*/ g_settlements.push(new Settlement("University Commons"	, ""	              ,   5, 	 1, 0, 274, 19, 16  		, 1, vec4.fromValues(255,255,255,1)));				g_settlements[g_settlements.length-1].website = "http://paizo.com/threads/rzs2rzmy?Pathfinder-University-A-company-for-new";


var index = 0;

//Alderwag
g_settlements[index].buildings.push("Guild House"); 
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Smeltmill"); 
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Library"); 
g_settlements[index].buildings.push("Jewellers");
g_settlements[index].buildings.push("Lab");
g_settlements[index].buildings.push("Spellwright"); 
g_settlements[index].buildings.push("Smith");
g_settlements[index].buildings.push("University");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Apothecary"); 
g_settlements[index].buildings.push("Tailors");
g_settlements[index].buildings.push("Tannery");

//Auroral
index++;

//Aragon
index++;
g_settlements[index].buildings.push("Smith");
g_settlements[index].buildings.push("Garrison");
g_settlements[index].buildings.push("Library");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Leatherworkers");
g_settlements[index].buildings.push("Boutique");
g_settlements[index].buildings.push("Thieves Guild");
g_settlements[index].buildings.push("University");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Sawmill");

//Staalgard
index++;

g_settlements[index].buildings.push("Auction House");
/*
g_settlements[index].buildings.push("Library");
g_settlements[index].buildings.push("Guild House");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Cooperative");
g_settlements[index].buildings.push("Smith");
*/

//sylva
index++;
g_settlements[index].buildings.push("Guild House");
g_settlements[index].buildings.push("Lab");
g_settlements[index].buildings.push("Garrison");
g_settlements[index].buildings.push("Smith");
g_settlements[index].buildings.push("Temple of Gozreh");
g_settlements[index].buildings.push("Seminary");
g_settlements[index].buildings.push("Cooperative");
g_settlements[index].buildings.push("Boutique");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Artificer's Workshop");
g_settlements[index].buildings.push("Iconographer");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Arcanist's Workshop");

//Blackwood Glade
index++;
g_settlements[index].buildings.push("University");
g_settlements[index].buildings.push("Guild House");
g_settlements[index].buildings.push("Dreadnaught School");
g_settlements[index].buildings.push("Fighter Collage");
g_settlements[index].buildings.push("Seminary");
g_settlements[index].buildings.push("Temple of Gorum");

//Brighthaven
index++;
g_settlements[index].buildings.push("Cathedral of Good");
g_settlements[index].buildings.push("Weaponmaster");
g_settlements[index].buildings.push("Garrison");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Wizard Academy");
g_settlements[index].buildings.push("Occultist School");
g_settlements[index].buildings.push("War Wizard School");
g_settlements[index].buildings.push("Thieves Guild");
g_settlements[index].buildings.push("Leatherworkers");
g_settlements[index].buildings.push("Tailors");
g_settlements[index].buildings.push("Artificer's Workshop");
g_settlements[index].buildings.push("Armorer");
g_settlements[index].buildings.push("Institute");

//Callambea
index++;
g_settlements[index].buildings.push("Auction House");
g_settlements[index].buildings.push("Institute");
g_settlements[index].buildings.push("Cathedral of Law");
g_settlements[index].buildings.push("Spellwright");
g_settlements[index].buildings.push("Workshop");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Alchemist's Lab");
g_settlements[index].buildings.push("Workhouse");
g_settlements[index].buildings.push("Smith");
g_settlements[index].buildings.push("Cooperative");
g_settlements[index].buildings.push("Boutique");

//Canis Castrum
index++;
g_settlements[index].buildings.push("Auction House");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Smith");
g_settlements[index].buildings.push("Cooperative");
g_settlements[index].buildings.push("Boutique");
g_settlements[index].buildings.push("Spellwright");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Guild House");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Lab");

//sigil
index++;
g_settlements[index].buildings.push("Auction House");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Geologist");

//Hangman's Hollow
index++;

//Corvus Citadel
index++;

//Emerald Lodge
index++;
g_settlements[index].buildings.push("Auction House");
g_settlements[index].buildings.push("Library");
g_settlements[index].buildings.push("Garrison");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Smith");
g_settlements[index].buildings.push("Artificer's Workshop");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Woodshop");
g_settlements[index].buildings.push("Boutique");
g_settlements[index].buildings.push("Lab");

//Forgeholm
index++;
g_settlements[index].buildings.push("Garrison");
g_settlements[index].buildings.push("Guild House");
g_settlements[index].buildings.push("Smith");
g_settlements[index].buildings.push("Seminary");
g_settlements[index].buildings.push("Spellwright");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Woodshop");
g_settlements[index].buildings.push("Institute");
g_settlements[index].buildings.push("Temple of Abadar");
g_settlements[index].buildings.push("Geologist");

//Mediash
index++;

//Golgotha
index++;

//Caer Coedwig
index++;
g_settlements[index].buildings.push("Auction House");
g_settlements[index].buildings.push("Armorer");
g_settlements[index].buildings.push("Boutique");
g_settlements[index].buildings.push("Cooperative");
g_settlements[index].buildings.push("Lab");
g_settlements[index].buildings.push("Spellwright");
g_settlements[index].buildings.push("Workshop");
g_settlements[index].buildings.push("Weaponmaster");
g_settlements[index].buildings.push("Workhouse");
g_settlements[index].buildings.push("Cathedral of Nature");
g_settlements[index].buildings.push("Library");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Geologist");

//Hammerfall
index++;
g_settlements[index].buildings.push("Auction House");
g_settlements[index].buildings.push("Guild House");
g_settlements[index].buildings.push("Smith");
g_settlements[index].buildings.push("Seminary");
g_settlements[index].buildings.push("Library");
g_settlements[index].buildings.push("Temple of Desna");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Boutique");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Leatherworkers");
g_settlements[index].buildings.push("Woodshop");

//Corbenik
index++;
g_settlements[index].buildings.push("Cathedral of Justice");
g_settlements[index].buildings.push("Garrison");
g_settlements[index].buildings.push("Library");
g_settlements[index].buildings.push("Occultist School");
g_settlements[index].buildings.push("Wizard Academy");
g_settlements[index].buildings.push("Spellwright");
g_settlements[index].buildings.push("War Wizard School");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Leatherworkers");

//Marketstead
index++;
/*
g_settlements[index].buildings.push("Fighter Collage");
g_settlements[index].buildings.push("Dreadnaught School");
g_settlements[index].buildings.push("Wizard Academy");
g_settlements[index].buildings.push("Armorer");
g_settlements[index].buildings.push("Iconographer");
g_settlements[index].buildings.push("Woodshop");
g_settlements[index].buildings.push("Artificer's Workshop");
g_settlements[index].buildings.push("Alchemist's Lab");
g_settlements[index].buildings.push("Institute");
g_settlements[index].buildings.push("Jewellers");
g_settlements[index].buildings.push("Tailors");
g_settlements[index].buildings.push("Auction House");
g_settlements[index].buildings.push("Cathedral of Efficiency");
*/
//Hope's End
index++;
g_settlements[index].buildings.push("University");
g_settlements[index].buildings.push("Thieves Guild");
g_settlements[index].buildings.push("Cathedral of Efficiency");
g_settlements[index].buildings.push("Library");
g_settlements[index].buildings.push("Skirmisher School");
g_settlements[index].buildings.push("Dreadnaught School");
g_settlements[index].buildings.push("Fighter Collage");
g_settlements[index].buildings.push("Iconographer");
g_settlements[index].buildings.push("Artificer's Workshop");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Alchemist's Lab");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Woodshop");
g_settlements[index].buildings.push("Sawmill");

//Dun Baile
index++;

//Keeper's Pass
index++;
g_settlements[index].buildings.push("Auction House");
g_settlements[index].buildings.push("Seminary");
g_settlements[index].buildings.push("Guild House");
g_settlements[index].buildings.push("Smith");
g_settlements[index].buildings.push("Lab");
g_settlements[index].buildings.push("Spellwright");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Library");
g_settlements[index].buildings.push("Tailors");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Temple of Saranrae");

//Carpe Noctem
index++;

//Everwatch
index++;

//Ozem's Vigil
index++;
g_settlements[index].buildings.push("Cathedral of Justice");
g_settlements[index].buildings.push("Iconographer");
g_settlements[index].buildings.push("Spellwright");
g_settlements[index].buildings.push("Garrison");
g_settlements[index].buildings.push("Jewellers");
g_settlements[index].buildings.push("Tailors");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Lab");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Cooperative");
g_settlements[index].buildings.push("Smith");

//Phaeros
index++;
g_settlements[index].buildings.push("University");
g_settlements[index].buildings.push("Cathedral of Efficiency");
g_settlements[index].buildings.push("Library");
g_settlements[index].buildings.push("Alchemist's Lab");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Spellwright");
g_settlements[index].buildings.push("Armorer");
g_settlements[index].buildings.push("Workhouse");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Tailors");


//Greystone Keep
index++;
g_settlements[index].buildings.push("Cathedral of Law");
g_settlements[index].buildings.push("Smith");
g_settlements[index].buildings.push("Cooperative");

//High Road
index++;
g_settlements[index].buildings.push("Guild House");
g_settlements[index].buildings.push("University");
g_settlements[index].buildings.push("Artificer's Workshop");
g_settlements[index].buildings.push("Dreadnaught School");
g_settlements[index].buildings.push("Fighter Collage");
g_settlements[index].buildings.push("Seminary");
g_settlements[index].buildings.push("Iconographer");
g_settlements[index].buildings.push("Leatherworkers");
g_settlements[index].buildings.push("Institute");
g_settlements[index].buildings.push("Weaponmaster");
g_settlements[index].buildings.push("Woodshop");
g_settlements[index].buildings.push("Tailors");
g_settlements[index].buildings.push("Alchemist's Lab");
g_settlements[index].buildings.push("Jewellers");
g_settlements[index].buildings.push("Armorer");

//Sunholm
index++;
g_settlements[index].buildings.push("Cathedral of Justice");
g_settlements[index].buildings.push("Garrison");
g_settlements[index].buildings.push("Cooperative");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Jewellers");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Iconographer");
g_settlements[index].buildings.push("Smeltmill");

//Talonguard
index++;
g_settlements[index].buildings.push("Auction House");
g_settlements[index].buildings.push("Workshop");
g_settlements[index].buildings.push("Workhouse");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Weaponmaster");
g_settlements[index].buildings.push("Armorer");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Boutique");
g_settlements[index].buildings.push("Cooperative");
g_settlements[index].buildings.push("Lab");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Cathedral of Good");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Spellwright");
g_settlements[index].buildings.push("Library");


//Tavernhold
index++;
g_settlements[index].buildings.push("Cathedral of Freedom");
g_settlements[index].buildings.push("Garrison");
g_settlements[index].buildings.push("Smith");
g_settlements[index].buildings.push("Cooperative");
g_settlements[index].buildings.push("Lab");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Geologist");
g_settlements[index].buildings.push("Library");
g_settlements[index].buildings.push("Sawmill");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Apothecary");

//Veggr Tor
index++;

//University Commons
index++;
g_settlements[index].buildings.push("University");
g_settlements[index].buildings.push("Lab");
g_settlements[index].buildings.push("Iconographer");
g_settlements[index].buildings.push("Skirmisher School");
g_settlements[index].buildings.push("Dreadnaught School");
g_settlements[index].buildings.push("Fighter Collage");
g_settlements[index].buildings.push("Armorer");
g_settlements[index].buildings.push("Seminary");
g_settlements[index].buildings.push("Cooperative");
g_settlements[index].buildings.push("Tannery");
g_settlements[index].buildings.push("Smeltmill");
g_settlements[index].buildings.push("Jewellers");
g_settlements[index].buildings.push("Artificer's Workshop");
g_settlements[index].buildings.push("Tailors");
g_settlements[index].buildings.push("Arcanist's Workshop");
g_settlements[index].buildings.push("Loom");
g_settlements[index].buildings.push("Apothecary");
g_settlements[index].buildings.push("Sawmill");


//descriptions
g_settlements[13].description = "The Dwarves of Forgeholm, a Lawful Neutral settlement, and their friends of all races, invite you to join us as we build a successful settlement in the hills of the River Kingdoms. "+
	"<p>Dwarves are a tight knit group that will defend Forgeholm and each other. Armorsmithing and weaponsmithing skills are being honed, skilled craftsmen will plan, design, and construct our keep and other buildings using our trained architects, carpenters and stonemasons."+
	"<p>Dwarves are friends of the Elves and Humans, Gnomes and Halflings. Many members of our settlement came for solitude, repentance, or redemption, but we all have the same goal; make Forgeholm great!";

index = 0;

/* 0 Alderwag*/
/* 14w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-14,-6,0,1)); 	//Bangers and Mash
/* 13w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-13,-5,0,1)); 	//Bangers and Mash
/* 16w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-16,-5,0,1)); 	//Blackwolves of Sarkoris
/* 16w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-16,-4,0,1)); 	//Blackwolves of Sarkoris
/* 15w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-15,-4,0,1)); 	//Domination Militia
/* 14w,  3n */ g_settlements[index].towers.push(vec4.fromValues(-14,-3,0,1)); 	//Domination Militia
/*  2w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-2,-6,0,1)); 	//The Button Makers
/* 15w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-15,-5,0,1)); 	//The Button Makers
/* 15w,  7n */ g_settlements[index].towers.push(vec4.fromValues(-15,-7,0,1)); 	//The Button Makers
/* 14w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-14,-5,0,1)); 	//The Gauntlet
/* 16w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-16,-6,0,1)); 	//The Gauntlet

/* 1 Concordia */index++;

/* 2 Aragon */index++;
/*  5w,  2s */ g_settlements[index].towers.push(vec4.fromValues(-5,2,0,1)); 	//Aragonian Council
/*  6w,  1s */ g_settlements[index].towers.push(vec4.fromValues(-6,1,0,1)); 	//Aragonian Council
/*  5w,  1s */ g_settlements[index].towers.push(vec4.fromValues(-5,1,0,1)); 	//Aragonian Council
/*  7w,  1s */ g_settlements[index].towers.push(vec4.fromValues(-7,1,0,1)); 	//Aragonian Council
/*  6w,  3s */ g_settlements[index].towers.push(vec4.fromValues(-6,3,0,1)); 	//Aragonian Council
/*  8w,  3n */ g_settlements[index].towers.push(vec4.fromValues(-8,-3,0,1)); 	//Aragonian Council
/*  3w,  1s */ g_settlements[index].towers.push(vec4.fromValues(-3,1,0,1)); 	//Aragonian Council
/*  4w,  3n */ g_settlements[index].towers.push(vec4.fromValues(-4,-3,0,1)); 	//Aragonian Council

/*  6w,  4s */ g_settlements[index].towers.push(vec4.fromValues(-6,4,0,1)); 	//Blonde Ambition

/*  8w,  5s */ //g_settlements[index].towers.push(vec4.fromValues(-8,5,0,1)); 	//Aragonian Council



/* 3 Staalgard*/index++;
/*  0w,  5n */ g_settlements[index].towers.push(vec4.fromValues(0,-5,0,1)); 	//Ante Omnia Armari
/*  1w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-1,-4,0,1)); 	//Ante Omnia Armari
/*  1w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-1,-6,0,1)); 	//Ante Omnia Armari
/*  2w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-2,-5,0,1)); 	//Ante Omnia Armari
/*  1w,  7n */ g_settlements[index].towers.push(vec4.fromValues(-1,-7,0,1)); 	//Full-Metal Syndicate
/*  1e,  5n */ g_settlements[index].towers.push(vec4.fromValues(1,-5,0,1)); 	//Staalgard High Council
/*  2w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-2,-4,0,1)); 	//Staalgard High Council
/*  0w,  4n */ g_settlements[index].towers.push(vec4.fromValues(0,-4,0,1)); 	//Staalgard High Council
/*  1e,  3n */ g_settlements[index].towers.push(vec4.fromValues(1,-3,0,1)); 	//Dominion Preservation Society
/*  2w,  7n */ g_settlements[index].towers.push(vec4.fromValues(-2,-7,0,1)); 	//Dominion Preservation Society
/*  0w,  3n */ g_settlements[index].towers.push(vec4.fromValues(0,-3,0,1)); 	//Dominion Preservation Society

/* 4 Sylva*/index++;
/*  5w, 13s */ g_settlements[index].towers.push(vec4.fromValues(-5,13,0,1)); 	//Echo Wardens
/*  6w, 13s */ g_settlements[index].towers.push(vec4.fromValues(-6,13,0,1)); 	//Echo Wardens
/*  7w, 12s */ g_settlements[index].towers.push(vec4.fromValues(-7,12,0,1)); 	//Echo Wardens
/*  9w, 16s */ g_settlements[index].towers.push(vec4.fromValues(-9,16,0,1)); 	//Echo Woodsmen
/*  6w, 14s */ g_settlements[index].towers.push(vec4.fromValues(-6,14,0,1)); 	//Echo Woodsmen
/*  8w, 15s */ g_settlements[index].towers.push(vec4.fromValues(-8,15,0,1)); 	//Echo Woodsmen
/*  8w, 14s */ g_settlements[index].towers.push(vec4.fromValues(-8,14,0,1)); 	//Echo Woodsmen
/*  6w, 15s */ g_settlements[index].towers.push(vec4.fromValues(-6,15,0,1)); 	//Echo Woodsmen
/*  7w, 13s */ g_settlements[index].towers.push(vec4.fromValues(-7,13,0,1)); 	//Echo Woodsmen
/*  8w, 16s */ g_settlements[index].towers.push(vec4.fromValues(-8,16,0,1)); 	//Red Mantis Assassins
/*  7w, 18s */ g_settlements[index].towers.push(vec4.fromValues(-7,18,0,1)); 	//The Scarlet Legion
/*  6w, 16s */ g_settlements[index].towers.push(vec4.fromValues(-6,16,0,1)); 	//The Scarlet Legion
/*  7w, 15s */ g_settlements[index].towers.push(vec4.fromValues(-7,15,0,1)); 	//The Scarlet Legion

/* 5 Blackwood Glade*/index++;
/*  2w, 16s */ g_settlements[index].towers.push(vec4.fromValues(-2,16,0,1)); //indor-mardil
/*  2w, 15s */ g_settlements[index].towers.push(vec4.fromValues(-2,15,0,1)); //indor-mardil
/*  3w, 16s */ g_settlements[index].towers.push(vec4.fromValues(-3,16,0,1)); //indor-mardil
/*  4w, 16s */ g_settlements[index].towers.push(vec4.fromValues(-4,16,0,1)); //indor-mardil
/*  4w, 15s */ g_settlements[index].towers.push(vec4.fromValues(-4,15,0,1)); //indor-mardil
/*  6e, 12s */ g_settlements[index].towers.push(vec4.fromValues(6,12,0,1)); 	//indor-mardil
/*  3w, 14s */ g_settlements[index].towers.push(vec4.fromValues(-3,14,0,1)); //indor-mardil
/*  2w, 17s */ g_settlements[index].towers.push(vec4.fromValues(-2,17,0,1)); //The Everbloom National Bank
/*  3w, 17s */ g_settlements[index].towers.push(vec4.fromValues(-3,17,0,1)); //The Everbloom National Bank
/*  0w,  8s */ g_settlements[index].towers.push(vec4.fromValues(0,8,0,1)); //The Everbloom National Bank
/*  4w, 17s */ g_settlements[index].towers.push(vec4.fromValues(-4,17,0,1)); //The Everbloom National Bank






/* 6 Brighthaven */index++;
/*  5e, 10s */ g_settlements[index].towers.push(vec4.fromValues(5,10,0,1)); 	//Argent Crusade
/*  4e,  8s */ g_settlements[index].towers.push(vec4.fromValues(4,8,0,1)); 	  //Argent Crusade
/*  6e, 11s */ g_settlements[index].towers.push(vec4.fromValues(6,11,0,1)); 	//Argent Crusade
/*  1e, 8s */ g_settlements[index].towers.push(vec4.fromValues(1,8,0,1)); 	  //Argent Crusade
/* 22w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-22,-2,0,1)); //Argent Defenders
/* 21w,  1n */ g_settlements[index].towers.push(vec4.fromValues(-21,-1,0,1)); //Argent Defenders
/*  5e,  8s */ g_settlements[index].towers.push(vec4.fromValues(5,8,0,1)); 	  //Argent Defenders
/*  4e, 10s */ g_settlements[index].towers.push(vec4.fromValues(4,10,0,1)); 	//Argent Defenders
/*  2e,  8s */ g_settlements[index].towers.push(vec4.fromValues(2,8,0,1)); 	  //Argent Defenders
/*  6e,  8s */ g_settlements[index].towers.push(vec4.fromValues(6,8,0,1)); 	  //Argent Vanguard
/*  6e,  9s */ g_settlements[index].towers.push(vec4.fromValues(6,9,0,1)); 	  //Argent Vanguard
/*  3e, 10s */ g_settlements[index].towers.push(vec4.fromValues(3,10,0,1)); 	//Argent Vanguard
/*  1w, 10s */ g_settlements[index].towers.push(vec4.fromValues(-1,10,0,1));  //Argent Vanguard
/*  5e, 11s */ g_settlements[index].towers.push(vec4.fromValues(5,11,0,1)); 	//Coalition of Wealth and Gain

/*  3e,  9s */ g_settlements[index].towers.push(vec4.fromValues(3,9,0,1)); 	  //Empyrean Legion
/* 21w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-21,-2,0,1));  //Empyrean Legion
/* 14w,  5s */ g_settlements[index].towers.push(vec4.fromValues(-14,5,0,1)); 	//Empyrean Legion
/*  1e,  9s */ g_settlements[index].towers.push(vec4.fromValues(1,9,0,1));    //Empyrean Legion
/*  0w, 11s */ g_settlements[index].towers.push(vec4.fromValues(0,11,0,1));   //Empyrean Legion

/*  5w, 13s */ g_settlements[index].towers.push(vec4.fromValues(-5,13,0,1));  //Empyrean Wolves
/*  0w, 10s */ g_settlements[index].towers.push(vec4.fromValues(0,10,0,1));  //Empyrean Wolves
/*  1w,  9s */ g_settlements[index].towers.push(vec4.fromValues(-1,9,0,1));  //Empyrean Wolves
/*  2e, 10s */ g_settlements[index].towers.push(vec4.fromValues(2,10,0,1));  //Empyrean Wolves

/*  4w,  4s */ g_settlements[index].towers.push(vec4.fromValues(-4,4,0,1)); 	//The Empyrean Order
/*  2e, 12s */ g_settlements[index].towers.push(vec4.fromValues(2,12,0,1)); 	//The Empyrean Order
/*  4w,  3s */ g_settlements[index].towers.push(vec4.fromValues(-4,3,0,1)); 	//The Empyrean Order
/*  3w,  2s */ g_settlements[index].towers.push(vec4.fromValues(-3,2,0,1)); 	//The Empyrean Order
/*  3w,  4s */ g_settlements[index].towers.push(vec4.fromValues(-3,4,0,1)); 	//The Empyrean Order
/*  2w,  3s */ g_settlements[index].towers.push(vec4.fromValues(-2,3,0,1)); 	//The Empyrean Order
/*  3e, 12s */ g_settlements[index].towers.push(vec4.fromValues(3,12,0,1)); 	//The Empyrean Order
/*  2w,  4s */ g_settlements[index].towers.push(vec4.fromValues(-2,4,0,1));   //The Empyrean Order
/*  3e, 11s */ g_settlements[index].towers.push(vec4.fromValues(3,11,0,1)); 	//The Empyrean Order
/*  4e, 12s */ g_settlements[index].towers.push(vec4.fromValues(4,12,0,1)); 	//The Empyrean Order
/*  4e, 13s */ g_settlements[index].towers.push(vec4.fromValues(4,13,0,1)); 	//The Empyrean Order


/*  2e,  9s */ g_settlements[index].towers.push(vec4.fromValues(2,9,0,1)); 	//The Golden Scales
/*  1e, 12s */ g_settlements[index].towers.push(vec4.fromValues(1,12,0,1)); 	//The Golden Scales
/*  2e,  7s */ g_settlements[index].towers.push(vec4.fromValues(2,7,0,1)); 	//The Golden Scales
/*  6e, 10s */ g_settlements[index].towers.push(vec4.fromValues(6,10,0,1)); 	//The Golden Scales

/*  4e,  9s */ g_settlements[index].towers.push(vec4.fromValues(4,9,0,1)); 	//The Seraphic Commission


/* 7 Callambea */index++;

/* 10w,  1n */ g_settlements[index].towers.push(vec4.fromValues(-10,-1,0,1)); 	//Beyond the Grave
/*  9w,  3n */ g_settlements[index].towers.push(vec4.fromValues(-9,-3,0,1)); 	//Beyond the Grave
/*  8w,  1n */ g_settlements[index].towers.push(vec4.fromValues(-8,-1,0,1)); 	//Beyond the Grave
/* 14w,  0n */ g_settlements[index].towers.push(vec4.fromValues(-14,0,0,1)); 	//Beyond the Grave


/* 12w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-12,-2,0,1)); 	//Pax Aeternum
/* 10w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-10,-2,0,1)); 	//River Kingdoms Trading Company
/* 11w,  3n */ g_settlements[index].towers.push(vec4.fromValues(-11,-3,0,1)); 	//River Kingdoms Trading Company
/*  9w,  1n */ g_settlements[index].towers.push(vec4.fromValues(-9,-1,0,1)); 	//River Kingdoms Trading Company
/*  9w,  1s */ g_settlements[index].towers.push(vec4.fromValues(-9,1,0,1)); 	//Shadow Skills



/* 8 Canis Castrum */index++;
/* 17w,  8s */ g_settlements[index].towers.push(vec4.fromValues(-17,8,0,1)); 	//Gold and Steel Trading
/* 18w,  9s */ g_settlements[index].towers.push(vec4.fromValues(-18,9,0,1)); 	//Gold and Steel Trading
/* 18w, 10s */ g_settlements[index].towers.push(vec4.fromValues(-18,10,0,1)); 	//Gold and Steel Trading
/* 15w,  8s */ g_settlements[index].towers.push(vec4.fromValues(-15,8,0,1)); 	//Gold and Steel Trading
/* 14w, 10s */ g_settlements[index].towers.push(vec4.fromValues(-14,10,0,1)); 	//Gold and Steel Trading
/* 17w, 10s */ g_settlements[index].towers.push(vec4.fromValues(-17,10,0,1)); 	//Gold and Steel Trading

/* 17w, 12s */ //g_settlements[index].towers.push(vec4.fromValues(-17,12,0,1)); 	//Gold and Steel Trading
/* 17w, 13s */ //g_settlements[index].towers.push(vec4.fromValues(-17,13,0,1)); 	//Gold and Steel Trading
/* 16w, 14s */ //g_settlements[index].towers.push(vec4.fromValues(-16,14,0,1)); 	//Gold and Steel Trading
/* 16w, 12s */ //g_settlements[index].towers.push(vec4.fromValues(-16,12,0,1)); 	//Gold and Steel Trading
/* 15w, 12s */ //g_settlements[index].towers.push(vec4.fromValues(-15,12,0,1)); 	//Gold and Steel Trading
/* 15w, 13s */ //g_settlements[index].towers.push(vec4.fromValues(-15,13,0,1)); 	//Gold and Steel Trading

/* 16w, 10s */ g_settlements[index].towers.push(vec4.fromValues(-16,10,0,1)); 	//The Dealers

/* 9 Sigil */index++;
/* 18w, 19s */ g_settlements[index].towers.push(vec4.fromValues(-18,19,0,1)); 	//The Clueless
/* 18w, 18s */ g_settlements[index].towers.push(vec4.fromValues(-18,18,0,1)); 	//The Clueless
/* 19w, 16s */ g_settlements[index].towers.push(vec4.fromValues(-19,16,0,1)); 	//The Clueless

/* 10 Hangman's Hollow */index++;

/* 11 Corvus Citadel */index++;

/* 12 Emerald Lodge */index++;
/*  6w, 11s */ g_settlements[index].towers.push(vec4.fromValues(-6,11,0,1)); 	//Emerald Lodge
/*  9w,  9s */ g_settlements[index].towers.push(vec4.fromValues(-9,9,0,1)); 		//Emerald Lodge
/*  8w, 11s */ g_settlements[index].towers.push(vec4.fromValues(-8,11,0,1)); 	//Emerald Lodge
/*  5w,  8s */ g_settlements[index].towers.push(vec4.fromValues(-5,8,0,1)); 		//Emerald Lodge
/*  2w,  5s */ g_settlements[index].towers.push(vec4.fromValues(-2,5,0,1)); 		//Emerald Lodge
/*  6w,  8s */ g_settlements[index].towers.push(vec4.fromValues(-6,8,0,1)); 		//Emerald Lodge
/*  3w,  5s */ g_settlements[index].towers.push(vec4.fromValues(-3,5,0,1)); 		//Emerald Lodge

/*  7w,  8s */ g_settlements[index].towers.push(vec4.fromValues(-7,8,0,1)); 		//Magic School of Magic
/*  8w,  9s */ g_settlements[index].towers.push(vec4.fromValues(-8,9,0,1)); 		//Magic School of Magic
/* 18w, 16s */ g_settlements[index].towers.push(vec4.fromValues(-18,16,0,1)); 		//River Kingdoms Resource Company
/*  6w, 10s */ g_settlements[index].towers.push(vec4.fromValues(-6,10,0,1)); 	//The Emerald Hunt

/*  2w,  9s */ g_settlements[index].towers.push(vec4.fromValues(-2,9,0,1)); 		//The Free Settlers

/* 13 Forgeholm */index++;
/*  2e,  6n */ g_settlements[index].towers.push(vec4.fromValues(2,-6,0,1)); 	//Deepforge Company
/*  6e,  4n */ g_settlements[index].towers.push(vec4.fromValues(6,-4,0,1)); 	//Deepforge Company
/*  3e,  5n */ g_settlements[index].towers.push(vec4.fromValues(3,-5,0,1)); 	//Deepforge Company
/*  3e,  6n */ g_settlements[index].towers.push(vec4.fromValues(3,-6,0,1)); 	//Deepforge Company
/*  6e,  5n */ g_settlements[index].towers.push(vec4.fromValues(6,-5,0,1)); 	//Deepforge Company
/*  4e,  7n */ g_settlements[index].towers.push(vec4.fromValues(4,-7,0,1)); 	//Node breakers
/*  3e,  7n */ g_settlements[index].towers.push(vec4.fromValues(3,-7,0,1)); 	//Node breakers
/*  2e,  7n */ g_settlements[index].towers.push(vec4.fromValues(2,-7,0,1)); 	//Forgehammer
/*  4e,  3n */ g_settlements[index].towers.push(vec4.fromValues(4,-3,0,1)); 	//Forgehammer
/*  5e,  5n */ g_settlements[index].towers.push(vec4.fromValues(5,-5,0,1)); 	//Forgehammer
/*  5e,  7n */ g_settlements[index].towers.push(vec4.fromValues(5,-7,0,1)); 	//Forgehammer
/*  4e,  6n */ g_settlements[index].towers.push(vec4.fromValues(4,-6,0,1)); 	//Forgehammer


/*  6e,  6n */ g_settlements[index].towers.push(vec4.fromValues(6,-6,0,1)); 	//Steelforge Engineering Company
/*  6e,  7n */ g_settlements[index].towers.push(vec4.fromValues(6,-7,0,1)); 	//Steelforge Engineering Company
/*  5e,  6n */ g_settlements[index].towers.push(vec4.fromValues(5,-6,0,1)); 	//Steelforge Engineering Company
/*  4e,  4n */ g_settlements[index].towers.push(vec4.fromValues(4,-4,0,1)); 	//Steelforge Engineering Company

/* 14 Mediash */index++;
/*  4w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-4,-2,0,1)); 	//Fangs of Kathalpas
/*  6w,  1n */ g_settlements[index].towers.push(vec4.fromValues(-6,-1,0,1)); 	//Fangs of Kathalpas
/*  5w,  1n */ g_settlements[index].towers.push(vec4.fromValues(-5,-1,0,1)); 	//Fangs of Kathalpas
/*  6w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-6,-2,0,1)); 	//Fangs of Kathalpas
/*  5w,  3n */ g_settlements[index].towers.push(vec4.fromValues(-5,-3,0,1)); 	//Fangs of Kathalpas
/*  4w,  1n */ g_settlements[index].towers.push(vec4.fromValues(-4,-1,0,1)); 	//Fangs of Kathalpas

/*  4w,  1s */ //g_settlements[index].towers.push(vec4.fromValues(-4,1,0,1)); 	//Freedom Alliance




/* 15 Golgotha */index++;
/*  5w,  6s */ g_settlements[index].towers.push(vec4.fromValues(-5,6,0,1)); 	//Iron Tusk Band


/* 16 Caer Coedwig */index++;
/* 13w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-13,-2,0,1)); 	//ERRASTIL'S IRREGULARS
/* 13w,  2s */ g_settlements[index].towers.push(vec4.fromValues(-13,2,0,1)); 	//ERRASTIL'S IRREGULARS
/* 14w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-14,-2,0,1)); 	//ERRASTIL'S IRREGULARS

/* 12w,  3n */ g_settlements[index].towers.push(vec4.fromValues(-12,-3,0,1)); 	//Irregulars
/* 13w,  3n */ g_settlements[index].towers.push(vec4.fromValues(-13,-3,0,1)); 	//Irregulars
/* 17w,  1n */ g_settlements[index].towers.push(vec4.fromValues(-17,-1,0,1)); 	//Irregulars
/* 15w,  1n */ g_settlements[index].towers.push(vec4.fromValues(-15,-1,0,1)); 	//Irregulars

/* 14w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-14,-4,0,1)); 	//stormwalkers
/* 14w,  1n */ g_settlements[index].towers.push(vec4.fromValues(-14,-1,0,1)); 	//stormwalkers

/* 17 Hammerfall */index++;
/*  4w, 13s */ g_settlements[index].towers.push(vec4.fromValues(-4,13,0,1)); 	//MarshWardens
/*  1w, 11s */ g_settlements[index].towers.push(vec4.fromValues(-1,11,0,1)); 	//MarshWardens
/*  1w, 13s */ g_settlements[index].towers.push(vec4.fromValues(-1,13,0,1)); 	//MarshWardens
/*  2w, 13s */ g_settlements[index].towers.push(vec4.fromValues(-2,13,0,1)); 	//MarshWardens
/*  6e, 18s */ g_settlements[index].towers.push(vec4.fromValues(6,18,0,1)); 	//Phoenix Industries
/*  6e, 16s */ g_settlements[index].towers.push(vec4.fromValues(6,16,0,1)); 	//Phoenix Industries
/*  5e, 14s */ g_settlements[index].towers.push(vec4.fromValues(5,14,0,1)); 	//Phoenix Industries
/*  6e, 14s */ g_settlements[index].towers.push(vec4.fromValues(6,14,0,1)); 	//Phoenix Industries
/*  6e, 15s */ g_settlements[index].towers.push(vec4.fromValues(6,15,0,1)); 	//Phoenix Industries
/*  3w, 11s */ g_settlements[index].towers.push(vec4.fromValues(-3,11,0,1)); 	//Shiny Bobbles
/*  4w, 12s */ g_settlements[index].towers.push(vec4.fromValues(-4,12,0,1)); 	//Shiny Bobbles
/*  5w, 12s */ g_settlements[index].towers.push(vec4.fromValues(-5,12,0,1)); 	//Shiny Bobbles
/*  3w, 13s */ g_settlements[index].towers.push(vec4.fromValues(-3,13,0,1)); 	//Shiny Bobbles

/* 18 Corbenik */index++;
/* 15w,  1s */ g_settlements[index].towers.push(vec4.fromValues(-15,1,0,1)); 	//The_AIDA_Council
/* 12w,  4s */ g_settlements[index].towers.push(vec4.fromValues(-12,4,0,1)); 	//The_AIDA_Council
/* 16w,  2s */ g_settlements[index].towers.push(vec4.fromValues(-16,2,0,1)); 	//The_AIDA_Council
/* 11w,  5s */ //g_settlements[index].towers.push(vec4.fromValues(-11,5,0,1)); 	//The_AIDA_Council

/* 19 Marketstead */index++;

/* 21w,  2n */ //g_settlements[index].towers.push(vec4.fromValues(-21,-2,0,1)); 	//Rotterguards


/* 12w,  2s */ //g_settlements[index].towers.push(vec4.fromValues(-12,2,0,1)); 	//Rotterguards


/* 20 Hope's End */index++;
/* 14w, 12s */ g_settlements[index].towers.push(vec4.fromValues(-14,12,0,1)); 	//Halo of Flies
/* 12w, 12s */ g_settlements[index].towers.push(vec4.fromValues(-12,12,0,1)); 	//Halo of Flies
/* 11w, 13s */ g_settlements[index].towers.push(vec4.fromValues(-11,13,0,1)); 	//Halo of Flies
/* 10w, 14s */ g_settlements[index].towers.push(vec4.fromValues(-10,14,0,1)); 	//Order of the Angels of Light
/* 12w, 13s */ g_settlements[index].towers.push(vec4.fromValues(-12,13,0,1)); 	//Vox Silentii
/*  9w, 13s */ g_settlements[index].towers.push(vec4.fromValues(-9,13,0,1)); 	//Vox Silentii
/* 10w, 12s */ g_settlements[index].towers.push(vec4.fromValues(-10,12,0,1)); 	//Vox Silentii
/* 11w, 12s */ g_settlements[index].towers.push(vec4.fromValues(-11,12,0,1)); 	//Vox Silentii

/* 21 Dun Baile */index++;

/* 11w,  5s */ g_settlements[index].towers.push(vec4.fromValues(-11,5,0,1)); 	//Fianna
/*  9w,  4s */ g_settlements[index].towers.push(vec4.fromValues(-9,4,0,1)); 	//Fianna
/*  9w,  6s */ g_settlements[index].towers.push(vec4.fromValues(-9,6,0,1)); 	//Fianna
/* 10w,  6s */ g_settlements[index].towers.push(vec4.fromValues(-10,6,0,1)); 	//Fianna
/*  7w,  5s */ g_settlements[index].towers.push(vec4.fromValues(-7,5,0,1)); 	//Fianna
/* 10w,  5s */ g_settlements[index].towers.push(vec4.fromValues(-10,5,0,1)); 	//Fianna
/*  8w,  6s */ g_settlements[index].towers.push(vec4.fromValues(-8,6,0,1)); 	//Fianna
/*  6w,  5s */ g_settlements[index].towers.push(vec4.fromValues(-6,5,0,1)); 	//Fianna

/*  0w,  6s */ g_settlements[index].towers.push(vec4.fromValues(0,6,0,1)); 			//Stache's Mustache
/*  1e,  3s */ g_settlements[index].towers.push(vec4.fromValues(1,3,0,1)); 			//Stache's Mustache
/*  7w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-7,-2,0,1)); 	//Stache's Mustache
/*  8w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-8,-2,0,1)); 	//Stache's Mustache
/*  7w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-7,-4,0,1)); 	//Stache's Mustache
/*  1e,  5s */ //g_settlements[index].towers.push(vec4.fromValues(1,5,0,1)); 	//Stache's Mustache


/* 22 Keeper's Pass */index++;
/*  0w, 13s */ g_settlements[index].towers.push(vec4.fromValues(0,13,0,1)); 	//Crafters of the Pass
/*  1e, 11s */ g_settlements[index].towers.push(vec4.fromValues(1,11,0,1)); 	//Crafters of the Pass
/*  4e, 15s */ g_settlements[index].towers.push(vec4.fromValues(4,15,0,1)); 	//Crafters of the Pass
/*  1e, 13s */ g_settlements[index].towers.push(vec4.fromValues(1,13,0,1)); 	//Crafters of the Pass
/*  6e, 19s */ g_settlements[index].towers.push(vec4.fromValues(6,19,0,1)); 	//Crafters of the Pass
/*  3e, 14s */ g_settlements[index].towers.push(vec4.fromValues(3,14,0,1)); 	//Crafters of the Pass
/*  5e, 17s */ g_settlements[index].towers.push(vec4.fromValues(5,17,0,1)); 	//Defenders of the Pass
/*  5e, 19s */ g_settlements[index].towers.push(vec4.fromValues(5,19,0,1)); 	//Defenders of the Pass
/*  5e, 18s */ g_settlements[index].towers.push(vec4.fromValues(5,18,0,1)); 	//Defenders of the Pass
/*  3e, 15s */ g_settlements[index].towers.push(vec4.fromValues(3,15,0,1)); 	//Defenders of the Pass
/*  1e, 15s */ g_settlements[index].towers.push(vec4.fromValues(1,15,0,1)); 	//Keepers Of The Circle
/*  3e, 13s */ g_settlements[index].towers.push(vec4.fromValues(3,13,0,1)); 	//Keepers Of The Circle
/*  0w, 14s */ g_settlements[index].towers.push(vec4.fromValues(0,14,0,1)); 	//Keepers Of The Circle
/*  2e, 15s */ g_settlements[index].towers.push(vec4.fromValues(2,15,0,1)); 	//Observers of the Pass
/*  4e, 17s */ g_settlements[index].towers.push(vec4.fromValues(4,17,0,1)); 	//Observers of the Pass
/*  2e, 14s */ g_settlements[index].towers.push(vec4.fromValues(2,14,0,1)); 	//Observers of the Pass
/*  0w, 15s */ g_settlements[index].towers.push(vec4.fromValues(0,15,0,1)); 	//Observers of the Pass


/* 23 Carpe Noctem */index++;
/*  0w,  4s */ g_settlements[index].towers.push(vec4.fromValues(0,4,0,1)); 	//Ghouls Gone Wild

/* 24 Everwatch */index++;

/* 25 Ozem's Vigil */index++;
/* 18w,  5s */ g_settlements[index].towers.push(vec4.fromValues(-18,5,0,1));	//Black List
/* 16w,  6s */ g_settlements[index].towers.push(vec4.fromValues(-16,6,0,1));	//Black List
/* 16w,  5s */ g_settlements[index].towers.push(vec4.fromValues(-16,5,0,1));	//Black List
/* 18w,  6s */ g_settlements[index].towers.push(vec4.fromValues(-18,6,0,1));	//Black List
/* 17w,  4s */ g_settlements[index].towers.push(vec4.fromValues(-17,4,0,1));	//Black List
/* 17w,  6s */ g_settlements[index].towers.push(vec4.fromValues(-17,6,0,1));	//Black List

/* 21w,  9s */ g_settlements[index].towers.push(vec4.fromValues(-21,9,0,1)); 	//Dominion shipping inc.
/* 21w, 10s */ g_settlements[index].towers.push(vec4.fromValues(-21,10,0,1)); 	//Dominion shipping inc.

/*  8w,  7n */ g_settlements[index].towers.push(vec4.fromValues(-8,-7,0,1)); 	//Excelsior
/*  7w,  7n */ g_settlements[index].towers.push(vec4.fromValues(-7,-7,0,1)); 	//Excelsior

/*  7w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-7,-5,0,1)); 	//Eyes of Erastil
/*  6w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-6,-4,0,1)); 	//Eyes of Erastil
/*  9w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-9,-4,0,1)); 	//Eyes of Erastil
/*  8w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-8,-5,0,1)); 	//Eyes of Erastil

/* 10w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-10,-6,0,1)); 	//InVigil
/* 12w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-12,-6,0,1)); 	//InVigil
/* 12w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-12,-5,0,1)); 	//InVigil
/* 12w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-12,-4,0,1)); 	//InVigil
/*  9w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-9,-6,0,1)); 	  //InVigil
/* 10w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-10,-5,0,1)); 	//InVigil

/*  1e,  2n */ g_settlements[index].towers.push(vec4.fromValues(1,-2,0,1)); 		//Ironbreaker
/*  2e,  4n */ g_settlements[index].towers.push(vec4.fromValues(2,-4,0,1)); 		//Ironbreaker
/*  6w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-6,-5,0,1)); 		//Ironbreaker
/* 22w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-22,-5,0,1)); 	//Ironbreaker

/*  4w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-4,-4,0,1)); 	  //Logistics
/*  4w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-4,-5,0,1)); 	  //Logistics
/*  0w,  6n */ g_settlements[index].towers.push(vec4.fromValues(0,-6,0,1)); 	  //Logistics
/* 15w,  4n */ //g_settlements[index].towers.push(vec4.fromValues(-15,-4,0,1)); 	//Logistics
/*  5w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-5,-6,0,1)); 	  //Logistics
/* 22w,  9s */ //g_settlements[index].towers.push(vec4.fromValues(-22,9,0,1)); 	//Logistics

/* 13w,  7n */ g_settlements[index].towers.push(vec4.fromValues(-13,-7,0,1)); 	//Peace Through Vigilance
/* 12w,  7n */ g_settlements[index].towers.push(vec4.fromValues(-12,-7,0,1)); 	//Peace Through Vigilance
/* 11w,  7n */ g_settlements[index].towers.push(vec4.fromValues(-11,-7,0,1)); 	//Peace Through Vigilance
/* 11w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-11,-5,0,1)); 	//VC Ozem's Hunters
/* 10w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-10,-4,0,1)); 	//VC Ozem's Hunters
/*  9w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-9,-5,0,1)); 	//VC Ozem's Hunters

/* 26 Phaeros */index++;
/*  1w, 16s */ g_settlements[index].towers.push(vec4.fromValues(-1,16,0,1)); 	//Frozen Fingers
/*  1e, 17s */ g_settlements[index].towers.push(vec4.fromValues(1,17,0,1)); 	//Frozen Fingers
/*  0w, 16s */ g_settlements[index].towers.push(vec4.fromValues(0,16,0,1)); 	//Frozen Fingers
/*  0w, 19s */ g_settlements[index].towers.push(vec4.fromValues(0,19,0,1)); 	//Phaeros
/*  0w, 18s */ g_settlements[index].towers.push(vec4.fromValues(0,18,0,1)); 	//Phaeros
/*  1e, 16s */ g_settlements[index].towers.push(vec4.fromValues(1,16,0,1)); 	//Phaeros
/*  1w, 17s */ g_settlements[index].towers.push(vec4.fromValues(-1,17,0,1)); 	//Phaeros
/*  2w, 19s */ g_settlements[index].towers.push(vec4.fromValues(-2,19,0,1)); 	//Phaeros
/*  2e, 20s */ g_settlements[index].towers.push(vec4.fromValues(2,20,0,1)); 	//Phaeros

/*  3e, 19s */ g_settlements[index].towers.push(vec4.fromValues(3,19,0,1)); 	//The seventh veil quartermaster co
/*  4e, 19s */ g_settlements[index].towers.push(vec4.fromValues(4,19,0,1)); 	//The seventh veil quartermaster co
/*  2e, 19s */ g_settlements[index].towers.push(vec4.fromValues(2,19,0,1)); 	//The seventh veil quartermaster co
/*  1e, 19s */ g_settlements[index].towers.push(vec4.fromValues(1,19,0,1)); 	//The seventh veil quartermaster co

/* 27 Greystone Keep */index++;
/* 8w,  19s */ g_settlements[index].towers.push(vec4.fromValues(-8,19,0,1)); 	//Grey Guard
/* 9w,  17s */ g_settlements[index].towers.push(vec4.fromValues(-9,17,0,1)); 	//Grey Guard
/*10w,  19s */ g_settlements[index].towers.push(vec4.fromValues(-10,19,0,1)); 	//Grey Guard
/* 8w,  18s */ g_settlements[index].towers.push(vec4.fromValues(-8,18,0,1)); 	//Grey Guard
/*10w,  18s */ g_settlements[index].towers.push(vec4.fromValues(-10,18,0,1)); 	//Grey Guard
/* 9w,  19s */ g_settlements[index].towers.push(vec4.fromValues(-9,19,0,1)); 	//Grey Guard


/* 28 High Road */index++;
/* 22w,  3s */ g_settlements[index].towers.push(vec4.fromValues(-22,3,0,1)); 	//Holy Magicks
/* 12w,  1n */ g_settlements[index].towers.push(vec4.fromValues(-12,-1,0,1)); 	//Holy Magicks
/* 22w,  5s */ g_settlements[index].towers.push(vec4.fromValues(-22,5,0,1)); 	//Holy Magicks


/* 18w,  5s */ //g_settlements[index].towers.push(vec4.fromValues(-18,5,0,1)); 	//Terminally Confused
/* 16w,  3n */ //g_settlements[index].towers.push(vec4.fromValues(-16,-3,0,1)); 	//Terminally Confused


/* 18w,  3n */ //g_settlements[index].towers.push(vec4.fromValues(-18,-3,0,1)); 	//Terminally Confused
/* 18w,  2n */ //g_settlements[index].towers.push(vec4.fromValues(-18,-2,0,1)); 	//Terminally Confused
/* 17w,  2n */ //g_settlements[index].towers.push(vec4.fromValues(-17,-2,0,1)); 	//Terminally Confused
/* 17w,  4n */ //g_settlements[index].towers.push(vec4.fromValues(-17,-4,0,1)); 	//Terminally Confused

/* 29 Sunholm */index++;
/* 16w,  7s */ g_settlements[index].towers.push(vec4.fromValues(-16,7,0,1)); 	//Golden Griffon
/* 17w,  7s */ g_settlements[index].towers.push(vec4.fromValues(-17,7,0,1)); 	//Golden Griffon
/* 15w, 10s */ g_settlements[index].towers.push(vec4.fromValues(-15,10,0,1)); 	//New Valhalla Foundries

/* 30 Talonguard */index++;


/* 20w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-20,-2,0,1)); 	//Desperate Goblins

/* 19w,  1s */ g_settlements[index].towers.push(vec4.fromValues(-19,1,0,1)); 	//Highhold Normads
/* 19w,  3n */ g_settlements[index].towers.push(vec4.fromValues(-19,-3,0,1)); 	//Highhold Normads
/* 22w, 10s */ g_settlements[index].towers.push(vec4.fromValues(-22,10,0,1)); 	//Highhold Normads
/* 22w,  4s */ g_settlements[index].towers.push(vec4.fromValues(-22,4,0,1)); 	//Highhold Normads
/* 18w,  7s */ //g_settlements[index].towers.push(vec4.fromValues(-18,7,0,1)); 	//Mosswater Valley Drifters
/* 21w,  8s */ //g_settlements[index].towers.push(vec4.fromValues(-21,8,0,1)); 	//Mosswater Valley Drifters
/* 21w,  7s */ //g_settlements[index].towers.push(vec4.fromValues(-21,7,0,1)); 	//Mosswater Valley Drifters

/* 19w,  1n */ //g_settlements[index].towers.push(vec4.fromValues(-19,-1,0,1)); 	//Desperate Goblins

/* 19w,  2n */ //g_settlements[index].towers.push(vec4.fromValues(-19,-2,0,1)); 	//Desperate Goblins



/* 21w,  3n */ g_settlements[index].towers.push(vec4.fromValues(-21,-3,0,1)); 	//Stormwalkers


/* 20w,  3s */ //g_settlements[index].towers.push(vec4.fromValues(-20,3,0,1)); 	//The Lightbringers
/* 19w,  5s */ //g_settlements[index].towers.push(vec4.fromValues(-19,5,0,1)); 	//The Lightbringers

/* 12w,  3s */ g_settlements[index].towers.push(vec4.fromValues(-12,3,0,1)); 	//Twlight_Brigade
/* 13w,  4s */ g_settlements[index].towers.push(vec4.fromValues(-13,4,0,1)); 	//Twlight_Brigade
/* 20w,  2s */ //g_settlements[index].towers.push(vec4.fromValues(-20,2,0,1)); 	//Twlight_Brigade
/* 14w,  4s */ //g_settlements[index].towers.push(vec4.fromValues(-14,4,0,1)); 	//Twlight_Brigade
/* 14w,  3s */ g_settlements[index].towers.push(vec4.fromValues(-14,3,0,1)); 	//Twlight_Brigade



/* 12w,  4s */ //g_settlements[index].towers.push(vec4.fromValues(-12,4,0,1)); 	//Twlight_Brigade

/* 31 Tavernhold */index++;
/* 20w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-20,-6,0,1)); 	//Dreamseekers
/* 19w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-19,-5,0,1)); 	//Dreamseekers
/* 18w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-18,-5,0,1)); 	//Stone Bear Clan
/* 17w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-17,-6,0,1)); 	//Stone Bear Clan
/* 22w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-22,-6,0,1)); 	//Stone Bear Clan
/* 21w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-21,-6,0,1)); 	//Stone Bear Clan
/* 20w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-20,-5,0,1)); 	//The Golden Flask
/* 19w,  7n */ g_settlements[index].towers.push(vec4.fromValues(-19,-7,0,1)); 	//The Golden Flask
/* 21w,  5n */ g_settlements[index].towers.push(vec4.fromValues(-21,-5,0,1)); 	//The Golden Flask
/* 18w,  6n */ g_settlements[index].towers.push(vec4.fromValues(-18,-6,0,1)); 	//The Golden Flask
/* 20w,  4n */ g_settlements[index].towers.push(vec4.fromValues(-20,-4,0,1)); 	//The Golden Flask

/* 32 Veggr Tor*/index++;
/* 21w,  1s */ //g_settlements[index].towers.push(vec4.fromValues(-21,1,0,1)); 	//Motherlode Mining Co.
/* 22w,  3n */ //g_settlements[index].towers.push(vec4.fromValues(-22,-3,0,1)); 	//Motherlode Mining Co.

/* 21w,  0n */ //g_settlements[index].towers.push(vec4.fromValues(-21,0,0,1)); 	//Motherlode Mining Co.
/* 20w,  0n */ //g_settlements[index].towers.push(vec4.fromValues(-20,0,0,1)); 	//Motherlode Mining Co.

/* 16w,  0n */ g_settlements[index].towers.push(vec4.fromValues(-16,0,0,1)); 		//Motherlode Mining Co.
/* 19w,  0n */ g_settlements[index].towers.push(vec4.fromValues(-19,0,0,1)); 	  //Motherlode Mining Co.
/* 18w,  1s */ g_settlements[index].towers.push(vec4.fromValues(-18,1,0,1)); 	  //Motherlode Mining Co.
/* 17w,  0n */ g_settlements[index].towers.push(vec4.fromValues(-17,0,0,1)); 		//Quarry1602
/* 16w,  2n */ g_settlements[index].towers.push(vec4.fromValues(-16,-2,0,1)); 	//Quarry1602
/* 15w,  0n */ g_settlements[index].towers.push(vec4.fromValues(-15,0,0,1)); 		//Quarry1602
/* 17w,  1s */ g_settlements[index].towers.push(vec4.fromValues(-17,1,0,1)); 		//Quarry1602



/* 33 University commons */ index++;
/*  4e,  0n */ g_settlements[index].towers.push(vec4.fromValues(4,0,0,1)); 	//Bloodstone Swords
/*  3e,  4n */ g_settlements[index].towers.push(vec4.fromValues(3,-4,0,1)); 	//Bloodstone Swords
/*  3w,  3n */ g_settlements[index].towers.push(vec4.fromValues(-3,-3,0,1)); 	//Bloodstone Swords
/*  5e,  2s */ g_settlements[index].towers.push(vec4.fromValues(5,2,0,1)); 	//Bloodstone Swords
/*  4e,  2s */ g_settlements[index].towers.push(vec4.fromValues(4,2,0,1)); 	//Bloodstone Swords
/*  4e,  2n */ g_settlements[index].towers.push(vec4.fromValues(4,-2,0,1)); //Pathfinder University
/*  5e,  3s */ g_settlements[index].towers.push(vec4.fromValues(5,3,0,1)); 	//Pathfinder University
/*  5e,  0n */ g_settlements[index].towers.push(vec4.fromValues(5,0,0,1)); 	//Pathfinder University
/*  3e,  3n */ g_settlements[index].towers.push(vec4.fromValues(3,-3,0,1)); //Pathfinder University
/*  3e,  2s */ g_settlements[index].towers.push(vec4.fromValues(3,2,0,1)); 	//Pathfinder University
/*  4e,  1s */ g_settlements[index].towers.push(vec4.fromValues(4,1,0,1)); 	//Pathfinder University
/*  6e,  0n */ g_settlements[index].towers.push(vec4.fromValues(6,0,0,1)); 	//Pathfinder University
/*  6e,  2s */ g_settlements[index].towers.push(vec4.fromValues(6,2,0,1)); 	//Pathfinder University
/*  6e,  1s */ g_settlements[index].towers.push(vec4.fromValues(6,1,0,1)); 	//Pathfinder University
/*  6e,  3s */ g_settlements[index].towers.push(vec4.fromValues(6,3,0,1)); 	//PFU Faculty
/*  6e,  1n */ g_settlements[index].towers.push(vec4.fromValues(6,-1,0,1)); 	//PFU Faculty
/*  4e,  3s */ g_settlements[index].towers.push(vec4.fromValues(4,3,0,1)); 	//PFU Faculty
/*  2e,  2n */ g_settlements[index].towers.push(vec4.fromValues(2,-2,0,1)); 	//PFU Faculty


g_npcSettlements.push(new NpcSettlement("Rotter's Hole"			, -20, -1));
g_npcSettlements.push(new NpcSettlement("Marchmont"					,  -9,  2));
g_npcSettlements.push(new NpcSettlement("Rathglen"					, -13, -1));
g_npcSettlements.push(new NpcSettlement("Ossian's Crossing" , -17,  5));
g_npcSettlements.push(new NpcSettlement("Kindleburn"		 		,   4,  6));
g_npcSettlements.push(new NpcSettlement("Thornkeep"		 		  ,   0,  0));
g_npcSettlements.push(new NpcSettlement("Thornkeep"		 		  ,   1,  0));
g_npcSettlements.push(new NpcSettlement("Thornkeep"		 		  ,   0,  1));
g_npcSettlements.push(new NpcSettlement("Fort Inevitable"	  , -14, 16));
g_npcSettlements.push(new NpcSettlement("Fort Inevitable"	  , -14, 17));
g_npcSettlements.push(new NpcSettlement("Fort Inevitable"	  , -13, 16));


export var g_hexTowers = new Array(
/*-22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10, -9, -8, -7, -6, -5, -4, -3, -2, -1,  0,  1,  2,  3,  4,  5,  6  */
   -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256,256,256, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1,
   -1,256,256, -1, -1, -1,256,256, -1, -1, -1, -1,256, -1, -1,256,256, -1, -1, -1, -1, -1, -1,256,256,256, -1, -1, -1,
   -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1,256, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1,256, -1,256, -1, -1, -1, -1,256,256,256, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1,
   -1,256, -1,256, -1,256, -1,256,256, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1,
   -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1,256,256, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1,256, -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1,256, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  256, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256,256, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1,256, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1,256, -1, -1, -1, -1,
   -1, -1, -1, -1, -1,256,256, -1, -1,256, -1, -1, -1,256,256,256, -1, -1,256,256, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1,256, -1, -1, -1, -1, -1, -1,256,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1,256, -1, -1, -1, -1,256, -1, -1, -1, -1, -1,256, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1,256, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1,
   -1, -1, -1, -1,256,256,256,256, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1,
  256, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1,256, -1,256, -1, -1, -1,256, -1,256,256, -1, -1, -1,256,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1,256, -1,256,256, -1, -1, -1,256, -1, -1, -1,256,256, -1, -1,
   -1,256, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1,256,256,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1,256,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256,256, -1,256,256,256, -1, -1, -1,256, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1,256, -1, -1, -1,256, -1, -1, -1, -1, -1, -1, -1, -1
);

export var g_territory = new Array(
/*-22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10, -9, -8, -7, -6, -5, -4, -3, -2, -1,  0,  1,  2,  3,  4,  5,  6  */
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4,  0,  4,  0,  0,  0,  0,  0,  0,  0,  8,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5, -1,  5,  4, 23,  4,  4,  4,  8,  0,  0,  0,  0,  0,  8,  0, -1,  0,
   12, 12,  0,  0,  0,  0,  0,  0,  0,  0,  5, -1,  5,  5,  4,  4,  4,  4,  4,  4, -1, -1,  0,  0,  8, -1,  8, -1, -1,
   12, 12, -1,  0,  0,  0,  0,  0,  0, -1,  0, -1,  5,  5,  5,  4,  4,  4,  4,  4, -1, -1, -1, -1, -1, -1, -1, -1,  8,
   12,  0,  0,  0,  0,  0,  0,  0,  5,  0, -1, -1, -1, -1, -1, -1,  4,  4,  4, -1, -1, -1, -1, -1, -1, -1,  8,  8,  8,
    0,  0,  0,  0,  0,  0,  0,  1,  0,  0, -1, -1, -1,  5, -1,  4,  4,  4, -1,  4, -1, -1, -1, -1, -1, -1,  8,  8,  8,
    0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  1, -1, -1, -1,  4,  4,  4, -1, 12, -1, -1, -1, -1, -1,  8,  8,  8,  8,
    0,  0,  0,  0,  0,  0,  0,  1,  0,  1,  0,  1, -1, -1, -1, -1,  4, -1, 12, 24, 12, -1, -1,  4, -1, -1,  8,  8,  8,
    0,  0,  0,  0,  0,  0,  1,  1,  1,  0,  1, 21, -1,  4, -1, -1,  4, -1, 12, 12, 12, -1,  5,  5,  5, -1, -1, -1, -1,
    0, -1, -1, -1,  0, -1,  0, 12, 12, 12,  1,  4,  4,  4,  4,  4,  4,  5, -1,  7,  7, -1,  5,  4,  5, -1, -1, -1, -1,
   -1, -1, -1, -1,  0,  0,  0, 12, 12, 12, -1,  2,  4,  4,  4,  5,  5,  5, -1, -1, -1, -1,  4, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1,  2,  2,  2, 12,  2,  2,  2,  2, -1, -1,  7,  5,  7, -1, -1, -1, -1, -1, 12, 12, -1, -1, -1, -1,
   -1, -1, -1, -1, -1,  2,  2,  2,  2,  2,  2,  2,  2, -1,  7,  7,  7,  7,  7, -1, -1, -1, 12, 12, 12, 12, 12, 12, 12,
   -1,  0, -1, -1,  2,  2,  2,  2,  2,  2,  2,  2, -1,  7,  7,  7,  7,  7,  7, -1,  7, 12, 12, 12, 12, 12, 12, 12, 12,
    0,  0, -1, -1,  2,  2,  2,  2,  2,  2,  2,  2, -1, -1,  7,  7,  7,  7,  7, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
   -1, -1, -1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  7, -1,  7, 12, 12, 12, 12, 12, 12, 11, 12, 12, 12, 12, 12,
   -1, -1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, -1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
   -1, -1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 12, 12, 12, 12, 12, 11, 11, -1, 11, 12, 12, 12,
   -1, -1, -1, -1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 17, 12, 12, 12, 18, 11, 11, 11, 11, 12, 12, 12,
   -1, -1, -1, -1, -1, -1,  2, -1, -1, -1,  2,  2,  2,  2,  2,  2,  2, 17, 12, 12, 12, 19, 11, 11, 11, 11, 11, 12, 12,
   -1, -1, -1, 15,  7, 15, -1, -1, -1, -1, -1,  2,  2,  2,  2,  2,  2, 12, 12, 12, 12,  9,  9,  9, -1, -1, -1, -1, 12,
   -1, -1, -1, 15, 15, 15, -1, -1, -1, -1, -1,  2,  2,  2,  2,  2,  2, 12, 12, 12, 12,  9,  9,  9, -1, -1, 11, 11, -1,
   -1, -1, -1, -1, 15, -1, -1, -1, -1, -1,  2,  2,  2,  2,  2,  2,  2, 12, 12, 12, 12,  9,  9, -1, -1, -1, -1, 11, 12,
   -1, -1, -1, -1, 15, -1, -1, -1, -1, -1, -1, -1,  2,  2,  2,  2,  2, 12, 12, 12,  9, -1,  9,  9,  9,  9,  9, 11, 11,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  2, -1,  2, -1, 12, -1, 12, -1, -1, -1,  9, -1, -1, -1, -1
);


class Border{
  name: string;
  color: any;
  
  constructor(a_name: string, a_color: any){
	  this.name = a_name;
	  this.color = a_color;
  }
}


export var g_borders = new Array();
/* 0*/ g_borders.push(new Border("Everbloom Alliance", vec4.fromValues(0,0,255,1)));
/* 1*/ g_borders.push(new Border("Emerald Lodge", vec4.fromValues(0,255,0,1)));
/* 2*/ g_borders.push(new Border("RiverBank", vec4.fromValues(191,191,191,1)));
/* 3*/ g_borders.push(new Border("Ozem's Vigil", vec4.fromValues(255,255,127,1)));

export var g_hexBorders = new Array(
   -1, -1, -1, -1, -1, -1, -1, -1, -1,  3,  3,  3,  3,  3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1,  3,  3,  3,  3,  3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1,  3,  3,  3,  3,  3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  3,  3,  3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  2, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  2,  2,  2,  2,  2, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  2,  2,  2,  2,  2, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  2,  2,  2,  2,  2, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  2, -1,  2, -1, -1, -1,  0, -1,  0, -1,  0, -1,  0, -1,  0, -1,  0
);



