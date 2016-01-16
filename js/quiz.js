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

		$scope.selectAnswer = function(qIndex,aIndex){
			var questionState = $scope.myQuestions[qIndex].questionState;
			if ( questionState != 'answered' ) {
				$scope.myQuestions[qIndex].selectedAnswer =  aIndex;
				// Se definió cuál es la respuesta correcta
				var correctAnswer = $scope.myQuestions[qIndex].correct;
				$scope.myQuestions[qIndex].correctAnswer = correctAnswer;

					if ( aIndex === correctAnswer ) {
						$scope.myQuestions[qIndex].correctness = 'correct';
						$scope.score += 1;
					} else {
						$scope.myQuestions[qIndex].correctness = 'incorrect';
					}
					$scope.myQuestions[qIndex].questionState = 'answered';
			}
			// Se mostrarán los resultados según han sido seleccionadas las respuestas
			$scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1);
		}

		$scope.isSelected = function(qIndex,aIndex){
			return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
		}

		$scope.isCorrect = function(qIndex,aIndex){
			return $scope.myQuestions[qIndex].correctAnswer === aIndex;
		}

		$scope.selectContinue = function(){
			return $scope.activeQuestion += 1;
		}

		$scope.createShareLinks = function(percentage){
			var url = 'http://citizen.com';

			var emailLink = '<a class="btn email" href="mailto:?subject=Intenta superar mi puntaje!&amp;body=Yo logré un '+percentage+'% en el quiz sobre MISIÓN de la empresa. Intenta ganarme en '+url+'">Envíalo por correo</a>';

			var twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text=Yo logre un '+percentage+'%. Intenta ganarme en at&amp;hashtags=Citizen&amp;url='+url+'">Compártelo en Twitter</a>';

			var newMarkup = emailLink + twitterLink;

			return $sce.trustAsHtml(newMarkup);

		}


	}]);

})();
