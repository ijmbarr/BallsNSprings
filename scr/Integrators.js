//Integrators are rules to update physics of the system

BallsNSprings.Integrators = {
	Euler : function(bNs, dt){
		//For each ball, update as:
		// x = x + dt * v
		// v = v + dt * a
		// a = 0
		// the left hand side refers to the nw state,
		// the right hand side refers to the old state.
		//
		
		for(var i = 0; i < bNs.Balls.length; i++){
			var ball = bNs.Balls[i];
			
			//Copy current state to old		
			ball.OldState = ball.State;
			
			//Create current state
			ball.State = new BallsNSprings.State(
				ball.OldState.pos.add( ball.OldState.vel.multiply(dt) ),
				ball.OldState.vel.add( ball.OldState.acc.multiply(dt) ),
				ball.OldState.acc
			);	
		}
		
		for(var i = 0; i < bNs.Balls.length; i++){
			var ball = bNs.Balls[i];
			//Take into account boundary conditions
			ball.State.acc = ball.CorrectForBoundary();
		}
		
		for(var i = 0; i < bNs.Balls.length; i++){
			var ball = bNs.Balls[i];
			
			//Once all the balls are in their new position, update
			//the acceleration for the system.
			ball.State.acc = ball.acceleration();
		}
	},
	
	Verlet : function(bNs, dt){
		//For each ball, update as:
		// x_(n+1) = x_(n) + dt * v_(n) + 0.5 * a(x_(n)) * dt^2
		// v_(n+1) = v_(n) + 0.5 * dt * ( a(x_(n)) + a(x_(n+1)) )
		// a_(n+1) = 0
		//
		
		for(var i = 0; i < bNs.Balls.length; i++){
			var ball = bNs.Balls[i];
			
			//Copy current state to old		
			ball.OldState = ball.State;
			
			//Create current state, update position only
			ball.State = new BallsNSprings.State(
				ball.OldState.pos
					.add( ball.OldState.vel.multiply(dt) )
					.add( ball.OldState.acc.multiply(dt * dt * 0.5) ),
				ball.OldState.vel,
				ball.OldState.acc
			);	
		}
		
		for(var i = 0; i < bNs.Balls.length; i++){
			var ball = bNs.Balls[i];
			//Take into account boundary conditions
			ball.State.acc = ball.CorrectForBoundary();
		}
		
		for(var i = 0; i < bNs.Balls.length; i++){
			var ball = bNs.Balls[i];
			
			//Once all the balls are in their new position, update
			//the acceleration for the system.
			ball.State.acc = ball.acceleration();
			
			// And use this updated acceleration to calculate the 
			// new velocity
			ball.State.vel = ball.OldState.vel
				.add(ball.OldState.acc.multiply(dt * 0.5))
				.add(ball.State.acc.multiply(dt * 0.5));
			
		}
	}
}