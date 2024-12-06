//--------------------- Copyright 
/* 

PrayTimes.js: Prayer Times Calculator (ver 2.3)
Copyright (C) 2007-2011 PrayTimes.org

Developer: Hamid Zarrabi-Zadeh
License: GNU LGPL v3.0

TERMS OF USE:
	Permission is granted to use this code, with or 
	without modification, in any website or application 
	provided that credit is given to the original work 
	with a link back to PrayTimes.org.

This program is distributed in the hope that it will 
be useful, but WITHOUT A


//--------------------- Help and Manual ----------------------
/*

User's Manual: 
http://praytimes.org/manual

Calculation Formulas: 
http://praytimes.org/calculation

*/
	

//----------------------- PrayTimes Class ------------------------


function PrayTimes(method) {


	//------------------------ Constants --------------------------
	var
	
	// Time Names
	timeNames = {
		imsak    : "Imsak",
		subuh    : "Subuh",
		dhuhur   : "Dhuhur",
		ashar    : "Ashar",
		maghrib  : "Maghrib",
		isya     : "Isya",
	},


	// Calculation Methods
	methods = {
		Depag: {
			name: 'Kementerian Agama RI',
			params: { subuh: 20, isya: 18 } }
	},


	// Default Parameters in Calculation Methods
	defaultParams = {
		maghrib: '0 min', midnight: 'Standard'

	},
 
 	//---------------------- Default Settings --------------------
	
	calcMethod = 'Depag',

	// do not change anything here; use adjust method instead
	setting = {  
		imsak    : '10 min',
		dhuhur   : '0 min',  
		ashar    : 'Standard',
		highLats : 'NightMiddle'
	},

	timeFormat = '24h',
	timeSuffixes = ['am', 'pm'],
	invalidTime =  '-----',

	numIterations = 1,
	offset = {},


	//----------------------- Local Variables ---------------------

	lat, lng, elv,       // coordinates
	timeZone, jDate;     // time variables
	

	//---------------------- Initialization -----------------------
	
	
	// set methods defaults
	var defParams = defaultParams;
	for (var i in methods) {
		var params = methods[i].params;
		for (var j in defParams)
			if ((typeof(params[j]) == 'undefined'))
				params[j] = defParams[j];
	};

	// initialize settings
	calcMethod = methods[method] ? method : calcMethod;
	var params = methods[calcMethod].params;
	for (var id in params)
		setting[id] = params[id];

	// init time offsets
	for (var i in timeNames)
		offset[i] = 0;

		
	
	//----------------------- Public Functions ------------------------
	return {

	
	// set calculation method 
	setMethod: function(method) {
		if (methods[method]) {
			this.adjust(methods[method].params);
			calcMethod = method;
		}
	},


	// set calculating parameters
	adjust: function(params) {
		for (var id in params)
			setting[id] = params[id];
	},


	// set time offsets
	tune: function(timeOffsets) {
		for (var i in timeOffsets)
			offset[i] = timeOffsets[i];
	},


	// get current calculation method
	getMethod: function() { return calcMethod; },

	// get current setting
	getSetting: function() { return setting; },

	// get current time offsets
	getOffsets: function() { return offset; },

	// get default calc parametrs
	getDefaults: function() { return methods; },


	// return prayer times for a given date
	getTimes: function(date, coords, timezone, dst, format) {
		lat = 1* coords[0];
		lng = 1* coords[1]; 
		elv = coords[2] ? 1* coords[2] : 0;
		timeFormat = format || timeFormat;
		if (date.constructor === Date)
			date = [date.getFullYear(), date.getMonth()+ 1, date.getDate()];
		if (typeof(timezone) == 'undefined' || timezone == 'auto')
			timezone = this.getTimeZone(date);
		if (typeof(dst) == 'undefined' || dst == 'auto') 
			dst = this.getDst(date);
		timeZone = 1* timezone+ (1* dst ? 1 : 0);
		jDate = this.julian(date[0], date[1], date[2])- lng/ (15* 24);
		
		return this.computeTimes();
	},


	// convert float time to the given format (see timeFormats)
	getFormattedTime: function(time, format, suffixes) {
		if (isNaN(time))
			return invalidTime;
		if (format == 'Float') return time;
		suffixes = suffixes || timeSuffixes;

		time = DMath.fixHour(time+ 0.5/ 60);  // add 0.5 minutes to round
		var hours = Math.floor(time); 
		var minutes = Math.floor((time- hours)* 60);
		var suffix = (format == '12h') ? suffixes[hours < 12 ? 0 : 1] : '';
		var hour = (format == '24h') ? this.twoDigitsFormat(hours) : ((hours+ 12 -1)% 12+ 1);
		return hour+ ':'+ this.twoDigitsFormat(minutes)+ (suffix ? ' '+ suffix : '');
	},


	//---------------------- Calculation Functions -----------------------


	// compute mid-day time
	midDay: function(time) {
		var eqt = this.sunPosition(jDate+ time).equation;
		var noon = DMath.fixHour(12- eqt);
		return noon;
	},


	// compute the time at which sun reaches a specific angle below horizon
	sunAngleTime: function(angle, time, direction) {
		var decl = this.sunPosition(jDate+ time).declination;
		var noon = this.midDay(time);
		var t = 1/15* DMath.arccos((-DMath.sin(angle)- DMath.sin(decl)* DMath.sin(lat))/ 
				(DMath.cos(decl)* DMath.cos(lat)));
		return noon+ (direction == 'ccw' ? -t : t);
	},


	// compute ashar time 
	asharTime: function(factor, time) { 
		var decl = this.sunPosition(jDate+ time).declination;
		var angle = -DMath.arccot(factor+ DMath.tan(Math.abs(lat- decl)));
		return this.sunAngleTime(angle, time);
	},


	// compute declination angle of sun and equation of time
	// Ref: http://aa.usno.navy.mil/faq/docs/SunApprox.php
	sunPosition: function(jd) {
		var D = jd - 2451545.0;
		var g = DMath.fixAngle(357.529 + 0.98560028* D);
		var q = DMath.fixAngle(280.459 + 0.98564736* D);
		var L = DMath.fixAngle(q + 1.915* DMath.sin(g) + 0.020* DMath.sin(2*g));

		var R = 1.00014 - 0.01671* DMath.cos(g) - 0.00014* DMath.cos(2*g);
		var e = 23.439 - 0.00000036* D;

		var RA = DMath.arctan2(DMath.cos(e)* DMath.sin(L), DMath.cos(L))/ 15;
		var eqt = q/15 - DMath.fixHour(RA);
		var decl = DMath.arcsin(DMath.sin(e)* DMath.sin(L));

		return {declination: decl, equation: eqt};
	},


	// convert Gregorian date to Julian day
	// Ref: Astronomical Algorithms by Jean Meeus
	julian: function(year, month, day) {
		if (month <= 2) {
			year -= 1;
			month += 12;
		};
		var A = Math.floor(year/ 100);
		var B = 2- A+ Math.floor(A/ 4);

		var JD = Math.floor(365.25* (year+ 4716))+ Math.floor(30.6001* (month+ 1))+ day+ B- 1524.5;
		return JD;
	},

	
	//---------------------- Compute Prayer Times -----------------------


	// compute prayer times at given julian date
	computePrayerTimes: function(times) {
		times = this.dayPortion(times);
		var params  = setting;
		
		var imsak   = this.sunAngleTime(this.eval(params.imsak), times.imsak, 'ccw');
		var subuh   = this.sunAngleTime(this.eval(params.subuh), times.subuh, 'ccw');
		var sunrise = this.sunAngleTime(this.riseSetAngle(), times.sunrise, 'ccw');  
		var dhuhur  = this.midDay(times.dhuhur);
		var ashar   = this.asharTime(this.asharFactor(params.ashar), times.ashar);
		var sunset  = this.sunAngleTime(this.riseSetAngle(), times.sunset);;
		var maghrib = this.sunAngleTime(this.eval(params.maghrib), times.maghrib);
		var isya    = this.sunAngleTime(this.eval(params.isya), times.isya);

		return {
			imsak: imsak, subuh: subuh, sunrise: sunrise, dhuhur: dhuhur, 
			ashar: ashar, sunset: sunset, maghrib: maghrib, isya: isya
		};
	},


	// compute prayer times 
	computeTimes: function() {
		// default times
		var times = { 
			imsak: 5, subuh: 5, sunrise: 6, dhuhur: 12, 
			ashar: 13, sunset: 18, maghrib: 18, isya: 18
		};

		// main iterations
		for (var i=1 ; i<=numIterations ; i++) 
			times = this.computePrayerTimes(times);

		times = this.adjustTimes(times);
		
		// add midnight time
		times.midnight = (setting.midnight == 'Jafari') ? 
				times.sunset+ this.timeDiff(times.sunset, times.subuh)/ 2 :
				times.sunset+ this.timeDiff(times.sunset, times.sunrise)/ 2;

		times = this.tuneTimes(times);
		return this.modifyFormats(times);
	},


	// adjust times 
	adjustTimes: function(times) {
		var params = setting;
		for (var i in times)
			times[i] += timeZone- lng/ 15;
			
		if (params.highLats != 'None')
			times = this.adjustHighLats(times);
			
		if (this.isMin(params.imsak))
			times.imsak = times.subuh- this.eval(params.imsak)/ 60;
		if (this.isMin(params.maghrib))
			times.maghrib = times.sunset+ this.eval(params.maghrib)/ 60;
		if (this.isMin(params.isya))
			times.isya = times.maghrib+ this.eval(params.isya)/ 60;
		times.dhuhur += this.eval(params.dhuhur)/ 60; 

		return times;
	},


	// get ashar shadow factor
	asharFactor: function(asharParam) {
		var factor = {Standard: 1, Hanafi: 2}[asharParam];
		return factor || this.eval(asharParam);
	},


	// return sun angle for sunset/sunrise
	riseSetAngle: function() {
		//var earthRad = 6371009; // in meters
		//var angle = DMath.arccos(earthRad/(earthRad+ elv));
		var angle = 0.0347* Math.sqrt(elv); // an approximation
		return 0.833+ angle;
	},


	// apply offsets to the times
	tuneTimes: function(times) {
		for (var i in times)
			times[i] += offset[i]/ 60; 
		return times;
	},


	// convert times to given time format
	modifyFormats: function(times) {
		for (var i in times)
			times[i] = this.getFormattedTime(times[i], timeFormat); 
		return times;
	},


	// adjust times for locations in higher latitudes
	adjustHighLats: function(times) {
		var params = setting;
		var nightTime = this.timeDiff(times.sunset, times.sunrise); 

		times.imsak = this.adjustHLTime(times.imsak, times.sunrise, this.eval(params.imsak), nightTime, 'ccw');
		times.subuh  = this.adjustHLTime(times.subuh, times.sunrise, this.eval(params.subuh), nightTime, 'ccw');
		times.isya  = this.adjustHLTime(times.isya, times.sunset, this.eval(params.isya), nightTime);
		times.maghrib = this.adjustHLTime(times.maghrib, times.sunset, this.eval(params.maghrib), nightTime);
		
		return times;
	},

	
	// adjust a time for higher latitudes
	adjustHLTime: function(time, base, angle, night, direction) {
		var portion = this.nightPortion(angle, night);
		var timeDiff = (direction == 'ccw') ? 
			this.timeDiff(time, base):
			this.timeDiff(base, time);
		if (isNaN(time) || timeDiff > portion) 
			time = base+ (direction == 'ccw' ? -portion : portion);
		return time;
	},

	
	// the night portion used for adjusting times in higher latitudes
	nightPortion: function(angle, night) {
		var method = setting.highLats;
		var portion = 1/2 // MidNight
		if (method == 'AngleBased')
			portion = 1/60* angle;
		if (method == 'OneSeventh')
			portion = 1/7;
		return portion* night;
	},


	// convert hours to day portions 
	dayPortion: function(times) {
		for (var i in times)
			times[i] /= 24;
		return times;
	},


	//---------------------- Time Zone Functions -----------------------


	// get local time zone
	getTimeZone: function(date) {
		var year = date[0];
		var t1 = this.gmtOffset([year, 0, 1]);
		var t2 = this.gmtOffset([year, 6, 1]);
		return Math.min(t1, t2);
	},

	
	// get daylight saving for a given date
	getDst: function(date) {
		return 1* (this.gmtOffset(date) != this.getTimeZone(date));
	},


	// GMT offset for a given date
	gmtOffset: function(date) {
		var localDate = new Date(date[0], date[1]- 1, date[2], 12, 0, 0, 0);
		var GMTString = localDate.toGMTString();
		var GMTDate = new Date(GMTString.substring(0, GMTString.lastIndexOf(' ')- 1));
		var hoursDiff = (localDate- GMTDate) / (1000* 60* 60);
		return hoursDiff;
	},

	
	//---------------------- Misc Functions -----------------------

	// convert given string into a number
	eval: function(str) {
		return 1* (str+ '').split(/[^0-9.+-]/)[0];
	},


	// detect if input contains 'min'
	isMin: function(arg) {
		return (arg+ '').indexOf('min') != -1;
	},


	// compute the difference between two times 
	timeDiff: function(time1, time2) {
		return DMath.fixHour(time2- time1);
	},


	// add a leading 0 if necessary
	twoDigitsFormat: function(num) {
		return (num <10) ? '0'+ num : num;
	}
	
}}



