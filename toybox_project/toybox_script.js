let scene, camera, renderer, controls;
let panelGroup;
let isExploded = false;
let isRotating = false;
let rotationSpeed = 0.01;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 6, 10);
    camera.lookAt(0, 0, 0);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // Create panel group and assemble all panels
    panelGroup = new THREE.Group();
    scene.add(panelGroup);
    
    // Create all 5 panels
    createAllPanels();
    
    // Add explode button
    setupControls();
    
    animate();
}

function createAllPanels() {
    // Panel 1: Top (แผ่นด้านบน)
    createTopPanel();
    
    // Panel 2: Bottom (แผ่นด้านล่าง)  
    createBottomPanel();
    
    // Panel 3: Left (แผ่นด้านซ้าย)
    createLeftPanel();
    
    // Panel 4: Right (แผ่นด้านขวา)
    createRightPanel();
    
    // Panel 5: Back (แผ่นด้านหลัง)
    createBackPanel();
}

function createTopPanel() {
    // แผ่นที่ 1: แผ่นซ้ายบน 40x20x1ซม. มีรอยตัดรอบด้าน + มุมโค้ง
    const panelShape1 = new THREE.Shape();
    const cornerRadius = 0.1; // รัศมีมุมโค้ง 1cm
    
    // สร้าง shape เดียวกับ Panel 1 จาก test_panel แต่เพิ่มมุมโค้ง
    panelShape1.moveTo(-1.9 + cornerRadius, -1);
    panelShape1.lineTo(1.9 - cornerRadius, -1);
    panelShape1.quadraticCurveTo(1.9, -1, 1.9, -1 + cornerRadius);
    panelShape1.lineTo(1.9, -0.6);
    panelShape1.lineTo(2, -0.6);
    panelShape1.lineTo(2, -0.2);
    panelShape1.lineTo(1.9, -0.2);
    panelShape1.lineTo(1.9, 0.2);
    panelShape1.lineTo(2, 0.2);
    panelShape1.lineTo(2, 0.6);
    panelShape1.lineTo(1.9, 0.6);
    panelShape1.lineTo(1.9, 0.9);
    panelShape1.lineTo(1, 0.9);
    panelShape1.lineTo(1, 1 - cornerRadius);
    panelShape1.quadraticCurveTo(1, 1, 1 - cornerRadius, 1);
    panelShape1.lineTo(-1 + cornerRadius, 1);
    panelShape1.quadraticCurveTo(-1, 1, -1, 1 - cornerRadius);
    panelShape1.lineTo(-1, 0.9);
    panelShape1.lineTo(-1.9, 0.9);
    panelShape1.lineTo(-1.9, 0.6);
    panelShape1.lineTo(-2, 0.6);
    panelShape1.lineTo(-2, 0.2);
    panelShape1.lineTo(-1.9, 0.2);
    panelShape1.lineTo(-1.9, -0.2);
    panelShape1.lineTo(-2, -0.2);
    panelShape1.lineTo(-2, -0.6);
    panelShape1.lineTo(-1.9, -0.6);
    panelShape1.lineTo(-1.9, -1 + cornerRadius);
    panelShape1.quadraticCurveTo(-1.9, -1, -1.9 + cornerRadius, -1);
    
    const geometry1 = new THREE.ExtrudeGeometry(panelShape1, {
        depth: 0.1,
        bevelEnabled: false
    });
    
    const material1 = new THREE.MeshBasicMaterial({ color: 0xCD853F });
    const panel1 = new THREE.Mesh(geometry1, material1);
    
    // หมุนแผ่นที่ 1 เป็นแนวราบ โดยด้านบนไปอยู่ด้านหลัง
    panel1.rotation.x = -Math.PI / 2;  // หมุน -90 องศารอบแกน X (ด้านบนไปด้านหลัง)
    panel1.position.set(0, 1.9, 0);    // วางด้านบน ห่างจากขอบบนของแผ่นหลัง 1cm (ต่ำกว่า)
    
    // Store original position and type for explode function
    panel1.userData.originalPosition = { x: 0, y: 1.9, z: 0 };
    panel1.userData.type = 'top';
    
    panelGroup.add(panel1);
}

