BallsNSprings.Examples = {
	
	RandomMinConnect : function(bNs, N){
		//Connect all the balls together to at least
		// one other ball
		bNs.Balls = _.range(N)
			.map(function(n){
				return new BallsNSprings.Ball(
					bNs, 
					new BallsNSprings.State(
						new Vector(bNs.width * Math.random(), bNs.height * Math.random()),
						new Vector(bNs.Vscale * (Math.random() - 0.5), bNs.Vscale * (Math.random() - 0.5)),
						new Vector(0,0)
					),
					{}
				);
			});
		
		var toConnect = MakeConnections.minSpan(N);
				
		bNs.Springs = toConnect.map(
				function(i){
					return new BallsNSprings.Spring(
						bNs,
						bNs.Balls[i[0]], 
						bNs.Balls[i[1]], 
						{}
					);
				});
				
		bNs.Draw();
	},
	
	RandomFullConnect : function(bNs, N){
		//Connect all the balls together to all other balls
		bNs.Balls = _.range(N)
			.map(function(n){
				return new BallsNSprings.Ball(
					bNs, 
					new BallsNSprings.State(
						new Vector(bNs.width * Math.random(), bNs.height * Math.random()),
						new Vector(bNs.Vscale * (Math.random() - 0.5), bNs.Vscale * (Math.random() - 0.5)),
						new Vector(0,0)
					),
					{ball_damping : 5}
				);
			});
		
		var toConnect = MakeConnections.fullConnect(N);
				
		bNs.Springs = toConnect.map(
				function(i){
					return new BallsNSprings.Spring(
						bNs,
						bNs.Balls[i[0]], 
						bNs.Balls[i[1]], 
						{visible : false}
					);
				});
				
		bNs.Draw();
	},
	
	TwoBalls : function(bNs){
		
		bNs.Balls = [
			new BallsNSprings.Ball(
				bNs, 
				new BallsNSprings.State(
					new Vector(bNs.width * 0.25, bNs.height * 0.5),
					new Vector(0,0),
					new Vector(0,0)
				),
				{colour : "blue"}
			),
			new BallsNSprings.Ball(
				bNs, 
				new BallsNSprings.State(
					new Vector(bNs.width * 0.75, bNs.height * 0.5),
					new Vector(0,0),
					new Vector(0,0)
				),
				{colour : "green"}
			)
		];
		
				
		bNs.Springs = [
			 new BallsNSprings.Spring(
						bNs,
						bNs.Balls[0], 
						bNs.Balls[1], 
						{}
					)
		];
				
		bNs.Draw();
	},
	
	NoSprings : function(bNs, N){
		//Just N Balls, No Springs
		bNs.Balls = _.range(N)
			.map(function(n){
				return new BallsNSprings.Ball(
					bNs, 
					new BallsNSprings.State(
						new Vector(bNs.width * Math.random(), bNs.height * Math.random()),
						new Vector(bNs.Vscale * (Math.random() - 0.5), bNs.Vscale * (Math.random() - 0.5)),
						new Vector(0,0)
					),
					{damping : 0}
				);
			});
				
		bNs.Springs = [];
				
		bNs.Draw();
	}
}