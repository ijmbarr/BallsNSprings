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
	return 0;
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
	
	//Collsions with boundaries
	acceleration = acceleration.add(this.boundary());
	
	//Return
	return acceleration;
}

BallsNSprings.Ball.prototype.boundary = function(){
	//Returns an acceleration based on collisions with the 
	//boundaries. 
	
	var boundary = {
		xmin : 0,
		ymin : 0,
		xmax : this.bNs.width,
		ymax : this.bNs.height
		},
		acceleration = new Vector(0,0);
	
	if (this.State.pos.x <= boundary.xmin){
		//Check that the ball isn't already moving away from the wall
		if(this.State.vel.x <= 0){ 
			acceleration = acceleration.addX(- 2.0 * this.State.vel.x / bNs.parameters.steptime);
		}		
	}
	
	if (this.State.pos.x >= boundary.xmax){
		//Check that the ball isn't already moving away from the wall
		if(this.State.vel.x >= 0){ 
			acceleration = acceleration.addX(- 2.0 * this.State.vel.x / bNs.parameters.steptime);
		}		
	}
	
	if (this.State.pos.y <= boundary.ymin){
		//Check that the ball isn't already moving away from the wall
		if(this.State.vel.y <= 0){ 
			acceleration = acceleration.addY(- 2.0 * this.State.vel.y / bNs.parameters.steptime);
		}		
	}
	
	if (this.State.pos.y >= boundary.ymax){
		//Check that the ball isn't already moving away from the wall
		if(this.State.vel.y >= 0){ 
			acceleration = acceleration.addY(- 2.0 * this.State.vel.y / bNs.parameters.steptime);
		}		
	}
	
	return acceleration;
}