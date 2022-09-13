// import './style.css';
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// // Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

// Background
const bgTexture = new THREE.TextureLoader().load('background.png');
scene.background = bgTexture;

// Avatar
const baksoTexture = new THREE.TextureLoader().load('bakso.jpg');
const bakso = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 3), new THREE.MeshBasicMaterial({ map: baksoTexture }));
bakso.position.z = -3;
bakso.position.x = -3;

const alasTexture = new THREE.TextureLoader().load('alas.png');
const alas = new THREE.Mesh(new THREE.BoxGeometry(40, 1, 20), new THREE.MeshBasicMaterial({ map: alasTexture }));
alas.position.z = -6;
alas.position.y = -2;
alas.position.x = 0;

const group = new THREE.Group();
group.add(bakso);
group.add(alas);
scene.add(group);

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  var lastScrollTop = 0;

window.addEventListener("scroll", function(){
   var st = window.pageYOffset || document.documentElement.scrollTop;
   if (st > lastScrollTop){
    camera.position.z = t * -0.01;
    camera.position.y = t * -0.03;
    camera.rotation.x = t * 0.003;
   } else {
    camera.position.z = t * 0.01;
    camera.position.y = t * 0.03;
    camera.rotation.x = t * -0.003;
   }
   lastScrollTop = st <= 0 ? 0 : st;
}, false);
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // controls.update();
  renderer.render(scene, camera);
}

animate();
