BallsNSprings.Ball = function(bNs, initialState, initialParameters){
	this.bNs = bNs;
	this.State = initialState;
	this.attachedSprings = [];
	
	//Default Parameteres
	this.parameters = {
		ball_colour : "red",
		ball_inversemass : 1,
		ball_damping : 0.3,
		ball_radius : 5,
		ball_visible : true,
		ball_static : false,
	}
	
	MergeIntoFirst(this.parameters, initialParameters);
	
	//Create svg Element
	var ball = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bNs.svgElement.appendChild(ball);
    this.svgElement = ball;
	
}

BallsNSprings.Ball.defaultParameters =

BallsNSprings.Ball.prototype.remove = function(){
	for(var i = 0; i < this.attachedSprings.length; i++){
		this.attachedSprings[i].remove();
	}
	
	this.svgElement.remove();
}

BallsNSprings.Ball.prototype.draw = function(){
	this.svgElement.setAttribute("cx", this.State.pos.x);
	this.svgElement.setAttribute("cy", this.State.pos.y);
	this.svgElement.setAttribute("r", this.parameters.ball_radius);
	this.svgElement.setAttribute("fill", this.parameters.ball_colour);
	this.svgElement.setAttribute("display", (this.parameters.ball_visible) ? "true" : "none");
}

BallsNSprings.Ball.prototype.energy = function(){
	if(this.parameters.ball_inversemass <= 0){
		return 0;
	}
	
	return 0.5 * Math.pow(this.State.vel.length(),2) / this.parameters.ball_inversemass;
}

BallsNSprings.Ball.prototype.acceleration = function(){
	//Get the current acceleration on this ball, based on the current State
	// of this ball, and every other ball.
	
	//Add Damping
	var acceleration = this.State.vel.multiply(-1 * this.parameters.ball_damping);
	
	//Add Springs
	for (var i = 0; i < this.attachedSprings.length; i++){
		var spring = this.attachedSprings[i];
		
		acceleration = acceleration
			.add(spring.force(this))
			.multiply(this.parameters.ball_inversemass);
	}
	
	//Return
	return acceleration;
}

BallsNSprings.Ball.prototype.CorrectForBoundary = function(){
	//When there is a collision with a boundary, assume a reflection.
	//Correct the current state to the new position.
	
	var boundary = {
		xmin : 0,
		ymin : 0,
		xmax : this.bNs.width,
		ymax : this.bNs.height
		};
	
	if (this.State.pos.x <= boundary.xmin){
		this.State.pos.x = 2 * boundary.xmin - this.State.pos.x;
		this.State.vel.x = -this.State.vel.x;	
	}
	
	if (this.State.pos.x >= boundary.xmax){
		this.State.pos.x = 2 * boundary.xmax - this.State.pos.x;
		this.State.vel.x = -this.State.vel.x;		
	}
	
	if (this.State.pos.y <= boundary.ymin){
		this.State.pos.y = 2 * boundary.ymin - this.State.pos.y;
		this.State.vel.y = -this.State.vel.y;		
	}
	
	if (this.State.pos.y >= boundary.ymax){
		this.State.pos.y = 2 * boundary.ymax - this.State.pos.y;
		this.State.vel.y = -this.State.vel.y;		
	}
}