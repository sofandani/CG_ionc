// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module(
  'cityGuideKuninganApp',
  [
    'ionic',
    'LocalStorageModule',
    'angular-cache',
    'relativeDate',
    'cityGuideKuninganApp.config',
    'cityGuideKuninganApp.controller',
    'cityGuideKuninganApp.services',
    'cityGuideKuninganApp.constant',
    'cityGuideKuninganApp.directive'
  ]
)

.run([
  '$ionicPlatform', 
  '$rootScope', 
  '$ionicLoading', 
  '$state', 
  '$ionicPopup', 
  'CacheFactory', 
function($ionicPlatform, 
         $rootScope, 
         $ionicLoading, 
         $state, 
         $ionicPopup, 
         CacheFactory)
{
  $ionicPlatform.ready(function()
  {
    if(window.cordova && window.cordova.plugins.Keyboard)
    {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.StatusBar)
    {
      //StatusBar.styleDefault();
      StatusBar.show();
    }


    // Cek koneksi Internet untuk mengakses aplikasi, jika tidak ada maka aplikasi meminta untuk di tutup
    if(window.Connection)
    {
      if(navigator.connection.type == Connection.NONE)
      {
        $ionicPopup.show({
          title: "Internet Error",
          template: "Koneksi internet bermasalah!<br />Aplikasi City Guide Kuningan membutuhkan sumber data secara online untuk menampilkan informasi.",
          buttons:
          [
            {
              text: 'Tutup',
              type: 'button-assertive',
              onTap: function(e)
              {
                navigator.app.exitApp();
              }
            },
          ]
        });
      }
    }


    // Auto Destroy cache with time expire
    CacheFactory("venueDataCache", {storageMode: "localStorage", maxAge: 60 * 60 * 12000, deleteOnExpire: "aggressive"});
    CacheFactory("weatherDataCache", {storageMode: "localStorage", maxAge: 60 * 60 * 1300, deleteOnExpire: "aggressive"});
    //CacheFactory("KeyCache", {storageMode: "localStorage", maxAge: 3600 * 3600 * 10000, deleteOnExpire: "aggressive"});
    CacheFactory("newsDataCache", {storageMode: "localStorage", maxAge: 60 * 60 * 24000, deleteOnExpire: "aggressive"});
    CacheFactory("shopDataCache", {storageMode: "localStorage", deleteOnExpire: "none"});
    CacheFactory("cartDataCache", {storageMode: "localStorage", deleteOnExpire: "none"});
    CacheFactory("TosDataCache", {storageMode: "localStorage", maxAge: 60 * 60 * 512000, deleteOnExpire: "aggressive"});
  })


  // Config back device button
  $ionicPlatform.registerBackButtonAction(function(event)
  {
    if($state.is('main.home'))
    {
      $ionicPopup.show({
        title: 'Konfirmasi',
        template: 'Apakah anda yakin ingin keluar dari aplikasi?',
        buttons:
        [
          {
            text: 'Tidak!',
            type: 'button-balanced',
            onTap: function(e)
            {
              return false;
            }
          },
          {
            text: 'Ya, Keluar',
            type: 'button-assertive',
            onTap: function(e)
            {
              navigator.app.exitApp();
            }
          },
        ]
      })
    }
    else
    {
      navigator.app.backHistory();
    }

    event.preventDefault();
    event.stopPropagation();
  }, 101)


  // Set ionic loading for global $http request
  $rootScope.$on('loading:show', function()
  {
    $ionicLoading.show({
      /*duration: 32000,
      delay: 0,*/
      template: '<ion-spinner icon="spiral" class="spinner-light"></ion-spinner>\n<br/>\nMengambil Data',
      noBackdrop: false
    })
  })

  $rootScope.$on('loading:hide', function()
  {
    $ionicLoading.hide()
  })
}])
/*
Angular CONFIG
adalah berisi pengaturan integrasi API device
juga sebagai konfigurasi router SPA (single page application)
*/

angular.module('cityGuideKuninganApp.config', [])

.config(
[
    '$stateProvider', 
    '$urlRouterProvider', 
    '$ionicConfigProvider', 
    '$httpProvider', 
    '$compileProvider',
    'localStorageServiceProvider',
function($stateProvider,
         $urlRouterProvider,
         $ionicConfigProvider,
         $httpProvider,
         $compileProvider,
         localStorageServiceProvider)
{
    
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|sms|geo|tel|local|foursquare|twitter):/);

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    localStorageServiceProvider
    .setPrefix('cityGuideKuninganApp')
    .setStorageType('localStorage');

    // Set Global Loading untuk $http request di setiap Controller & Services
    $httpProvider.interceptors.push(['$rootScope', function($rootScope)
    {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show')
                return config
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide')
                return response
            }
        }
    }])


// Memulai untuk mengatur Router (URL)
    $stateProvider
    .state('welcome', {
        url : '/welcome',
        cache: false,
        templateUrl: 'templates/page/welcome.html',
        controller: 'WelcomeCtrl'
    })


    $stateProvider
    .state('main', {
        url : '/main',
        templateUrl: 'templates/nav/main-menu.html',
        abstract: true,
        controller: 'MainController'
    })
/*
        .state('main.queue', {
            url : '/queue',
            cache: false,
            views: {
                'main': {
                    templateUrl: 'templates/page/test-queue.html',
                    controller: 'QueueCtrl'
                }
            }
        })
*/

        .state('main.home', {
            url: '/home',
            cache: false,
            views: {
                'main': {
                    templateUrl: 'templates/page/home.html',
                    controller : 'HomePageController'
                }
            }
        })

/* ROUTER for Info */
        .state('main.info', {
            url: '/info',
            views: {
                'main': {
                    templateUrl: 'templates/page/info.html',
                    controller : 'InfoPageController'
                }
            }
        })

/* ROUTER for Info Penggunaan Teknologi & Software */
        .state('main.library-info', {
            url: '/library-info',
            views: {
                'main': {
                    templateUrl: 'templates/page/library-info.html',
                    controller : 'LibraryInfoController'
                }
            }
        })

/* ROUTER for Weather */
        .state('main.cuaca', {
            url: '/cuaca',
            views: {
                'main': {
                    templateUrl: 'templates/page/cuaca.html',
                    controller : 'WeatherCtrl'
                }
            }
        })

/* ROUTER for Setting */
        .state('main.setting', {
            url: '/setting',
            cache: false,
            views: {
                'main': {
                    templateUrl: 'templates/page/setting.html',
                    controller: 'SettingCtrl'
                }
            }
        })

/* ROUTER for Search Venue */
        .state('main.cari', {
             url: '/cari',
             views: {
                 'main': {
                     templateUrl: 'templates/page/cari.html',
                     controller: 'FoursquareSearchCtrl'
                 }
             }
        })

/* ROUTER for Venue Categories */
        .state('main.kategori-loka', {
            url: '/kategori-loka/:listsID',
            views: {
                'main': {
                    templateUrl: 'templates/page/kategori-loka.html',
                    controller: 'FoursquareListsCtrl'
                }
            }
        })

/* ROUTER for Kontak */
        .state('main.kontak', {
            url: '/kontak',
            views: {
                'main': {
                    templateUrl: 'templates/page/kontak.html',
                    controller: 'Kontak'
                }
            }
        })


/* ROUTER for Tees.co.id */
        .state('main.kaos', {
            url: '/kaos',
            cache: false,
            views: {
                'main': {
                    templateUrl: 'templates/page/kaos.html',
                    controller: 'TeesCtrl'
                }
            }
        })

            .state('main.tab-kaos', {
                url: '/infokaos/:id',
                cache: false,
                views: {
                    'main': {
                        templateUrl: 'templates/nav/tabs-kaos.html',
                        controller: 'TabsKaosController'
                    }
                }
            })

                .state('main.tab-kaos.infokaos', {
                    url: '/lengkap',
                    cache: false,
                    views: {
                        'infokaos-tab': {
                            templateUrl: 'templates/tab/tab-kaos.html',
                            controller: 'TeesDetailCtrl'
                        }
                    }
                })

                .state('main.tab-kaos.fotokaos', {
                    url: '/foto',
                    cache: false,
                    views: {
                        'fotokaos-tab': {
                            templateUrl: 'templates/tab/tab-fotokaos.html',
                            controller: 'TeesPhotoCtrl'
                        }
                    }
                })


