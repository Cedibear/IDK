import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the soccer field
const fieldGeometry = new THREE.PlaneGeometry(20, 10);
const fieldMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
field.rotation.x = -Math.PI / 2;
scene.add(field);

// Create the soccer ball
const ballGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.y = 0.3;
scene.add(ball);

// Create the player
const playerGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(-5, 0.5, 0);
scene.add(player);

// AI opponent
const aiMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const ai = new THREE.Mesh(playerGeometry, aiMaterial);
ai.position.set(5, 0.5, 0);
scene.add(ai);

// Camera position
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Player movement
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") player.position.x -= 0.5;
    if (event.key === "ArrowRight") player.position.x += 0.5;
    if (event.key === "ArrowUp") player.position.z -= 0.5;
    if (event.key === "ArrowDown") player.position.z += 0.5;
});

// Ball physics (basic movement)
let ballDirection = { x: 0.1, z: 0.1 };

function animate() {
    requestAnimationFrame(animate);

    // Move the ball
    ball.position.x += ballDirection.x;
    ball.position.z += ballDirection.z;

    // Ball collision with walls
    if (ball.position.x > 10 || ball.position.x < -10) ballDirection.x *= -1;
    if (ball.position.z > 5 || ball.position.z < -5) ballDirection.z *= -1;

    // Simple AI movement
    ai.position.x += (ball.position.x - ai.position.x) * 0.02;
    ai.position.z += (ball.position.z - ai.position.z) * 0.02;

    renderer.render(scene, camera);
}

animate();
