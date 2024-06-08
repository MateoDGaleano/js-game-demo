
//Player//
let x = 140;
let y = 240;
let speed = 3; //Velocidad del movimiento
let keys = {}; //Variable para almacenar datos de las teclas
let player = document.getElementById('player'); //Referencia al elemento player
let board = document.getElementById('board'); //Referencia al elemento board

//Bones//
let xBone = -140;
let yBone = 0;
let xBone2 = 0;
let yBone2 = -190;
let bone = document.getElementById('bone'); //Referencia al elemento bone
let bone2 = document.getElementById('bone2');

//Coin//
let coin = document.getElementById('coin'); //Referencia al elemento coin

//Contador de coins
let coinCounter = 0;
let coinCounterElement = document.getElementById('coinCounter');

// Función para actualizar la posición del player
function updatePosition(){  
     
    // Obtener dimensiones del board y del player
     let boardRect = board.getBoundingClientRect();
     let playerRect = player.getBoundingClientRect();
     let boneRect = bone.getBoundingClientRect();
     let bone2Rect = bone2.getBoundingClientRect();
     let coinRect = coin.getBoundingClientRect();

        if(keys['ArrowRight']){//Right//
            if (playerRect.right + speed <= boardRect.right) {
                x += speed;
            } else {
                x = boardRect.width - playerRect.width; // Limitar al borde derecho
            }
        } 
           
        if (keys['ArrowLeft']) { //Left//
            if (playerRect.left - speed >= boardRect.left){
                x -= speed;
            } else {
                x = 0; // Limitar al borde izquierdo
            }
        }
        if (keys['ArrowUp']) { //Up//
            if (playerRect.top + speed >= boardRect.top){
                y -= speed;
            } else {
                y = 0;
            }
        }
        if (keys['ArrowDown']) { //Down//
            if (playerRect.bottom <= boardRect.bottom){
                y += speed;
            } else {
                y = playerRect.top - boardRect.top;
            }
        }
        player.style.left = x + 'px';
        player.style.top = y + 'px';

        // Comprobar colisión
        if (isCollision(playerRect, boneRect)) {
            resetGame();
        }

        if (isCollision(playerRect, bone2Rect)) {
            resetGame();
        }

        // Comprobar colisión con la moneda
        if (isCollision(playerRect, coinRect)) {
        coinCount();
        }
    }

    // Función para detectar colisión entre dos rectángulos
    function isCollision(rect1, rect2) {
        return !(rect1.right < rect2.left ||
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    
    // Función para reiniciar el juego
    function resetGame() {
        x = 140;
        y = 240;
       
        player.style.left = x + 'px';
        player.style.top = y + 'px';

        xBone2 = 0;
        yBone2 = -200;

        bone2.style.left = xBone2 + 'px';
        bone2.style.top = yBone2 + 'px';

        coinCounterElement.textContent = 'Coins: ' + '0'

        alert("¡You lose.");
    }

    // Función para contar la moneda
    function coinCount() {
    coinCounter++; // Incrementar contador de monedas
    coinCounterElement.textContent = 'Coins: ' + coinCounter;
    

    // Función para ubicar la moneda
        let boardRect = board.getBoundingClientRect();
        let maxLeft = boardRect.width - coin.offsetWidth;
        let maxTop = boardRect.height - coin.offsetHeight;

        let newLeft = Math.floor(Math.random() * maxLeft);
        let newTop = Math.floor(Math.random() * maxTop);

        coin.style.left = newLeft + 'px';
        coin.style.top = newTop + 'px';
    
    }


    // Evento keydown para detectar cuando se presiona una tecla
    window.addEventListener('keydown', function(event) {
        keys[event.key] = true;
    });
    
    // Evento keyup para detectar cuando se suelta una tecla
    window.addEventListener('keyup', function(event) {
        keys[event.key] = false;
    });
    
    setInterval(updatePosition, 1000 / 60);



window.onload = startAutoMove;



