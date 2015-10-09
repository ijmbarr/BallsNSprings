function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function MergeIntoFirst(toMergeInto, toBeMerged){
    for(var attr in toMergeInto){
        if(toBeMerged.hasOwnProperty(attr)){
            toMergeInto[attr] = toBeMerged[attr];
        }
    }  
}

function randChoice(list){
    return Math.floor(Math.random() * list.length);
}

var MakeConnections = {

    minSpan : function(N){
        var unConnected = _.sample(_.range(N), N);
        var connected = [unConnected.pop()];
        var toReturn = []
    
        while(unConnected.length > 0){
            var CtoConnect = _.sample(connected);
            var UtoConnect = unConnected.pop();
            toReturn.push([CtoConnect, UtoConnect]);
            connected.push(UtoConnect);
        }
    
        return toReturn;
    },

    ring : function(N){
        return _.range(N).map(function(k){ return [k, (k + 1)%N];});
    },

    fullConnect : function(N){
        return _.flatten(_.range(N).map(function(i){return _.range(i+1,N).map(function(j){return [i, j];})}), true);
    }
}