function createBottomPanel() {
    // แผ่นที่ 2: แผ่นซ้ายล่าง 40x20x1ซม. มีรอยตัดรอบด้าน + มุมโค้ง
    const panelShape2 = new THREE.Shape();
    const cornerRadius = 0.1; // รัศมีมุมโค้ง 1cm
    
    // สร้าง shape เดียวกับ Panel 2 จาก test_panel แต่เพิ่มมุมโค้ง
    panelShape2.moveTo(-1.9 + cornerRadius, -1);
    panelShape2.lineTo(1.9 - cornerRadius, -1);
    panelShape2.quadraticCurveTo(1.9, -1, 1.9, -1 + cornerRadius);
    panelShape2.lineTo(1.9, -0.6);
    panelShape2.lineTo(2, -0.6);
    panelShape2.lineTo(2, -0.2);
    panelShape2.lineTo(1.9, -0.2);
    panelShape2.lineTo(1.9, 0.2);
    panelShape2.lineTo(2, 0.2);
    panelShape2.lineTo(2, 0.6);
    panelShape2.lineTo(1.9, 0.6);
    panelShape2.lineTo(1.9, 0.9);
    panelShape2.lineTo(1, 0.9);
    panelShape2.lineTo(1, 1 - cornerRadius);
    panelShape2.quadraticCurveTo(1, 1, 1 - cornerRadius, 1);
    panelShape2.lineTo(-1 + cornerRadius, 1);
    panelShape2.quadraticCurveTo(-1, 1, -1, 1 - cornerRadius);
    panelShape2.lineTo(-1, 0.9);
    panelShape2.lineTo(-1.9, 0.9);
    panelShape2.lineTo(-1.9, 0.6);
    panelShape2.lineTo(-2, 0.6);
    panelShape2.lineTo(-2, 0.2);
    panelShape2.lineTo(-1.9, 0.2);
    panelShape2.lineTo(-1.9, -0.2);
    panelShape2.lineTo(-2, -0.2);
    panelShape2.lineTo(-2, -0.6);
    panelShape2.lineTo(-1.9, -0.6);
    panelShape2.lineTo(-1.9, -1 + cornerRadius);
    panelShape2.quadraticCurveTo(-1.9, -1, -1.9 + cornerRadius, -1);
    
    const geometry2 = new THREE.ExtrudeGeometry(panelShape2, {
        depth: 0.1,
        bevelEnabled: false
    });
    
    const material2 = new THREE.MeshBasicMaterial({ color: 0xDEB887 });
    const panel2 = new THREE.Mesh(geometry2, material2);
    
    // หมุนแผ่นที่ 2 เป็นแนวราบ โดยด้านบนไปอยู่ด้านหลัง
    panel2.rotation.x = -Math.PI / 2;  // หมุน -90 องศารอบแกน X (ด้านบนไปด้านหลัง)
    panel2.position.set(0, -1.9, 0);   // วางด้านล่าง ห่างจากขอบล่างของแผ่นหลัง 1cm (สูงกว่า)
    
    // Store original position and type for explode function
    panel2.userData.originalPosition = { x: 0, y: -1.9, z: 0 };
    panel2.userData.type = 'bottom';
    
    panelGroup.add(panel2);
}

