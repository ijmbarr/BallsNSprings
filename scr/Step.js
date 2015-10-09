BallsNSprings.prototype.Step = function(bNs){
	return function(){
		bNs.PreviousTime = bNs.Time;
		bNs.Time = timestamp() / 1000.0;
		
		var potentialNextTime = bNs.dt + (bNs.Time - bNs.PreviousTime);
		bNs.dt = Math.min(
			potentialNextTime,
			bNs.parameters.steptime
			);
		
		if(bNs.Running && bNs.dt >= bNs.parameters.steptime){
			bNs.parameters.integrator(bNs, bNs.dt);
			bNs.Draw();
			bNs.dt -= bNs.parameters.steptime;
		}
		
		window.requestAnimationFrame(BallsNSprings.prototype.Step(bNs));
	}
}