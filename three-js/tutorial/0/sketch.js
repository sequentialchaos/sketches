// always need a scene, camera, and renderer.

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75, // field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near plane
  1000 // far plane
);
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// make the raycaster
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

// make the mesh
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshLambertMaterial({ color: 0x5599cc });
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// make that light
let light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

// render that scene
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();

this.tl = new TimelineMax({ paused: true });
this.tl.to(mesh.scale, 1, { x: 2, ease: Expo.easeOut });
this.tl.to(mesh.scale, 1, { y: 2, ease: Expo.easeOut });
this.tl.to(mesh.rotation, 1, { x: Math.PI, ease: Expo.easeOut });
this.tl.to(mesh.scale, 1, { x: 1, y: 1, ease: Expo.easeOut });

function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(scene.children, true);
  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.material.color.set(0x00ff00);
  }
}

window.addEventListener("mousemove", onMouseMove);
