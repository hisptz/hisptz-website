/**
 * Created by rajab on 8/15/16.
 */
'use strict';

var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap'])

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'HomeController'

        })
        .state('about', {
            url: '/about',
            templateUrl: 'partials/about.html'
        })
        .state('projects', {
            url: '/projects',
            templateUrl: 'partials/projects.html'
        })
        .state('team', {
            url: '/team',
            templateUrl: 'partials/team.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'partials/contact.html'
        })
        .state('research', {
            url: '/research',
            templateUrl: 'partials/publication.html'
        })
        .state('training', {
            url: '/training',
            templateUrl: 'partials/training.html'
        })
        .state('software-development', {
            url: '/software-development',
            templateUrl: 'partials/software-development.html'
        })
        .state('articles', {
            url: '/articles',
            templateUrl: 'partials/common/under-construction.html'
        });
})

.controller('HomeController', function($scope) {
    $scope.projects = [
        {
            name: 'ARDS - Agricultural Routine Database System',
            description: 'This project utilize dhis powerfull design to ' +
                         'serve agricultural information country wide, The project ' +
                         'is under ministry of agriculture ',
            img_url: 'img/portfolio/ards.png'

        },
        {
            name: 'Human resource for health (HRH) data warehouse',
            description: 'A software for collection, collation, storage ' +
                         'of Human resource for health Information.',
            img_url: 'img/portfolio/hrhis.jpg'

        },
        {
            name: 'DHIS2 - District Health Information System',
            description: 'DHIS 2 is an open source software tool for collection, ' +
                         'validation, analysis, and presentation of aggregate statistical ' +
                         'data, tailored to integrated health information management activities. ',
            img_url: 'img/portfolio/dhis.png'

        },
        {
            name: 'eIDSR',
            description: 'Electronic Integrated Disease Surveillance and Response.',
            img_url: 'img/portfolio/eidsr.png'

        }
    ];

    $scope.products = [
        {
            name: 'iDashboard',
            logo: 'img/products/idashboard.png'
        },
        {
            name: 'Indicator Browser',
            logo: 'img/products/ibrowser.png'
        },
        {
            name: 'Score card',
            logo: 'img/products/score-card.png'
        }
    ]
})

.controller('NavController', function($scope) {
    $scope.isCollapsed = true;
})
.controller('HomeSliderController', function($scope) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = [
        {
            image: 'img/slider/bg1.jpg',
            text: 'This is first slider',
            index: 0
        },

        {
            image: 'img/slider/bg2.jpg',
            text: 'This is first slider',
            index: 1
        }
    ];
});