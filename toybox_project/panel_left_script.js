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
    
    // Create Panel 3
    createPanel3();
    
    animate();
}

function createPanel3() {
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
    panel3.position.set(0, 0, 0);
    
    scene.add(panel3);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();