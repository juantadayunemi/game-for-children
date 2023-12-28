const childContainer = document.getElementById('content-container');
let lastChilName = "";


const observer = new MutationObserver(function (mutations) {
    // La función de devolución de llamada se ejecutará cuando haya cambios en el DOM
    console.log('¡Se detectaron cambios en el contenido!');

    // Verifica el tipo de formulario actual y realiza acciones específicas
    const currentFormType = determineFormType(); 

    if (currentFormType !== null) {
        handleFormTypeChanges(currentFormType);
    }
    
});

const observerConfig = {
    childList: true,
    subtree: true
};

observer.observe(childContainer, observerConfig);

// Función para determinar el tipo de formulario actual
function determineFormType() {
    const currentForm = document.querySelector('#content-container form');

    return currentForm ? currentForm.dataset.formType : null;
}


// Función para manejar cambios en el tipo de formulario
function handleFormTypeChanges(formType) {

    if (lastChilName === formType)
        return;

    lastChilName = formType;
    //MemoryMatch
    switch (formType) {
        case 'ColorPicture':
            bindColorPictureGame();
            break;
        case 'AlphabeticalOrder':
            startGameAlpha();
            break;
        case 'MemoryMatch':
            bindMemoryMatch();
            break;
        case 'SumaDos':
            bindSumaDos();
            break;
        // Añade más casos según los diferentes tipos de juego que tengas
        default:
        // Acciones por defecto o manejo de casos no reconocidos
    }

}

//funciones para el orden del alfabeto
{

    // Define el juego de AlphabeticalOrder como un objeto
    const alphabeticalOrderGame = {
        timer: null,
        alphabetContainer: null,
        resultElement: null,
        timerInterval: null,
    };

    // Función para iniciar el juego de AlphabeticalOrder
    function startGameAlpha() {
        // Obtén los elementos necesarios del DOM
        alphabeticalOrderGame.timer = document.getElementById('timer');
        alphabeticalOrderGame.alphabetContainer = document.getElementById('alphabet-container');
        alphabeticalOrderGame.resultElement = document.getElementById('result');

        // Reiniciar el resultado y el temporizador

        var button = document.getElementById('buttonStar');

        if (button != null) {
            button.addEventListener('click', function () {
                generateAlphabet();
                startTimer();
            });
        }

    }


    // Función para generar el abecedario y mostrarlo desordenado
    function generateAlphabet() {
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var alphabetArray = alphabet.split('');
        var shuffledAlphabet = shuffleArray(alphabetArray);

        // Elegir dos letras para desordenar
        var randomIndex1 = Math.floor(Math.random() * alphabetArray.length);
        var randomIndex2 = Math.floor(Math.random() * alphabetArray.length);
        var misplacedLetters = [alphabetArray[randomIndex1], alphabetArray[randomIndex2]];

        // Mostrar el abecedario con letras desordenadas
        alphabeticalOrderGame.alphabetContainer.innerHTML = shuffledAlphabet.map(function (letter) {
            if (misplacedLetters.includes(letter)) {
                return '<span class="letter misplaced" onclick="removeLetter(this)">' + letter + '</span>';
            } else {
                return '<span class="letter" onclick="removeLetter(this)">' + letter + '</span>';
            }
        }).join('');

    }

    // Función para iniciar el temporizador
    function startTimer() {

        var resultElement = document.getElementById('result');
        resultElement.textContent = ''
        var secondsLeft = 7;

        alphabeticalOrderGame.timerInterval = setInterval(function () {
            secondsLeft--;
            alphabeticalOrderGame.timer.textContent = 'Tiempo restante: ' + secondsLeft + ' segundos';

            if (secondsLeft === 0) {
                clearInterval(alphabeticalOrderGame.timerInterval);
                endGame(false);
            }
        }, 1000);
    }

    // Función para vincular el juego de AlphabeticalOrder
    function bindAlphabeticalOrderGame() {
        startGameAlpha(); // Puedes llamar a startGameAlpha directamente o realizar acciones adicionales si es necesario
    }

    // Usar la función para vincular el juego
    const alphabeticalOrderGameBinding = bindAlphabeticalOrderGame();

    function removeLetter(element) {
        element.style.display = 'none';
        var remainingLetters = document.querySelectorAll('.letter:not(.misplaced)');
        if (remainingLetters.length === 0) {
            endGame(true);
        }
    }

    function endGame(win) {
        var resultElement = document.getElementById('result');
        if (win) {
            resultElement.textContent = '¡Has ganado!';
        } else {
            resultElement.textContent = '¡Has perdido! Inténtalo de nuevo.';
        }
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }


}

