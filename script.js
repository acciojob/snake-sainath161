//your code here
const gameContainer = document.getElementById('gameContainer');
        const scoreElement = document.getElementById('score');
        
        const gridSize = 40;
        const pixelSize = 10;
        const snakeSpeed = 100; // in milliseconds

        let snake = [{ row: 20, col: 1 }];
        let direction = 'right';
        let foodPosition = getRandomPosition();
        let score = 0;

        function renderGame() {
            gameContainer.innerHTML = '';

            // Render snake
            snake.forEach((pixel, index) => {
                const pixelElement = createPixelElement('snakeBodyPixel', pixel.row, pixel.col);
                gameContainer.appendChild(pixelElement);
            });

            // Render food
            const foodElement = createPixelElement('food', foodPosition.row, foodPosition.col);
            gameContainer.appendChild(foodElement);
        }

        function createPixelElement(className, row, col) {
            const pixelElement = document.createElement('div');
            pixelElement.classList.add('pixel', className);
            pixelElement.style.top = `${row * pixelSize}px`;
            pixelElement.style.left = `${col * pixelSize}px`;
            return pixelElement;
        }

        function getRandomPosition() {
            return {
                row: Math.floor(Math.random() * gridSize),
                col: Math.floor(Math.random() * gridSize)
            };
        }

        function handleKeyPress(event) {
            switch (event.key) {
                case 'ArrowUp':
                    direction = 'up';
                    break;
                case 'ArrowDown':
                    direction = 'down';
                    break;
                case 'ArrowLeft':
                    direction = 'left';
                    break;
                case 'ArrowRight':
                    direction = 'right';
                    break;
            }
        }

        function updateGame() {
            let head = Object.assign({}, snake[0]);

            // Update head position based on direction
            switch (direction) {
                case 'up':
                    head.row -= 1;
                    break;
                case 'down':
                    head.row += 1;
                    break;
                case 'left':
                    head.col -= 1;
                    break;
                case 'right':
                    head.col += 1;
                    break;
            }

            // Check for collision with walls or self
            if (
                head.row < 0 || head.row >= gridSize ||
                head.col < 0 || head.col >= gridSize ||
                snake.some(segment => segment.row === head.row && segment.col === head.col)
            ) {
                alert('Game Over! Your score: ' + score);
                resetGame();
                return;
            }

            // Check if the snake eats the food
            if (head.row === foodPosition.row && head.col === foodPosition.col) {
                score += 1;
                scoreElement.textContent = score;

                // Add a new segment to the snake
                snake.push({});
                foodPosition = getRandomPosition();
            }

            // Update snake segments
            for (let i = snake.length - 1; i > 0; i--) {
                snake[i] = Object.assign({}, snake[i - 1]);
            }

            // Update the position of the snake's head
            snake[0] = head;

            // Render the updated game state
            renderGame();

            // Schedule the next update
            setTimeout(updateGame, snakeSpeed);
        }

        function resetGame() {
            snake = [{ row: 20, col: 1 }];
            direction = 'right';
            foodPosition = getRandomPosition();
            score = 0;
            scoreElement.textContent = score;
            renderGame();
        }

        // Initialize the game
        document.addEventListener('keydown', handleKeyPress);
        resetGame();
        updateGame();