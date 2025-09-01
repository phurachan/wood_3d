let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // Create Panel 4
    createPanel4();
    
    animate();
}

function createPanel4() {
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
    panel4.position.set(0, 0, 0);
    
    scene.add(panel4);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();