/* ROUTER for Bukalapak */
        .state('main.oleh-oleh', {
            url: '/oleh-oleh',
            cache: false,
            views: {
                'main': {
                    templateUrl: 'templates/page/oleh-oleh.html',
                    controller: 'BukalapakCtrl'
                }
            }
        })


            .state('main.tab-oleholeh', {
                url: '/infooleholeh/:id',
                cache: false,
                views: {
                    'main': {
                        templateUrl: 'templates/nav/tabs-oleholeh.html',
                        controller: 'TabsBukalapakController'
                    }
                }
            })

                .state('main.tab-oleholeh.info', {
                    url: '/poroduk',
                    cache: false,
                    views: {
                        'infooleholeh-tab': {
                            templateUrl: 'templates/tab/tab-infooleholeh.html',
                            controller: 'BukalapakDetailCtrl'
                        }
                    }
                })

                .state('main.tab-oleholeh.foto', {
                    url: '/foto',
                    cache: false,
                    views: {
                        'fotooleholeh-tab': {
                            templateUrl: 'templates/tab/tab-fotooleholeh.html',
                            controller: 'BukalapakPhotoCtrl'
                        }
                    }
                })


/* ROUTER for BERITA */
        .state('main.berita', {
            url: '/berita',
            cache: false,
            views: {
                'main': {
                    templateUrl: 'templates/nav/tabs-berita.html',
                    //controller: 'TabsNewsController'
                }
            }
        })

            .state('main.berita.nasional', {
                url: '/nasional',
                cache: false,
                views: {
                    'berita-nasional': {
                        templateUrl: 'templates/tab/tab-berita-nasional.html',
                        controller: 'NewsCtrl'
                    }
                }
            })

            .state('main.berita.pemda', {
                url: '/pemda',
                cache: false,
                views: {
                    'berita-pemda': {
                        templateUrl: 'templates/tab/tab-berita-pemda.html',
                        controller: 'NewsKuninganKabCtrl'
                    }
                }
            })

            .state('main.berita.lokal-travel', {
                url: '/lokal-travel/:channel/:total',
                cache: false,
                views: {
                    'berita-lokal-travel': {
                        templateUrl: 'templates/tab/tab-berita-lokal.html',
                        controller: 'KngAsriNewsCtrl'
                    }
                }
            })

            .state('main.berita.baca-berita-nasional', {
                url: '/baca-berita/:newsLink',
                cache: false,
                views: {
                    'berita-nasional': {
                        templateUrl: 'templates/page/loadurl.html',
                        controller: 'NasionalNewsDetailCtrl'
                    }
                }
            })

            .state('main.berita.baca-berita-pemda', {
                url: '/baca-berita-pemda/:newsLink',
                cache: false,
                views: {
                    'berita-pemda': {
                        templateUrl: 'templates/page/loadurl.html',
                        controller: 'NewsKuninganKabDetailCtrl'
                    }
                }
            })

            .state('main.berita.baca-berita-lokal-travel', {
                url: '/baca-berita-travel/:newsLink',
                cache: false,
                views: {
                    'berita-lokal-travel': {
                        templateUrl: 'templates/page/loadurl.html',
                        controller: 'LokalNewsDetailCtrl'
                    }
                }
            })


/* ROUTER for Venue Tab */
        .state('main.tabs', {
            url: '/tabs/category/:listsID/:venueId',
            cache: false,
            views: {
                'main': {
                    templateUrl: 'templates/nav/tabs-venue.html',
                    controller : 'TabsFoursquareCtrl'
                }
            }
        })
            .state('main.tabs.venue', {
                url: '/venue',
                cache: false,
                views: {
                    'venue-tab': {
                        templateUrl: 'templates/tab/tab-venue.html',
                        controller: 'FoursquareDetailCtrl'
                    }
                }
            })
            .state('main.tabs.venue-photo', {
                url: '/photos',
                cache: false,
                views: {
                    'photo-tab': {
                        templateUrl: 'templates/tab/tab-foto.html',
                        controller: 'FoursquarePhotosCtrl'
                    }
                }
            })
            .state('main.tabs.venue-map', {
                url: '/map',
                cache: false,
                views: {
                    'map-tab': {
                        templateUrl: 'templates/tab/tab-peta.html',
                        controller: 'FoursquareMapCtrl'
                    }
                }
            })


/* ROUTER for Venue Tips */
        .state('main.tabs.venue-tips', {
            url: '/tips/:venueName',
            views: {
                'venue-tab': {
                    templateUrl: 'templates/page/venue-tips.html',
                    controller: 'FoursquareTipsCtrl'
                }
            }
        })


/* ROUTER for T.O.S */
        .state('main.tab-oleholeh.tos', {
            url: '/tos/:typetos',
            cache: false,
            views: {
                'infooleholeh-tab': {
                    templateUrl: 'templates/page/terms-transaction.html',
                    controller: 'TosBuyer'
                }
            }
        })
        .state('main.tab-kaos.tos', {
            url: '/tos/:typetos',
            cache: false,
            views: {
                'infokaos-tab': {
                    templateUrl: 'templates/page/terms-transaction.html',
                    controller: 'TosBuyer'
                }
            }
        })


/* ROUTER for T.O.S */
        .state('main.bl-buy', {
            url: '/:id/buy/:key',
            cache: false,
            views: {
                'main': {
                    templateUrl: 'templates/page/bayar.html',
                    controller: 'BuyController'
                }
            }
        })
        .state('main.tees-buy', {
            url: '/:id/buy/:key',
            cache: false,
            views: {
                'main': {
                    templateUrl: 'templates/page/bayar.html',
                    controller: 'BuyController'
                }
            }
        })
        .state('main.tab-oleholeh.buy', {
            url: '/buy/:key',
            cache: false,
            views: {
                'infooleholeh-tab': {
                    templateUrl: 'templates/page/bayar.html',
                    controller: 'BuyController'
                }
            }
        })
        .state('main.tab-kaos.buy', {
            url: '/buy/:key',
            cache: false,
            views: {
                'infokaos-tab': {
                    templateUrl: 'templates/page/bayar.html',
                    controller: 'BuyController'
                }
            }
        })


/* ROUTER for Transactions */        
    .state('main.transaction', {
        url: '/transaction',
        cache: false,
        views: {
            'main': {
                templateUrl: 'templates/page/transaction.html',
                controller: 'TransactionCtrl'
            }
        }
    })


/* ROUTER for Transactions */        
    .state('main.cart', {
        url: '/cart',
        cache: false,
        views: {
            'main': {
                templateUrl: 'templates/page/keranjang.html',
                controller: 'CartController'
            }
        }
    })

    .state('main.kasir', {
        url: '/kasir/:id/:total',
        cache: false,
        views: {
            'main': {
                templateUrl: 'templates/page/kasir.html',
                controller: 'CartDetailController'
            }
        }
    })


/* Set Default Router */
    $urlRouterProvider.otherwise('/welcome');
}]);

angular.module(
	'cityGuideKuninganApp.constant',
	[
		'angular-cache',
        'angular-md5',
        'base64'
	]
)

.constant('blkey',
{
    user: '775335',
    token: 'wnFfeo4fDro5jaqRvan'
})

/*.provider('bar', ['blkey', function(foo)
{
	this.data = {
		message: foo.message + ' World!'
	}

	this.$get = function()
	{
		return this.data;
	}
}])*/
// Persiapkan plugin yang akan di gunakan di angular
angular.module(
  'cityGuideKuninganApp.controller',
  [
    'ionic',
    'angular-cache',
    'angular-md5',
    'base64',
    'ngMap'
  ]
)



.controller('WelcomeCtrl',
['$state', '$ionicLoading', '$ionicHistory', '$timeout',
function($state, $ionicLoading, $ionicHistory, $timeout)
{
  $ionicLoading.hide()

  $ionicHistory.nextViewOptions({
     disableBack: true
  })

  $timeout(function()
  {
    $state.go('main.home')
  },
  2000)
}])




// Controller untuk halaman utama
.controller('MainController',
['$scope', 'SideMenuData', 'infoSites', '$ionicPopup', '$http', 'CountTotalCart',
function($scope, SideMenuData, infoSites, $ionicPopup, $http, CountTotalCart)
{
  var info_site = infoSites.all();

  $scope.mainmenudata = SideMenuData.all();

  $scope.info_site = info_site;

  $scope.navTitle = info_site.name;

  $scope.CountTotalCart = CountTotalCart;

  $scope.TutupAplikasi = function()
  {
    $ionicPopup.show({
      title: 'Konfirmasi',
      template: 'Apakah anda yakin ingin keluar dari aplikasi?',
      buttons:
      [
        {
          text: 'Tidak!',
          type: 'button-balanced',
          onTap: function(e)
          {
            return false;
          }
        },
        {
          text: 'Ya, Keluar',
          type: 'button-assertive',
          onTap: function(e)
          {
            if (window.cordova)
            {
              navigator.app.exitApp()
            }
            else
            {
              this.close()
            }
          }
        }
      ]
    })
  }
}])



