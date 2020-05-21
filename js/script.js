const OPEN_WEATHER_MAP_KEY = 'f20323253ac2d55e43a29626288c0a63';
const DEFAULT_STATE_CODE = 'us'
const UTC_EST_TIMEZONE_HOURS_DIFFERENCE = 6;

jQuery(document).ready(function($){
    $('#zip-code-submit').on('click', function(event){

        function getHourMinutesFromUnixTimestamp(unixTimestamp){
            var date = new Date(unixTimestamp * 1000);
            // Hours part from the timestamp
            var hours = (date.getHours() + 24 - UTC_EST_TIMEZONE_HOURS_DIFFERENCE) % 24;
            // Minutes part from the timestamp
            var minutes = date.getMinutes();
            return hours + ':' + minutes;
        }

        function fillInfo(data){
            $('#weather-icon').attr('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
            $('#location-name').html(data.name);
            $('#main-weather').html(data.weather[0].main);
            $('#main-weather-desc').html(data.weather[0].description);
            $('#temp').html(data.main.temp + ' K');
            $('#feels-like').html(data.main.feels_like + ' K');
            $('#min-temp').html(data.main.temp_min + ' K');
            $('#max-temp').html(data.main.temp_max + ' K');
            $('#pressure').html(data.main.pressure + ' hPa');
            $('#humidity').html(data.main.humidity + '%');
            $('#wind-speed').html(data.wind.speed + 'm/s');
            $('#wind-direction').html(data.wind.deg + '°');
            $('#sunrise').html(getHourMinutesFromUnixTimestamp(data.sys.sunrise));
            $('#sunset').html(getHourMinutesFromUnixTimestamp(data.sys.sunset));
        }

        event.preventDefault();
        var zipCode = $('#zip-code').val();
        $('div#weather-info-container').addClass('d-none');
        $('#zip-code-loading').html(zipCode);
        $('p#loading-weather').removeClass('d-none');
    axios.get('http://api.openweathermap.org/data/2.5/weather?zip='+ zipCode + ','+ DEFAULT_STATE_CODE + '&appid=' + OPEN_WEATHER_MAP_KEY)
        .then((response) => {
            fillInfo(response.data);
            $('p#loading-weather').addClass('d-none');
            $('div#weather-info-container').removeClass('d-none');
            })
        .catch(() => {
            $('p#loading-weather').addClass('d-none');
            alert('Zip ' + zipCode + ' not found');
            })
    });
});