function createLeftPanel() {
    // แผ่นที่ 3: แผ่นขวาบน 40x20x1ซม. มีรอยตัดมุมบน + รูเจาะด้านขวา + มุมโค้ง
    const panelShape3 = new THREE.Shape();
    const cornerRadius = 0.1; // รัศมีมุมโค้ง 1cm
    
    // Panel dimensions: 40x20cm (scaled to 4x2 units)
    // Start from bottom-left corner 
    panelShape3.moveTo(-2 + cornerRadius, -1);    // bottom-left corner with radius
    
    // Bottom edge - with rounded corners
    panelShape3.lineTo(2 - cornerRadius, -1);     // straight across to bottom-right
    panelShape3.quadraticCurveTo(2, -1, 2, -1 + cornerRadius);
    
    // Right edge - straight up (holes will be created separately)
    panelShape3.lineTo(2, 0.9);    // straight up to right corner notch level
    panelShape3.lineTo(1, 0.9);    // left 10cm for right corner notch
    panelShape3.lineTo(1, 1 - cornerRadius);      // up 1cm to top edge
    panelShape3.quadraticCurveTo(1, 1, 1 - cornerRadius, 1);
    
    // Top edge - across middle (solid section)
    panelShape3.lineTo(-1 + cornerRadius, 1);     // left across middle
    panelShape3.quadraticCurveTo(-1, 1, -1, 1 - cornerRadius);
    
    // Top left corner notch
    panelShape3.lineTo(-1, 0.9);   // down 1cm for left corner notch
    panelShape3.lineTo(-2, 0.9);   // left 10cm to complete left notch
    
    // Left edge - with two notches and rounded bottom-left corner
    // First notch: 4cm from top (1 - 0.4 = 0.6), 1x4cm
    panelShape3.lineTo(-2, 0.6);   // down to first notch start
    panelShape3.lineTo(-1.9, 0.6); // right 1cm
    panelShape3.lineTo(-1.9, 0.2); // down 4cm
    panelShape3.lineTo(-2, 0.2);   // back to left edge
    
    // Second notch: 12cm from top (1 - 1.2 = -0.2), 1x4cm  
    panelShape3.lineTo(-2, -0.2);  // down to second notch start
    panelShape3.lineTo(-1.9, -0.2);// right 1cm
    panelShape3.lineTo(-1.9, -0.6);// down 4cm
    panelShape3.lineTo(-2, -0.6);  // back to left edge
    panelShape3.lineTo(-2, -1 + cornerRadius);    // down to rounded corner
    panelShape3.quadraticCurveTo(-2, -1, -2 + cornerRadius, -1);    // rounded bottom-left corner
    
    // Create holes on right side (1cm from right edge, same positions as original notches)
    // First hole: 4cm from top (0.6 to 0.2), size 1x4cm, positioned 1cm from right edge
    const rightHole1 = new THREE.Shape();
    rightHole1.moveTo(1.8, 0.2);    // bottom-left of hole (1cm from right edge)
    rightHole1.lineTo(1.9, 0.2);    // right 1cm (hole width)
    rightHole1.lineTo(1.9, 0.6);    // up 4cm (hole height)
    rightHole1.lineTo(1.8, 0.6);    // left 1cm
    rightHole1.lineTo(1.8, 0.2);    // close hole
    
    // Second hole: 12cm from top (-0.6 to -0.2), size 1x4cm, positioned 1cm from right edge  
    const rightHole2 = new THREE.Shape();
    rightHole2.moveTo(1.8, -0.6);   // bottom-left of hole (1cm from right edge)
    rightHole2.lineTo(1.9, -0.6);   // right 1cm (hole width)
    rightHole2.lineTo(1.9, -0.2);   // up 4cm (hole height)
    rightHole2.lineTo(1.8, -0.2);   // left 1cm
    rightHole2.lineTo(1.8, -0.6);   // close hole
    
    // Add holes to main shape
    panelShape3.holes.push(rightHole1);
    panelShape3.holes.push(rightHole2);
    
    // Create 3D panel
    const geometry3 = new THREE.ExtrudeGeometry(panelShape3, {
        depth: 0.1,  // 1cm thickness
        bevelEnabled: false
    });
    
    const material3 = new THREE.MeshBasicMaterial({ color: 0x8B7355 });
    const panel3 = new THREE.Mesh(geometry3, material3);
    
    // หมุน panel_left ให้ตั้งขึ้น: ด้านซ้ายไปด้านล่าง, ด้านบนไปด้านหลัง
    panel3.rotation.y = Math.PI / 2;   // หมุน 90° รอบแกน Y ให้ตั้งขึ้นเป็นผนัง
    panel3.rotation.z = Math.PI / 2;   // หมุน 90° รอบแกน Z (ด้านซ้ายไปด้านล่าง)
    panel3.rotation.x = Math.PI;       // หมุน 180° รอบแกน X (ด้านหน้าไปด้านหลัง)
    panel3.position.set(-2.0, 0, 0);   // วางด้านซ้าย ขยับไปทางซ้าย 0.5cm
    
    // Store original position and type for explode function
    panel3.userData.originalPosition = { x: -2.0, y: 0, z: 0 };
    panel3.userData.type = 'left';
    
    panelGroup.add(panel3);
}

