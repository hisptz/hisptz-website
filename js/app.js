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
            templateUrl: 'partials/projects.html',
            controller: 'ProjectController'
        })
        .state('team', {
            url: '/team',
            templateUrl: 'partials/team/team.html',
            controller: 'TeamController'
        })
        .state('member', {
            url: '/member/:name',
            templateUrl: 'partials/team/member.html',
            controller: 'TeamController'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'partials/contact.html'
        })
        .state('publications', {
            url: '/publications',
            templateUrl: 'partials/publication.html',
            controller: 'PublicationController'
        })
        .state('training', {
            url: '/training',
            templateUrl: 'partials/training.html',
            controller: 'TrainingController'
        })
        .state('software-development', {
            url: '/software-development',
            templateUrl: 'partials/software-development.html'
        })
        .state('articles', {
            url: '/articles',
            templateUrl: 'partials/articles.html'
        })
        .state('products', {
            url: '/products',
            templateUrl: 'partials/products/products.html',
            controller: 'ProductsController'
        })
        .state('productDetails', {
            url: '/products/:name',
            templateUrl: 'partials/products/product-details.html',
            controller: 'ProductsController'
        })
        .state('feedbackForm', {
            url: '/feedback-form',
            templateUrl: 'partials/feedback_form.html'
        });
})

.controller('HomeController', function($scope, $http) {


    $http.get('data/products.json')
        .then(function(response) {
            $scope.products = response.data;
        });

    $scope.init = 1

    $scope.faqs = [
        {
            index: 1,
            qn: 'What is HISPTZ and UDSM?',
            ans: 'HISP Tanzania stands for Health information systems programme node in Tanzania, ' +
            'which part of the Global HISP Nodes. primarily working on research and development of ' +
            'health information systems. Where as UDSM stands for University of Dar es salaam a government ' +
            'of institution housing the HISP Tanzanian team. \n This HISP Tanzania and UDSM are one and the ' +
            'same team. with UDSM known at legal capacity and HISP Tanzania and the community and international capacity'
        },
        {
            index: 2,
            qn: 'What is DHIS and HMIS?',
            ans: 'DHIS stands for District Health Information Software which is the software tool for management of health information, ' +
            'where as HMIS is Health Management information system that is a broader system for monitoring and evaluation of health information for management.' +
            'HMIS is a unit under ministry, handling management of health information and responsible for monitoring and evaluation, handling data from registers, ' +
            'tally sheets, through summary forms to aggregated reports, which starts at facility level, going to district through regions to national level. DHIS is currenlty used by ministry to computerize data capture starting at district level and for select few facilities with capacity are using DHIS at facility level.'
        },
        {
            index: 3,
            qn: 'Why "2" in DHIS 2',
            ans: 'DHIS started in version 1, at its inception, it was used in South africa during apartheid for capturing of health data, it was microsoft access based desktop application, later updated to web based and renamed "DHIS 2" to support data capture and reporting over the web.'
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
            image: 'img/slider/slide6.jpg',
            title: 'Trophies obtained for the projects from CoICT',
            text: ' The HMIS project was the 2nd winner in in the 2016 UDSM Research week exhibitions at UDSM level',
            index: 0
        },

        {
            image: 'img/slider/slide7.jpg',
            title: 'Trophies obtained for the projects from CoICT',
            text: ' The HMIS project was the 2nd winner in in the 2016 UDSM Research week exhibitions at UDSM level',
            index: 1
        }
    ];
})
    .controller('ProductsController', function($scope, $stateParams, $filter, $http) {
        var product_name = $stateParams.name;


        $http.get('data/products.json')
            .then(function(response) {
                $scope.products = response.data;
                $scope.product = $filter('filter')(response.data, {name:product_name})[0];
            });


    })

    .controller('TrainingController', function($scope) {

        $scope.trainings = [
            {
                name: 'DHIS2 Training Course',
                description: 'A 5-day DHIS2 training workshops organized once every quarter. ' +
                'The course is aimed at strengthening and building capacity for DHIS2 implementers, ' +
                'district, regional and national users and other interested stakeholders in order to ensure ' +
                'sustainability of DHIS2 system in Tanzania.'

            },
            {
                name: 'HRHIS Training Course',
                description: 'A 5-day HRHIS training workshops organized once every quarter. The course is aimed at ' +
                'strengthening and building capacity for HRHIS district, regional and national users and other interested ' +
                'stakeholders in order to ensure sustainability of HRHIS system in Tanzania'

            },

            {
                name: 'Bi-annual Data Use workshops',
                description: 'Support, establish and institutionalize bi-annual data use workshops at all levels where data is ' +
                'analyzed and discussed, problems identified (both regarding HMIS and health services), and action decided upon ' +
                'through training in data analysis and use'

            }

        ];

        $scope.courses = [
            {
                name: 'Masters in Health Informatics',
                description: 'The Computer Science and Engineering department with funding assistance from NORAD in collaboration with ' +
                'University of Oslo together with Muhimbili University of Health and Allied Sciences (MUHAS), School of Public Health and ' +
                'Social Sciences, is providing a two years MSc course in Health Informatics. The course is meant for students with Informatics ' +
                'and Medical/Health background who are working in health sector. The course has been designed to be provided as an evening program ' +
                'so as to allow students to study while continuing with the jobs.'

            },
            {
                name: 'One year Diploma course in Health Informatics',
                description: 'Currently the Computer Science Unit in collaboration with the Ministry of Health and Social Welfare - Department of Continue ' +
                'Education, is in the process of developing a one year diploma course in Health Informatics targeting district and regional staff. The planned ' +
                'diploma course will incorporate the HMIS training provided for the regional and district health workers, health managers, and specific health ' +
                'programmes coordinators. The Diploma course is expected to start in 2010/2011 academic year'

            },
        ]
    })

    .controller('PublicationController', function($scope, $http) {

        $http.get('data/publications.json')
            .then(function(response) {
                $scope.journals = response.data.journals;
                $scope.conferences = response.data.conferences;
                $scope.dissertations = response.data.dissertations;
            });

    })
    .controller('TeamController', function($scope, $http, $filter, $stateParams) {
        var member_name = $stateParams.name;
        $http.get('data/team.json')
            .then(function(response) {
                $scope.members = response.data;
                $scope.member = $filter('filter')(response.data, {name:member_name})[0];
            });
    })
    .controller('ProjectController', function($scope, $http) {
        $http.get('data/projects.json')
            .then(function(response) {
               $scope.projects = response.data;
            });
    });