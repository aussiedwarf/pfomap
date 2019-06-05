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

/*
import { vec4 } from 'gl-matrix';

App.prototype.Random3 = function(out, c)
{
	var j = 4096.0*Math.sin(c[0]*17.0 + c[1]*59.4 + c[2]*15.0);

  out[0] = Math.abs((64.0*j)%1) - 0.5;
  out[1] = Math.abs((8.0*j)%1) - 0.5;
  out[2] = Math.abs((512.0*j)%1) - 0.5;
  


	return out;
}




App.prototype.Step = function(a,b)
{
	return b<a ? 0.0 : 1.0;
}



App.prototype.FractalInner = function(p, s, x, e, i1, i2, x1, x2, x3, t1, w, d)
{
	var F3 =  0.3333333;
	var G3 =  0.1666667;
	
	//vec3 s = floor(p + dot(p, vec3(F3)));
	var t = (p[0]+p[1]+p[2])*F3;
	s[0] = Math.floor(p[0] + t);
	s[1] = Math.floor(p[1] + t);
	s[2] = Math.floor(p[2] + t);
	
	//vec3 x = p - s + dot(s, vec3(G3));
	t = (s[0] + s[1] + s[2]) * G3;
	x[0] = p[0] - s[0] + t;
	x[1] = p[1] - s[1] + t;
	x[2] = p[2] - s[2] + t;

	//vec3 e = Step(vec3(0.0), x - x.yzx);
	e[0] = this.Step(0.0, x[0] - x[1]);
	e[1] = this.Step(0.0, x[1] - x[2]);
	e[2] = this.Step(0.0, x[2] - x[0]);
	
	//vec3 i1 = e*(1.0 - e.zxy);
	i1[0] = e[0] * (1.0-e[2]);
	i1[1] = e[1] * (1.0-e[0]);
	i1[2] = e[2] * (1.0-e[1]);
	
	//vec3 i2 = 1.0 - e.zxy*(1.0 - e);
	i2[0] = 1.0 - e[2] * (1.0 - e[0]);
	i2[1] = 1.0 - e[0] * (1.0 - e[1]);
	i2[2] = 1.0 - e[1] * (1.0 - e[2]);

	//vec3 x1 = x - i1 + G3;
	x1[0] = x[0] - i1[0] + G3;
	x1[1] = x[1] - i1[1] + G3;
	x1[2] = x[2] - i1[2] + G3;
	
	//vec3 x2 = x - i2 + 2.0*G3;
	x2[0] = x[0] - i2[0] + 2.0 * G3;
	x2[1] = x[1] - i2[1] + 2.0 * G3;
	x2[2] = x[2] - i2[2] + 2.0 * G3;
	
	//vec3 x3 = x - 1.0 + 3.0*G3;
	x3[0] = x[0] - 1.0 + 3.0 * G3;
	x3[1] = x[1] - 1.0 + 3.0 * G3;
	x3[2] = x[2] - 1.0 + 3.0 * G3;

	w[0] = vec3.dot(x, x);
	w[1] = vec3.dot(x1, x1);
	w[2] = vec3.dot(x2, x2);
	w[3] = vec3.dot(x3, x3);

	w[0] = Math.max(0.6 - w[0], 0.0);
	w[1] = Math.max(0.6 - w[1], 0.0);
	w[2] = Math.max(0.6 - w[2], 0.0);
	w[3] = Math.max(0.6 - w[3], 0.0);
	
	// calculate surflet components 
	d[0] = vec3.dot(this.Random3(t1, s), x);
	//d[0] = vec3.dot(Random3(t1, s), Random3(vec3.create(), s));
	d[1] = vec3.dot(this.Random3(t1, vec3.add(e, s, i1)), x1);
	d[2] = vec3.dot(this.Random3(t1, vec3.add(e, s, i2)), x2);
	t1[0] = 1.0;
	t1[1] = 1.0;
	t1[2] = 1.0;
	d[3] = vec3.dot(this.Random3(t1, vec3.add(e, s, t1)), x3);

	// multiply d by w^4 
	
	w[0] *= w[0];
	w[1] *= w[1];
	w[2] *= w[2];
	w[3] *= w[3];
	
	w[0] *= w[0];
	w[1] *= w[1];
	w[2] *= w[2];
	w[3] *= w[3];
	
	d[0] *= w[0];
	d[1] *= w[1];
	d[2] *= w[2];
	d[3] *= w[3];
	

	return (d[0] + d[1] + d[2] + d[3])*52.0;
}

App.prototype.Fractal = function(a_p, t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,u1,u2)
{
	var c = 0.0;
  var x = 1.0;
  for(var i = 0; i < 6; i++)
  {
  	//c += 1.0 / x * 0.5 * simplex3d(vec3(x) * a_p);
    t1[0] = x * a_p[0];
    t1[1] = x * a_p[1];
    t1[2] = x * a_p[2];
    c += 1.0 / x * 0.5 * noise.simplex3(t1[0], t1[1], t1[2]);
    //c += 1.0 / x * 0.5 * this.simplex.noise3D(t1[0], t1[1], t1[2]);
    //c += 1.0 / x * 0.5 * this.simplexf.raw3D(t1[0], t1[1], t1[2]);
    //c += 1.0 / x * 0.5 * this.FractalInner(t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,u1,u2);
    x *= 2.0;
  }
    
  return c;
}


//x - y * floor(x/y).
App.prototype.Modulus = function(out, x, y)
{
	out[0] = x[0] - y[0] * Math.floor(x[0]/y[0]);
	out[1] = x[1] - y[1] * Math.floor(x[1]/y[1]);
	out[2] = x[2] - y[2] * Math.floor(x[2]/y[2]);
	
	return out;
}

//x×(1−a)+y×ax×(1−a)+y×a. xya
App.prototype.Mix = function(out, x, y, a)
{
	out[0] = x[0] * (1-a) + y[0] * a * (1-a) + y[0] * a;
	out[1] = x[1] * (1-a) + y[1] * a * (1-a) + y[1] * a;
	out[2] = x[2] * (1-a) + y[2] * a * (1-a) + y[2] * a;
}



App.prototype.Hsv2rgb = function( out, c, a_temp1, a_temp2, a_temp3 )
{
    //vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
	
	//c.x*6.0
	vec3.set(a_temp3,6,6,6);
	vec3.scale(a_temp1, a_temp3, c[0]);
	
	//c.x*6.0+vec3(0.0,4.0,2.0)
	vec3.set(out,0,4,2);
	vec3.add(a_temp2, a_temp1, out);
	
	//mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)
	
	this.Modulus(a_temp1, a_temp2, a_temp3);
	
	//mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0
	vec3.set(out, 3,3,3);
	vec3.sub(a_temp2, a_temp1, out);
	
	//abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)
	a_temp2[0] = Math.abs(a_temp2[0]);
	a_temp2[1] = Math.abs(a_temp2[1]);
	a_temp2[2] = Math.abs(a_temp2[2]);
	
	//abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0
	vec3.set(out,1,1,1);
	vec3.sub(a_temp1, a_temp2, out);
	
	//clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
	vec3.set(out, 0,0,0);
	vec3.max(a_temp2, out, a_temp1);
	vec3.set(out, 1,1,1);
	vec3.min(a_temp1, out, a_temp2);
	
	//rgb = rgb*rgb*(3.0-2.0*rgb); // cubic smoothing	
	vec3.set(a_temp3, 2,2,2);
	vec3.mul(a_temp2, a_temp3, a_temp1);//2.0*rgb
	vec3.set(out, 3,3,3);
	vec3.sub(a_temp3, out, a_temp2);//3.0-2.0*rgb	
	vec3.mul(a_temp2, a_temp1, a_temp3); //rgb*(3.0-2.0*rgb)
	vec3.mul(a_temp3, a_temp1, a_temp2); //rgb * rgb*(3.0-2.0*rgb)

	//return c.z * mix( vec3(1.0), rgb, c.y);
	vec3.set(a_temp2,1,1,1);
	this.Mix(a_temp1, a_temp2, a_temp3, c[1]);
	
	vec3.scale(out, a_temp1, c[2]);

	return out;
}

*/
/****************************************
hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
    
    
    
    int i = int(h * 6);
    double f = h * 6 - i;
    double p = v * (1 - s);
    double q = v * (1 - f * s);
    double t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    *******************/
    
