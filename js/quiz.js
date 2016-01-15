(function(){

	var app = angular.module('myQuiz',[]);

	app.controller('QuizController', ['$scope','$http','$sce', function($scope,$http,$sce){

		$scope.score = 0;
		$scope.activeQuestion = -1;
		$scope.activeQuestionAnswered  = 0 ;
		$scope.percentage = 0;

		$http.get('quiz_data.json').then(function(quizData){
			// Aquí se guardará la información
			$scope.myQuestions = quizData.data;
			// Se sacará el número total midiendo el array
			$scope.totalQuestions = $scope.myQuestions.length;

		});


	}]);

})();
