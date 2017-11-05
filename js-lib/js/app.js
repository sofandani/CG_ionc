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