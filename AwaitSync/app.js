var model = {
	num: 0
};

var execThings = function(i){
	return new Promise(function(resolve){
		var curIndex = i;
		setTimeout(function(){
			console.log(curIndex, model);
    		resolve(model.num++);
		}, 120 - ((i * i) - (2 * i) + 5));
    });
};

var doProcess = function(){
	var promises = [];
	for(var i = 0; i < 20; i++){
		var newPromise = execThings(i);
	    promises.push(newPromise);
	}

	Promise.all(promises).then(function(result){
		console.log(result);
	});
};

doProcess();