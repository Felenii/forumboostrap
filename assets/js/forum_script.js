/*
	plutôt que d'avoir les pseudos, questions et réponses séparés et risquer de se perdre en essayant de faire les correspondances, il faut mieux faire un seul grand tableau de questions
*/

$(document).ready(function(){

	// appelé une fois au début
	showAll();

	// Evenement quand on pose une question
    $('#question_form').on('submit', function(e) {
    	// On supprime le comportement par défaut du formulaire qui est de rechrger la page
    	e.preventDefault()
		e.stopPropagation()

		// on crée la question en récupérant les données du formulaire
		var newQuestion = {
			pseudo: $('#question_pseudo').val(),
            text: $('#question_text').val()
		}

		// On récupère toutes les questions enregistrées
		var questions = getDataFromLocalStorage('questions');
    	// Si elles n'existe pas, on crée un tableau vide
    	if (!questions) {
    		questions = []
		}

		// On pousse notre nouvelle question dans ce tableau
		questions.push(newQuestion)

		// On enregistre le tableau rempli avec la dernière question
		setDataToLocalStorage('questions', questions)

		// On appelle la fonction qui permet d'afficher une question (pas besoin de recharger la page)
		showQuestion(questions.length - 1, newQuestion)
	})

    // Evenement quand on rentre une réponse
	$(document).on('submit', '.response_form', function (e) {
        // On supprime le comportement par défaut du formulaire qui est de rechrger la page
        e.preventDefault()
        e.stopPropagation()

		// $(this) est égale à l'élément formulaire que l'on a soumis
		// On remonte avec la fonction .parent() pour trouver la div avec la classe 'question'
		// On prend l'id de cette div, qui est l'identifiant de la question
		var questionId = $(this).parent('.question').attr('id')

		// On crée la réponse en récupérant les données du formulaire
		// la méthode .find() cherche dans les éléments enfants de $(this), donc ceux du formulaire envoyé
        var newResponse = {
            pseudo: $(this).find('#response_pseudo').val(),
            text: $(this).find('#response_text').val()
        }

        // On récupère toutes les questions enregistrées
        var questions = getDataFromLocalStorage('questions');

        // Avec questions[questionId], on accède à la question à laquelle on vient de répondre
		// Si elle n'a pas encore de réponses, on crée un tableau vide
        if (!questions[questionId].responses) {
            questions[questionId].responses = []
		}
		// onpousse dans ce tableau notre nouvelle réponse
        questions[questionId].responses.push(newResponse)

		// On enregistre
        setDataToLocalStorage('questions', questions)

        // On appelle la fonction qui permet d'afficher une réponse (pas besoin de recharger la page)
        showResponse(questionId, newResponse)
	})
    
    $('.scroll').on('click', function() {
		var page = $(this).attr('href');
		var speed = 750;
		$('html, body').animate({
			scrollTop: $(page).offset().top
		}, speed);
		return false;
	});
});

function showAll () {
	// on récupère toutes les questions
	var questions = getDataFromLocalStorage('questions');

	// s'il y en a, on les parcourt
	if (questions) {
		for (var i = 0; i < questions.length; i++) {
			// On appelle la fonction qui permet d'afficher une question
			showQuestion(i, questions[i])

            // on récupère les réponses de la question
			var responses = questions[i].responses

            // s'il y en a, on les parcourt
			if (responses) {
                for (var j= 0; j < responses.length; j++) {
                    // On appelle la fonction qui permet d'afficher une réponse
					showResponse(i, responses[i])
                }
			}
		}
	}
}

function showQuestion (questionId, question) {
	var pseudo = question.pseudo
	var text = question.text
	$('.questions_container').append('<div class="question" id="' + questionId + '"> <p>Question posée par : ' + pseudo + '</p> <p> Réponse : ' + text + '</p> <form class="response_form"> <label for="response_pseudo">pseudo : <input required type="text" id="response_pseudo"> </label> <label for="response_text">Réponse : <textarea id="response_text" required></textarea> </label> <input type="submit" value="Répondre"> </form> <div class="responses_container"></div> </div>')
}

function showResponse (questionId, response) {
	// on récupère l'élément div de la question et ensuite, avec .find(), la div où on va ajouter la réponse
	var responseContainer = $('#' + questionId).find('.responses_container');

	var pseudo = response.pseudo;
	var text = response.text;

	responseContainer.append('<br><div class="response"> <p>Réponse de : ' + pseudo + ' </p> <p> Réponse : ' + text + '</p> </div>');
}

// Deux petites fonctions qui évitent de se répeter vu qu'on fait souvent de la lecture / écriture

function getDataFromLocalStorage (key) {
	return JSON.parse(localStorage.getItem(key))
}

function setDataToLocalStorage (key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}