//funciones para click en cuadro rojo
{

    function bindColorPictureGame() {
        var gameColorPicture = {
            score: 0,
            appearTimeout: null,
            disappearTimeout: null,
        };

        var button = document.getElementById('buttonStar');
        var gameContainer = document.getElementById('game-container');

        if (button != null) {
            button.addEventListener('click', function () {
                startGameColorPicture();
            });
        }

        if (gameContainer != null) {

            gameContainer.addEventListener('click', function () {
                clearTimeout(gameColorPicture.appearTimeout);
                clearTimeout(gameColorPicture.disappearTimeout);

                gameColorPicture.score++;
                updateScore();

                hideSquare();
            });

        }


        function startGameColorPicture() {
            gameColorPicture.score = 0;
            updateScore();
            showSquare();
        }

        function showSquare() {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const maxX = windowWidth - 50;
            const maxY = windowHeight - 100;

            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            gameContainer.style.left = `${randomX}px`;
            gameContainer.style.top = `${randomY}px`;

            gameContainer.style.display = 'block';

            const appearTime = Math.floor(Math.random() * 2000) + 1000;

            gameColorPicture.appearTimeout = setTimeout(() => {
                hideSquare();
            }, appearTime);
        }

        function hideSquare() {
            gameContainer.style.display = 'none';

            const disappearTime = Math.floor(Math.random() * 2000) + 1000;

            gameColorPicture.disappearTimeout = setTimeout(() => {
                showSquare();
            }, disappearTime);
        }

        function updateScore() {
            var scoreElement = document.getElementById('score');
            scoreElement.textContent = `Puntuación: ${gameColorPicture.score}`;
        }

        // Devuelve un objeto con funciones relevantes que pueden ser utilizadas externamente
        return {
            startGame: startGameColorPicture,
            updateScore: updateScore,
        };
    }

    // Usar la función para vincular el juego
    const colorPictureGame = bindColorPictureGame();



}

