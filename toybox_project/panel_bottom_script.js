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
    
    // Create Panel 2
    createPanel2();
    
    animate();
}

function createPanel2() {
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
    
    const material2 = new THREE.MeshBasicMaterial({ color: 0xCD853F });
    const panel2 = new THREE.Mesh(geometry2, material2);
    
    // หมุนแผ่นที่ 2 เป็นแนวราบ โดยด้านบนไปอยู่ด้านหลัง
    panel2.rotation.x = -Math.PI / 2;  // หมุน -90 องศารอบแกน X (ด้านบนไปด้านหลัง)
    panel2.position.set(0, 0, 0);
    
    scene.add(panel2);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();