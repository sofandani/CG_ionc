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