function createRightPanel() {
    // แผ่นที่ 4: แผ่นขวาล่าง 40x20x1ซม. มีรอยตัดมุมบน + รูเจาะด้านขวา + มุมโค้ง
    const panelShape4 = new THREE.Shape();
    const cornerRadius = 0.1; // รัศมีมุมโค้ง 1cm
    
    // Panel dimensions: 40x20cm (scaled to 4x2 units)
    // Start from bottom-left corner 
    panelShape4.moveTo(-2 + cornerRadius, -1);    // bottom-left corner with radius
    
    // Bottom edge - with rounded corners
    panelShape4.lineTo(2 - cornerRadius, -1);     // straight across to bottom-right
    panelShape4.quadraticCurveTo(2, -1, 2, -1 + cornerRadius);
    
    // Right edge - straight up (holes will be created separately)
    panelShape4.lineTo(2, 0.9);    // straight up to right corner notch level
    panelShape4.lineTo(1, 0.9);    // left 10cm for right corner notch
    panelShape4.lineTo(1, 1 - cornerRadius);      // up 1cm to top edge
    panelShape4.quadraticCurveTo(1, 1, 1 - cornerRadius, 1);
    
    // Top edge - across middle (solid section)
    panelShape4.lineTo(-1 + cornerRadius, 1);     // left across middle
    panelShape4.quadraticCurveTo(-1, 1, -1, 1 - cornerRadius);
    
    // Top left corner notch
    panelShape4.lineTo(-1, 0.9);   // down 1cm for left corner notch
    panelShape4.lineTo(-2, 0.9);   // left 10cm to complete left notch
    
    // Left edge - with two notches and rounded bottom-left corner
    // First notch: 4cm from top (1 - 0.4 = 0.6), 1x4cm
    panelShape4.lineTo(-2, 0.6);   // down to first notch start
    panelShape4.lineTo(-1.9, 0.6); // right 1cm
    panelShape4.lineTo(-1.9, 0.2); // down 4cm
    panelShape4.lineTo(-2, 0.2);   // back to left edge
    
    // Second notch: ขนาด 1x4cm เริ่มจากขอบซ้าย และห่างจากขอบล่าง 4cm
    panelShape4.lineTo(-2, -0.2);  // down to second notch start 
    panelShape4.lineTo(-1.9, -0.2);// right 1cm (เริ่มรอยบาก)
    panelShape4.lineTo(-1.9, -0.6);// down 4cm (ลึก 4cm)
    panelShape4.lineTo(-2, -0.6);  // back to left edge
    panelShape4.lineTo(-2, -1 + cornerRadius);    // down to rounded corner
    panelShape4.quadraticCurveTo(-2, -1, -2 + cornerRadius, -1);    // rounded bottom-left corner
    
    // Create holes on right side (1cm from right edge, same positions as original notches)
    // First hole: ปรับให้ห่างจากขอบ 1cm เมื่อหมุนแล้ว
    const rightHole1_4 = new THREE.Shape();
    rightHole1_4.moveTo(1.8, 0.2);    // ห่างจากขอบ 1cm เมื่อหมุน
    rightHole1_4.lineTo(1.9, 0.2);    // right 1cm (hole width)
    rightHole1_4.lineTo(1.9, 0.6);    // up 4cm (hole height)
    rightHole1_4.lineTo(1.8, 0.6);    // left 1cm
    rightHole1_4.lineTo(1.8, 0.2);    // close hole
    
    // Second hole: ห่างจากขอบขวา 1cm และห่างจากขอบล่าง 4cm (รูขนาด 1x4cm)
    const rightHole2_4 = new THREE.Shape();
    rightHole2_4.moveTo(1.8, -0.6);   // ห่างจากขอบขวา 1cm (2-0.2=1.8) และห่างจากขอบล่าง 4cm (-1+0.4=-0.6)
    rightHole2_4.lineTo(1.9, -0.6);   // right 1cm (hole width)
    rightHole2_4.lineTo(1.9, -0.2);   // up 4cm (hole height)
    rightHole2_4.lineTo(1.8, -0.2);   // left 1cm
    rightHole2_4.lineTo(1.8, -0.6);   // close hole
    
    // Add holes to main shape
    panelShape4.holes.push(rightHole1_4);
    panelShape4.holes.push(rightHole2_4);
    
    // Create 3D panel
    const geometry4 = new THREE.ExtrudeGeometry(panelShape4, {
        depth: 0.1,  // 1cm thickness
        bevelEnabled: false
    });
    
    const material4 = new THREE.MeshBasicMaterial({ color: 0xA0522D });
    const panel4 = new THREE.Mesh(geometry4, material4);
    
    // หมุน panel_right ให้ตั้งขึ้น: ด้านซ้ายไปด้านล่าง, ด้านบนไปด้านหลัง
    panel4.rotation.y = Math.PI / 2;   // หมุน 90° รอบแกน Y ให้ตั้งขึ้นเป็นผนัง
    panel4.rotation.z = Math.PI / 2;   // หมุน 90° รอบแกน Z (ด้านซ้ายไปด้านล่าง)
    panel4.rotation.x = Math.PI;       // หมุน 180° รอบแกน X (ด้านหน้าไปด้านหลัง)
    panel4.position.set(1.9, 0, 0);    // วางด้านขวา ขยับไปทางซ้าย 0.5cm
    
    // Store original position and type for explode function
    panel4.userData.originalPosition = { x: 1.9, y: 0, z: 0 };
    panel4.userData.type = 'right';
    
    panelGroup.add(panel4);
}