// Controller untuk Halaman depan
.controller('HomePageController',
['$scope', 'infoSites', 'HomeMenu', '$ionicLoading',
function($scope, infoSites, HomeMenu, $ionicLoading)
{
  var info_site = infoSites.all();

  $scope.navTitle = info_site.name;

  //$scope.menuhome = HomeMenu.all();
  $scope.HomeInit = function()
  {
    $scope.menuhome = HomeMenu.all()
  }

  /*$scope.leftButtons = [{
      type: 'button-icon icon ion-navicon',
      tap: function(e)
      {
          $scope.toggleLeft();
      }
  }];*/
}])



/*
// Controller untuk Halaman depan
.controller('HomePageCtrlQueue', [ '$scope', 'infoSites', '$http', '$q', 'md5', 'CacheFactory',
function($scope, infoSites, $http, $q, md5, CacheFactory)
{
    $scope.HomeInit = function()
    {
      var HomeQueue = {};
      self.weatherDataCache = CacheFactory.get('weatherDataCache');
      var WeatherCacheKey = 'weather-' + md5.createHash('kuningan'),
      WeatherCacheDetail = self.weatherDataCache.get(WeatherCacheKey);

      var menu = $http.get("data/menu.json").success(function(data){console.log(data)}),
      cuaca = WeatherCacheDetail ? WeatherCacheDetail : null;
      
      $q.all([menu, cuaca]).then(function(httpResultArray)
      { 
        $scope.HomeQueue = [httpResultArray[0].data, httpResultArray[1]];
        console.log($scope.HomeQueue)
      })
    }

    var info_site = infoSites.all();

    $scope.navTitle = info_site.name;
    $scope.navIcon = '<img src="' + info_site.icon + '" />';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e)
        {
          $scope.toggleLeft();
        }
    }];
}])
*/




// Controller untuk Halaman Info
.controller('LibraryInfoController',
[ '$scope',
function($scope)
{
  var library_info = {
    list:
    [
      {txt:'NodeJS'},
      {txt:'AngularJS'},
      {txt:'Android SDK'},
      {txt:'Apache Ant'},
      {txt:'Cordova'},
      {txt:'Crosswalk'},
      {txt:'PHP Desktop'},
      {txt:'Ionic'},
      {txt:'Sass'},
      {txt:'GruntJS'},
      {txt:'GulpJS'},
      {txt:'Foursquare API'},
      {txt:'Wunderground API'},
      {txt:'Google RSS API'},
      {txt:'Tees.co.id API'},
      {txt:'Bukalapak API'}
    ]
  }

  $scope.library_info = library_info.list;
}])




// Controller untuk Halaman Info
.controller('InfoPageController',
[ '$scope', '$state', 'infoSites',
function($scope, $state, infoSites)
{
  $scope.info_site = infoSites.all();

  $scope.leftButtons = [{
      type: 'button-icon icon ion-navicon',
      tap: function(e)
      {
          $scope.toggleLeft();
      }
  }];
}])



// Controller untuk Halaman Setting
// Loop & Handling setting value saved
.controller('SettingCtrl',
['$scope', 'SettingsData', 'localStorageService', 'CacheFactory', '$ionicPopup', '$ionicLoading', '$timeout',
function($scope, SettingsData, localStorageService, CacheFactory, $ionicPopup, $ionicLoading, $timeout)
{
  $scope.settingsList = SettingsData.all();

  if (localStorageService.get('settingsList'))
  {
    $scope.settingsList = localStorageService.get('settingsList');
  }

  //console.log($scope.settingsList);
  //$scope.cache_info = CacheFactory.info();

  $scope.saveSettings = function()
  {
    localStorageService.remove('settingsList')
    localStorageService.set('settingsList',$scope.settingsList)
  }

  $scope.hapusCache = function()
  {
    $ionicPopup.show({
      title: 'Menghapus Data Aplikasi',
      template: 'Anda yakin ingin menghapus semua data penyimpanan Aplikasi?<br />Termasuk daftar barang yang ada di troli/keranjang belanja anda.',
      buttons:
      [
        {
          text: 'Batalkan',
          type: 'button-balanced',
          onTap: function(e)
          {
            return false;
          }
        },
        {
          text: 'Ya, Hapus',
          type: 'button-assertive',
          onTap: function(e)
          {
            $ionicLoading.show({
               template: '<ion-spinner icon="spiral" class="spinner-light"></ion-spinner>\n<br/>\nMenghapus Data Penyimpanan'
            })

            $timeout(function()
            {
              $ionicLoading.hide()

              localStorageService.clearAll()

              CacheFactory.clearAll()
            },
            2000)
          }
        }
      ]
    })
  }

  if(localStorageService.get('userSetting'))
  {
    $scope.setting = localStorageService.get('userSetting');
  }
  else
  {
    $scope.setting = {};
  }

  $scope.simpanDataPribadi = function()
  {
    localStorageService.remove('userSetting')
    localStorageService.set('userSetting', $scope.setting)

    $scope.setting = $scope.setting;
    
    //console.log($scope.setting)

    $ionicLoading.show({
       template: '<ion-spinner icon="spiral" class="spinner-light"></ion-spinner>\n<br/>\nMenyimpan Data Informasi'
    })

    $timeout(function()
    {
      $ionicLoading.hide()
    },
    2000)
  }
}])



// Controller untuk Halaman Menu Tabs
.controller('TabsFoursquareCtrl',
[ '$scope', '$state', '$stateParams',
function($scope, $state, $stateParams)
{
  $scope.CityName = 'Kuningan';
  $scope.listid = $stateParams.listsID;

  $scope.leftButtons = [{
      type: 'button-icon icon ion-navicon',
      tap: function(e)
      {
          $scope.toggleLeft();
      }
  }];
}])



// Controller untuk Halaman Daftar Venue
// Looping Foursqaure data json from API service
.controller('FoursquareSearchCtrl',
['$scope', '$http', 'FoursquareAPI', 'FoursquareKey', 'SettingsData', 'localStorageService', 'PopUpError',
function($scope, $http, FoursquareAPI, FoursquareKey, SettingsData, localStorageService, PopUpError)
{
    $scope.settingsList = SettingsData.all();
    $scope.settingsList = localStorageService.get('settingsList') ? localStorageService.get('settingsList')[1].value : false;

    var doSearchVenue = ionic.debounce(function(query)
    {
      if(query.length >= 3)
      {
        FoursquareAPI.listsVenueSearch(FoursquareKey.random()[0], query, $scope.settingsList)
        .then(function(data)
        {
            $scope.venue = data.response.groups[0].items;
            $scope.code = data.meta.code;
            //console.log(data);
        },
        function errorCallback(response)
        {
          $scope.code = 404;

          PopUpError.show('Gagal Menampilkan Loka','Tutup',false)
        })
      }
      else
      {
          $scope.code = 500;
      }
    }, 400);
    
    $scope.search_venue = function()
    {
      //console.log($scope.query);
      doSearchVenue($scope.query);
    }

    $scope.RatingClass = function(value)
    {
        return ratingColor(value);
    }
}])



// Controller untuk Halaman Daftar Venue
// Looping Foursqaure data json from API service
.controller('FoursquareListsCtrl',
['$scope', '$stateParams', '$http', 'FoursquareAPI', 'FoursquareKey', 'SettingsData', 'CacheFactory', 'PopUpError',
function($scope, $stateParams, $http, FoursquareAPI, FoursquareKey, SettingsData, CacheFactory, PopUpError)
{
    $scope.settingsList = SettingsData.all() ? SettingsData.all()[0].value : false;

    var ListsID = $stateParams.listsID,
    spotName = {};

    FoursquareAPI.listsGroupVenue(FoursquareKey.random()[0], ListsID, $scope.settingsList)
    .then(function(data)
    {
        $scope.venue = data.response.list.listItems.items;
        $scope.spotName = data.response.list.name;
        $scope.code = data.meta.code;
        $scope.listid = ListsID;
        //console.log(data);
    },
    function errorCallback(response)
    {
      PopUpError.show("Gagal Menampilkan Produk")
    })

    $scope.RatingClass = function(value)
    {
        return ratingColor(value);
    }

    $scope.VenueListsRefresh = function()
    {
      // Menghapus Data Cache Sebelum me-reload data baru
      if($scope.settingsList == true)
      {
        self.venueDataCache = CacheFactory.get('venueDataCache');
        var listsGroupCacheKey = 'venueGroupLists-' + ListsID;
        venueDataCache.remove(listsGroupCacheKey);
      }

      FoursquareAPI.listsGroupVenue(FoursquareKey.random()[0], ListsID, $scope.settingsList)
      .then(function(data)
      {
          $scope.venue = data.response.list.listItems.items;
          $scope.spotName = data.response.list.name;
          $scope.code = data.meta.code;
          $scope.listid = ListsID;
          $scope.$broadcast('scroll.refreshComplete');
          //console.log(data);
      },
      function errorCallback(response)
      {
        PopUpError.show("Gagal Menampilkan Produk")
      })
    }
}])



