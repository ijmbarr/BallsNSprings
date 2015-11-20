var MainForm = [
	{
		"type" : "h1",
		"html" : "Initialisation"
	},
	
	{
		"name" : "Initialise",
		"type" : "select",
		"options" : _.object(
			_.map(Object.keys(BallsNSprings.Examples), 
			function(k){ return [k,k]; })) 
	},
	
	{
		"type" : "text",
		"id" : "number",
		"caption" : "N",
		"name" : "N"
	},
	
	{
		"type" : "submit",
		"value" : "Restart"
	}
]