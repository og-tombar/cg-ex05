import { OrbitControls } from "./OrbitControls.js";
import { Floor } from "./Floor.js";
import { Basket } from "./Basket.js";
import { Ball } from "./Ball.js";
import { setupLighting } from "./Lighting.js";
import { Skybox } from "./Skybox.js";
import { UI } from "./UI.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.domElement.tabIndex = 1;
renderer.domElement.focus();

new Skybox(scene);
setupLighting(scene);
renderer.shadowMap.enabled = true;

const floor = new Floor();
const leftBasket = new Basket(-14, 1);
const rightBasket = new Basket(14, -1);
const ball = new Ball();

scene.add(floor);
scene.add(leftBasket);
scene.add(rightBasket);
scene.add(ball);

camera.position.set(0, 25, 25);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
let isOrbitEnabled = true;

const ui = new UI();

/**
 * Handles key presses; toggles orbit camera when the "O" key is pressed.
 *
 * @param {KeyboardEvent} e - The keydown event object.
 * @returns {void}
 */
function handleKeyDown(e) {
  if (e.key.toLowerCase() === "o") {
    isOrbitEnabled = !isOrbitEnabled;
    console.log("Orbit camera toggled:", isOrbitEnabled ? "ON" : "OFF");
    ui.updateOrbitStatus(isOrbitEnabled);
  }
}

document.addEventListener("keydown", handleKeyDown);
console.log(
  `Event listeners added to document, window, and canvas. Press 'O' to toggle orbit controls.
  Initial orbit state: ${isOrbitEnabled ? "ON" : "OFF"}`
);

/**
 * Animation loop that updates controls and renders the scene.
 * Recursively schedules itself via requestAnimationFrame.
 *
 * @returns {void}
 */
function animate() {
  requestAnimationFrame(animate);
  controls.enabled = isOrbitEnabled;
  controls.update();
  renderer.render(scene, camera);
}

animate();

/**
 * Updates camera projection and renderer size when the browser window is resized.
 *
 * @returns {void}
 */
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

window.addEventListener("resize", onWindowResize);
