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
    createHalfCirclePanel(gridPositions[0]);
    createCircularPanel(gridPositions[1]);
    createLeftLeg(gridPositions[2]);
    // createRightLeg(gridPositions[3]);
}

// แผ่นไม้ครึ่งวงกลมซ้าย - เพื่อทดสอบ
function createHalfCirclePanel(position) {
    const panelShape = new THREE.Shape();
    const radius = 1.5; // รัศมี 15 ซม. = 1.5 units
    
    // เริ่มที่ (2, -1.5) - ยึดจุดนี้คงที่
    const centerX = 2; // ศูนย์กลางวงกลมที่ (2, 0)
    panelShape.moveTo(2, -radius); // (2, -1.5) - จุดคงที่
    
    // ทดสอบองศาใหม่: -90° ถึง -270° 
    const segmentsPerHalf = 4;
    
    for (let i = 0; i < segmentsPerHalf; i++) {
        // วาดจาก -90° ถึง -270° 
        const angle1 = (-Math.PI/2) - (i * Math.PI) / segmentsPerHalf; // -π/2 ถึง -3π/2
        const angle2 = (-Math.PI/2) - ((i + 1) * Math.PI) / segmentsPerHalf;
        
        // จุดปลาย (ใช้ศูนย์กลาง (0.5, 0))
        const x2 = centerX + Math.cos(angle2) * radius;
        const y2 = 0 + Math.sin(angle2) * radius;
        
        // คำนวณจุดควบคุมให้อยู่กึ่งกลางระหว่างจุดเริ่มและจุดจบ
        const midAngle = (angle1 + angle2) / 2;
        const xControl = centerX + Math.cos(midAngle) * radius * 1.08;
        const yControl = 0 + Math.sin(midAngle) * radius * 1.08;
        
        panelShape.quadraticCurveTo(xControl, yControl, x2, y2);
    }
    
    // ปิดรูปด้วยเส้นตรงกลับไปจุดเริ่มต้น
    // panelShape.lineTo(2, -radius);
    
    const geometry = new THREE.ExtrudeGeometry(panelShape, {
        depth: 0.1,
        bevelEnabled: false
    });
    
    const material = new THREE.MeshBasicMaterial({ color: 0xFF6B6B });
    const panel = new THREE.Mesh(geometry, material);
    
    panel.position.set(position.x, position.y, 0);
    scene.add(panel);
}

