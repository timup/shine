var app = angular.module('customers', []);

app.controller("CustomerSearchController", [
	"$scope", "$http",
	function($scope, $http){
		var page = 0;

		$scope.customers = [];
		$scope.search = function(searchTerm) {
			if (searchTerm.length < 3) {
				return;
			}
			$http.get("/customers.json", { "params" : { "keywords" : searchTerm, "page" : page } }
				).then(function(response){
					$scope.customers = response.data;
				}, function(response){
					alert("There was a problem" + response.status);
				}
			);
			$scope.searchedFor = searchTerm;
			// $scope.customers = [
			// 	{
			// 		"first_name":"Schuyler",
			// 		"last_name":"Cremin",
			// 		"email":"giles@macgyver.net",
			// 		"username":"jillian09",
			// 		"created_at":"2015-03-04"
			// 	},
			// 	{
			// 		"first_name":"Derick",
			// 		"last_name":"Ebert",
			// 		"email":"lupe1@rennerfish.org",
			// 		"username":"ubaldo_kaulke1",
			// 		"created_at":"2015-03-04"
			// 	},
			// 	{
			// 		"first_name":"Derick",
			// 		"last_name":"Johnson",
			// 		"email":"dj@somewhere.org",
			// 		"username":"djj",
			// 		"created_at":"2015-03-04"
			// 	},
			// ]
		}
		$scope.previousPage = function() {
			if (page > 0) {
				page = page - 1;
				$scope.search($scope.keywords);
			}
		}
		$scope.nextPage = function() {
			page = page + 1
			$scope.search($scope.keywords);
		}
	}
]);