// Controller untuk Halaman Detail Venue
.controller('FoursquareDetailCtrl',
['$scope', '$stateParams', 'FoursquareAPI', 'FoursquareKey', 'PopUpError',
function($scope, $stateParams, FoursquareAPI, FoursquareKey, PopUpError)
{
  var venueId = $stateParams.venueId,
  venueName = {};

  FoursquareAPI.getVenue(FoursquareKey.random()[0], venueId)
  .then(function(data)
  {
      $scope.code = data.meta.code;
      $scope.venue = data.response.venue;
      $scope.photo = data.response.venue.photos.groups.length > 0 ? shuffle(data.response.venue.photos.groups[0].items) : null;
      $scope.venuename = $scope.code == 200 ? $scope.venue.name : 'Error';
      //$scope.listid = $stateParams.listsID;
      //console.log($scope.photo);
  },
  function errorCallback(response)
  {
    PopUpError.show("Gagal Menampilkan Loka")
  })

  $scope.RatingClass = function(value)
  {
      return ratingColor(value);
  }
}])



// Controller untuk Halaman Detail Venue
.controller('FoursquareMapCtrl',
['$scope', '$stateParams', 'CacheFactory', '$ionicLoading', 
function($scope, $stateParams, CacheFactory, $ionicLoading)
{
  $ionicLoading.show({
    duration: 3000,
    delay: 0,
    template: '<ion-spinner icon="spiral" class="spinner-light"></ion-spinner>\n<br/>\nMencari Lokasi',
    noBackdrop: false
  })

  var venueId = $stateParams.venueId,
  VenueCacheKey = 'venue-'+venueId,
  venueDataCache = CacheFactory.get('venueDataCache'),
  Venue = venueDataCache.get(VenueCacheKey);
  $scope.venue = Venue.response.venue;
  //console.log($scope.venue);
}])



// Controller untuk Halaman Foto-Foto Venue
.controller('FoursquarePhotosCtrl',
['$scope', '$stateParams', 'FoursquareAPI', 'FoursquareKey', 'SettingsData', 'localStorageService', '$ionicModal', 'PopUpError', 
function($scope, $stateParams, FoursquareAPI, FoursquareKey, SettingsData, localStorageService, $ionicModal, PopUpError)
{
  $scope.settingsList = SettingsData.all();
  $scope.settingsList = localStorageService.get('settingsList') ? localStorageService.get('settingsList')[1].value : false;
  
  var venueId = $stateParams.venueId;
  $scope.venueName = 'Foto di ' + $stateParams.venueName;

  //console.log($stateParams);
  $scope.loadFotoVenue = function()
  {
    FoursquareAPI.getVenuePhoto(FoursquareKey.random()[0], $scope.settingsList, venueId)
    .then(function(data)
    {
      $scope.photos = data.response.photos.items;
      $scope.code = data.meta.code;
      //console.log($scope.photos);
    },
    function errorCallback(response)
    {
      PopUpError.show("Gagal Menampilkan Foto Loka")
    })
  }

  $scope.bukaFoto = function(file, tanggal, pengirim) {
    $scope.foto = {
      file: file,
      tanggal: tanggal,
      pengirim: pengirim
    }

    $scope.showModal('templates/box/foto-venue.html');
  }
   
  $scope.showModal = function(templateUrl)
  {
    $ionicModal.fromTemplateUrl(templateUrl,
    {
      scope: $scope
    })
    .then(function(modal)
    {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }
   
  $scope.tutupFoto = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  }
}])



// Controller untuk Halaman Tips-tips user Venue
.controller('FoursquareTipsCtrl',
['$scope', '$stateParams', 'FoursquareAPI', 'FoursquareKey', 'SettingsData', 'CacheFactory', 'PopUpError',
function($scope, $stateParams, FoursquareAPI, FoursquareKey, SettingsData, CacheFactory, PopUpError)
{
  $scope.settingsList = SettingsData.all().length > 0 ? SettingsData.all()[0].value : false;
  
  var venueId = $stateParams.venueId;
  $scope.venueName = 'Tips ' + $stateParams.venueName;
  //console.log($stateParams);

  FoursquareAPI.getVenueTips(FoursquareKey.random()[0], $scope.settingsList, venueId)
  .then(function(data)
  {
    $scope.tips = data.response.tips.items;
    $scope.code = 200;
  },
  function errorCallback(response)
  {
    PopUpError.show("Gagal Menampilkan Tips Loka")
  })

  $scope.tipsVenueRefresh = function()
  {
    // Menghapus Data Cache Sebelum me-reload data baru
    if($scope.settingsList == true)
    {
      self.venueDataCache = CacheFactory.get('venueDataCache');
      var tipsCacheKey = 'venue-tips-'+venueId;
      venueDataCache.remove(tipsCacheKey);
    }

    FoursquareAPI.getVenueTips(FoursquareKey.random()[0], $scope.settingsList, venueId)
    .then(function(data)
    {
      $scope.tips = data.response.tips.items;
      $scope.code = 200;
      $scope.$broadcast('scroll.refreshComplete');
    },
    function errorCallback(response)
    {
      PopUpError.show("Gagal Menampilkan Tips Loka")
    })
  }
}])



// Controller untuk Halaman Cuaca
.controller('WeatherCtrl',
['$scope', '$stateParams', 'WundergroundAPI', 'WundergroundKey', 'PopUpError',
function($scope, $stateParams, WundergroundAPI, WundergroundKey, PopUpError)
{
  WundergroundAPI.forecast(WundergroundKey.random()[0], 'Kuningan')
  .then(function(data)
  {
    $scope.weather = data.current_observation;
    $scope.forecast = data.forecast;
    $scope.code = 200;
    //console.log(data);
  },
  function errorCallback(response)
  {
    PopUpError.show("Gagal Menampilkan Cuaca")
  })
}])



// Controller untuk Halaman Menu Berita
/*.controller('TabsNewsController', [ '$scope', '$state', 
  function($scope, $state)
  {
    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e)
        {
            $scope.toggleLeft();
        }
    }];
}])*/



// Controller untuk Halaman Berita Lokal
.controller('KngAsriNewsCtrl',
['$scope', '$stateParams', 'KngAsriData', 'md5', 'CacheFactory', 'PopUpError',
function($scope, $stateParams, KngAsriData, md5, CacheFactory, PopUpError)
{
  var paramCat = $stateParams.channel;
  var paramCount = $stateParams.total;

  $scope.channel = paramCat;
  $scope.total = paramCount;

  KngAsriData.getPostsCategory(paramCat, paramCount)
  .then(function(data)
  {
    $scope.news = data;
    $scope.judul = data.category.title+' Kuningan';
    $scope.code = 200;
    console.log($scope.news);
  },
  function errorCallback(response)
  {
    PopUpError.show("Gagal Menampilkan Produk")
  })

  $scope.LocalNewsRefresh = function()
  {
    // Menghapus Data Cache Sebelum me-reload data baru
    self.NewsDataCache = CacheFactory.get('newsDataCache');
    var NewsCacheKey = 'newslokal-' + md5.createHash(paramCat);
    NewsDataCache.remove(NewsCacheKey);

    KngAsriData.getPostsCategory(paramCat, paramCount)
    .then(function(data)
    {
      $scope.news = data;
      $scope.judul = data.category.title+' Kuningan';
      $scope.code = 200;
      $scope.$broadcast('scroll.refreshComplete');
    },
    function errorCallback(response)
    {
      PopUpError.show("Gagal Menampilkan Berita")
    })
  }
}])



// Controller untuk Halaman Detail Berita (berdasarkan URL)
.controller('LokalNewsDetailCtrl',
['$scope', '$stateParams', '$base64', '$sce', '$window',
function($scope, $stateParams, $base64, $sce, $window)
{
  var UnpackURL = $scope.decoded = $base64.decode($stateParams.newsLink);
  $scope.URL = $sce.trustAsResourceUrl(UnpackURL);
  $scope.URLtitleLoader = 'Baca Berita Lokal';
}])



// Controller untuk Halaman Berita Nasional
.controller('NewsCtrl',
['$scope', '$stateParams', 'NewsData', 'SettingsData', 'md5', 'CacheFactory', 'PopUpError',
function($scope, $stateParams, NewsData, SettingsData, md5, CacheFactory, PopUpError)
{
  $scope.settingsList = SettingsData.all() ? SettingsData.all()[0].value : false;
  
  $scope.CityName = 'Kuningan';
  var CityNewsID = '"Kabupaten Kuningan"';

  NewsData.getNews(CityNewsID, $scope.settingsList)
  .then(function(data)
  {
    $scope.news = x2js.xml_str2json(data);
    $scope.code = 200;
    //console.log($scope.news);
  },
  function errorCallback(response)
  {
    PopUpError.show("Gagal Menampilkan Berita")
  })

  $scope.newsRefresh = function()
  {
    // Menghapus Data Cache Sebelum me-reload data baru
    if($scope.settingsList == true)
    {
      self.NewsDataCache = CacheFactory.get('newsDataCache');
      var NewsCacheKey = 'news-' + md5.createHash(CityNewsID);
      NewsDataCache.remove(NewsCacheKey);
    }

    NewsData.getNews(CityNewsID)
    .then(function(data)
    {
      $scope.news = x2js.xml_str2json(data);
      $scope.code = 200;

      $scope.$broadcast('scroll.refreshComplete');
    },
    function errorCallback(response)
    {
      PopUpError.show("Gagal Menampilkan Berita")
    })
  }
}])



// Controller untuk Halaman Detail Berita (berdasarkan URL)
.controller('NasionalNewsDetailCtrl',
['$scope', '$stateParams', '$base64', '$sce',
function($scope, $stateParams, $base64, $sce)
{
  var UnpackURL = $scope.decoded = $base64.decode($stateParams.newsLink);
  $scope.URL = $sce.trustAsResourceUrl(UnpackURL);
  $scope.URLtitleLoader = 'Baca Berita Nasional';
}])



// Controller untuk Halaman Berita Nasional
.controller('NewsKuninganKabCtrl',
['$scope', '$stateParams', 'NewsKuninganKabData', 'SettingsData', 'md5', 'CacheFactory', 'PopUpError',
function($scope, $stateParams, NewsKuninganKabData, SettingsData, md5, CacheFactory, PopUpError)
{
  $scope.settingsList = SettingsData.all() ? SettingsData.all()[0].value : false;
  
  $scope.NewsTitle = 'Official Pemerintahan Kuningan';
  var idCache = 'kuningankab.go.id';

  NewsKuninganKabData.getNews(idCache, $scope.settingsList)
  .then(function(data)
  {
    $scope.news = x2js.xml_str2json(data);

    console.log($scope.news )

    $scope.code = 200;
    //console.log($scope.news);
  },
  function errorCallback(response)
  {
    PopUpError.show("Gagal Menampilkan Berita")
  })

  $scope.newsRefresh = function()
  {
    // Menghapus Data Cache Sebelum me-reload data baru
    if($scope.settingsList == true)
    {
      self.NewsDataCache = CacheFactory.get('newsDataCache');
      var NewsCacheKey = 'newskab-' + md5.createHash(idCache);
      NewsDataCache.remove(NewsCacheKey);
    }

    NewsKuninganKabData.getNews(idCache, $scope.settingsList)
    .then(function(data)
    {
      $scope.news = x2js.xml_str2json(data);
      $scope.code = 200;

      $scope.$broadcast('scroll.refreshComplete');
    },
    function errorCallback(response)
    {
      PopUpError.show("Gagal Menampilkan Berita")
    })
  }
}])



// Controller untuk Halaman Detail Berita (berdasarkan URL)
.controller('NewsKuninganKabDetailCtrl',
['$scope', '$stateParams', '$base64', '$sce',
function($scope, $stateParams, $base64, $sce)
{
  var UnpackURL = $scope.decoded = $base64.decode($stateParams.newsLink);
  $scope.URL = $sce.trustAsResourceUrl(UnpackURL);
  $scope.URLtitleLoader = 'Baca Berita Pemda';
}])



// Controller untuk Halaman Daftar Nomor Telefon
// Looping Nomor Kontak data json
.controller('Kontak',
['$scope', '$http', 'NomorKontak',
function($scope, $http, NomorKontak){

    NomorKontak.nomor()
    .then(function(data)
    {
        $scope.nomor_kontak = data.kontak[1].data;
        $scope.nomor_prefix = data.kontak[0].prefix;
        //console.log($scope.kontak);
    })
}])



// Controller untuk Halaman Menu Berita
.controller('TabsKaosController',
[ '$scope', '$state', 
function($scope, $state)
{
  $scope.leftButtons = [{
      type: 'button-icon icon ion-navicon',
      tap: function(e)
      {
          $scope.toggleLeft();
      }
  }];
}])



// Controller untuk List Tees Product
.controller('TeesCtrl',
['$scope', '$stateParams', 'TeesAPI', 'PopUpError',
function($scope, $stateParams, TeesAPI, PopUpError)
{
  $scope.TeesInit = function()
  {
    TeesAPI.store('7035')
    .then(function(data)
    {
      $scope.tees = data.products;
      //console.log(data);
    },
    function errorCallback(response)
    {
      PopUpError.show("Gagal Menampilkan Kaos")
    })
  }
}])



// Controller untuk Detail Tees Product
.controller('TeesDetailCtrl',
['$scope', '$stateParams', 'TeesAPI', 'PopUpError',
function($scope, $stateParams, TeesAPI, PopUpError)
{
  var idproduct = $stateParams.id;

  TeesAPI.detailTees(idproduct)
  .then(function(data)
  {
    $scope.tees = data;
    $scope.nama_kaos = data.name;
    //console.log(data);
  },
  function errorCallback(response)
  {
    PopUpError.show("Gagal Menampilkan Kaos")
  })
}])



// Controller untuk Detail Tees Product
.controller('TeesPhotoCtrl',
['$scope', '$stateParams', 'md5', 'CacheFactory',
function($scope, $stateParams, md5, CacheFactory)
{
  $scope.loadFotoTees = function()
  {
    var idproduct = $stateParams.id,
    TeesCacheKey = 'teesProduct-' + md5.createHash(idproduct),
    TeesDataCache = CacheFactory.get('shopDataCache'),
    Tees = TeesDataCache.get(TeesCacheKey);
    $scope.tees = Tees ? Tees : null;
    //console.log($scope.tees);
  }
}])



// Controller untuk Halaman Menu Berita
.controller('TabsBukalapakController', [ '$scope', '$state', 
  function($scope, $state)
  {
    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e)
        {
            $scope.toggleLeft();
        }
    }];
}])