//funciones para abeceradio en pareja
{
    // Envolvemos todo en un objeto gameMemory para evitar conflictos
    const gameMemory = {
        score: 0,
        pairsFound: 0,
        maxPairs: 5, // Número máximo de parejas para encontrar
        appearTimeout: null,
        disappearTimeout: null,
        gameContainer: null,
        flippedCards: [],
    };



    function bindMemoryMatch() {


        gameMemory.gameContainer = document.getElementById('game-container');

        if (gameMemory.gameContainer != null) {
            gameMemory.gameContainer.addEventListener('click', function (event) {
                if (event.target.classList.contains('card') && !event.target.classList.contains('flipped')) {
                    flipCard(event.target);
                }
            });

        }

        var button = document.getElementById('start-button');

        if (button != null) {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                startGameMemory();
            });
        }
    }

    // Función para iniciar el juego de Memory Match
    function startGameMemory() {
        const gameContainer = document.getElementById('game-container');
        const cardPairs = generateCardPairs();

        // Limpiar el contenido actual del contenedor del juego
        gameContainer.innerHTML = '';

        // Crear y agregar las cartas al contenedor del juego
        cardPairs.forEach((letter, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = index; // Asignar un atributo de datos para rastrear el índice
            card.textContent = letter;

            // Agregar evento de clic a cada carta
            card.addEventListener('click', handleCardClick);

            gameContainer.appendChild(card);
        });

        // Voltear las cartas después de 5 segundos
        setTimeout(() => {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                // Lógica para voltear la carta (cambiar la apariencia)
                // Puedes adaptar esta lógica según tus necesidades
                setTimeout(() => {
                    card.classList.add('flipped');
                }, index * 10); // Retrasar cada carta por 500 milisegundos
            });
        }, 5000);
    }

    // Función que maneja el clic en una carta
    function handleCardClick(event) {
        const clickedCard = this; // "this" se refiere a la carta que fue clicada

        // Verificar si la carta ya está volteada
        if (!clickedCard.classList.contains('flipped')) {
            // Voltear la carta (cambiar la apariencia)
            clickedCard.classList.add('flipped');
        } else {
            // Si la carta ya está volteada, volver a su estado original
            clickedCard.classList.remove('flipped');
        }

    }

    function generateCardPairs() {

        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var alphabetArray = alphabet.split('');

        // Mezclar el alfabeto de forma aleatoria
        const shuffledAlphabet = shuffleArray(alphabetArray);

        const cardPairs = [];

        // Generar pares de cartas con letras del alfabeto
        for (let i = 0; i < 6; i++) {
            const letter = shuffledAlphabet[i];
            const cardPair = [letter, letter]; // Cada par tiene dos cartas con la misma letra
            cardPairs.push(cardPair);
        }

        // Mezclar el arreglo de pares de cartas
        const shuffledCardPairs  =  shuffleArray(cardPairs);
        return  shuffleArray(shuffledCardPairs.flat() );
    }



    function flipCard(card) {
        // Lógica para voltear una carta
        // Puedes personalizar esta lógica según tus necesidades
    }

    function hideCards() {
        // Lógica para esconder todas las cartas después de un tiempo determinado
        // Puedes personalizar esta lógica según tus necesidades
    }

    function updateScore() {
        var scoreElement = document.getElementById('score');
        scoreElement.textContent = `Puntuación: ${gameMemory.score}`;
    }

}

//funcion suma dos
{

    let timer;
    let score = 0;
    let failures = 0;


    function bindSumaDos(){

         gameContainer = document.getElementById('game-container');
         resultElement = document.getElementById('result');
        var startButton = document.getElementById('start-button');

        if (startButton != null){
            startButton.addEventListener('click', function (event){
                event.preventDefault();
                startSumaDosGame();
            });
        }
       
    }

    function startSumaDosGame() {
        score = 0;
        failures  = 0;
        resultElement.textContent = 'Puntuación: 0';
        resultElement.classList.remove('result-failure');
        gameContainer.innerHTML = '';
        askQuestion();
      }
    
      function askQuestion() {

      
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const answer = num1 + num2;
    
        const questionElement = document.createElement('div');
        questionElement.textContent = `${num1} + ${num2} = ?`;
    
        const answerInput = document.createElement('input');
        answerInput.type = 'number';
    
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Responder';
    
        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
          checkAnswer(answer, parseInt(answerInput.value, 10));
        });
    
        gameContainer.appendChild(questionElement);
        gameContainer.appendChild(answerInput);
        gameContainer.appendChild(submitButton);
    
        answerInput.focus();
    
        // Configurar temporizador para perder después de 10 segundos
        let secondsLeft = 10;
        timer = setInterval(function () {
          secondsLeft--;
          if (secondsLeft <= 0) {
            clearInterval(timer);
            endGame();
          }
        }, 1000);
      }
    
      function checkAnswer(correctAnswer, userAnswer) {
        clearInterval(timer);
    
        if (correctAnswer === userAnswer) {
          score++;
          resultElement.textContent = `¡Correcto! Puntuación: ${score}`;
        } else {
          failures++;
          resultElement.textContent = `Incorrecto.¡Fallaste: ${failures}! Puntuación final: ${score}`;
 
          if (failures >= 3) {
            endGame();
          }
  
          return;
        }
    
        // Limpiar el contenedor y pasar a la siguiente pregunta
        gameContainer.innerHTML = '';
        askQuestion();
      }
    
      function endGame() {
        clearInterval(timer);
        resultElement.textContent = `¡Juego terminado! Puntuación final: ${score}`;
        resultElement.classList.add('result-failure');
      }
  
}