/*
App.prototype.Hsv2rgb = function(out, color)
{
	var i = Math.floor(color[0]*6),
        f = color[0]*6 - i,
        p = color[2] * (1 - color[1]),
        q = color[2] * (1 - f * color[1]),
        t = color[2] * (1 - (1 - f) * color[1]),
        mod = i % 6;
        
        out[0] = [color[2], q, p, p, t, color[2]][mod];
        out[1] = [t, color[2], color[2], q, p, p][mod];
        out[2] = [p, p, t, color[2], color[2], q][mod];
        
	return out;
}



App.prototype.HslToRgb = function(out, color) {

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(color[1] === 0) {
        out[0] = out[1] = out[2] = color[2]; // achromatic
    }
    else {
        var q = color[2] < 0.5 ? color[2] * (1 + color[1]) : color[2] + color[1] - color[2] * color[1];
        var p = 2 * color[2] - q;
        out[0] = hue2rgb(p, q, color[0] + 1/3);
        out[1] = hue2rgb(p, q, color[0]);
        out[2] = hue2rgb(p, q, color[0] - 1/3);
    }

    return out;
}


App.prototype.CreatePaper = function(a_canvas)
{
	context = a_canvas.getContext("2d");
	var w = a_canvas.width;
	var h = a_canvas.height;
	
	var image = context.getImageData(0,0,w, h)
	var data = image.data;
	
	var imageData = new Float32Array(w*h);
	
	//context.fillStyle  = "rgba(255,0,0,1.0)";
	//context.fillRect(0,0,a_canvas.width,a_canvas.height);
	var p = vec3.create();
	var t1 = vec3.create();
	var t2 = vec3.create();
	var t3 = vec3.create();
	var t4 = vec3.create();
	var t5 = vec3.create();
	var t6 = vec3.create();
	var t7 = vec3.create();
	var t8 = vec3.create();
	var t9 = vec3.create();
	var t10 = vec3.create();
	var u1 = vec4.create();
	var u2 = vec4.create();
	var c = 0.0;
	var color = vec3.create();
	var color1 = vec3.create();
	
	var startx;
	var stopx;
	var starty;
	var stopy;
	
	var s = 2;
	
	var startTime = (new Date).getTime();
	
	for(var y = 0; y < h; y+=s)
	{
		for(var x = 0; x < w; x+=s)
		{
			p[0] = x/w*8;
			p[1] = y/w*8;
			p[2] = 0;
			
			
			var c = this.Fractal(p, t1,t2,t3,t4,t5,t6,t7,t8,t9,t10, u1,u2);
			c = 0.5 + 0.5*c;
			//c = Math.floor(c);
			//c = Math.max(c,0.0);
			//c = Math.min(c,1.0);
			
			imageData[x+y*w] = c;
			//data[(x+y*w)*4+0] = c;
			//data[(x+y*w)*4+1] = c;
			//data[(x+y*w)*4+2] = c;
			//data[(x+y*w)*4+3] = 255;
		}
	}
	
	
	for(var y = 0; y < h; y++)
	{
		for(var x = 0; x < w; x++)
		{
			
			//var c = (data[(Math.floor(x/s)*s + Math.floor(y/s)*s*w)*4+0] * (s - x%s)/s*2 * (s - y%s)/s*2 + 
			//	data[(Math.floor((x+s)/s)*s + Math.floor(y/s)*s*w)*4+0] * (x%s)/s*2 * (s - y%s)/s*2 + 
			//	data[(Math.floor((x+s)/s)*s + Math.floor((y+s)/s)*s*w)*4+0] * (x%s)/s*2 * (y%s)/s*2 + 
			//	data[(Math.floor(x/s)*s + Math.floor((y+s)/s)*s*w)*4+0] * (s - x%s)/s*2 * (y%s)/s*2
			//	)/4;
			
			var c = 0;
			
			if(s > 1)
				c = (imageData[(Math.floor(x/s)*s + Math.floor(y/s)*s*w)+0] * (s - x%s)/s*2 * (s - y%s)/s*2 + 
					imageData[(Math.floor((x+s)/s)*s + Math.floor(y/s)*s*w)+0] * (x%s)/s*2 * (s - y%s)/s*2 + 
					imageData[(Math.floor((x+s)/s)*s + Math.floor((y+s)/s)*s*w)+0] * (x%s)/s*2 * (y%s)/s*2 + 
					imageData[(Math.floor(x/s)*s + Math.floor((y+s)/s)*s*w)+0] * (s - x%s)/s*2 * (y%s)/s*2
					)/4;
			else
				c = imageData[(Math.floor(x/s)*s + Math.floor(y/s)*s*w)+0];
			
			//var c = (data[(Math.floor(x/s)*s + Math.floor(y/s)*y*w)*4+0]
			
			color[0] = 39.0/360.0;
			color[1] = 0.5;//c*0.25+0.5;
			color[2] = (1.0-c)*0.5+0.5;
			//this.Hsv2rgb(color1, color,t1,t2,t3);
			this.HslToRgb(color1, color);
			vec3.scale(color,color1,255);

			
			data[(x+y*w)*4+0] = color[0];
			data[(x+y*w)*4+1] = color[1];
			data[(x+y*w)*4+2] = color[2];
			data[(x+y*w)*4+3] = 255;
		}
	}
	var endTime = (new Date).getTime();
	
	context.putImageData(image,0,0);
	
	
	
	this.paperTime = endTime-startTime;
}    







drawPaper = (a_context) => {
	var a = vec4.transformMat4(vec4.create(), vec4.fromValues(this.paperTopLeft[0],this.paperTopLeft[1],0,1), this.mvp);
  var b = vec4.transformMat4(vec4.create(), vec4.fromValues(this.paperBottomRight[0],this.paperBottomRight[1],0,1), this.mvp);
  
  //if(this.imagePaperLoaded)
  	a_context.drawImage(this.paperCanvas, a[0], a[1], b[0] - a[0], b[1] - a[1]);
}

*/
