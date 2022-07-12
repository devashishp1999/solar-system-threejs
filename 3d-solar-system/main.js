import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

const starsTexture = "./img/stars.jpg";
const sunTexture = "./img/sun.jpg";
const mercuryTexture = "./img/mercury.jpg";
const venusTexture = "./img/venus.jpg";
const earthTexture = "./img/earth.jpg";
const marsTexture = "./img/mars.jpg";
const jupiterTexture = "./img/jupiter.jpg";
const saturnTexture = "./img/saturn.jpg";
const saturnRingTexture = "./img/saturn ring.png";
const uranusTexture = "./img/uranus.jpg";
const uranusRingTexture = "./img/uranus ring.png";
const neptuneTexture = "./img/neptune.jpg";
const plutoTexture = "./img/pluto.jpg";

const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const orbit = new OrbitControls(camera, canvas);

camera.position.set(-100, 15, -70);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(25, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanete(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position;
  return { mesh, obj };
}

const mercury = createPlanete(3.2, mercuryTexture, 40);
const venus = createPlanete(5.8, venusTexture, 55);
const earth = createPlanete(6, earthTexture, 68);
const mars = createPlanete(4, marsTexture, 88);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture,
});
const uranus = createPlanete(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture,
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xffffff, 3, 300);
scene.add(pointLight);

function animate() {
  //Self-rotation
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);

  //Around-sun-rotation
  mercury.obj.rotateY(0.02);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.008);
  jupiter.obj.rotateY(0.005);
  saturn.obj.rotateY(0.002);
  uranus.obj.rotateY(0.001);
  neptune.obj.rotateY(0.0009);
  pluto.obj.rotateY(0.0004);

  camera.rotation.z += Math.PI / (180 * 80);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