// Controller untuk Detail Tees Product
.controller('BukalapakPhotoCtrl',
['$scope', '$stateParams', 'md5', 'CacheFactory',
function($scope, $stateParams, md5, CacheFactory)
{
  $scope.loadFotoBukalapak = function()
  {
    var idproduct = $stateParams.id,
    BukalapakCacheKey = 'blproduct-' + md5.createHash(idproduct),
    BukalapakDataCache = CacheFactory.get('shopDataCache'),
    Bukalapak = BukalapakDataCache.get(BukalapakCacheKey);
    $scope.bukalapak = Bukalapak ? Bukalapak.product : null;
    //console.log($scope.tees);
  }
}])



// Controller untuk Detail Tees Product
.controller('TosBuyer', ['$scope', '$stateParams', 'TosMerch',
function($scope, $stateParams, TosMerch)
{
  var type = $stateParams.typetos;

  TosMerch.tos(type)
  .then(function(data)
  {
    $scope.info = data;
    //console.log(data);
  })
}])



// Controller untuk List Tees Product
.controller('BukalapakCtrl',
['$scope', '$rootScope', '$stateParams', 'BukalapakAPI', 'PopUpCart', 'PopUpError', 'localStorageService',
function($scope, $rootScope, $stateParams, BukalapakAPI, PopUpCart, PopUpError, localStorageService)
{
  localStorageUserSetting = localStorageService.get('userSetting');

  //console.log(localStorageUserSetting)

  if(!localStorageUserSetting)
  {
    PopUpError.show('<center>Informasi data diri anda masih kosong,<br />Silahkan isi untuk melanjutkan proses belanja</center>', 'Ke Setting', 'main.setting')
  }
  else
  {
    var category = 139,
    user_id = 775335,
    total = 96;

    BukalapakAPI.mylapak(category, user_id, total)
    .then(function(data)
    {
      $scope.bukalapak = data.products;
      $scope.code = 200;

      //console.log(data);
    },
    function errorCallback(response)
    {
      PopUpError.show("Gagal Memuat Produk")
    })

    var doSearch_bl = ionic.debounce(function(query)
    {
      if(query.length >= 3)
      {
        BukalapakAPI.mylapak(category, user_id, total, 0, 'Acak', query)
        .then(function(data)
        {
          $scope.bukalapak = data.products;
          $scope.code = 200;

          //console.log(data);
        },
        function errorCallback(response)
        {
          PopUpError.show("Gagal Mencari Produk")
        })
      }
      else
      {
        if(query.length == 0)
        {
          BukalapakAPI.mylapak(category, user_id, total)
          .then(function(data)
          {
            $scope.bukalapak = data.products;
            //console.log(data);
          })
        }
        else
        {
          $scope.code = 500;
        }
      }
    }, 500);
    
    $scope.search_bl = function()
    {
      doSearch_bl($scope.query);
    }

    $scope.beli = function(id_barang, nama_barang, gambar_barang, harga_barang, stok_barang)
    {
      var data = {id:id_barang, nama:nama_barang, gambar:gambar_barang, harga:harga_barang, stok:stok_barang};
      
      $scope.data = data;

      PopUpCart.add($scope.data);
    }
  }
}])



