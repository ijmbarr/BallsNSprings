//2D Vectors
// Note operations do not mutate the state
// Instead they return new Vector Objects
//
var Vector = function(x,y){
	this.x = x;
	this.y = y;
}

Vector.prototype.length = function(){
	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); 
}

Vector.prototype.copy = function(){
	return new Vector(this.x, this.y);
}

Vector.prototype.multiply = function(a){
	return new Vector(
		this.x * a,
		this.y * a
	);
}

Vector.prototype.add = function(vec){
	return new Vector(
		this.x + vec.x,
		this.y + vec.y
	);
}

Vector.prototype.addX = function(x){
	return new Vector(
		this.x + x,
		this.y
	);
}

Vector.prototype.addY = function(y){
	return new Vector(
		this.x,
		this.y + y
	);
}