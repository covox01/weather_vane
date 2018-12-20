weatherApp = {
	APPID: '53676921d77f931b9699b38ab357d31e'
}

weatherApp.getTemp = function(query){
	$.ajax({
		url: 'api.openweathermap.org/data/2.5/weather',
		method: 'GET',
		dataType: 'jsonp',
		data: {
			APPID: '53676921d77f931b9699b38ab357d31e',
			q: 'toronto'
		}
	}).then(function(res){
		console.log(res);
		// console.log("Yes it works!");
		weatherApp.displayTemp(res);
	})
};

$(document).ready(function () {
 	weatherApp.getTemp();

});
