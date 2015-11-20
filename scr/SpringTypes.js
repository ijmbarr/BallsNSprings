//Spring types need to provide an object with
// force(ball1, ball2) and energy(ball1, ball2)
// force returns a vector force on ball1
// by ball2. energy returns the energy of the system
// 


BallsNSprings.SpringTypes = {
	Harmonic : function(k, d0){
		// Energy = 1/2 * k * (|d| - d0)**2
		// Force = - k * (d0 - |d|) * d/|d|
		// Where d is the vector difference in position
		// between the two balls
		
		this.force = function(ball1, ball2){
			var delta = ball1.State.pos.add(ball2.State.pos.multiply(-1));
			var distance = delta.length();
			
			return delta.multiply(- k * (1 - d0/distance));
		}
		
		this.energy = function(ball1, ball2){
			var delta = ball1.State.pos.add(ball2.State.pos.multiply(-1));
			var distance = delta.length();
			
			return 0.5 * k * Math.pow((distance - d0),2);
		}
		
		return this;
	}
}