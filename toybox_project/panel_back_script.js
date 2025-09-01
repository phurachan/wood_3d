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
    
    // Create Panel 5
    createPanel5();
    
    animate();
}

function createPanel5() {
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
    
    // ไม่หมุน วางแบน
    panel5.position.set(0, 0, 0);
    
    scene.add(panel5);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();