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