//---------------------- Degree-Based Math Class -----------------------


var DMath = {

	dtr: function(d) { return (d * Math.PI) / 180.0; },
	rtd: function(r) { return (r * 180.0) / Math.PI; },

	sin: function(d) { return Math.sin(this.dtr(d)); },
	cos: function(d) { return Math.cos(this.dtr(d)); },
	tan: function(d) { return Math.tan(this.dtr(d)); },

	arcsin: function(d) { return this.rtd(Math.asin(d)); },
	arccos: function(d) { return this.rtd(Math.acos(d)); },
	arctan: function(d) { return this.rtd(Math.atan(d)); },

	arccot: function(x) { return this.rtd(Math.atan(1/x)); },
	arctan2: function(y, x) { return this.rtd(Math.atan2(y, x)); },

	fixAngle: function(a) { return this.fix(a, 360); },
	fixHour:  function(a) { return this.fix(a, 24 ); },

	fix: function(a, b) { 
		a = a- b* (Math.floor(a/ b));
		return (a < 0) ? a+ b : a;
	}
}


//---------------------- Init Object -----------------------


var prayTimes = new PrayTimes();



/// Jadwal Sholat Kota
function PilihKota(){
	var PilihanKota=document.getElementById('PilihKota');
	var Kota=PilihanKota.value;
	if(Kota==1){geo=[-2.63000000,140.58000000,134.35];timezone=+9}
	else if(Kota==2){geo=[-7.25599000,110.40658500,520.42];timezone=+7}
	else if(Kota==3){geo=[-3.65607000,128.16641900,112.15];timezone=+9}
	else if(Kota==4){geo=[-9.10106900,124.89099900,342.87];timezone=+8}
	else if(Kota==5){geo=[-7.10089010,112.17685950,11.83];timezone=+7}
	else if(Kota==6){geo=[-1.26353890,116.82788330,72.56];timezone=+8}
	else if(Kota==7){geo=[5.54618200,95.31905400,8.09];timezone=+7}
	else if(Kota==8){geo=[-5.45000000,105.26666670,7.72];timezone=+7}
	else if(Kota==9){geo=[-6.91474440,107.60981110,716.71];timezone=+7}
	else if(Kota==10){geo=[-7.02475040,112.74919060,2.95];timezone=+7}
	else if(Kota==11){geo=[-3.32849900,114.58920300,5.90];timezone=+8}
	else if(Kota==12){geo=[-7.88592990,110.33048830,51.00];timezone=+7}
	else if(Kota==13){geo=[-7.52855270,109.29922810,24.75];timezone=+7}
	else if(Kota==14){geo=[-8.21025620,114.37351070,11.95];timezone=+7}
	else if(Kota==15){geo=[1.03000000,103.92000000,3.07];timezone=+7}
	else if(Kota==16){geo=[-6.23333330,107.00000000,17.00];timezone=+7}
	else if(Kota==17){geo=[-3.80064900,102.25620300,9.80];timezone=+7}
	else if(Kota==18){geo=[-1.16143800,136.04741900,0.00];timezone=+9}
	else if(Kota==19){geo=[-8.46056600,118.72740200,32.60];timezone=+8}
	else if(Kota==20){geo=[3.59861110,98.48027780,36.84];timezone=+7}
	else if(Kota==21){geo=[5.20184790,96.70757120,19.00];timezone=+7}
	else if(Kota==22){geo=[-8.07288000,112.16649600,214.00];timezone=+7}
	else if(Kota==23){geo=[-6.97114010,111.42116790,90.09];timezone=+7}
	else if(Kota==24){geo=[-6.58916600,106.79299900,250.89];timezone=+7}
	else if(Kota==25){geo=[-7.16252590,111.86896750,20.81];timezone=+7}
	else if(Kota==26){geo=[-6.48000000,107.78000000,40.37];timezone=+7}
	else if(Kota==27){geo=[-7.91175000,113.82178800,261.36];timezone=+7}
	else if(Kota==28){geo=[-4.53877200,120.32499700,33.98];timezone=+8}
	else if(Kota==29){geo=[0.13569700,117.49859600,4.00];timezone=+8}
	else if(Kota==30){geo=[-7.51729100,110.59344100,459.51];timezone=+7}
	else if(Kota==31){geo=[-6.87212200,109.04312600,7.25];timezone=+7}
	else if(Kota==32){geo=[-7.05000000,109.55000000,21.17];timezone=+7}
	else if(Kota==33){geo=[-0.26695000,100.38347900,881.42];timezone=+7}
	else if(Kota==34){geo=[-7.24409800,109.00638700,185.17];timezone=+7}
	else if(Kota==35){geo=[-7.14854000,111.59477500,31.27];timezone=+7}
	else if(Kota==36){geo=[-6.81181200,107.14541230,447.66];timezone=+7}
	else if(Kota==37){geo=[-6.25130040,107.16626910,11.71];timezone=+7}
	else if(Kota==38){geo=[-7.34000000,109.00000000,239.61];timezone=+7}
	else if(Kota==39){geo=[-5.93639600,106.00640100,79.02];timezone=+7}
	else if(Kota==40){geo=[-6.71666670,108.56666670,6.28];timezone=+7}
	else if(Kota==41){geo=[-6.89469440,110.63861510,6.18];timezone=+7}
	else if(Kota==42){geo=[-8.65629000,115.22209900,29.44];timezone=+8}
	else if(Kota==43){geo=[-6.39184090,106.80603880,86.36];timezone=+7}
	else if(Kota==44){geo=[1.66574200,101.44760100,1.33];timezone=+7}
	else if(Kota==45){geo=[-8.85405300,121.65419800];timezone=+8}
	else if(Kota==46){geo=[-7.24839740,107.90965160,823.93];timezone=+7}
	else if(Kota==47){geo=[-7.60839200,109.51830870,24.28];timezone=+7}
	else if(Kota==48){geo=[0.53333330,123.06666670,10.42];timezone=+8}
	else if(Kota==49){geo=[-7.16076470,112.64705480,16.58];timezone=+7}
	else if(Kota==50){geo=[-6.39269460,108.28754480,6.20];timezone=+7}
	else if(Kota==51){geo=[-6.21154400,106.84517200,10.22];timezone=+7}
	else if(Kota==52){geo=[-1.59667200,103.61579900,18.61];timezone=+7}
	else if(Kota==53){geo=[-2.54127900,140.71373000,11.60];timezone=+9}
	else if(Kota==54){geo=[-8.17377570,113.69523220,85.37];timezone=+7}
	else if(Kota==55){geo=[-6.59344980,110.66845010,6.64];timezone=+7}
	else if(Kota==56){geo=[-8.43916620,115.60910280,132.03];timezone=+8}
	else if(Kota==57){geo=[-7.66935250,109.65102600,27.66];timezone=+7}
	else if(Kota==58){geo=[-7.81689500,112.01139800,71.67];timezone=+7}
	else if(Kota==59){geo=[-3.96748890,122.59470000,64.60];timezone=+8}
	else if(Kota==60){geo=[-7.70202100,110.60278820,166.01];timezone=+7}
	else if(Kota==61){geo=[-3.10000000,114.35000000,5.52];timezone=+7}
	else if(Kota==62){geo=[4.28571680,98.05933810,16.21];timezone=+7}
	else if(Kota==63){geo=[-6.80834510,110.84179770,25.67];timezone=+7}
	else if(Kota==64){geo=[-8.72547800,115.17793900,8.35];timezone=+8}
	else if(Kota==65){geo=[-7.11234440,112.41742430,7.10];timezone=+7}
	else if(Kota==66){geo=[4.48000000,97.96333330,7.00];timezone=+7}
	else if(Kota==67){geo=[5.18805560,97.14027780,5.08];timezone=+7}
	else if(Kota==68){geo=[-3.29666670,102.86166670,140.84];timezone=+7}
	else if(Kota==69){geo=[-8.13322100,113.22260400,56.68];timezone=+7}
	else if(Kota==70){geo=[-7.62971400,111.51370200,68.52];timezone=+7}
	else if(Kota==71){geo=[-7.48125300,110.21379900,366.38];timezone=+7}
	else if(Kota==72){geo=[-7.65346870,111.32959430,361.03];timezone=+7}
	else if(Kota==73){geo=[-6.83401240,108.22763110,126.10];timezone=+7}
	else if(Kota==74){geo=[-5.12057330,119.48756680,4.00];timezone=+8}
	else if(Kota==75){geo=[-7.98189400,112.62650300,450.76];timezone=+7}
	else if(Kota==76){geo=[1.49305560,124.84126110,14.84];timezone=+8}
	else if(Kota==77){geo=[-0.86152200,134.07879600,49.64];timezone=+9}
	else if(Kota==78){geo=[-3.41159800,114.84520000,11.17];timezone=+8}
	else if(Kota==79){geo=[-8.58333330,116.11666670,25.17];timezone=+8}
	else if(Kota==80){geo=[-8.62084300,122.20770300,22.00];timezone=+8}
	else if(Kota==81){geo=[3.58524200,98.67559790,25.59];timezone=+7}
	else if(Kota==82){geo=[-8.49599400,140.39450100,6.69];timezone=+9}
	else if(Kota==83){geo=[4.13620900,96.12487800,0.79];timezone=+7}
	else if(Kota==84){geo=[-7.47222220,112.43361110,24.93];timezone=+7}
	else if(Kota==85){geo=[-3.35841800,135.49569700,0.00];timezone=+9}
	else if(Kota==86){geo=[-7.59997540,111.89934260,58.73];timezone=+7}
	else if(Kota==87){geo=[-0.95373000,100.35199700,0.19];timezone=+7}
	else if(Kota==88){geo=[-2.22666700,113.94416700,13.04];timezone=+7}
	else if(Kota==89){geo=[-2.99110830,104.75673330,8.78];timezone=+7}
	else if(Kota==90){geo=[-0.89858300,119.85060100,14.97];timezone=+8}
	else if(Kota==91){geo=[-7.16225370,113.48300110,15.47];timezone=+7}
	else if(Kota==92){geo=[-7.65030400,112.70570400,146.73];timezone=+7}
	else if(Kota==93){geo=[-2.12000000,106.10000000,10.70];timezone=+7}
	else if(Kota==94){geo=[-7.64487200,112.90329700,9.57];timezone=+7}
	else if(Kota==95){geo=[0.53333330,101.45000000,13.74];timezone=+7}
	else if(Kota==96){geo=[2.95702400,99.06474300,396.80];timezone=+7}
	else if(Kota==97){geo=[-3.39284780,119.36155930,140.53];timezone=+8}
	else if(Kota==98){geo=[-7.87220560,111.46129430,102.47];timezone=+7}
	else if(Kota==99){geo=[-0.02252300,109.33030700,2.40];timezone=+7}
	else if(Kota==100){geo=[-1.40237930,120.75821780,16.83];timezone=+7}
	else if(Kota==101){geo=[-7.69009400,112.64402700,564.42];timezone=+7}
	else if(Kota==102){geo=[-7.75692800,113.21150200,13.20];timezone=+7}
	else if(Kota==103){geo=[5.88803400,95.31652800,3.70];timezone=+7}
	else if(Kota==104){geo=[-0.50218300,117.15380100,5.23];timezone=+8}
	else if(Kota==105){geo=[-7.19131290,113.25322670,3.25];timezone=+7}
	else if(Kota==106){geo=[-2.53111400,112.95620000,6.40];timezone=+7}
	else if(Kota==107){geo=[-6.96666670,110.41666670,6.87];timezone=+7}
	else if(Kota==108){geo=[-6.14739858,106.09154789,29.01];timezone=+7}
	else if(Kota==109){geo=[1.74026600,98.78354600,19.18];timezone=+7}
	else if(Kota==110){geo=[5.37567500,95.94257500,9.82];timezone=+7}
	else if(Kota==111){geo=[0.90879500,108.98459600,2.36];timezone=+7}
	else if(Kota==112){geo=[-7.70298100,114.01477000,37.28];timezone=+7}
	else if(Kota==113){geo=[-7.28916600,112.73439800,7.51];timezone=+7}
	else if(Kota==114){geo=[-7.56666670,110.81666670,94.87];timezone=+7}
	else if(Kota==115){geo=[-8.54504000,115.11996000,108.80];timezone=+8}
	else if(Kota==116){geo=[-6.17830560,106.63188890,16.76];timezone=+7}
	else if(Kota==117){geo=[3.27609000,117.61940000,18.25];timezone=+8}
	else if(Kota==118){geo=[-7.33333330,108.20000000,371.37];timezone=+7}
	else if(Kota==119){geo=[0.78806800,127.37715600,51.80];timezone=+9}
	else if(Kota==120){geo=[0.68333330,127.40000000,508.60];timezone=+9}
	else if(Kota==121){geo=[-8.07640780,111.70603560,112.12];timezone=+7}
	else if(Kota==122){geo=[-6.89958400,112.04617000,23.23];timezone=+7}
	else if(Kota==123){geo=[-8.49738810,115.26584240,243.78];timezone=+8}
	else if(Kota==124){geo=[-7.12753580,110.40448120,317.01];timezone=+7}
	else if(Kota==125){geo=[-9.66280600,120.26689900,19.85];timezone=+8}
	else if(Kota==126){geo=[-7.36502270,109.90222730,773.56];timezone=+7}
	else if(Kota==127){geo=[-7.79722400,110.36879700,113.31];timezone=+7}
	else if(Kota==128){geo=[-7.34338200,110.50366950];timezone=+7}
	else if(Kota==129){geo=[-7.41813909,109.55813786];timezone=+7}
	else if(Kota==130){geo=[-7.7097310,110.0080030];timezone=+7}
	else if(Kota==131){geo=[-6.8941111,109.7234519];timezone=+7}
	else if(Kota==132){geo=[-7.0217194,110.9625854];timezone=+7}
	else if(Kota==133){geo=[-7.5961111,110.9508333];timezone=+7}
	else if(Kota==134){geo=[-6.9196860,110.2055970];timezone=+7}
	else if(Kota==135){geo=[-6.7513380,111.0380020];timezone=+7}
	else if(Kota==136){geo=[-6.8828870,109.6699980];timezone=+7}
	else if(Kota==137){geo=[-6.8842340,109.3779980];timezone=+7}
	else if(Kota==138){geo=[-7.3907470,109.3638000];timezone=+7}
	else if(Kota==139){geo=[-7.7097310,110.0080030];timezone=+7}
	else if(Kota==140){geo=[-6.7112400,111.3452990];timezone=+7}
	else if(Kota==141){geo=[-7.4302290,111.0213010];timezone=+7}
	else if(Kota==142){geo=[-7.6808818,110.8195292];timezone=+7}
	else if(Kota==143){geo=[-6.8666667,109.1333333];timezone=+7}
	else if(Kota==144){geo=[-7.3166690,110.1747970];timezone=+7}
	else if(Kota==145){geo=[-7.8177820,110.9206010];timezone=+7}
	else if(Kota==146){geo=[-7.8671000,112.5239000];timezone=+7}
	else if(Kota==147){geo=[-7.7161650,110.3354030];timezone=+7}
	else if(Kota==148){geo=[-8.0305091,110.6168921];timezone=+7}
	else if(Kota==149){geo=[-7.8266798,110.1640846];timezone=+7}
	else if(Kota==150){geo=[-7.4530278,112.7173389];timezone=+7}
	else if(Kota==151){geo=[-7.5468395,112.2264794];timezone=+7}
	else if(Kota==152){geo=[-7.3899300,111.4619300];timezone=+7}
	else if(Kota==153){geo=[-8.2046140,111.0876900];timezone=+7}
	else if(Kota==154){geo=[-8.0666667,111.9000000];timezone=+7}
	else if(Kota==155){geo=[-6.9253999,113.9060624];timezone=+7}
	}
	