// Controller untuk Detail Tees Product
.controller('BukalapakDetailCtrl',
['$scope', '$stateParams', 'BukalapakAPI', 'PopUpCart', 'PopUpError',
function($scope, $stateParams, BukalapakAPI, PopUpCart, PopUpError)
{
  var idproduct = $stateParams.id;
  $scope.BL = {};

  BukalapakAPI.myproduct(idproduct)
  .then(function(data)
  {
    $scope.BL = data.product;
    $scope.code = 200;

    //console.log(data);
  },
  function errorCallback(response)
  {
    PopUpError.show("Gagal Menampilkan Produk")
  })

  $scope.beli = function(id_barang, nama_barang, gambar_barang, harga_barang, stok_barang)
  {
    var data = {id:id_barang, nama:nama_barang, gambar:gambar_barang, harga:harga_barang, stok:stok_barang};
    
    $scope.data = data;

    PopUpCart.add($scope.data);
  }
}])




.controller('CartController',
['$scope', '$state', 'md5', 'CacheFactory', 'BukalapakAPI', 'PopUpError',
function($scope, $state, md5, CacheFactory, BukalapakAPI, PopUpError)
{
  self.cartCache = CacheFactory.get('cartDataCache');

  var AngularCache = self.cartCache.keys();

  $scope.cart = [];

  for(i = 0; i < AngularCache.length; i++)
  {
    var CacheName = AngularCache[i],
    CacheIndex = self.cartCache.get(CacheName);

    $scope.cart.push(CacheIndex)
  }

  $scope.cart = $scope.cart;
  //console.log($scope.cart)

  $scope.deleteCart = function(cache, id)
  {
    self.BukalapakDataCache = CacheFactory.get('shopDataCache')
    var cacheBLcartKey = 'blcart-' + id,
    BLcartDataCache = self.BukalapakDataCache.get(cacheBLcartKey)

    if(BLcartDataCache)
    {
      BukalapakAPI.deletecart(id, BLcartDataCache.cart[0].items[0].id)
      .then(function(data)
      {
        self.BukalapakDataCache.remove(cacheBLcartKey)
        self.cartCache.remove(cache)

        self.itemCart = angular.element( document.querySelector( '#'+cache ) )
        self.itemCart.remove()
      },
      function errorCallback(response)
      {
        //console.log(response)
        PopUpError.show('Gagal Menghapus Keranjang (koneksi)', 'Tutup', 'close')
      })
    }
    else
    {
      self.cartCache.remove(cache)

      self.itemCart = angular.element( document.querySelector( '#'+cache ) )
      self.itemCart.remove()    
    }
  }
  //console.log($scope.RecompileAngularCache)
}])




.controller('CartDetailController',
['$scope', '$stateParams','BukalapakAPI', 'CacheFactory', 'md5', 'PopUpError', 'localStorageService', '$ionicLoading', '$timeout', 
function($scope, $stateParams, BukalapakAPI, CacheFactory, md5, PopUpError, localStorageService, $ionicLoading, $timeout)
{
  var id = $stateParams.id,
  total = $stateParams.total;

  self.BukalapakDataCache = CacheFactory.get('shopDataCache')
  var cacheBLcartKey = 'blcart-' + id,
  BukalapakDataCacheDetail = self.BukalapakDataCache.get(cacheBLcartKey)
  //console.log(self.BukalapakDataCache.info())


  if(BukalapakDataCacheDetail)
  {
    //console.log(BukalapakDataCacheDetail.cart[0].items[0].quantity)
    //console.log(total)

    if(BukalapakDataCacheDetail.cart[0].items[0].quantity == total)
    {
      $scope.kasir = BukalapakDataCacheDetail;
      //console.log($scope.kasir)
    }
    else
    {
      BukalapakAPI.updatecart(id, BukalapakDataCacheDetail.cart[0].items[0].id, total)
      .then(function(data)
      {
        BukalapakDataCacheDetail.cart[0].items[0].quantity = total;
        BukalapakDataCacheDetail.cart[0].items[0].original_price = total * BukalapakDataCacheDetail.cart[0].items[0].price;

        self.BukalapakDataCache.put(cacheBLcartKey, BukalapakDataCacheDetail);

        $scope.kasir = BukalapakDataCacheDetail;
        $scope.code = 200;
        //console.log($scope.kasir)
      },
      function errorCallback(response)
      {
        PopUpError.show("Gagal Memperbaharui Produk")
      })
    }
  }
  else
  {
    BukalapakAPI.addcart(id, total, true)
    .then(function(data)
    {
      $scope.kasir = data;
      $scope.code = 200;
      //console.log(data)
    },
    function errorCallback(response)
    {
      PopUpError.show("Gagal Memproses Produk")
    })
  }


  $scope.updateJumlah = function()
  {
    BukalapakAPI.updatecart(id, BukalapakDataCacheDetail.cart[0].items[0].id, total)
    .then(function(data)
    {
      BukalapakDataCacheDetail.cart[0].items[0].quantity = total;
      BukalapakDataCacheDetail.cart[0].items[0].original_price = total * BukalapakDataCacheDetail.cart[0].items[0].price;

      self.BukalapakDataCache.put(cacheBLcartKey, BukalapakDataCacheDetail);

      $scope.kasir = BukalapakDataCacheDetail;
      $scope.code = 200;
      //console.log($scope.kasir)
    },
    function errorCallback(response)
    {
      PopUpError.show("Gagal Memperbaharui Produk")
    })
  }


  if(localStorageService.get('userSetting'))
  {
    $scope.setting = localStorageService.get('userSetting');
  }
  else
  {
    $scope.setting = {};
  }


  $scope.simpanDataPribadi = function()
  {
    localStorageService.remove('userSetting')
    localStorageService.set('userSetting', $scope.setting)

    $scope.setting = $scope.setting;
    
    //console.log($scope.setting)

    $ionicLoading.show({
       template: '<ion-spinner icon="spiral" class="spinner-light"></ion-spinner>\n<br/>\nMenyimpan Data Informasi'
    })

    $timeout(function()
    {
      $ionicLoading.hide()
    },
    2000)
  }

  /*$scope.kasir = BukalapakDataCacheDetail;*/


  $scope.CheckOut = function(data)
  {
    var dataPost =
      {
        payment_transaction:
        {
          id_cart: BukalapakDataCacheDetail.cart[0].items[0].id, 
          buyer_name: $scope.setting.nama, 
          buyer_email: $scope.setting.email, 
          buyer_email_confirmation: $scope.setting.email, 
          seller_id: BukalapakDataCacheDetail.cart[0].seller.id, 
          shipping_name: $scope.setting.nama, 
          phone: $scope.setting.kontak, 
          address_attributes: 
          {
            province: "DKI Jakarta", 
            city: "Jakarta Selatan", 
            area: "Mampang Prapatan", 
            address: "Jl. Bangka", 
            post_code: "34521"
          }, 
          buyer_notes: "",
          courier: "JNE REG", 
          with_insurance: "0", 
          voucher_code: "", 
          bca:  "1", 
          mandiri:  "2", 
          bni:  "3", 
          bri:  "4"
        }
      };

      console.log(dataPost)
  }

}])



.controller('CheckoutController',
['$scope', '$stateParams', 'md5', 'CacheFactory',
function($scope, $stateParams, md5, CacheFactory)
{
  $scope.master = {};

  $scope.submitCart = function()
  {
      /* while compiling form , angular created this object*/
      var data = $scope.fields,
      data = angular.extend(data, $scope.product_data);

      /* post to server*/
      //$http.post(url, data);
      console.log(data)
  }
}])



// Controller untuk Detail Tees Product
.controller('TransactionCtrl',
['$scope', '$stateParams', 'BukalapakAPI',
function($scope, $stateParams, BukalapakAPI)
{
  BukalapakAPI.transaction()
  .then(function(data)
  {
    $scope.transactions = data.transactions;
    //console.log(data);
  })
}])




