const canvas = document.getElementById('canvas--work');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setClearColor(0xf8f8f8);

function setRendererSize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

const scene = new THREE.Scene();

const size = 200;
const segments = 30;
const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
geometry.rotateX(-Math.PI / 2);

const material = new THREE.MeshBasicMaterial({
    color: 0xededed,
    wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);

setRendererSize();

let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.02;

    const pos = geometry.attributes.position;
    const arr = pos.array;
    for (let i = 0; i < arr.length; i += 3) {
    const x = arr[i];
    const z = arr[i + 2];
    arr[i + 1] = Math.sin(x * 0.1 + time) * Math.cos(z * 0.1 + time) * 2;
    }
    pos.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', setRendererSize);