function createBackPanel() {
    // แผ่นที่ 5: แผ่นหลัง 42x41x1ซม. (แผ่นเปล่า ไม่มีรูเจาะ ไม่มีการหมุน) + มุมโค้ง
    const panelShape5 = new THREE.Shape();
    const cornerRadius = 0.1; // รัศมีมุมโค้ง 1cm
    
    // สร้าง shape ขนาด 42x41cm (scale เป็น 4.2x4.1 units) พร้อมมุมโค้ง
    panelShape5.moveTo(-2.1 + cornerRadius, -2.05);  // bottom-left with radius
    panelShape5.lineTo(2.1 - cornerRadius, -2.05);   // bottom-right with radius
    panelShape5.quadraticCurveTo(2.1, -2.05, 2.1, -2.05 + cornerRadius);   // bottom-right curve
    panelShape5.lineTo(2.1, 2.05 - cornerRadius);    // top-right with radius
    panelShape5.quadraticCurveTo(2.1, 2.05, 2.1 - cornerRadius, 2.05);   // top-right curve
    panelShape5.lineTo(-2.1 + cornerRadius, 2.05);   // top-left with radius
    panelShape5.quadraticCurveTo(-2.1, 2.05, -2.1, 2.05 - cornerRadius);   // top-left curve
    panelShape5.lineTo(-2.1, -2.05 + cornerRadius);  // bottom-left with radius
    panelShape5.quadraticCurveTo(-2.1, -2.05, -2.1 + cornerRadius, -2.05);  // close with curve
    
    // รูด้านซ้าย: ขนาด 1x20cm, ห่างจากขอบบน 11cm และห่างจากขอบซ้าย 1cm
    const leftHole = new THREE.Shape();
    leftHole.moveTo(-2.0, 0.95);    // จุดเริ่มต้น: ห่างจากซ้าย 1cm (-2.1+0.1=-2.0)
    leftHole.lineTo(-1.9, 0.95);    // กว้าง 1cm  
    leftHole.lineTo(-1.9, -1.05);   // สูง 20cm (0.95-2.0=-1.05)
    leftHole.lineTo(-2.0, -1.05);   // กลับ
    leftHole.lineTo(-2.0, 0.95);    // ปิดรู
    
    // รูด้านขวา: ขนาด 1x20cm, ห่างจากขอบบน 11cm และห่างจากขอบขวา 1cm
    const rightHole = new THREE.Shape();
    rightHole.moveTo(1.9, 0.95);     // จุดเริ่มต้น: ห่างจากขวา 1cm (2.1-0.1=2.0, เริ่มที่ 1.9)
    rightHole.lineTo(2.0, 0.95);     // กว้าง 1cm  
    rightHole.lineTo(2.0, -1.05);    // สูง 20cm
    rightHole.lineTo(1.9, -1.05);    // กลับ
    rightHole.lineTo(1.9, 0.95);     // ปิดรู
    
    // รูด้านล่าง: ขนาด 20x1cm, ห่างจากขอบซ้าย 11cm และห่างจากขอบล่าง 1cm
    const bottomHole = new THREE.Shape();
    bottomHole.moveTo(-1.0, -1.95);  // จุดเริ่มต้น: ห่างจากล่าง 1cm (-2.05+0.1=-1.95)
    bottomHole.lineTo(1.0, -1.95);   // กว้าง 20cm
    bottomHole.lineTo(1.0, -1.85);   // สูง 1cm (-1.95+0.1=-1.85)
    bottomHole.lineTo(-1.0, -1.85);  // กลับ
    bottomHole.lineTo(-1.0, -1.95);  // ปิดรู
    
    // รูด้านบน: ขนาด 20x1cm, ห่างจากขอบซ้าย 11cm และห่างจากขอบบน 1cm
    const topHole = new THREE.Shape();
    topHole.moveTo(-1.0, 1.85);     // จุดเริ่มต้น: ห่างจากบน 1cm (2.05-0.1-0.1=1.85)
    topHole.lineTo(1.0, 1.85);      // กว้าง 20cm
    topHole.lineTo(1.0, 1.95);      // สูง 1cm (1.85+0.1=1.95)
    topHole.lineTo(-1.0, 1.95);     // กลับ
    topHole.lineTo(-1.0, 1.85);     // ปิดรู
    
    panelShape5.holes.push(leftHole);
    panelShape5.holes.push(rightHole);
    panelShape5.holes.push(bottomHole);
    panelShape5.holes.push(topHole);
    
    const geometry5 = new THREE.ExtrudeGeometry(panelShape5, {
        depth: 0.1,
        bevelEnabled: false
    });
    
    const material5 = new THREE.MeshBasicMaterial({ color: 0x654321 });
    const panel5 = new THREE.Mesh(geometry5, material5);
    
    // ไม่หมุน วางแบนเหมือนไฟล์ต้นฉบับ
    panel5.position.set(0, 0.05, -1.0); // วางด้านหลัง ยกขึ้น 0.5cm ให้ชิดกับแผ่นซ้าย
    
    // Store original position and type for explode function
    panel5.userData.originalPosition = { x: 0, y: 0.05, z: -1.0 };
    panel5.userData.type = 'back';
    
    panelGroup.add(panel5);
}

