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

import * as hexTypes from './data/hex-types.json';
import * as hexTypesFull from './data/hex-types-full.json';
import * as hexFeatures from './data/hex-features.json';
import * as hexRegions from './data/hex-regions.json';

//features
//1 = fane divine point
//2 = other landmark
class Landmark {
  name: string;
  hex: vec4;
  type: any;
  pos: any;
  text: string;
  
  constructor(a_name: string, a_hex: vec4, a_type: any) {
    this.name = a_name;
    this.hex = vec4.clone(a_hex);
    this.type = a_type;
    this.pos;
    this.text = "";
  }
}

class Hex {
  hex: vec4 = vec4.fromValues(0,0,0,1);
  landmarks: Array<any> = [];
}

//0 = water
//1 = crop
//2 = forest
//3 = hills
//4 = mountain
//5 = swamp
//6 = meteror

export var g_hexTypes = hexTypes.data;

export var g_hexTypesFull = hexTypesFull.data;

//  0 = none
//  1 = monster
//  2 = monster home
//  4 = badlands
//  8 = NPC settlement
// 16 = NPC town
// 32 = empty settlement
// 64 = PC settlement
//128 = ramp
//256 = tower
//512 = patrolled

export var g_hexFeatures = hexFeatures.data;
/*-22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10, -9, -8, -7, -6, -5, -4, -3, -2, -1,  0,  1,  2,  3,  4,  5,  6  */



class Region{
  name: string;
  constructor(a_name: string){
    this.name = a_name;
  }
}

export var g_regions = new Array();

/* 0*/ g_regions.push(new Region("UNKNOWN"));
/* 1*/ g_regions.push(new Region("Uncar's Reach"));
/* 2*/ g_regions.push(new Region("Bulwark Hills"));
/* 3*/ g_regions.push(new Region("Riverfields"));
/* 4*/ g_regions.push(new Region("Highwater"));
/* 5*/ g_regions.push(new Region("Crusader Lowlands"));
/* 6*/ g_regions.push(new Region("Western Echo Woods"));
/* 7*/ g_regions.push(new Region("Traveler's Wood"));
/* 8*/ g_regions.push(new Region("Southern Echowood"));
/* 9*/ g_regions.push(new Region("Thornwood"));
/*10*/ g_regions.push(new Region("Central Echo Wood"));
/*11*/ g_regions.push(new Region("The Breaklands"));
/*12*/ g_regions.push(new Region("Southern Echo Peaks"));
/*13*/ g_regions.push(new Region("Splinter Peaks"));
/*14*/ g_regions.push(new Region("Northern Cragthorns"));
/*15*/ g_regions.push(new Region("Emerald Spire"));
/*16*/ g_regions.push(new Region("Toad Hollow"));
/*17*/ g_regions.push(new Region("Southern Cragthorns"));
/*18*/ g_regions.push(new Region("Western Echo Plains"));
/*19*/ g_regions.push(new Region("Southern Echo Plains"));


export var g_hexRegions = hexRegions.data;

//landmarks in the same hex need to be listed together
export var g_landmarks = new Array();

g_landmarks.push(new Landmark("Fane of Sarenrea", vec4.fromValues(0,19,0,1), 1));
//g_landmarks.push(new Landmark("Warden's Hearth", vec4.fromValues(0,19,0,1), 4)); 
//g_landmarks[g_landmarks.length-1].text="Home of the Echo Woodsmen company.";
g_landmarks.push(new Landmark("Fane of Desna", vec4.fromValues(5,13,0,1), 1));
//g_landmarks.push(new Landmark("Swallow's Release", vec4.fromValues(5,13,0,1), 4));
g_landmarks.push(new Landmark("Fane of Gorum", vec4.fromValues(-7,-6,0,1), 1));
g_landmarks.push(new Landmark("Fane of Lamashtu", vec4.fromValues(4,-2,0,1), 1));
g_landmarks.push(new Landmark("Fane of Norgorber", vec4.fromValues(-7,18,0,1), 1));
g_landmarks.push(new Landmark("Fane of Asmodeus", vec4.fromValues(-10,-3,0,1), 1));
g_landmarks.push(new Landmark("Fane of Abadar", vec4.fromValues(-6,5,0,1), 1));
g_landmarks.push(new Landmark("Fane of Iomedae", vec4.fromValues(-17,4,0,1), 1));
g_landmarks.push(new Landmark("Fane of Gozreh", vec4.fromValues(-14,12,0,1), 1));

