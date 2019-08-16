angular.module("gsja_tesalonika", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","gsja_tesalonika.controllers", "gsja_tesalonika.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "GSJA Tesalonika" ;
		$rootScope.appLogo = "data/images/avatar/pic6.jpg" ;
		$rootScope.appVersion = "1" ;
		$rootScope.headerShrink = true ;

		$rootScope.liveStatus = "pause" ;
		$ionicPlatform.ready(function(){
			$rootScope.liveStatus = "run" ;
		});
		$ionicPlatform.on("pause",function(){
			$rootScope.liveStatus = "pause" ;
		});
		$ionicPlatform.on("resume",function(){
			$rootScope.liveStatus = "run" ;
		});


		$rootScope.hide_menu_membership = false ;
		$rootScope.hide_menu_menu_1 = false ;
		$rootScope.hide_menu_menu_2 = false ;
		$rootScope.hide_menu_account = false ;
		$rootScope.hide_menu_profile = false ;
		$rootScope.hide_menu_help = false ;
		$rootScope.hide_menu_rate_this_app = false ;
		$rootScope.hide_menu_faqs = false ;
		$rootScope.hide_menu_about_us = false ;
		$rootScope.hide_menu_dashboard = false ;


		$ionicPlatform.ready(function() {

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "gsja_tesalonika",
				storeName : "gsja_tesalonika",
				description : "The offline datastore for GSJA Tesalonika app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("gsja_tesalonika.dashboard");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("phpTime", function(){
		return function (input) {
			var timeStamp = parseInt(input) * 1000;
			return timeStamp ;
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
	$translateProvider.useSanitizeValueStrategy("escapeParameters");
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?klihost\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("gsja_tesalonika",{
		url: "/gsja_tesalonika",
			abstract: true,
			templateUrl: "templates/gsja_tesalonika-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("gsja_tesalonika.about_us", {
		url: "/about_us",
		views: {
			"gsja_tesalonika-side_menus" : {
						templateUrl:"templates/gsja_tesalonika-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gsja_tesalonika.dashboard", {
		url: "/dashboard",
		cache:false,
		views: {
			"gsja_tesalonika-side_menus" : {
						templateUrl:"templates/gsja_tesalonika-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gsja_tesalonika.faqs", {
		url: "/faqs",
		views: {
			"gsja_tesalonika-side_menus" : {
						templateUrl:"templates/gsja_tesalonika-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gsja_tesalonika.form_login", {
		url: "/form_login",
		cache:false,
		views: {
			"gsja_tesalonika-side_menus" : {
						templateUrl:"templates/gsja_tesalonika-form_login.html",
						controller: "form_loginCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gsja_tesalonika.form_user", {
		url: "/form_user",
		cache:false,
		views: {
			"gsja_tesalonika-side_menus" : {
						templateUrl:"templates/gsja_tesalonika-form_user.html",
						controller: "form_userCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gsja_tesalonika.menu_1", {
		url: "/menu_1",
		cache:false,
		views: {
			"gsja_tesalonika-side_menus" : {
						templateUrl:"templates/gsja_tesalonika-menu_1.html",
						controller: "menu_1Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gsja_tesalonika.menu_2", {
		url: "/menu_2",
		views: {
			"gsja_tesalonika-side_menus" : {
						templateUrl:"templates/gsja_tesalonika-menu_2.html",
						controller: "menu_2Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gsja_tesalonika.menu_one", {
		url: "/menu_one",
		views: {
			"gsja_tesalonika-side_menus" : {
						templateUrl:"templates/gsja_tesalonika-menu_one.html",
						controller: "menu_oneCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gsja_tesalonika.menu_two", {
		url: "/menu_two",
		views: {
			"gsja_tesalonika-side_menus" : {
						templateUrl:"templates/gsja_tesalonika-menu_two.html",
						controller: "menu_twoCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gsja_tesalonika.profile", {
		url: "/profile",
		cache:false,
		views: {
			"gsja_tesalonika-side_menus" : {
						templateUrl:"templates/gsja_tesalonika-profile.html",
						controller: "profileCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gsja_tesalonika.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"gsja_tesalonika-side_menus" : {
						templateUrl:"templates/gsja_tesalonika-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/gsja_tesalonika/dashboard");
});