// แผ่นไม้ทรงกลม - ใช้ lineTo และ quadraticCurveTo เท่านั้น
function createCircularPanel(position) {
    const panelShape = new THREE.Shape();
    const radius = 1.5; // รัศมี 15 ซม. = 1.5 units
    
    // เริ่มที่จุดขวาสุด (2, 0)
    panelShape.moveTo(radius, 0);
    
    // วาดวงกลมด้วย 2 ลูป แต่ละลูปทำครึ่งวงกลม
    const segmentsPerHalf = 4; // แต่ละครึ่งมี 4 ส่วน
    
    // ลูปที่ 1: ครึ่งด้านบน (0° ถึง 180°)
    for (let i = 0; i < segmentsPerHalf; i++) {
        const angle1 = (i * Math.PI) / segmentsPerHalf; // 0 ถึง π
        const angle2 = ((i + 1) * Math.PI) / segmentsPerHalf;
        
        // จุดปลาย
        const x2 = Math.cos(angle2) * radius;
        const y2 = Math.sin(angle2) * radius;
        
        // คำนวณจุดควบคุมให้อยู่กึ่งกลางระหว่างจุดเริ่มและจุดจบ
        const midAngle = (angle1 + angle2) / 2;
        const xControl = Math.cos(midAngle) * radius * 1.08;
        const yControl = Math.sin(midAngle) * radius * 1.08;
        
        panelShape.quadraticCurveTo(xControl, yControl, x2, y2);
    }
    
    // ลูปที่ 2: ครึ่งด้านล่าง (180° ถึง 360°)
    for (let i = 0; i < segmentsPerHalf; i++) {
        const angle1 = Math.PI + (i * Math.PI) / segmentsPerHalf; // π ถึง 2π
        const angle2 = Math.PI + ((i + 1) * Math.PI) / segmentsPerHalf;
        
        // จุดปลาย
        const x2 = Math.cos(angle2) * radius;
        const y2 = Math.sin(angle2) * radius;
        
        // คำนวณจุดควบคุมให้อยู่กึ่งกลางระหว่างจุดเริ่มและจุดจบ
        const midAngle = (angle1 + angle2) / 2;
        const xControl = Math.cos(midAngle) * radius * 1.08;
        const yControl = Math.sin(midAngle) * radius * 1.08;
        
        panelShape.quadraticCurveTo(xControl, yControl, x2, y2);
    }
    
    const geometry = new THREE.ExtrudeGeometry(panelShape, {
        depth: 0.1,
        bevelEnabled: false
    });
    
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const panel = new THREE.Mesh(geometry, material);
    
    panel.position.set(position.x, position.y, 0);
    scene.add(panel);
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

// ขาซ้าย - แผ่น 40×40 บากครึ่งวงกลมด้านขวา (เว้าเข้าไป)
function createLeftLeg(position) {
    const legShape = new THREE.Shape();
    const cornerRadius = 0.05;
    const radius = 1.5; // รัศมีครึ่งวงกลม 15 ซม.
    
    // เริ่มจากมุมซ้ายล่าง
    legShape.moveTo(-2 + cornerRadius, -2);
    legShape.lineTo(2 - cornerRadius, -2);
    legShape.quadraticCurveTo(2, -2, 2, -2 + cornerRadius);
    
    // วาดขึ้นไปจนถึงจุดเริ่มต้นครึ่งวงกลม
    legShape.lineTo(2, -radius);
    
    // วาดครึ่งวงกลมเว้าเข้าไปทางซ้าย - copy จากการทดสอบที่สำเร็จ
    const segmentsPerHalf = 4;
    const centerX = 2; // ศูนย์กลางวงกลมที่ (2, 0)
    
    for (let i = 0; i < segmentsPerHalf; i++) {
        // วาดจาก -90° ถึง -270° 
        const angle1 = (-Math.PI/2) - (i * Math.PI) / segmentsPerHalf; // -π/2 ถึง -3π/2
        const angle2 = (-Math.PI/2) - ((i + 1) * Math.PI) / segmentsPerHalf;
        
        // จุดปลาย (ใช้ศูนย์กลาง (0.5, 0))
        const x2 = centerX + Math.cos(angle2) * radius;
        const y2 = 0 + Math.sin(angle2) * radius;
        
        // คำนวณจุดควบคุมให้อยู่กึ่งกลางระหว่างจุดเริ่มและจุดจบ
        const midAngle = (angle1 + angle2) / 2;
        const xControl = centerX + Math.cos(midAngle) * radius * 1.08;
        const yControl = 0 + Math.sin(midAngle) * radius * 1.08;
        
        legShape.quadraticCurveTo(xControl, yControl, x2, y2);
    }
    
    // วาดต่อไปยังมุมขวาบน
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

// ขาขวา - แผ่น 40×40 บากครึ่งวงกลมด้านซ้าย (เว้าเข้าไป)
function createRightLeg(position) {
    const legShape = new THREE.Shape();
    const cornerRadius = 0.05;
    
    // วาดสี่เหลี่ยมที่มีครึ่งวงกลมเว้าเข้าไปด้านซ้าย
    // เริ่มจากมุมซ้ายล่าง
    legShape.moveTo(-2 + cornerRadius, -2);
    legShape.lineTo(2 - cornerRadius, -2);
    legShape.quadraticCurveTo(2, -2, 2, -2 + cornerRadius);
    legShape.lineTo(2, 2 - cornerRadius);
    legShape.quadraticCurveTo(2, 2, 2 - cornerRadius, 2);
    legShape.lineTo(-2 + cornerRadius, 2);
    legShape.quadraticCurveTo(-2, 2, -2, 2 - cornerRadius);
    
    // วาดลงไปจนถึงจุดเริ่มต้นของครึ่งวงกลม
    legShape.lineTo(-2, 1.5);
    
    // วาดครึ่งวงกลมเว้าเข้าไป - center อยู่ที่ (-2, 0) absolute position
    legShape.absarc(-2, 0, 1.5, Math.PI/2, -Math.PI/2, true);
    
    // วาดต่อจากครึ่งวงกลมไปยังมุมซ้ายล่าง
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