g_landmarks.push(new Landmark("Hollow of Erastil", vec4.fromValues(-6,-6,0,1), 2));
g_landmarks.push(new Landmark("Empty fishing outpost", vec4.fromValues(-21,-6,0,1), 2));
g_landmarks.push(new Landmark("Abandoned Quarry", vec4.fromValues(-15,-2,0,1), 2));
g_landmarks.push(new Landmark("Ransacked village", vec4.fromValues(-11,-0,0,1), 2));
g_landmarks.push(new Landmark("Bridge of ill accord", vec4.fromValues(-12,1,0,1), 2));
g_landmarks.push(new Landmark("Abraxus altar", vec4.fromValues(-10,5,0,1), 2));
g_landmarks.push(new Landmark("Emerald Spire", vec4.fromValues(-5,7,0,1), 2));
g_landmarks.push(new Landmark("Emerald Shard", vec4.fromValues(3,5,0,1), 2));
g_landmarks.push(new Landmark("Bloodrock Hill", vec4.fromValues(4,-7,0,1), 2));
g_landmarks.push(new Landmark("Destroyed Siege Camp", vec4.fromValues(3,19,0,1), 2));
g_landmarks.push(new Landmark("Desecrated Graveyard", vec4.fromValues(-21,19,0,1), 2));
g_landmarks.push(new Landmark("Drunken Mermaid Inn Crossroads", vec4.fromValues(-19,10,0,1), 2));
g_landmarks.push(new Landmark("Training Field", vec4.fromValues(-13,10,0,1), 2));
g_landmarks.push(new Landmark("Broken Earth", vec4.fromValues(-10,19,0,1), 2));
g_landmarks.push(new Landmark("Forgotten Alter", vec4.fromValues(6,3,0,1), 2));
g_landmarks.push(new Landmark("Pedlars Crossing", vec4.fromValues(-5,16,0,1), 2));
g_landmarks.push(new Landmark("Old Farm", vec4.fromValues(-21,6,0,1), 2));

g_landmarks.push(new Landmark("Eagle's Roost", vec4.fromValues(3,12,0,1), 3));
g_landmarks.push(new Landmark("Mountain Goat", vec4.fromValues(-7,-3,0,1), 3));

g_landmarks.push(new Landmark("Woodsmen's Fall", vec4.fromValues(1,18,0,1), 4));
g_landmarks.push(new Landmark("Rook's Labyrinth", vec4.fromValues(-1,19,0,1), 4));
g_landmarks.push(new Landmark("Southfarthing", vec4.fromValues(4,19,0,1), 4));
g_landmarks.push(new Landmark("Toad Hollow", vec4.fromValues(-2,14,0,1), 4));
g_landmarks.push(new Landmark("Lostfields", vec4.fromValues(-17,16,0,1), 4));
g_landmarks.push(new Landmark("Grey Watch", vec4.fromValues(-3,19,0,1), 4));
g_landmarks.push(new Landmark("Greyskull Keep", vec4.fromValues(-3,18,0,1), 4));
g_landmarks.push(new Landmark("Guard's Mill", vec4.fromValues(-2,19,0,1), 4));
g_landmarks.push(new Landmark("Fort Grey River", vec4.fromValues(-1,17,0,1), 4));
g_landmarks.push(new Landmark("Grey River Mill", vec4.fromValues(0,18,0,1), 4));
g_landmarks.push(new Landmark("Thimblewood", vec4.fromValues(1,17,0,1), 4));
g_landmarks.push(new Landmark("The Haven", vec4.fromValues(-22,-1,0,1), 4));
g_landmarks.push(new Landmark("Ogre Canyon", vec4.fromValues(2,13,0,1), 4));

g_landmarks.push(new Landmark("Skull-basher Ogres", vec4.fromValues(-17,-7,0,1), 5));
g_landmarks.push(new Landmark("Bonedancers", vec4.fromValues(1,-6,0,1), 5));
g_landmarks.push(new Landmark("Moloch Cultists", vec4.fromValues(-15,-3,0,1), 5));
g_landmarks.push(new Landmark("Ustalav Invaders", vec4.fromValues(-20,-3,0,1), 5));
g_landmarks.push(new Landmark("Nature's Wrath", vec4.fromValues(-3,-1,0,1), 5));
g_landmarks.push(new Landmark("Ogg the Undying", vec4.fromValues(5,16,0,1), 5));
g_landmarks.push(new Landmark("Razmiran Cultists", vec4.fromValues(-19,7,0,1), 5));
g_landmarks.push(new Landmark("Broken Men", vec4.fromValues(-7,4,0,1), 5));
g_landmarks.push(new Landmark("Skeletal Uprising", vec4.fromValues(-10,17,0,1), 5));
