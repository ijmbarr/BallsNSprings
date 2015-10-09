var BallsNSprings = function(svgElement, initialParameters){
	//All units are in pixels and seconds
	
	//SVG elements and dimensions
	this.svgElement = svgElement;
	this.width = parseInt(svgElement.getAttribute("width"));
	this.height = parseInt(svgElement.getAttribute("height"));
	this.Vscale = 50;
	
	//Keep track of the ball and springs
	this.Balls = [];
	this.Springs = [];
	
	//Default Parameteres
	this.parameters = {
		integrator : BallsNSprings.Integrators.Euler,
		steptime : 0.05
	}
	
	MergeIntoFirst(this.parameters, initialParameters || {});
	
	//Running
	this.Running = false;
	this.Time = 0;
	this.PreviousTime = 0;
	this.dt = 0;
}

//Create Ball
BallsNSprings.prototype.AddBall = function(ballParameters){
	this.Balls.append(new BallsNSprings.Ball(this, ballParameters));
}

//Create Spring
BallsNSprings.prototype.AddSpring = function(ball1, ball2, springParameters){
	this.Springs.append(new BallsNSprings.Spring(ball1, ball2, springParameters));
}

//Draw
BallsNSprings.prototype.Draw = function(){
	for(var j = 0; j < this.Balls.length; j++){
		this.Balls[j].draw();
	}
	
	for(var j = 0; j < this.Springs.length; j++){
		this.Springs[j].draw();
	}
}

//Controlling the animations
BallsNSprings.prototype.Run = function(){
	this.Running = true;
	this.Step(this)();
}

BallsNSprings.prototype.Pause = function(){
	this.Running = false;
}

BallsNSprings.prototype.Remove = function(){
	this.Running = false;
	for(var i = 0; i < this.Balls.length; i++){
		var ball = this.Balls[i];
		
		ball.remove();
	}
}
