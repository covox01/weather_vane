const weatherApp = {
	apiKey: 'kzxDckjmi2Slj9LdotDnwphuyPqsDN45'
};

//-- Extra Info Start --

weatherApp.getDate = function(){
	getDate = new Date();
	formatDate = getDate.getFullYear()+' . '+(getDate.getMonth()+1)+' . '+getDate.getDate();
	date = formatDate
	const dateHtml =`
		<div class="dispNone cDate"> ${date} </div>`
		$('#currentDate').empty().append(dateHtml);
		$('.dispNone').fadeIn(500);
}

weatherApp.displayCityName = function(cityName) {
	const displayName = `
		<div class="dispNone cName"> ${cityName} </div>`;
		$('.cityName').empty().append(displayName);
		$('.dispNone').fadeIn(500);
}

// -- Extra Info End --

weatherApp.displayTemp = function(data) {
	temp = data
	const tempHtml =`
		<div class="dispNone cTemp"> 
			${temp}&#176C
		</div>
		`;
	$('.cityTemp').empty().append(tempHtml);
	$('.dispNone').fadeIn(300);
};

weatherApp.getTemp = function(key){
	$.ajax({
		url: 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/'+key+'?',
		method: 'GET',
		dataType: 'jsonp',
		data: {
			apikey: '2cS8sDkIUvsLyGgtsQ5UwWnp9VAUnrNW',
			metric: true
		}
	}).then(function(res){
		wholeTemp = (Math.floor(res.DailyForecasts[0].Temperature.Maximum.Value));
		weatherApp.displayTemp(wholeTemp);
	})
};

weatherApp.getLocationKey = function(query){
	$.ajax({
		url: 'http://dataservice.accuweather.com/locations/v1/cities/search',
		method: 'GET',
		dataType: 'jsonp',
		data: {
			apikey: '2cS8sDkIUvsLyGgtsQ5UwWnp9VAUnrNW',
			q: query
		}
	}).then(function(res){
		locationKey = res[0].Key;
		weatherApp.getTemp(locationKey);
		cityName = res[0].EnglishName;
		weatherApp.displayCityName(cityName);
		weatherApp.getDate();
	})
};

weatherApp.getCity = function(){
	$('form').on('submit', function (e) {
		e.preventDefault();
		const city = $('input[type=text]').val();
		if (city != '') {
			$('#user-city').attr('placeholder', 'Enter City').val('');
		}
		weatherApp.getLocationKey(city);
	})
}

weatherApp.init = function(){
	weatherApp.getCity();
	console.log("Initialize App!");
}

$(document).ready(function () {
 	weatherApp.init();

});