/*.controller('CartNotifCtrl',
['$scope', 'md5', 'CacheFactory',
function($scope, md5, CacheFactory)
{
  ProductCacheKey = 'cartbl-' + md5.createHash('cart'),
  ProductDataCache = CacheFactory.get('cartCache'),
  Product = ProductDataCache.get(ProductCacheKey);
  $scope.cart = Product ? Product.items : false;
}])*/




/*
// Test Controller Queue
.controller('QueueCtrl', ['$scope', '$http', '$q', 'WundergroundKey', 'md5', 'CacheFactory',
function($scope, $http, $q, WundergroundKey, md5, CacheFactory)
{  
  $scope.initqueue = function(){
    var queue = {};
    self.weatherDataCache = CacheFactory.get('weatherDataCache');
    var WeatherCacheKey = 'weather-' + md5.createHash('kuningan'),
    WeatherCacheDetail = self.weatherDataCache.get(WeatherCacheKey);

    var Wunderground = 'http://api.wunderground.com/api/' + WundergroundKey.random()[0].api_key + '/conditions/forecast/lang:ID/q/kuningan.json';
    var menu = $http.get("data/menu.json").success(function(data){console.log(data)}),
    cuaca = WeatherCacheDetail ? WeatherCacheDetail : $http.get(Wunderground).success(function(data){console.log(data)});

    $q.all([menu, cuaca]).then(function(httpResultArray)
    { 
      $scope.queue = [httpResultArray[0].data, WeatherCacheDetail ? httpResultArray[1] : httpResultArray[1].data];
      console.log($scope.queue)
    })
  }
}])
*/
angular.module('cityGuideKuninganApp.directive', [])

.directive('backImg', function()
{
    return function(scope, element, attrs)
    {
        attrs.$observe('backImg', function(value)
        {
            element.css({
                'background-image': 'url(' + value +')',
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                'position': 'absolute'
            });
        });
    };
})

.directive('jumpAchor', function()
{
    return function(scope, element, attrs)
    {
        element.bind("click", function(url)
        {
            window.open(''+url+'','_system','location=yes');
            //console.log(url);
            return false;
        });
    };
})

.directive('pembulatanAngka', function()
{
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModelCtrl)
    {
      function roundNumber(val)
      {
        var parsed = parseFloat(val, 10);
        if(parsed !== parsed)
        { return null; } // check for NaN
        var rounded = Math.round(parsed);
        return rounded;
      }
      // Parsers take the view value and convert it to a model value.
      ngModelCtrl.$parsers.push(roundNumber);
   }
  };
})

.directive('pushSearch', function()
{
  return {
    restrict: 'A',
    link: function($scope, $element, $attr)
    {
      var amt, st, header;

      $element.bind('scroll', function(e)
      {
        if(!header)
        {
          header = document.getElementById('search-bar');
        }

        st = e.detail.scrollTop;
        if(st < 0)
        {
          header.style.webkitTransform = 'translate3d(0, 0px, 0)';
        }
        else
        {
          header.style.webkitTransform = 'translate3d(0, ' + -st + 'px, 0)';
        }
      });
    }
  }
})
'use strict';

/**
 * General-purpose Event binding. Bind any event not natively supported by Angular
 * Pass an object with keynames for events to ui-event
 * Allows $event object and $params object to be passed
 *
 * @example <input ui-event="{ focus : 'counter++', blur : 'someCallback()' }">
 * @example <input ui-event="{ myCustomEvent : 'myEventHandler($event, $params)'}">
 *
 * @param ui-event {string|object literal} The event to bind to as a string or a hash of events with their callbacks
 */
angular.module('ui.event',[]).directive('uiEvent', ['$parse',
  function ($parse) {
    return function ($scope, elm, attrs) {
      var events = $scope.$eval(attrs.uiEvent);
      angular.forEach(events, function (uiEvent, eventName) {
        var fn = $parse(uiEvent);
        elm.bind(eventName, function (evt) {
          var params = Array.prototype.slice.call(arguments);
          //Take out first paramater (event object);
          params = params.splice(1);
          fn($scope, {$event: evt, $params: params});
          if (!$scope.$$phase) {
            $scope.$apply();
          }
        });
      });
    };
  }]);
angular.module('cityGuideKuninganApp.directive', ['base64'])

.filter('thousandSuffix', function ()
{
    return function (input, decimals)
    {
      var exp, rounded,
        suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

      if(window.isNaN(input))
      {
        return null;
      }

      if(input < 1000)
      {
        return input;
      }

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    }
})


.filter('ribuAwalan', function ()
{
    return function (input, decimals)
    {
      var exp, rounded,
        suffixes = [' ribu', ' juta', ' milyar', ' trilyun'];

      if(window.isNaN(input))
      {
        return null;
      }

      if(input < 1000)
      {
        return input;
      }

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    }
})


.filter('jumpUrl',function()
{
  return function (input) {
    return jumpLocation(input)
  }
})


.filter('urlNews', ['$base64', function ($base64)
{
    return function (input) {
        var input = input.replace(/(.*)\&url\=(.*)/,'$2');
        return $base64.encode(input);
    };
}])


.filter('encode64', ['$base64', function ($base64)
{
    return function (input)
    {
        return $base64.encode(input);
    };
}])


.filter('decode64', ['$base64', function ($base64)
{
    return function (input)
    {
        return $base64.decode(input);
    };
}])


.filter('imgNews', function()
{
  return function (input,replacement)
  {
    var imgRegex = /(.+)(<img[\s]src\=\")(\/\/[a-zA-Z0-9 \/\?\=\:\._-]+)(\")(.+)/;
    var imgRegex2 = /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/;

    if (imgRegex.test(input))
    {
      return input.replace(imgRegex,'$3').replace('\/\/','http:\/\/')
    }
    else if(imgRegex2.test(input))
    {
      return input.match(/src="([^"]*)"/i)[1]
    }
    else
    {
      var result = !replacement ? 'img/no-img.gif' : replacement;
      return result;
    }
  }
})



.filter('GetDomainFromGuid', function()
{
  return function (input,replacement)
  {
    var imgRegex = /(.*)cluster\=(htt(p|ps)\:\/\/[a-zA-Z0-9 \/\?\=\:\._-]+)/;

    if (imgRegex.test(input))
    {
      input = input.replace(imgRegex,'$2').replace('\/\/','http:\/\/');
      input = input.replace(/(www\.)/i, "");

      if( !input.replace(/(www\.)/i, "") )
      {
        input = 'http://' + input;
      }

      var reg = /:\/\/(.[^/]+)/;
      return input.match(reg)[1];
    }
    else
    {
      return input;
    }
  }
})



.filter('pubDateConvert', function ()
{
  return function (value)
  {
    return new Date(value).toLocaleString();
  }
})


.filter('ImageBLmedium', function()
{
  return function (input,replacement)
  {
    var imgRegex = /\/small\//;

    if (imgRegex.test(input))
    {
      return input.replace(imgRegex,'\/medium\/')
    }
    else
    {
      var result = !replacement ? 'img/no-img.gif' : replacement;
      return result;
    }
  }
})



.filter('WuIconChange', function()
{
  return function (input,replacement)
  {
    var imgRegex = /\/k\//;

    if (imgRegex.test(input))
    {
      return input.replace(imgRegex,'\/'+replacement+'\/')
    }
    else
    {
      return input;
    }
  }
})


.filter('range', function()
{
  return function(input, from, total)
  {
    from = from ? parseInt(from) : 0;

    total = parseInt(total + from);

    for (var i = from; i < total; i++)
      input.push(i);
    return input;
  };
})


.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }

    };
})
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function jumpLocation(url){
  url = encodeURI(url);
  window.open(url, '_blank', 'location=yes');
  return false;
}

