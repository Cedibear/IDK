<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Soccer Game</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }

        #gameCanvas {
            display: block;
        }

        .button-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .button {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.8);
            border: 2px solid #ccc;
            text-align: center;
            line-height: 70px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .button:hover {
            background-color: rgba(255, 255, 255, 0.6);
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas"></canvas>
    <div class="button-container">
        <div id="passButton" class="button">Pass</div>
        <div id="shootButton" class="button">Shoot</div>
        <div id="skillButton" class="button">Skill</div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        // Setup Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create the soccer field (a large plane)
        const fieldGeometry = new THREE.PlaneGeometry(100, 60);
        const fieldMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
        const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
        field.rotation.x = Math.PI / 2;
        scene.add(field);

        // Create the soccer ball (a small sphere)
        const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
        const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const ball = new THREE.Mesh(ballGeometry, ballMaterial);
        ball.position.set(0, 1, 0);  // Start position
        scene.add(ball);

        // Camera position
        camera.position.z = 30;
        camera.position.y = 20;
        camera.rotation.x = -Math.PI / 6;

        // Add a simple light
        const light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        // Ball physics variables
        let ballVelocity = new THREE.Vector3(0, 0, 0);
        const gravity = -0.05;
        const friction = 0.98;

        // Movement keys (WASD for movement)
        const keys = { up: false, left: false, down: false, right: false };

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') keys.up = true;
            if (e.key === 'ArrowLeft') keys.left = true;
            if (e.key === 'ArrowDown') keys.down = true;
            if (e.key === 'ArrowRight') keys.right = true;
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp') keys.up = false;
            if (e.key === 'ArrowLeft') keys.left = false;
            if (e.key === 'ArrowDown') keys.down = false;
            if (e.key === 'ArrowRight') keys.right = false;
        });

        // Handle button clicks for pass, shoot, and skill moves
        document.getElementById('passButton').addEventListener('click', () => {
            passBall();
        });
        document.getElementById('shootButton').addEventListener('click', () => {
            shootBall();
        });
        document.getElementById('skillButton').addEventListener('click', () => {
            performSkill();
        });

        // Pass action
        function passBall() {
            ballVelocity.set(5, 0, 5); // Example: pass the ball at an angle
        }

        // Shoot action
        function shootBall() {
            ballVelocity.set(10, 5, 0); // Shoot the ball with a stronger force
        }

        // Skill move action (Rainbow Flick)
        function performSkill() {
            // Example: skill moves, can be enhanced with animations or other actions
            ballVelocity.set(0, 10, 0); // High jump to simulate skill flick
        }

        // Ball physics update
        function updateBall() {
            ballVelocity.y += gravity; // Apply gravity

            // Apply friction to slow down horizontal motion
            ballVelocity.x *= friction;
            ballVelocity.z *= friction;

            ball.position.add(ballVelocity);

            // Prevent ball from going below ground level (keep it on the field)
            if (ball.position.y < 1) {
                ball.position.y = 1;
                ballVelocity.y = 0;
            }

            // Add bounce effect when the ball hits the field
            if (ball.position.y <= 1 && Math.abs(ballVelocity.y) > 0.2) {
                ballVelocity.y *= -0.5; // Bounce with less velocity
            }
        }

        // Camera controls (move the camera based on keypress)
        function moveCamera() {
            if (keys.up) camera.position.z -= 0.5;
            if (keys.down) camera.position.z += 0.5;
            if (keys.left) camera.position.x -= 0.5;
            if (keys.right) camera.position.x += 0.5;
        }

        // Main animation loop
        function animate() {
            moveCamera();
            updateBall();

            // Render the scene
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate(); // Start the animation loop
    </script>
</body>
</html>
