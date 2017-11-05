/*
Angular SERVICES
adalah tempat menyimpan data dinamis dari kode langsung atau file external (json/xml)
module services akan di return sebagai objek (array) untuk proses pemanggilan di controller
*/
angular.module(
	'cityGuideKuninganApp.services',
	[
		'angular-cache',
        'angular-md5',
        'base64',
        'ngResource'
	]
)

// Factory module untuk list Side Menu
.factory('SideMenuData', [
function()
{
	var sidemenu = [
		{
			title: 'Pencarian Loka',
			routing: 'main.cari',
			arrow: false,
			icon: 'ion-android-search'
		},
		{
			title: 'Cuaca Kuningan',
			routing: 'main.cuaca',
			arrow: false,
			icon: 'ion-ios-partlysunny'
		},
		{
			title: 'Beranda',
			routing: 'main.home',
			arrow: false,
			icon: 'ion-android-home'
		},
		{
			title: 'Oleh - Oleh Khas',
			routing: 'main.oleh-oleh',
			arrow: false,
			icon: 'ion-bag'
		},
		{
			title: 'Kaos Khas',
			routing: 'main.kaos',
			arrow: false,
			icon: 'ion-tshirt'
		},
		/*{
			title: 'Queue',
			routing: 'main.queue',
			arrow: false
		},*/
		{
			title: 'Pengaturan',
			routing: 'main.setting',
			arrow: false
		},
		{
			title: 'Info Aplikasi',
			routing: 'main.info',
			arrow: true
		},
		{
			title: 'Transaksi',
			routing: 'main.transaction',
			arrow: true
		}
	];

	return {
		all: function()
		{
			return sidemenu;
		}
	}
}])




// Factory Module untuk home menu
.factory("HomeMenu", [
function()
{
	var menuhome = [
		{
			"name": "Oleh - Oleh Khas",
			"slug": "oleh-oleh",
			"icon": "ion-bag",
			"color": "dark",
			"id":false
		},
		{
			"name": "Kaos Khas",
			"slug": "kaos",
			"icon": "ion-tshirt",
			"color": "dark",
			"id":false
		},
		{
			"name": "Bank & ATM",
			"slug": "bank",
			"icon": "ion-cash",
			"color": "balanced",
			"id":"55deb964498eed92947b6270"
		},
		{
			"name": "Wisata",
			"slug": "wisata",
			"icon": "ion-android-map",
			"color": "dark",
			"id":"559b8e19498e070a6079f688"
		},
		{
			"name": "Kuliner",
			"slug": "kuliner",
			"icon": "ion-android-restaurant",
			"color": "dark",
			"id":"559b945a498e451b5529310c"
		},
		{
			"name": "Bensin",
			"slug": "bensin",
			"icon": "ion-waterdrop",
			"color": "assertive",
			"id":"559bb5cd498ea2bbdff48002"
		},
		{
			"name": "Medis",
			"slug": "medis",
			"icon": "ion-medkit",
			"color": "assertive",
			"id":"559ba80b498e451b552d3a61"
		},
		{
			"name": "Terminal",
			"slug": "terminal",
			"icon": "ion-android-bus",
			"color": "dark",
			"id":"559bba76498e2bb3bfd06303"
		},
		{
			"name": "Pasar & Toserba",
			"slug": "pasar",
			"icon": "ion-android-cart",
			"color": "dark",
			"id":"55debc47498eed92947f7406"
		},
		{
			"name": "Penginapan",
			"slug": "penginapan",
			"icon": "ion-bowtie",
			"color": "dark",
			"id":"559bd288498ea2bbdffae9c0"
		},
		{
			"name": "Berita",
			"slug": "berita.pemda",
			"icon": "ion-social-rss",
			"color": "dark",
			"id":false
		},
		{
			"name": "Nomor Penting",
			"slug": "kontak",
			"icon": "ion-ios-telephone",
			"color": "assertive",
			"id":false
		}
	];

	return {
		all: function()
		{
			return menuhome
		}
	}
}])


