const weatherApp = {
	apiKey: 'kzxDckjmi2Slj9LdotDnwphuyPqsDN45'
};

//---------- Image Flip Start ---------->

weatherApp.flipImage = function(){
	$('.init-img-state').addClass('flp-trans-state flp-img-state')
	.on('transitionend', function(event) {
		$('.init-img-state').removeClass('flp-trans-state flp-img-state')
		weatherApp.flexAnimate();
	});	
};

weatherApp.flexAnimate = function(){
	$('.transition-cont').addClass('init-flx-trans flx-animate')
};

//---------- Get The Date ---------->

weatherApp.getDate = function(){
	getDate = new Date();
	formatDate = getDate.getFullYear()+' : '+(getDate.getMonth()+1)+' : '+getDate.getDate();
	date = formatDate
	const dateHtml =`
		<div class="cDate"> ${date} </div>`
		$('#currentDate').empty().append(dateHtml);
}	

// ---------- Info Display ---------->

weatherApp.displayCityName = function(cityName) {
	const displayName = `
		<div class="city disp-none"> 
			${cityName} 
		</div>
		`;	
		$('.city-name').empty().append(displayName);
		$('.city').fadeIn(500);
		$('.divider').fadeIn(500);
		console.log("i work");
}
weatherApp.displayTemp = function(data) {
	temp = data
	const tempHtml =`
		<div class="cTemp disp-none">
			${temp}&#176C
		</div>`;
	$('.city-temp').empty().append(tempHtml);
	$('.cTemp').fadeIn(500);
};

// ---------- Get Temperature ---------->

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
		console.log(res);
		setTimeout(function(){
			wholeTemp = (Math.floor(res.DailyForecasts[0].Temperature.Maximum.Value))
			weatherApp.displayTemp(wholeTemp)
			weatherApp.displayCityName(cityName)
		}, 0);
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
	})
};

// ---------- Get User City ---------->

weatherApp.getCity = function(){
	$('form').on('submit', function (e) {
		e.preventDefault();
		const city = $('input[type=text]').val();
		if (city != '') {
			$('#user-city').attr('placeholder', 'Enter City').val('');
			weatherApp.flipImage();
			// weatherApp.flexAnimate();
		}
		weatherApp.getLocationKey(city);
		$('.disp-none').fadeOut(200);

	})
}

// ---------- Init State ---------->

weatherApp.init = function(){
	weatherApp.getCity();
	console.log("Initialize App!");
}

$(document).ready(function () {
 	weatherApp.init();
 	weatherApp.getDate();
});

