BallsNSprings.Spring = function(bNs, ball1, ball2, initialParameters){
	this.bNs = bNs;
	this.ball1 = ball1;
	this.ball2 = ball2;
	
	//Attach a reference to ball of this spring
	this.ball1.attachedSprings.push(this);
	this.ball2.attachedSprings.push(this);
		
	//Default Parameteres
	this.parameters = {
		spring_colour : "black",
		spring_width : 2,
		spring_visible : true,
		spring_type : BallsNSprings.SpringTypes.Harmonic(1, 100)
	}
	
	MergeIntoFirst(this.parameters, initialParameters);
	
	//Create svg Element
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    bNs.svgElement.appendChild(line);
    this.svgElement = line;
}

BallsNSprings.Spring.prototype.draw = function(){
	this.svgElement.setAttribute("x1", this.ball1.State.pos.x);
	this.svgElement.setAttribute("y1", this.ball1.State.pos.y);
	this.svgElement.setAttribute("x2", this.ball2.State.pos.x);
	this.svgElement.setAttribute("y2", this.ball2.State.pos.y);
	this.svgElement.setAttribute("stroke", this.parameters.spring_colour);
	this.svgElement.setAttribute("stroke-width", this.parameters.spring_width);
	this.svgElement.setAttribute("display", (this.parameters.spring_visible) ? "true" : "none");
}

BallsNSprings.Spring.prototype.remove = function(){
	this.svgElement.remove();
}

BallsNSprings.Spring.prototype.force = function(ball){
	// Return the force on ball1 due to the spring
	if (ball === this.ball1){
		return this.parameters.spring_type.force(this.ball1, this.ball2);
	}
	
	return this.parameters.spring_type.force(this.ball2, this.ball1);	
}