// Factory Module untuk info aplikasi berupa meta data nama situs, logo, etc
.factory('infoSites',
function()
{
	var data = {
		name: 'City Guide Kuningan',
		domain: 'cityguide.kuninganasri.com',
		description: [
			{'html':'<p>City Guide Kuningan adalah aplikasi untuk panduan wisata Kabupaten Kuningan Jawa Barat.</p>'},
			{'html':'<div>Anda bisa mendapatkan informasi lokasi sekitaran Kuningan dengan dilengkapi:<ul class="normal-list margin-left-20"><li>Pencarian tempat populer,</li><li>Peta Lokasi/Tempat,</li><li>Nomor Bantuan Penting,</li><li>Berita Seputar Kuningan (lokal/nasional),</li><li>Belanja oleh-oleh khas Kuningan,</li><li>Belanja Kaos khas Kuningan.</li></ul></div>'},
			{'html':'<div>Partner official aplikasi City Guide Kuningan:<ul class="normal-list margin-top-0 margin-bottom-0 no-padding margin-left-20"><li><a href="http://kuninganasri.com/cityguide" target="_blank">Kuningan Asri Media</a></li></ul></div>'},
			{'html':'<div>Penggunaan Software Library dalam Aplikasi: <br class="col-mc-show col-xs-show col-ss-show col-sm-hide" /><br class="col-mc-show col-xs-show col-ss-show col-sm-hide" /><a href="#/main/library-info" class="button button-small button-positive position-relative bottom-5 padding-0-5-0-5 important">lihat disini</a></div>'}
		],
		icon: {
			path: 'img/',
			prefix: 'logo',
			suffix: '.png'
		},
		version: 1.2,
		infometa:[
			{
				name: 'author',
				content: 'Ofan Ebob',
				link: false,
				icon: 'ion-android-person'
			},
			{
				name: 'author_url',
				content: 'about.me/ofan',
				link: 'http://about.me/ofan',
				icon: 'ion-link'
			},
			{
				name: 'office',
				content: 'Cigadung, Cigugur, Kuningan',
				link: 'foursquare://venues/51f0146d498e58df96dd1fbb',
				icon: 'ion-home'
			},
			{
				name: 'email',
				content: 'sofandani@gmail.com',
				link: 'mailto:sofandani@gmail.com',
				icon: 'ion-android-mail'
			}
		]
	};

	return {
		all: function()
		{
			return data;
		}
	}
})


// Factory Module untuk home menu
.service("TosMerch", ['$http', '$q',
function($http, $q)
{
	return {
		tos: function(type)
		{
			deferred = $q.defer();

			$http({
				url: 'data/tos.json',
				method: "GET"
			})
			.success(function(data)
			{

				//console.log(data.tos);

				if(type == 'bukalapak')
				{
					data = data.tos.bukalapak;
				}
				else if(type == 'tees')
				{
					data = data.tos.tees;
				}
				else{
					data = data.tos.tees;
				}

				deferred.resolve(data);
			})
			.error(function(data)
			{
				deferred.reject(data)
			})

			return deferred.promise;
		}
	}
}])


// Factory Module untuk list setting aplikasi
.factory('SettingsData', function()
{
	var items = [
		{
			name: 'Simpan Otomatis Data (Cache)',
			value: true
		}
		/*,{
			name: 'Detect Location',
			value: false
		}*/
	];

	return {
		all: function()
		{
			return items;
		}
	}
})



// Factory module untuk generate Foursquare API key secara acak
// Digunakan oleh $http (GET) request di service module Foursquare API
.factory('FoursquareKey', function()
{
	var api_key = [
		{
			"api_id":"P20APVP31JG3U0UJC4ZPWSSWW5GMP4WJ014TA5JAGWYXJBLD",
			"api_secret":"OQIS4CBVG1TNQCRQMWOBHLOCZMCP5ZKPCF1AMXBS13EI5MEE"
		},
		{
			"api_id":"44KWZR2C3HVDWSTGPEOEHFTNA2DHL32BKDCWUJC3HD1ZDHZF",
			"api_secret":"LXSUSXZWIMARWLTVBZT3HVUYOA5RN0SNR1NUJF4AFRQRBWQ4"
		},
		{
			"api_id":"A2BZQ3VFIILKB0KA1BMLV1DXS5M0E3BSNRW1FVDOXI20OELK",
			"api_secret":"OWKK1WFBYICBUBL0VC5UF4UNTHAC0TPE0LY2LJW1C1EYN31I"
		},
		{
			"api_id":"AXXY1AEIL1MVUIS2JKJTSJEMBLKX0IFE223EDVQPZFBR42QB",
			"api_secret":"U5TQYKX3F1CNOVH1PT5QCKSM4WSL2H0NEKXUGRCHTOJTYHIB"
		},
		{
			"api_id":"A4NVEI2FKX3QR5CBC24S4TIKTY1WXWJ2ZSO5VPGLMKARPM0I",
			"api_secret":"QODM2JM2Z4BVZ5DXVI0F2U050DSNEN2B2B5LHTDTOLUD5CFX"
		},
		{
			"api_id":"LOMT3ATHN0ZQDY5B5VRM1RQMIQVH52LRUB1B2QV2BKQ0PJNO",
			"api_secret":"QOW0OJSE5ER5NMGCERGRSFJSIMVOCNQGOQJXSDULQODL5BPD"
		}
	];

	return {
		random: function()
		{
			return shuffle(api_key);
		},
		statis: function()
		{
			return api_key;
		}
	}
})