function setupControls() {
    // สร้าง toolbar container
    const toolbar = document.createElement('div');
    toolbar.id = 'controls'; // เพิ่ม ID สำหรับ mobile responsive
    toolbar.style.position = 'absolute';
    toolbar.style.top = '20px';
    toolbar.style.left = '20px';
    toolbar.style.padding = '25px';
    toolbar.style.background = 'rgba(0, 0, 0, 0.8)';
    toolbar.style.borderRadius = '15px';
    toolbar.style.zIndex = '100';
    toolbar.style.color = 'white';
    toolbar.style.fontFamily = "'Sarabun', 'Noto Sans Thai', Arial, sans-serif";
    toolbar.style.minWidth = '280px';
    toolbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    
    // ชื่อแอป
    const title = document.createElement('h3');
    title.innerHTML = '🧸 กล่องใส่ของเล่น';
    title.style.margin = '0 0 15px 0';
    title.style.fontSize = '20px';
    title.style.color = '#DEB887';
    title.style.borderBottom = '2px solid #DEB887';
    title.style.paddingBottom = '8px';
    toolbar.appendChild(title);
    
    // รายละเอียด
    const info = document.createElement('div');
    info.innerHTML = 'แบบ Tab & Slot System<br>ขนาด: 40x20x30cm<br>ไม้หนา 1cm<br>มุมโค้งทุกด้าน';
    info.style.fontSize = '14px';
    info.style.marginBottom = '20px';
    info.style.lineHeight = '1.6';
    info.style.color = '#ccc';
    toolbar.appendChild(info);
    
    // ปุ่ม แยกชิ้นส่วน
    const explodedBtn = document.createElement('button');
    explodedBtn.innerHTML = 'แยกชิ้นส่วน';
    explodedBtn.style.padding = '12px 18px';
    explodedBtn.style.margin = '8px 8px 8px 0';
    explodedBtn.style.background = 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)';
    explodedBtn.style.color = 'white';
    explodedBtn.style.border = 'none';
    explodedBtn.style.borderRadius = '8px';
    explodedBtn.style.cursor = 'pointer';
    explodedBtn.style.fontSize = '13px';
    explodedBtn.style.fontWeight = 'bold';
    explodedBtn.style.transition = 'all 0.3s ease';
    explodedBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    explodedBtn.addEventListener('mouseover', () => {
        explodedBtn.style.background = 'linear-gradient(135deg, #A0522D 0%, #CD853F 100%)';
        explodedBtn.style.transform = 'translateY(-2px)';
        explodedBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
    });
    explodedBtn.addEventListener('mouseout', () => {
        explodedBtn.style.background = 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)';
        explodedBtn.style.transform = 'translateY(0)';
        explodedBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    });
    explodedBtn.addEventListener('click', explodeView);
    toolbar.appendChild(explodedBtn);
    
    // ปุ่ม ประกอบ
    const assembledBtn = document.createElement('button');
    assembledBtn.innerHTML = 'ประกอบ';
    assembledBtn.style.padding = '12px 18px';
    assembledBtn.style.margin = '8px 8px 8px 0';
    assembledBtn.style.background = 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)';
    assembledBtn.style.color = 'white';
    assembledBtn.style.border = 'none';
    assembledBtn.style.borderRadius = '8px';
    assembledBtn.style.cursor = 'pointer';
    assembledBtn.style.fontSize = '13px';
    assembledBtn.style.fontWeight = 'bold';
    assembledBtn.style.transition = 'all 0.3s ease';
    assembledBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    assembledBtn.addEventListener('mouseover', () => {
        assembledBtn.style.background = 'linear-gradient(135deg, #A0522D 0%, #CD853F 100%)';
        assembledBtn.style.transform = 'translateY(-2px)';
        assembledBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
    });
    assembledBtn.addEventListener('mouseout', () => {
        assembledBtn.style.background = 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)';
        assembledBtn.style.transform = 'translateY(0)';
        assembledBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    });
    assembledBtn.addEventListener('click', assembleView);
    toolbar.appendChild(assembledBtn);
    
    // ปุ่ม หมุนดู
    const rotateBtn = document.createElement('button');
    rotateBtn.innerHTML = 'หมุนดู';
    rotateBtn.style.padding = '12px 18px';
    rotateBtn.style.margin = '8px 8px 8px 0';
    rotateBtn.style.background = 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)';
    rotateBtn.style.color = 'white';
    rotateBtn.style.border = 'none';
    rotateBtn.style.borderRadius = '8px';
    rotateBtn.style.cursor = 'pointer';
    rotateBtn.style.fontSize = '13px';
    rotateBtn.style.fontWeight = 'bold';
    rotateBtn.style.transition = 'all 0.3s ease';
    rotateBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    rotateBtn.addEventListener('mouseover', () => {
        rotateBtn.style.background = 'linear-gradient(135deg, #A0522D 0%, #CD853F 100%)';
        rotateBtn.style.transform = 'translateY(-2px)';
        rotateBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
    });
    rotateBtn.addEventListener('mouseout', () => {
        rotateBtn.style.background = 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)';
        rotateBtn.style.transform = 'translateY(0)';
        rotateBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    });
    rotateBtn.addEventListener('click', () => {
        isRotating = !isRotating;
        rotateBtn.innerHTML = isRotating ? 'หยุดหมุน' : 'หมุนดู';
    });
    toolbar.appendChild(rotateBtn);
    
    // ปุ่ม บันทึกภาพ
    const exportBtn = document.createElement('button');
    exportBtn.innerHTML = 'บันทึกภาพ';
    exportBtn.style.padding = '12px 18px';
    exportBtn.style.margin = '8px 8px 8px 0';
    exportBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    exportBtn.style.color = 'white';
    exportBtn.style.border = 'none';
    exportBtn.style.borderRadius = '8px';
    exportBtn.style.cursor = 'pointer';
    exportBtn.style.fontSize = '13px';
    exportBtn.style.fontWeight = 'bold';
    exportBtn.style.transition = 'all 0.3s ease';
    exportBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    exportBtn.addEventListener('mouseover', () => {
        exportBtn.style.background = 'linear-gradient(135deg, #45a049 0%, #66bb6a 100%)';
        exportBtn.style.transform = 'translateY(-2px)';
        exportBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
    });
    exportBtn.addEventListener('mouseout', () => {
        exportBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        exportBtn.style.transform = 'translateY(0)';
        exportBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    });
    exportBtn.addEventListener('click', exportImage);
    toolbar.appendChild(exportBtn);
    
    // Legend
    const legend = document.createElement('div');
    legend.style.marginTop = '20px';
    legend.style.fontSize = '12px';
    legend.style.lineHeight = '1.5';
    legend.innerHTML = `
        <div style="margin-bottom: 8px;"><strong>🎨 สีแยกชิ้นส่วน:</strong></div>
        <div style="display: flex; align-items: center; margin: 6px 0;">
            <div style="width: 18px; height: 18px; background-color: #CD853F; margin-right: 10px; border: 1px solid #555; border-radius: 3px;"></div>
            <span>หลังคา (Top)</span>
        </div>
        <div style="display: flex; align-items: center; margin: 6px 0;">
            <div style="width: 18px; height: 18px; background-color: #DEB887; margin-right: 10px; border: 1px solid #555; border-radius: 3px;"></div>
            <span>ฐาน (Bottom)</span>
        </div>
        <div style="display: flex; align-items: center; margin: 6px 0;">
            <div style="width: 18px; height: 18px; background-color: #8B7355; margin-right: 10px; border: 1px solid #555; border-radius: 3px;"></div>
            <span>ด้านซ้าย (Left)</span>
        </div>
        <div style="display: flex; align-items: center; margin: 6px 0;">
            <div style="width: 18px; height: 18px; background-color: #A0522D; margin-right: 10px; border: 1px solid #555; border-radius: 3px;"></div>
            <span>ด้านขวา (Right)</span>
        </div>
        <div style="display: flex; align-items: center; margin: 6px 0;">
            <div style="width: 18px; height: 18px; background-color: #654321; margin-right: 10px; border: 1px solid #555; border-radius: 3px;"></div>
            <span>ด้านหลัง (Back)</span>
        </div>
    `;
    toolbar.appendChild(legend);
    
    document.body.appendChild(toolbar);
}