function ratingColor(v)
{
  //v = parseInt(v);

  if(v > 0)
  {
    if(v <= 4.9)
    {
      return 'bg-gray-light';
    }
    else if(v >= 5 && v <= 7)
    {
      return 'bg-energized';
    }
    else if(v >= 7.1)
    {
      return 'bg-balanced';
    }
    else
    {
      return 'bg-gray-light';
    }
  }
}
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
/*
 Copyright 2011 Abdulla Abdurakhmanov
 Original sources are available at https://code.google.com/p/x2js/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

function X2JS() {
	var VERSION = "1.0.11";
	var escapeMode = false;

	var DOMNodeTypes = {
		ELEMENT_NODE 	   : 1,
		TEXT_NODE    	   : 3,
		CDATA_SECTION_NODE : 4,
		DOCUMENT_NODE 	   : 9
	};
	
	function getNodeLocalName( node ) {
		var nodeLocalName = node.localName;			
		if(nodeLocalName == null) // Yeah, this is IE!! 
			nodeLocalName = node.baseName;
		if(nodeLocalName == null || nodeLocalName=="") // =="" is IE too
			nodeLocalName = node.nodeName;
		return nodeLocalName;
	}
	
	function getNodePrefix(node) {
		return node.prefix;
	}
		
	function escapeXmlChars(str) {
		if(typeof(str) == "string")
			return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
		else
			return str;
	}

	function unescapeXmlChars(str) {
		return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, '\/')
	}	

	function parseDOMChildren( node ) {
		if(node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
			var result = new Object;
			var child = node.firstChild; 
			var childName = getNodeLocalName(child);
			result[childName] = parseDOMChildren(child);
			return result;
		}
		else
		if(node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
			var result = new Object;
			result.__cnt=0;
			
			var nodeChildren = node.childNodes;
			
			// Children nodes
			for(var cidx=0; cidx <nodeChildren.length; cidx++) {
				var child = nodeChildren.item(cidx); // nodeChildren[cidx];
				var childName = getNodeLocalName(child);
				
				result.__cnt++;
				if(result[childName] == null) {
					result[childName] = parseDOMChildren(child);
					result[childName+"_asArray"] = new Array(1);
					result[childName+"_asArray"][0] = result[childName];
				}
				else {
					if(result[childName] != null) {
						if( !(result[childName] instanceof Array)) {
							var tmpObj = result[childName];
							result[childName] = new Array();
							result[childName][0] = tmpObj;
							
							result[childName+"_asArray"] = result[childName];
						}
					}
					var aridx = 0;
					while(result[childName][aridx]!=null) aridx++;
					(result[childName])[aridx] = parseDOMChildren(child);
				}			
			}
			
			// Attributes
			for(var aidx=0; aidx <node.attributes.length; aidx++) {
				var attr = node.attributes.item(aidx); // [aidx];
				result.__cnt++;
				result["_"+attr.name]=attr.value;
			}
			
			// Node namespace prefix
			var nodePrefix = getNodePrefix(node);
			if(nodePrefix!=null && nodePrefix!="") {
				result.__cnt++;
				result.__prefix=nodePrefix;
			}
			
			if( result.__cnt == 1 && result["#text"]!=null  ) {
				result = result["#text"];
			} 
			
			if(result["#text"]!=null) {
				result.__text = result["#text"];
				if(escapeMode)
					result.__text = unescapeXmlChars(result.__text)
				delete result["#text"];
				delete result["#text_asArray"];
			}
			if(result["#cdata-section"]!=null) {
				result.__cdata = result["#cdata-section"];
				delete result["#cdata-section"];
				delete result["#cdata-section_asArray"];
			}
			
			if(result.__text!=null || result.__cdata!=null) {
				result.toString = function() {
					return (this.__text!=null? this.__text:'')+( this.__cdata!=null ? this.__cdata:'');
				}
			}
			return result;
		}
		else
		if(node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
			return node.nodeValue;
		}	
	}
	
	function startTag(jsonObj, element, attrList, closed) {
		var resultStr = "<"+ ( (jsonObj!=null && jsonObj.__prefix!=null)? (jsonObj.__prefix+":"):"") + element;
		if(attrList!=null) {
			for(var aidx = 0; aidx < attrList.length; aidx++) {
				var attrName = attrList[aidx];
				var attrVal = jsonObj[attrName];
				resultStr+=" "+attrName.substr(1)+"='"+attrVal+"'";
			}
		}
		if(!closed)
			resultStr+=">";
		else
			resultStr+="/>";
		return resultStr;
	}
	
	function endTag(jsonObj,elementName) {
		return "</"+ (jsonObj.__prefix!=null? (jsonObj.__prefix+":"):"")+elementName+">";
	}
	
	function endsWith(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	
	function jsonXmlSpecialElem ( jsonObj, jsonObjField ) {
		if(endsWith(jsonObjField.toString(),("_asArray")) 
				|| jsonObjField.toString().indexOf("_")==0 
				|| (jsonObj[jsonObjField] instanceof Function) )
			return true;
		else
			return false;
	}
	
	function jsonXmlElemCount ( jsonObj ) {
		var elementsCnt = 0;
		if(jsonObj instanceof Object ) {
			for( var it in jsonObj  ) {
				if(jsonXmlSpecialElem ( jsonObj, it) )
					continue;			
				elementsCnt++;
			}
		}
		return elementsCnt;
	}
	
	function parseJSONAttributes ( jsonObj ) {
		var attrList = [];
		if(jsonObj instanceof Object ) {
			for( var ait in jsonObj  ) {
				if(ait.toString().indexOf("__")== -1 && ait.toString().indexOf("_")==0) {
					attrList.push(ait);
				}
			}
		}
		return attrList;
	}
	
	function parseJSONTextAttrs ( jsonTxtObj ) {
		var result ="";
		
		if(jsonTxtObj.__cdata!=null) {										
			result+="<![CDATA["+jsonTxtObj.__cdata+"]]>";					
		}
		
		if(jsonTxtObj.__text!=null) {			
			if(escapeMode)
				result+=escapeXmlChars(jsonTxtObj.__text);
			else
				result+=jsonTxtObj.__text;
		}
		return result
	}
	
	function parseJSONTextObject ( jsonTxtObj ) {
		var result ="";

		if( jsonTxtObj instanceof Object ) {
			result+=parseJSONTextAttrs ( jsonTxtObj )
		}
		else
			if(jsonTxtObj!=null) {
				if(escapeMode)
					result+=escapeXmlChars(jsonTxtObj);
				else
					result+=jsonTxtObj;
			}
		
		return result;
	}
	
	function parseJSONArray ( jsonArrRoot, jsonArrObj, attrList ) {
		var result = ""; 
		if(jsonArrRoot.length == 0) {
			result+=startTag(jsonArrRoot, jsonArrObj, attrList, true);
		}
		else {
			for(var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
				result+=startTag(jsonArrRoot[arIdx], jsonArrObj, parseJSONAttributes(jsonArrRoot[arIdx]), false);
				result+=parseJSONObject(jsonArrRoot[arIdx]);
				result+=endTag(jsonArrRoot[arIdx],jsonArrObj);						
			}
		}
		return result;
	}
	
	function parseJSONObject ( jsonObj ) {
		var result = "";	

		var elementsCnt = jsonXmlElemCount ( jsonObj );
		
		if(elementsCnt > 0) {
			for( var it in jsonObj ) {
				
				if(jsonXmlSpecialElem ( jsonObj, it) )
					continue;			
				
				var subObj = jsonObj[it];						
				
				var attrList = parseJSONAttributes( subObj )
				
				if(subObj == null || subObj == undefined) {
					result+=startTag(subObj, it, attrList, true)
				}
				else
				if(subObj instanceof Object) {
					
					if(subObj instanceof Array) {					
						result+=parseJSONArray( subObj, it, attrList )					
					}
					else {
						var subObjElementsCnt = jsonXmlElemCount ( subObj );
						if(subObjElementsCnt > 0 || subObj.__text!=null || subObj.__cdata!=null) {
							result+=startTag(subObj, it, attrList, false);
							result+=parseJSONObject(subObj);
							result+=endTag(subObj,it);
						}
						else {
							result+=startTag(subObj, it, attrList, true);
						}
					}
				}
				else {
					result+=startTag(subObj, it, attrList, false);
					result+=parseJSONTextObject(subObj);
					result+=endTag(subObj,it);
				}
			}
		}
		result+=parseJSONTextObject(jsonObj);
		
		return result;
	}
	
	this.parseXmlString = function(xmlDocStr) {
		var xmlDoc;
		if (window.DOMParser) {
			var parser=new window.DOMParser();			
			xmlDoc = parser.parseFromString( xmlDocStr, "text/xml" );
		}
		else {
			// IE :(
			if(xmlDocStr.indexOf("<?")==0) {
				xmlDocStr = xmlDocStr.substr( xmlDocStr.indexOf("?>") + 2 );
			}
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(xmlDocStr);
		}
		return xmlDoc;
	}

	this.xml2json = function (xmlDoc) {
		return parseDOMChildren ( xmlDoc );
	}
	
	this.xml_str2json = function (xmlDocStr) {
		var xmlDoc = this.parseXmlString(xmlDocStr);	
		return this.xml2json(xmlDoc);
	}

	this.json2xml_str = function (jsonObj) {
		return parseJSONObject ( jsonObj );
	}

	this.json2xml = function (jsonObj) {
		var xmlDocStr = this.json2xml_str (jsonObj);
		return this.parseXmlString(xmlDocStr);
	}
	
	this.getVersion = function () {
		return VERSION;
	}		
	
	this.escapeMode = function(enabled) {
		escapeMode = enabled;
	}
}

var x2js = new X2JS();