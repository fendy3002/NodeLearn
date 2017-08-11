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

var doProcess = async function(){
	var result = [];
	for(var i = 0; i < 20; i++){
		var execResult = await execThings(i);
	    result.push(execResult);
	}
	return result;
};

doProcess().then(function(result){
	console.log(result);
});