// Service Module untuk melakukan $http request venue Foursquare
.service("FoursquareAPI", ['$http', '$q', 'md5', 'CacheFactory',
function($http, $q, md5, CacheFactory)
{
  	self.venueDataCache = CacheFactory.get('venueDataCache');

	var apiUrl = 'https://api.foursquare.com/v2/',
	lnglat = '-6.981010299999999,108.4928912',
	limit = '100',
	method = 'venues/explore',
	venuePhotos = 1,
	v = '20150706',
	ExploreCacheKey = 'venueListCache-' + md5.createHash(lnglat);

	//console.log(ExploreCacheKey);

	return {
		listsGroupVenue: function(FsqKey, FsqIDlist, cacheStatus)
		{
			var listsGroupCacheKey = 'venueGroupLists-' + FsqIDlist,
			VenueData = cacheStatus == true ? self.venueDataCache.get(listsGroupCacheKey) : null,
			deferred = $q.defer(),
			clientId = FsqKey.api_id,
			clientSecret = FsqKey.api_secret;

			//console.log(cacheStatus);

			if(VenueData != null && cacheStatus == true)
			{
				deferred.resolve(VenueData);
				//console.log('Cache Venue');
			}
			else
			{
				$http({
					url: apiUrl + 'lists/' + FsqIDlist,
					method: "GET",
					params: {
						client_id: clientId,
						client_secret: clientSecret,
						short: 'nearby',
						m: 'foursquare',
				    	locale: 'id',
						v: v
					}
				})
				.success(function(data)
				{
					if(cacheStatus == true)
					{
				    	self.venueDataCache.put(listsGroupCacheKey, data);
				    }
				    deferred.resolve(data);
					//console.log('HTTP Venue');
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		},
		listsVenueSection: function(FsqKey, cacheStatus)
		{
			var VenueData = cacheStatus == true ? self.venueDataCache.get(ExploreCacheKey) : null,
			deferred = $q.defer(),
			clientId = FsqKey.api_id,
			clientSecret = FsqKey.api_secret;

			//console.log(cacheStatus);

			if(VenueData != null && cacheStatus == true)
			{
				deferred.resolve(VenueData);
				//console.log('Cache Venue');
			}
			else
			{
				$http({
					url: apiUrl + method + '?venuePhotos=' + venuePhotos,
					method: "GET",
					params: {
						client_id: clientId,
						client_secret: clientSecret,
						ll: lnglat,
						limit: limit,
						radius: 20000,
				    	section: 'food',
				    	locale: 'id',
						v: v
					}
				})
				.success(function(data)
				{
					if(cacheStatus == true)
					{
				    	self.venueDataCache.put(ExploreCacheKey, data);
				    }
				    deferred.resolve(data);
					//console.log('HTTP Venue');
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		},
		listsVenueSearch: function(FsqKey, Query, cacheStatus)
		{
			var VenueSearchCacheKey = 'VenueSearchCache-' + md5.createHash(Query),
			VenueData = cacheStatus == true ? self.venueDataCache.get(VenueSearchCacheKey) : null,
			q = $q.defer(),
			clientId = FsqKey.api_id,
			clientSecret = FsqKey.api_secret;
			
			if(VenueData != null && cacheStatus == true)
			{
				q.resolve(VenueData);
				//console.log('Cache Venue');
			}
			else
			{
				$http({
					url: apiUrl + method,
					method: "GET",
					params: {
						venuePhotos: venuePhotos,
						query: Query,
						client_id: clientId,
						client_secret: clientSecret,
						ll: lnglat,
						limit: limit,
						radius: 20000,
						locale: 'id',
						v: v
					}
				})
				.success(function(data)
				{
					if(cacheStatus == true)
					{
				    	self.venueDataCache.put(ExploreCacheKey, data);
				    }
				    q.resolve(data);
					//console.log('HTTP Venue');
				})
				.error(function(data)
				{
					q.reject(data)
				})
			}

			return q.promise;
		},
		getVenue: function(FsqKey, venueId)
		{
			var VenueCacheKey = 'venue-'+venueId,
			deferred = $q.defer(),
			VenueDetailData = self.venueDataCache.get(VenueCacheKey),
			clientId = FsqKey.api_id,
			clientSecret = FsqKey.api_secret;

			if(VenueDetailData != null)
			{
				deferred.resolve(VenueDetailData);
				//console.log('Cache Venue');
			}
			else
			{
				$http({
					url: apiUrl + 'venues/' + venueId,
					method: "GET",
					params: {
						client_id: clientId,
						client_secret: clientSecret,
						v: v
					}
				})
				.success(function(data)
				{
					self.venueDataCache.put(VenueCacheKey, data);
				    deferred.resolve(data);
					//console.log('HTTP Venue');
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		},
		getVenuePhoto: function(FsqKey, cacheStatus, venueId)
		{
			var VenueCacheKey = 'venue-photo-'+venueId,
			deferred = $q.defer(),
			VenueDetailData = cacheStatus == true ? self.venueDataCache.get(VenueCacheKey) : null,
			clientId = FsqKey.api_id,
			clientSecret = FsqKey.api_secret;

			if(VenueDetailData != null && cacheStatus == true)
			{
				deferred.resolve(VenueDetailData);
				//console.log('Cache Venue');
			}
			else
			{
				$http({
					url: apiUrl + 'venues/' + venueId + '/photos',
					method: "GET",
					params: {
						limit: 15,
						client_id: clientId,
						client_secret: clientSecret,
						v: v
					}
				})
				.success(function(data)
				{
					if(cacheStatus == true)
					{
						self.venueDataCache.put(VenueCacheKey, data);
					}
				    deferred.resolve(data);
					//console.log('HTTP Venue');
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		},
		getVenueTips: function(FsqKey, cacheStatus, venueId)
		{
			var VenueCacheKey = 'venue-tips-'+venueId,
			deferred = $q.defer(),
			VenueDetailData = cacheStatus == true ? self.venueDataCache.get(VenueCacheKey) : null,
			clientId = FsqKey.api_id,
			clientSecret = FsqKey.api_secret;

			//console.log(VenueDetailData)

			if(VenueDetailData != null && cacheStatus == true)
			{
				deferred.resolve(VenueDetailData);
				//console.log('Cache Venue');
			}
			else
			{
				$http({
					url: apiUrl + 'venues/' + venueId + '/tips',
					method: "GET",
					params: {
						limit: 15,
						client_id: clientId,
						client_secret: clientSecret,
						v: v
					}
				})
				.success(function(data)
				{
					if(cacheStatus == true)
					{
						self.venueDataCache.put(VenueCacheKey, data);
					}
				    deferred.resolve(data);
					//console.log('HTTP Venue');
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		}
	}
}])



// Factory Module untuk Wunderground API key
// Digunakan untuk $http request Weather Forecast
.factory('WundergroundKey', function()
{
	var data = [
		{
			"api_key":"d4c777b679398c1f"
		},
		{
			"api_key":"af78709edfd4ec2a"
		},
		{
			"api_key":"d99ad94c123332dc"
		},
		{
			"api_key":"884f5119fba8dcca"
		},
		{
			"api_key":"ea3e5444b26c226d"
		},
		{
			"api_key":"fc2b1beb23d8c176"
		},
		{
			"api_key":"44cb362380da55ea"
		}
	];

	return {
		random: function()
		{
			return shuffle(data);
		},
		statis: function()
		{
			return data;
		}
	}
})


// Service Module untuk melakukan $http request info cuaca dari Wunderground
.service("WundergroundAPI", ['$http', '$q', 'md5', 'CacheFactory',
function($http, $q, md5, CacheFactory)
{

  	self.weatherDataCache = CacheFactory.get('weatherDataCache');

  	var apiUrl = 'http://api.wunderground.com/api';

	return {
		forecast: function(WUKey, city)
		{
			var WeatherCacheKey = 'weather-' + md5.createHash(city),
			deferred = $q.defer(),
			WeatherCacheDetail = self.weatherDataCache.get(WeatherCacheKey),
			apiKey = WUKey.api_key;

			if(WeatherCacheDetail)
			{
				deferred.resolve(WeatherCacheDetail);
			}
			else
			{
				$http({
					url: apiUrl + '/' + apiKey + '/conditions/forecast/lang:ID/q/' + city + '.json',
					method: 'GET'
				})
				.success(function(data)
				{
					self.weatherDataCache.put(WeatherCacheKey, data);
					deferred.resolve(data);
					//console.log(data);
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		}
	}
}])


// Service Module untuk melakukan $http request info cuaca dari Wunderground
.service("TeesAPI", ['$http', '$q', 'md5', 'CacheFactory',
function($http, $q, md5, CacheFactory)
{
  	self.TeesDataCache = CacheFactory.get('shopDataCache');

	return {
		store: function(StoreID)
		{
		  	// Default StoreID = '7035'
		  	var apiUrl = 'http://tees.co.id/api/stores/products',
		  	TeesCacheKey = 'tees-' + md5.createHash(StoreID),
			deferred = $q.defer(),
			TeesCacheDetail = self.TeesDataCache.get(TeesCacheKey);

			if(TeesCacheDetail)
			{
				deferred.resolve(TeesCacheDetail);
			}
			else
			{
				$http({
					url: apiUrl,
					params: {
						store_id: StoreID
					},
					method: 'GET'
				})
				.success(function(data)
				{
					self.TeesDataCache.put(TeesCacheKey, data);
					deferred.resolve(data);
					//console.log(data);
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		},
		detailTees: function(idproduct)
		{
		  	// Default StoreID = '7035'
		  	var apiUrl = 'http://tees.co.id/api/products/details',
		  	TeesCacheProductKey = 'teesProduct-' + md5.createHash(idproduct),
			deferred = $q.defer(),
			TeesProductCacheDetail = self.TeesDataCache.get(TeesCacheProductKey);

			if(TeesProductCacheDetail)
			{
				deferred.resolve(TeesProductCacheDetail);
			}
			else
			{
				$http({
					url: apiUrl,
					params: {
						id: idproduct
					},
					method: 'GET'
				})
				.success(function(data)
				{
					self.TeesDataCache.put(TeesCacheProductKey, data);
					deferred.resolve(data);
					//console.log(data);
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		}
	}
}])


// Service Module untuk mengabil data nomor kontak dari file json lokal
.service("NomorKontak", ['$http', '$q',
function($http, $q)
{
	return {
		nomor: function()
		{
			var deferred = $q.defer();
			$http({
				url: 'data/nomor-kontak.json',
				method: 'GET'
			})
			.success(function(data)
			{
				deferred.resolve(data);
				//console.log(data);
			})
			.error(function(data)
			{
				deferred.reject(data)
			})

			return deferred.promise;
		}
	}
}])


.service('NewsData', ['$http', '$q', 'md5', 'CacheFactory',
function($http, $q, md5, CacheFactory)
{
  	self.newsDataCache = CacheFactory.get('newsDataCache');
  	
	return {
		getNews: function(city, cacheStatus)
		{
			var NewsCacheKey = 'news-' + md5.createHash(city),
			deferred = $q.defer(),
			newsCacheDetail = cacheStatus == true ? self.newsDataCache.get(NewsCacheKey) : null;

			//console.log(NewsCacheKey);

			if(newsCacheDetail != null && cacheStatus == true)
			{
				deferred.resolve(newsCacheDetail);
				//console.log('Cache News');
			}
			else
			{
				$http({
					url: 'http://news.google.com/news/section',
					method: 'GET',
					params:
					{
						q: city,
						output: 'rss'
					}
				})
				.success(function(data)
				{
					if(cacheStatus == true)
					{
						self.newsDataCache.put(NewsCacheKey, data);
					}
					deferred.resolve(data);
					//console.log('HTTP News');
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		},
		getNewsBing: function(city, cacheStatus)
		{
			var NewsCacheKey = 'newsbing-' + md5.createHash(city),
			deferred = $q.defer(),
			newsCacheDetail = cacheStatus == true ? self.newsDataCache.get(NewsCacheKey) : null;

			//console.log(NewsCacheKey);

			if(newsCacheDetail != null && cacheStatus == true)
			{
				deferred.resolve(newsCacheDetail);
				//console.log('Cache News');
			}
			else
			{
				$http({
					url: 'https://www.bing.com/news/search',
					method: 'GET',
					params:
					{
						q: city,
						format: 'RSS'
					}
				})
				.success(function(data)
				{
					if(cacheStatus == true)
					{
						self.newsDataCache.put(NewsCacheKey, data);
					}
					deferred.resolve(data);
					//console.log('HTTP News');
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		}
	}
}])


.service('KngAsriData', ['$http', '$q', 'md5', 'CacheFactory',
function($http, $q, md5, CacheFactory)
{
  	self.newsDataCache = CacheFactory.get('newsDataCache');
  	
	return {
		getPostsCategory: function(slug, total)
		{
			NewsCacheKey = 'newslokal-' + md5.createHash(slug),
			deferred = $q.defer(),
			total = total ? total : 10,
			newsCacheDetail = self.newsDataCache.get(NewsCacheKey);

			if(newsCacheDetail != null)
			{
				deferred.resolve(newsCacheDetail);
				//console.log('Cache News');
			}
			else
			{
				$http({
					url: 'http://kuninganasri.com/api',
					method: 'GET',
					params: {
						json: 'get_category_posts',
						count: total,
						slug: slug
					}
				})
				.success(function(data)
				{
					self.newsDataCache.put(NewsCacheKey, data);
					deferred.resolve(data);
					//console.log('HTTP News');
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		}
	}
}])


.service('NewsKuninganKabData', ['$http', '$q', 'md5', 'CacheFactory',
function($http, $q, md5, CacheFactory)
{
	// CATATAN
	// CACHE STATUS HARUS DI DISABLE
	// UNTUK REFRESH DATA
	// DAN DATA HARUS DISIMPAN KETIKA $http REQUEST SUCCESS MELOAD DATA
  	self.newsDataCache = CacheFactory.get('newsDataCache');
  	
	return {
		getNews: function(id, cacheStatus)
		{
			var NewsCacheKey = 'newskab-' + md5.createHash(id),
			deferred = $q.defer(),
			newsCacheDetail = cacheStatus == true ? self.newsDataCache.get(NewsCacheKey) : null;

			//console.log(NewsCacheKey);

			if(newsCacheDetail != null && cacheStatus == true)
			{
				deferred.resolve(newsCacheDetail);
				//console.log('Cache News');
			}
			else
			{
				$http({
					url: 'http://kuningankab.go.id/rss.xml',
					method: 'GET'
				})
				.success(function(data)
				{
					if(cacheStatus == true)
					{
						self.newsDataCache.put(NewsCacheKey, data);
					}
					deferred.resolve(data);
					//console.log('HTTP News');
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		}
	}
}])



.factory('FeedLoader',
['$resource',
function ($resource)
{
    return $resource("http://ajax.googleapis.com/ajax/services/feed/load", {}, {
        fetch: { method: "JSONP", params: {v: "1.0", callback: "JSON_CALLBACK"} }
    })
}])


.service('FeedList',
['$rootScope', 'FeedLoader', '$q',
function ($rootScope, FeedLoader, $q)
{
	var feeds = [];

    this.get = function()
    {
       var deffered = $q.defer();
        var feedSources = [
	        {title: "Official PEMDA Kuningan", url: "http://kuningankab.go.id/rss.xml"},
	        //{title: "Google Search", url: "http://news.google.com/section?q=\"Kabupaten Kuningan\"&output=rss"},
	        //{title: 'Girls Gone Strong', url: 'http://www.girlsgonestrong.com/feed/'},
    	];

	    if (feeds.length === 0)
	    {
	        for (var i=0; i<feedSources.length; i++)
	        {
	            FeedLoader.fetch({q: feedSources[i].url, num: 10}, {},
	            function (data)
	            {
	                var feed = data.responseData.feed;
	                feeds.push(feed);
	      			deffered.resolve(feeds);
	            })
	        }
	    }
	   
	   	return deffered.promise;
	}
}])



/*
 * Service Module untuk melakukan $http request BUKALAPAK API dengan Authentication
 * Terdapat 7 return function:
 * mylapak() - myproduct() - addcart() - updatecart() - deletecart() - checkout() - transaction()
 */
.service("BukalapakAPI", ['$http', '$q', 'md5', '$base64', 'CacheFactory', 'blkey', 'localStorageService',
function($http, $q, md5, $base64, CacheFactory, blkey, localStorageService)
{
  	self.BukalapakDataCache = CacheFactory.get('shopDataCache');

	var credentials = blkey.user + ':' + blkey.token,
	AuthEncode = $base64.encode(credentials),
	localStorageUserSetting = localStorageService.get('userSetting'),
	identityUser = 'cityguide-kuningan-';

	//console.log($base64.encode(identityUser+localStorageUserSetting.email))

	//$http.defaults.headers.common['Authorization'] = 'Basic ' + AuthEncode;

	return {
		mylapak: function(category_id, user_id, per_page, current_page, sort_by, query)
		{
		  	var apiUrl = 'https://api.bukalapak.com/v2/products.json',
			deferred = $q.defer(),
			per_page = per_page ? per_page : 96,
			current_page = current_page ? current_page : 0,
			sort_by = sort_by ? sort_by : 'Terbaru',
			query = query ? query : '',
		  	BukalapakCacheKey = 'bukalapak-' + md5.createHash(category_id+'-'+user_id+'-'+current_page+'-'+query),
			BukalapakCache = self.BukalapakDataCache.get(BukalapakCacheKey);

			if(BukalapakCache)
			{
				deferred.resolve(BukalapakCache);
			}
			else
			{
				$http({
					url: apiUrl,
					method: 'GET',
					params:
					{
						//user_id: user_id,
						keywords: query,
						category_id: category_id,
						sort_by: sort_by,
						per_page: per_page,
						province: 'Jawa Barat',
						city: 'Kuningan'
					},
					headers:
					{
						'Authorization': 'Basic ' + AuthEncode
					}
				})
				.success(function(data)
				{
					// Query length < 1 untuk mencegah penyimpanan data produk setelah pencarian
					// Dan mengizinkan penyimpanan data produk untuk daftar kategori saja
					if(query.length == 0)
					{
						self.BukalapakDataCache.put(BukalapakCacheKey, data);
					}

					deferred.resolve(data);
					//console.log(data);
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		},
		myproduct: function(id, cacheStatus)
		{
		  	// Default StoreID = '7035'
		  	var apiUrl = 'https://api.bukalapak.com/v2/products/'+id+'.json',
		  	BukalapakCacheDetailKey = 'blproduct-' + md5.createHash(id),
			deferred = $q.defer(),
			BukalapakCacheDetail = self.BukalapakDataCache.get(BukalapakCacheDetailKey);

			if(BukalapakCacheDetail && cacheStatus == true)
			{
				deferred.resolve(BukalapakCacheDetail);
			}
			else
			{
				$http({
					url: apiUrl,
					method: 'GET'
				})
				.success(function(data)
				{
					self.BukalapakDataCache.put(BukalapakCacheDetailKey, data);
					deferred.resolve(data);
					//console.log(data);
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		},
		addcart: function(id, qty, cacheStatus)
		{
			console.log(id)

		  	var apiUrl = 'https://api.bukalapak.com/v2/carts/add_product/'+id+'.json',
		  	BukalapakCacheDetailKey = 'blcart-' + id,
			deferred = $q.defer(),
			qty = qty ? qty : 1,
			BukalapakCacheDetail = self.BukalapakDataCache.get(BukalapakCacheDetailKey);

			if(BukalapakCacheDetail && cacheStatus == true)
			{
				BukalapakCacheDetail = angular.merge(BukalapakCacheDetail, {type:'cache'})
				deferred.resolve(BukalapakCacheDetail);
			}
			else
			{
				$http({
					url: apiUrl,
					method: 'POST',
					params:
					{
						identity: $base64.encode(identityUser+localStorageUserSetting.email),
						quantity: qty
					}
				})
				.success(function(data)
				{
					if(cacheStatus == true)
					{
						self.BukalapakDataCache.put(BukalapakCacheDetailKey, data);
					}

					deferred.resolve(data);
					//console.log(data)
				})
				.error(function(data)
				{
					deferred.reject(data)
					//console.log(data)
				})
			}

			return deferred.promise;
		},
		updatecart: function(id, id_cart, qty)
		{
		  	// Default StoreID = '7035'
		  	var apiUrl = 'https://api.bukalapak.com/v2/carts/item/'+id_cart+'.json',
			deferred = $q.defer();

			$http({
				url: apiUrl,
				method: 'PATCH',
				params:
				{
					identity: $base64.encode(identityUser+localStorageUserSetting.email),
					quantity: qty
				}
			})
			.success(function(data)
			{
				/*
				 * Deferred resolve dengan return data status belum diuji coba
				 * Gunakan http return status apakah 200 atau bukan
				 *
				 * CATATAN: Harus diuji coba ulang sebelum di release
				 */
				deferred.resolve(data);
			})
			.error(function(data)
			{
				deferred.reject(data)
			})

			return deferred.promise;
		},
		deletecart: function(id, id_cart)
		{
		  	// Default StoreID = '7035'
		  	var apiUrl = 'https://api.bukalapak.com/v2/carts/item/'+id_cart+'.json',
			deferred = $q.defer();

			$http({
				url: apiUrl,
				method: 'DELETE',
				params:
				{
					identity: $base64.encode(identityUser+localStorageUserSetting.email)
				}
			})
			.success(function(data)
			{
				deferred.resolve(data);
			})
			.error(function(data)
			{
				deferred.reject(data);
			})

			return deferred.promise;
		},
		checkout: function(data)
		{
		  	var apiUrl = 'https://api.bukalapak.com/v2/transactions.json',
		  	BukalapakCacheDetailKey = 'checkout-' + md5.createHash(data.id_cart),
			deferred = $q.defer(),
			qty = qty ? qty : 1,
			BukalapakCacheDetail = self.BukalapakDataCache.get(BukalapakCacheDetailKey);

			if(BukalapakCacheDetail)
			{
				deferred.resolve(BukalapakCacheDetail);
			}
			else
			{
				$http({
					url: apiUrl,
					method: 'POST',
					data: data
				})
				.success(function(data)
				{
					//self.BukalapakDataCache.put(BukalapakCacheDetailKey, data);

					deferred.resolve(data);
					console.log(data);
				})
				.error(function(data)
				{
					deferred.reject(data)
				})
			}

			return deferred.promise;
		},
		shipping: function(id_seller, id_cart, to, to_area)
		{
		  	//https://api.bukalapak.com/v2/carts/20993149/shipping_estimation.json?seller_id=775335&to=Kuningan&to_area=Cikijing
		  	var apiUrl = 'https://api.bukalapak.com/v2/carts/'+id_cart+'/shipping_estimation.json',
			deferred = $q.defer();

			$http({
				url: apiUrl,
				method: 'GET',
				params:
				{
					seller_id: seller_id,
					to: to,
					to_area: to_area
				}
			})
			.success(function(data)
			{
				deferred.resolve(data);
			})
			.error(function(data)
			{
				deferred.reject(data);
			})

			return deferred.promise;
		}
	}
}])




.factory('CountTotalCart',
['CacheFactory',
function(CacheFactory)
{
  self.cartCache = CacheFactory.get('cartDataCache');
  var AngularCache = self.cartCache.keys();
  return AngularCache ? {total:AngularCache.length} : {total:0};
}])



/*
 * PopUpCart adalah fungsi service berupa PopUp ionic
 * untuk menangani interaksi tombol Beli barang sebelum ke keranjang belnja
 */
.service('PopUpCart', ['$ionicPopup', '$rootScope', '$state', 'CacheFactory', 'md5', 'CountTotalCart',
function($ionicPopup, $rootScope, $state, CacheFactory, md5, CountTotalCart)
{
	return {
		add: function(data)
		{
    		$rootScope.quantity = {total: 0}

			$rootScope.data = data;

			$ionicPopup.show({
		      scope: $rootScope,
		      cssClass: 'keranjang-pop',
		      title: 'Masukan Produk Ke Troli',
		      templateUrl: 'templates/box/beli.html',
		      buttons:
		      [
		        {
		          text: 'Belanja',
		          type: 'button-balanced icon-left ion-bag nowrap',
		          onTap: function(e)
		          {
					self.cartCache = CacheFactory.get('cartDataCache');
					
					var cartCacheKey = 'cart-local-'+md5.createHash(data.id),
					remake_data = {
						id: data.id,
						nama: data.nama,
						gambar: data.gambar,
						harga: data.harga,
						total: $rootScope.quantity.total,
						cache: cartCacheKey
					}

					self.cartCache.put(cartCacheKey, remake_data);

					$rootScope.CountTotalCart = CountTotalCart.total;
					//console.log(remake_data)
		          }
		        },
		        {
		          text: 'Keranjang',
		          type: 'button-energized icon-left ion-android-cart nowrap',
		          onTap: function(e)
		          {
					self.cartCache = CacheFactory.get('cartDataCache');
					
					var cartCacheKey = 'cart-local-'+md5.createHash(data.id),
					remake_data = {
						id: data.id,
						nama: data.nama,
						gambar: data.gambar,
						harga: data.harga,
						total: $rootScope.quantity.total,
						cache: cartCacheKey
					}

					self.cartCache.put(cartCacheKey, remake_data);
		            
		            if(self.cartCache.get(cartCacheKey))
		            {
		            	$state.go('main.cart')
		            }
		          }
		        },
		        /*{
		          text: 'Bayar',
		          type: 'button-assertive icon-left ion-cash',
		          onTap: function(e)
		          {
		            //return true;
		            $state.go('main.transaction');
		          }
		        },*/
		        {
		          text: 'Batalkan',
		          type: 'button-gray',
		          onTap: function(e)
		          {
		            return false;
		          }
		        }
		      ]
		    })
		}
	}
}])

.service('PopUpError',
['$rootScope', '$ionicLoading', '$ionicPopup', '$window', '$state',
function($rootScope, $ionicLoading, $ionicPopup, $window, $state)
{
	return {
		show: function(message, buttonText, url)
		{
		    $ionicLoading.hide()

		    var buttonText = buttonText ? buttonText : 'Tutup';

		    $rootScope.code = 404;

		    $ionicPopup.show({
				scope: $rootScope,
				title: "Error",
				template: message,
				buttons:
				[
					{
						text: buttonText,
						type: 'button-assertive',
						onTap: function(e)
						{
							if(url)
							{
								if(url == 'close')
								{
									return false
								}
								else
								{
									$state.go(url)
								}
							}
							else
							{
								$window.history.back()
							}
						}
					}
				]
		    })
		}
	}
}])