function JadwalSholat(){
	prayTimes.tune({imsak:2,subuh:2,dhuhur:2,ashar:2,maghrib:2,isya:2});
	var date=new Date();
	var times=prayTimes.getTimes(date,geo,timezone);
	var list=["Imsak","Subuh","Dhuhur","Ashar","Maghrib","Isya"];
	var thisday=date.getDay();
	var thismonth=date.getMonth();
	var thisdate=date.getDate();
	var thisyear=date.getFullYear();
	var months=new Array("Januari","Pebruari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","Nopember","Desember");
	var NameOfDay=new Array("Minggu","Senin","Selasa","Rabu","Kamis","Jum"+"'"+"at","Sabtu");
	var NamaHari=NameOfDay[thisday];
	var monthname=months[thismonth];
	var tanggal=NamaHari+", "+thisdate+" "+monthname+" "+thisyear;
	
if(timezone==+7){tz="WIB"}
else if(timezone==+8){tz="WITA"}
else if(timezone==+9){tz="WIT"}
else tz="";

var html='<table id="timetable">';
html+=
    '<tr><th colspan="3" style="vertical-align: middle;color:yellow;"><img src="https://sinidonk.github.io/Gbrku/JCal.gif" alt="calendar" style="height:30px; width:auto; vertical-align: middle;">'+tanggal+'</th></tr>';
    
html+='<tr class="blank_row"><td colspan="3"></td></tr>';

for(var i in list){
	html+='<tr><td style="text-align:left; vertical-align: middle;color:yellow;"><img src="https://sinidonk.github.io/Gbrku/JCal.gif" alt="clock" style="height:30px; width:auto; vertical-align: middle;"> '+list[i]+'</td>';
	html+='<td style="width:auto;text-align:center;color:yellow"><strong>:</strong></td>';
	html+='<td style="width:47%;text-align:right; font-size:16px; vertical-align: middle; color:gold;">'+times[list[i].toLowerCase()]+' '+' '+tz+'</td></tr>';
};
html+='</table>';
document.getElementById('JadwalSholat').innerHTML=html;

}

	
	function WidgetJadwalSholat(){
		PilihKota();
		JadwalSholat();
	}

window.onload=function(){WidgetJadwalSholat()};