function exportImage() {
    // สร้าง canvas สำหรับ export
    const canvas = renderer.domElement;
    const link = document.createElement('a');
    link.download = 'toybox_3d_model.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function toggleExplode() {
    if (isExploded) {
        assembleView();
    } else {
        explodeView();
    }
}

function explodeView() {
    const explodeDistance = 3;
    
    panelGroup.children.forEach(panel => {
        const type = panel.userData.type;
        switch(type) {
            case 'top':
                panel.position.y += explodeDistance;
                break;
            case 'bottom':
                panel.position.y -= explodeDistance;
                break;
            case 'left':
                panel.position.x -= explodeDistance;
                break;
            case 'right':
                panel.position.x += explodeDistance;
                break;
            case 'back':
                panel.position.z -= explodeDistance;
                break;
        }
    });
    isExploded = true;
    // document.querySelector('button').innerHTML = 'Assemble';
}

function assembleView() {
    panelGroup.children.forEach(panel => {
        const original = panel.userData.originalPosition;
        panel.position.set(original.x, original.y, original.z);
    });
    isExploded = false;
    // document.querySelector('button').innerHTML = 'แยกชิ้นส่วน';
}

function animate() {
    requestAnimationFrame(animate);
    
    if (isRotating) {
        panelGroup.rotation.y += rotationSpeed;
    }
    
    controls.update();
    renderer.render(scene, camera);
}

init();