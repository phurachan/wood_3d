let scene, camera, renderer, controls;

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    
    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // สร้างชิ้นส่วนเก้าอี้ทั้งหมดแบบ grid
    createAllChairPiecesGrid();
    
    animate();
}

function createAllChairPiecesGrid() {
    // กำหนดตำแหน่ง grid 2x2
    const gridPositions = [
        { x: -4, y: 3 },   // แผ่นเริ่มต้น
        { x: 4, y: 3 },    // ที่นั่งกลม
        { x: -4, y: -3 },  // ขาซ้าย
        { x: 4, y: -3 }    // ขาขวา
    ];
    
    // สร้างชิ้นส่วนทั้ง 4 ชิ้น
    createOriginalPanel(gridPositions[0]);
    createSeat(gridPositions[1]);
    createLeftLeg(gridPositions[2]);
    createRightLeg(gridPositions[3]);
}

// แผ่นไม้เริ่มต้น 80×40×1 ซม.
function createOriginalPanel(position) {
    const panelShape = new THREE.Shape();
    const cornerRadius = 0.05; // รัศมีมุมโค้ง 0.5cm
    
    // สร้างสี่เหลี่ยมผืนผ้า 80×40 (scale: 1 unit = 10cm)
    panelShape.moveTo(-4 + cornerRadius, -2);
    panelShape.lineTo(4 - cornerRadius, -2);
    panelShape.quadraticCurveTo(4, -2, 4, -2 + cornerRadius);
    panelShape.lineTo(4, 2 - cornerRadius);
    panelShape.quadraticCurveTo(4, 2, 4 - cornerRadius, 2);
    panelShape.lineTo(-4 + cornerRadius, 2);
    panelShape.quadraticCurveTo(-4, 2, -4, 2 - cornerRadius);
    panelShape.lineTo(-4, -2 + cornerRadius);
    panelShape.quadraticCurveTo(-4, -2, -4 + cornerRadius, -2);
    
    const geometry = new THREE.ExtrudeGeometry(panelShape, {
        depth: 0.1,
        bevelEnabled: false
    });
    
    const material = new THREE.MeshBasicMaterial({ color: 0xDEB887 });
    const panel = new THREE.Mesh(geometry, material);
    
    panel.position.set(position.x, position.y, 0);
    scene.add(panel);
}

// ที่นั่งกลม เส้นผ่าศูนย์กลาง 30 ซม.
function createSeat(position) {
    const seatShape = new THREE.Shape();
    const radius = 1.5; // 30cm diameter = 15cm radius = 1.5 units
    
    // สร้างวงกลม
    seatShape.arc(0, 0, radius, 0, Math.PI * 2, false);
    
    const geometry = new THREE.ExtrudeGeometry(seatShape, {
        depth: 0.1,
        bevelEnabled: false
    });
    
    const material = new THREE.MeshBasicMaterial({ color: 0xA0522D });
    const seat = new THREE.Mesh(geometry, material);
    
    seat.position.set(position.x, position.y, 0);
    scene.add(seat);
}

// ขาซ้าย - แผ่น 40×40 บากครึ่งวงกลมด้านขวา
function createLeftLeg(position) {
    const legShape = new THREE.Shape();
    const cornerRadius = 0.05;
    
    // เริ่มจากมุมซ้ายล่าง
    legShape.moveTo(-2 + cornerRadius, -2);
    legShape.lineTo(2 - cornerRadius, -2);
    legShape.quadraticCurveTo(2, -2, 2, -2 + cornerRadius);
    
    // วาดไปถึงจุดเริ่มต้นครึ่งวงกลม (ด้านขวา ล่าง)
    legShape.lineTo(2, -1.5);
    
    // วาดครึ่งวงกลมด้านขวา (จากล่างไปบน)
    legShape.arc(0.5, 0, 1.5, 0, Math.PI, false);
    
    // วาดต่อจากจุดสิ้นสุดครึ่งวงกลมไปมุมขวาบน
    legShape.lineTo(2, 2 - cornerRadius);
    legShape.quadraticCurveTo(2, 2, 2 - cornerRadius, 2);
    legShape.lineTo(-2 + cornerRadius, 2);
    legShape.quadraticCurveTo(-2, 2, -2, 2 - cornerRadius);
    legShape.lineTo(-2, -2 + cornerRadius);
    legShape.quadraticCurveTo(-2, -2, -2 + cornerRadius, -2);
    
    const geometry = new THREE.ExtrudeGeometry(legShape, {
        depth: 0.1,
        bevelEnabled: false
    });
    
    const material = new THREE.MeshBasicMaterial({ color: 0xCD853F });
    const leftLeg = new THREE.Mesh(geometry, material);
    
    leftLeg.position.set(position.x, position.y, 0);
    scene.add(leftLeg);
}

// ขาขวา - แผ่น 40×40 บากครึ่งวงกลมด้านซ้าย
function createRightLeg(position) {
    const legShape = new THREE.Shape();
    const cornerRadius = 0.05;
    
    // เริ่มจากมุมซ้ายล่าง
    legShape.moveTo(-2 + cornerRadius, -2);
    legShape.lineTo(2 - cornerRadius, -2);
    legShape.quadraticCurveTo(2, -2, 2, -2 + cornerRadius);
    legShape.lineTo(2, 2 - cornerRadius);
    legShape.quadraticCurveTo(2, 2, 2 - cornerRadius, 2);
    legShape.lineTo(-2 + cornerRadius, 2);
    legShape.quadraticCurveTo(-2, 2, -2, 2 - cornerRadius);
    
    // วาดไปถึงจุดเริ่มต้นครึ่งวงกลม (ด้านซ้าย บน)
    legShape.lineTo(-2, 1.5);
    
    // วาดครึ่งวงกลมด้านซ้าย (จากบนไปล่าง)
    legShape.arc(-0.5, 0, 1.5, Math.PI, 0, false);
    
    // วาดต่อจากจุดสิ้นสุดครึ่งวงกลมไปมุมซ้ายล่าง
    legShape.lineTo(-2, -2 + cornerRadius);
    legShape.quadraticCurveTo(-2, -2, -2 + cornerRadius, -2);
    
    const geometry = new THREE.ExtrudeGeometry(legShape, {
        depth: 0.1,
        bevelEnabled: false
    });
    
    const material = new THREE.MeshBasicMaterial({ color: 0xCD853F });
    const rightLeg = new THREE.Mesh(geometry, material);
    
    rightLeg.position.set(position.x, position.y, 0);
    scene.add(rightLeg);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);
window.addEventListener('DOMContentLoaded', init);