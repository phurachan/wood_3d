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
    
    // สร้างแผ่นทั้งหมดแบบ grid
    createAllPanelsGrid();
    
    animate();
}

function createAllPanelsGrid() {
    // กำหนดตำแหน่ง grid 3x2
    const gridPositions = [
        { x: -6, y: 4 },   // แผ่นบน
        { x: 6, y: 4 },    // แผ่นล่าง  
        { x: -6, y: 0 },   // แผ่นซ้าย
        { x: 6, y: 0 },    // แผ่นขวา
        { x: 0, y: -4 }    // แผ่นหลัง (กลางล่าง)
    ];
    
    // สร้างแผ่นทั้ง 5 แผ่น
    createPanel1(gridPositions[0]); // Top
    createPanel2(gridPositions[1]); // Bottom
    createPanel3(gridPositions[2]); // Left
    createPanel4(gridPositions[3]); // Right
    createPanel5(gridPositions[4]); // Back
}

// คัดลอกจาก panel_top_script.js
function createPanel1(position) {
    // แผ่นที่ 1: แผ่นซ้ายบน 40x20x1ซม. มีรอยตัดรอบด้าน + มุมโค้ง
    const panelShape1 = new THREE.Shape();
    const cornerRadius = 0.1; // รัศมีมุมโค้ง 1cm
    
    // สร้าง shape เดียวกับ Panel 1 จาก panel_top_script แต่เพิ่มมุมโค้ง
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
    
    // วางตำแหน่ง grid โดยไม่หมุน
    panel1.position.set(position.x, position.y, 0);
    
    scene.add(panel1);
}

// คัดลอกจาก panel_bottom_script.js  
function createPanel2(position) {
    // แผ่นที่ 2: แผ่นซ้ายล่าง 40x20x1ซม. มีรอยตัดรอบด้าน + มุมโค้ง
    const panelShape2 = new THREE.Shape();
    const cornerRadius = 0.1; // รัศมีมุมโค้ง 1cm
    
    // สร้าง shape เดียวกับ Panel 2 จาก panel_bottom_script แต่เพิ่มมุมโค้ง
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
    
    // วางตำแหน่ง grid โดยไม่หมุน
    panel2.position.set(position.x, position.y, 0);
    
    scene.add(panel2);
}

// คัดลอกจาก panel_left_script.js
function createPanel3(position) {
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
    
    // วางตำแหน่ง grid โดยไม่หมุน (ลบ rotation ออก)
    panel3.position.set(position.x, position.y, 0);
    
    scene.add(panel3);
}

// คัดลอกจาก panel_right_script.js
function createPanel4(position) {
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
    
    // วางตำแหน่ง grid โดยไม่หมุน (ลบ rotation ออก)
    panel4.position.set(position.x, position.y, 0);
    
    scene.add(panel4);
}

// คัดลอกจาก panel_back_script.js
function createPanel5(position) {
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
    
    // วางตำแหน่ง grid โดยไม่หมุน
    panel5.position.set(position.x, position.y, 0);
    
    scene.add(panel5);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();