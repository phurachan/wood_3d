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
    
    // Create Panel 1
    createPanel1();
    
    animate();
}

function createPanel1() {
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
    
    const material1 = new THREE.MeshBasicMaterial({ color: 0xD2B48C });
    const panel1 = new THREE.Mesh(geometry1, material1);
    
    // หมุนแผ่นที่ 1 เป็นแนวราบ โดยด้านบนไปอยู่ด้านหลัง
    panel1.rotation.x = -Math.PI / 2;  // หมุน -90 องศารอบแกน X (ด้านบนไปด้านหลัง)
    panel1.position.set(0, 0, 0);
    
    scene.add(panel1);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();