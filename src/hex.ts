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

import { vec4 } from 'gl-matrix';

export default class HexInfo {
  hexTop = 1; //up 0 or down 1
  hexBottom = 0; //up 0 or down 1
  hexWidth = 76.8;
  /*todo
  mapSize = new Vec4(4096,4096,0,0);
  hexSize = new Vec4(this.hexWidth*2,this.hexWidth * Math.sqrt(3),0,0);
  hexOffset = new Vec4(295+115,98+67,0,1);
  hexTopLeftCoord = new Vec4(-22,-7,0,0);
  hexDim = new Vec4(29,28,0,0); //dimensions
  */
  mapSize = vec4.fromValues(4096,4096,0,0);
  hexSize = vec4.fromValues(this.hexWidth*2,this.hexWidth * Math.sqrt(3),0,0);
  hexOffset = vec4.fromValues(295+115,98+67,0,1);
  hexTopLeftCoord = vec4.fromValues(-22,-7,0,0);
  hexDim = vec4.fromValues(29,28,0,0); //dimensions
  
  
  /*todo
  hexOffsetFull = this.hexSize.Copy();
  hexOffsetFull = this.hexOffsetFull.Add(new Vec4(-this.hexSize.x,-this.hexSize.y,0,0));
  hexTopLeftCoordFull = this.hexTopLeftCoord.Copy();
  hexTopLeftCoordFull = this.hexTopLeftCoordFull.Add(new Vec4(-1,-1,0,0));
  hexDimFull = this.hexDim.Copy();
  hexDimFull = this.hexDimFull.Add(new Vec4(2,2,0,0));
  */
  hexOffsetFull = vec4.add(vec4.create(), this.hexSize, vec4.fromValues(-this.hexSize[0],-this.hexSize[1],0,0));
  hexTopLeftCoordFull = vec4.add(vec4.create(), this.hexTopLeftCoord, vec4.fromValues(-1,-1,0,0));
  hexDimFull = vec4.add(vec4.create(), this.hexDim, vec4.fromValues(2,2,0,0));



  pixelToHex = (a_pos: vec4) => {

    var pos = vec4.clone(a_pos);
    pos[0] = a_pos[0] + this.mapSize[0]/2 - this.hexOffset[0];
    pos[1] = a_pos[1] + this.mapSize[1]/2 - this.hexOffset[1];
    
    var x = Math.floor((pos[0] - this.hexWidth/2)/(this.hexSize[0]/4*3)) + this.hexTopLeftCoord[0];
    var y = Math.floor((pos[1] - (x&1) * this.hexSize[1]/2) / this.hexSize[1]) + this.hexTopLeftCoord[1];
    //
    //get distance squared to top right and bottom right hexes
    var pos1 = this.hexToPixel(vec4.fromValues(x,y,0,1));
    pos1[0] += this.hexWidth;
    pos1[1] += this.hexSize[1]/2;
    var pos2 = this.hexToPixel(vec4.fromValues(x+1,y,0,1));
    pos2[0] += this.hexWidth;
    pos2[1] += this.hexSize[1]/2;
    var pos3 = this.hexToPixel(vec4.fromValues(x+1,y-1+(x&1)*2,0,1));
    pos3[0] += this.hexWidth;
    pos3[1] += this.hexSize[1]/2;
    
    var d1 = (a_pos[0] - pos1[0]) * (a_pos[0] - pos1[0]) + (a_pos[1] - pos1[1]) * (a_pos[1] - pos1[1]);
    var d2 = (a_pos[0] - pos2[0]) * (a_pos[0] - pos2[0]) + (a_pos[1] - pos2[1]) * (a_pos[1] - pos2[1]);
    var d3 = (a_pos[0] - pos3[0]) * (a_pos[0] - pos3[0]) + (a_pos[1] - pos3[1]) * (a_pos[1] - pos3[1]);
    
    //take the distance of the shortest hex distance to be in that hex
    if(d3 < d2 && d3 < d1)
    {
      var hex = vec4.fromValues(x+1,y-1+(x&1)*2,0,1);
      return hex;
    }
    else if(d2 < d1)
    {
      var hex = vec4.fromValues(x+1,y,0,1);
      return hex;
    }
    else
    {
      var hex = vec4.fromValues(x,y,0,1);
      return hex;
    }

  }


  hexToPixel = (a_pos: vec4) => {
    
    var size = this.hexWidth;
    var pos = vec4.clone(a_pos);
    
    pos[0] -= this.hexTopLeftCoord[0];
    pos[1] -= this.hexTopLeftCoord[1];
    
    var p = vec4.fromValues(size * 3/2 * pos[0], size * Math.sqrt(3) * (pos[1] + 0.5 *(pos[0]&1)), 0,1);
    
    //adjust for size
    p[0] += -this.mapSize[0]/2 + this.hexOffset[0];
    p[1] += -this.mapSize[1]/2 + this.hexOffset[1];

    return p;
  }


  validHex = (a_hex: vec4) => {
    if(a_hex[0] >= this.hexTopLeftCoord[0] && a_hex[0] < this.hexTopLeftCoord[0] + this.hexDim[0] &&
      a_hex[1] >= this.hexTopLeftCoord[1] && a_hex[1] < this.hexTopLeftCoord[1] + this.hexDim[1])
    {
      if(a_hex[1] == this.hexTopLeftCoord[1] + this.hexDim[1]-1 && a_hex[0]&1)
      {
        return false;
      }
      return true;
    }
    
    return false;
  }

  validHexFull = (a_hex: any) => {
    if(a_hex[0] >= this.hexTopLeftCoordFull[0] && a_hex[0] < this.hexTopLeftCoordFull[0] + this.hexDimFull[0] &&
      a_hex[1] >= this.hexTopLeftCoordFull[1] && a_hex[1] < this.hexTopLeftCoordFull[1] + this.hexDimFull[1])
    {
      if(a_hex[1] == this.hexTopLeftCoordFull[1] + this.hexDimFull[1]-1 && a_hex[0]&1)
      {
        return false;
      }
      return true;
    }
    
    return false;
  }

  //a_next current hex
  //a_neighbour, 0 - 5 clockwie from top
  //returns hex
  getNextHex =  (a_hex: any, a_neighbour: number)=> {
    var hex = vec4.clone(a_hex);
    switch(a_neighbour)
    {
      case 0:
        hex[1] -= 1;
        break;
      case 1:
      	hex[0] += 1;
        hex[1] -= hex[0]&1;
        break;
      case 2:
        hex[1] += hex[0]&1;
        hex[0] += 1;
        break;
      case 3:
        hex[1] += 1;
        break;
      case 4:
        hex[1] += hex[0]&1;
        hex[0] -= 1;
        break;
      case 5:
      	hex[0] -= 1;
        hex[1] -= hex[0]&1;
        break;
      default:

    }
    
    return hex;
  }

}

