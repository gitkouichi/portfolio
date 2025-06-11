let scene, camera, renderer, wireframe, sphereGeometry;
let basePositions = [];
let time = 0;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1.1;

    const canvas = document.getElementById('canvas--top');
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff);

    sphereGeometry = new THREE.SphereGeometry(3, 64, 32);

    const posAttr = sphereGeometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
    const vertex = new THREE.Vector3().fromBufferAttribute(posAttr, i);
    basePositions.push(vertex.clone());
    }

    const wireframeGeometry = new THREE.WireframeGeometry(sphereGeometry);
    const material = new THREE.LineBasicMaterial({ color: 0xdddddd });
    wireframe = new THREE.LineSegments(wireframeGeometry, material);
    wireframe.position.x = 0.7;
    scene.add(wireframe);

    window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate() {
    requestAnimationFrame(animate);
    time += 0.02;

    const posAttr = sphereGeometry.attributes.position;

    for (let i = 0; i < posAttr.count; i++) {
    const base = basePositions[i];
    const normal = base.clone().normalize();

    const theta = Math.atan2(base.y, base.x);
    const phi = Math.acos(base.z / base.length());
    const wave = Math.sin(time * 2 + theta * 8 + phi * 4) * 0.05;

    const newPos = normal.clone().multiplyScalar(1 + wave);
    posAttr.setXYZ(i, newPos.x, newPos.y, newPos.z);
    }

    posAttr.needsUpdate = true;

    wireframe.geometry.dispose();
    wireframe.geometry = new THREE.WireframeGeometry(sphereGeometry);

    wireframe.rotation.y += 0.003;

    renderer.render(scene, camera);
}