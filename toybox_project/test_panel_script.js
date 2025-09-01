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
    
    // Reset to simple wooden panel 40x20x1 cm
    createTestPanel();
    
    animate();
}

function createTestPanel() {
    // Create first wooden panel with custom shape
    createWoodPanel();
    
    // Create second panel below the first one
    createSecondWoodPanel();
    
    // Create third panel below the second one
    createThirdWoodPanel();
    
    // Create fourth panel below the third one
    createFourthWoodPanel();
    
    // Create fifth panel on upper left
    createFifthWoodPanel();
    
    // No additional markers or coordinate systems
}

function createWoodPanel() {
    // แผ่นที่ 1: แผ่นซ้ายบน 40x20x1ซม. มีรอยตัดรอบด้าน
    // Create panel shape using THREE.Shape
    const panelShape = new THREE.Shape();
    
    // Start from bottom-left corner and draw clockwise
    // Panel dimensions: 40x20cm (scaled to 4x2 units)
    
    // Start from bottom-left corner 
    panelShape.moveTo(-1.9, -1);    // bottom-left corner
    
    // Bottom edge (left to right, creating notches as we go)
    panelShape.lineTo(1.9, -1);   // straight across to right notch start
    panelShape.lineTo(1.9, -0.6); // up 4cm for right notch
    panelShape.lineTo(2, -0.6);   // right 1cm
    
    // Right edge - bottom to top with middle notch and L-notch
    panelShape.lineTo(2, -0.2);   // up to middle notch start
    panelShape.lineTo(1.9, -0.2); // left 1cm (middle notch)
    panelShape.lineTo(1.9, 0.2);  // up 4cm 
    panelShape.lineTo(2, 0.2);    // back to right edge
    panelShape.lineTo(2, 0.6);    // up to L-notch start
    panelShape.lineTo(1.9, 0.6);  // left 1cm 
    panelShape.lineTo(1.9, 0.9);  // up 3cm
    panelShape.lineTo(1, 0.9);    // left 9cm
    panelShape.lineTo(1, 1);      // up 1cm to top edge
    
    // Top edge - right to left with notches
    panelShape.lineTo(-1, 1);     // left to second notch end
    panelShape.lineTo(-1, 0.9);   // down 1cm 
    panelShape.lineTo(-1.9, 0.9); // left 9cm
    panelShape.lineTo(-1.9, 0.6); // down 3cm (total 4cm from top)
    
    // Left edge - top to bottom with middle notch and bottom-left notch
    panelShape.lineTo(-2, 0.6);     // to left edge
    panelShape.lineTo(-2, 0.2);     // down to middle notch
    panelShape.lineTo(-1.9, 0.2);   // right 1cm
    panelShape.lineTo(-1.9, -0.2);  // down 4cm
    panelShape.lineTo(-2, -0.2);    // back to left edge
    panelShape.lineTo(-2, -0.6);    // down to bottom-left notch
    panelShape.lineTo(-1.9, -0.6);  // right 1cm for bottom-left notch
    panelShape.lineTo(-1.9, -1);    // down to bottom edge
    // panelShape.lineTo(-2, -1);      // left back to starting point to close cleanly
    
    // Create 3D panel
    const geometry = new THREE.ExtrudeGeometry(panelShape, {
        depth: 0.1,  // 1cm thickness
        bevelEnabled: false
    });
    
    const material = new THREE.MeshBasicMaterial({ color: 0xD2B48C }); // Light wood color
    const panel = new THREE.Mesh(geometry, material);
    
    scene.add(panel);
}

function createSecondWoodPanel() {
    // แผ่นที่ 2: แผ่นซ้ายล่าง 40x20x1ซม. มีรอยตัดรอบด้าน
    // Create second panel shape using THREE.Shape
    const panelShape2 = new THREE.Shape();
    
    // Start from bottom-left corner and draw clockwise
    // Panel dimensions: 40x20cm (scaled to 4x2 units)
    
    // Start from bottom-left corner 
    panelShape2.moveTo(-1.9, -1);    // bottom-left corner
    
    // Bottom edge (left to right, creating notches as we go)
    panelShape2.lineTo(1.9, -1);   // straight across to right notch start
    panelShape2.lineTo(1.9, -0.6); // up 4cm for right notch
    panelShape2.lineTo(2, -0.6);   // right 1cm
    
    // Right edge - bottom to top with middle notch and L-notch
    panelShape2.lineTo(2, -0.2);   // up to middle notch start
    panelShape2.lineTo(1.9, -0.2); // left 1cm (middle notch)
    panelShape2.lineTo(1.9, 0.2);  // up 4cm 
    panelShape2.lineTo(2, 0.2);    // back to right edge
    panelShape2.lineTo(2, 0.6);    // up to L-notch start
    panelShape2.lineTo(1.9, 0.6);  // left 1cm 
    panelShape2.lineTo(1.9, 0.9);  // up 3cm
    panelShape2.lineTo(1, 0.9);    // left 9cm
    panelShape2.lineTo(1, 1);      // up 1cm to top edge
    
    // Top edge - right to left with notches
    panelShape2.lineTo(-1, 1);     // left to second notch end
    panelShape2.lineTo(-1, 0.9);   // down 1cm 
    panelShape2.lineTo(-1.9, 0.9); // left 9cm
    panelShape2.lineTo(-1.9, 0.6); // down 3cm (total 4cm from top)
    
    // Left edge - top to bottom with middle notch and bottom-left notch
    panelShape2.lineTo(-2, 0.6);     // to left edge
    panelShape2.lineTo(-2, 0.2);     // down to middle notch
    panelShape2.lineTo(-1.9, 0.2);   // right 1cm
    panelShape2.lineTo(-1.9, -0.2);  // down 4cm
    panelShape2.lineTo(-2, -0.2);    // back to left edge
    panelShape2.lineTo(-2, -0.6);    // down to bottom-left notch
    panelShape2.lineTo(-1.9, -0.6);  // right 1cm for bottom-left notch
    panelShape2.lineTo(-1.9, -1);    // down to bottom edge
    // Shape closes automatically to (-1.9, -1)
    
    // Create 3D panel
    const geometry2 = new THREE.ExtrudeGeometry(panelShape2, {
        depth: 0.1,  // 1cm thickness
        bevelEnabled: false
    });
    
    const material2 = new THREE.MeshBasicMaterial({ color: 0xD2B48C }); // Light wood color
    const panel2 = new THREE.Mesh(geometry2, material2);
    
    // Position second panel 30cm (3 units) below the first panel
    panel2.position.y = -4;  // 30cm below (original panel center + gap + new panel center)
    
    scene.add(panel2);
}

function createThirdWoodPanel() {
    // แผ่นที่ 3: แผ่นขวาบน 40x20x1ซม. มีรอยตัดมุมบน + รูเจาะด้านขวา
    // Create third panel shape using THREE.Shape - only top notches
    const panelShape3 = new THREE.Shape();
    
    // Panel dimensions: 40x20cm (scaled to 4x2 units)
    // Only top edge has notches (10x1cm = 1x0.1 units each)
    
    // Start from bottom-left corner 
    panelShape3.moveTo(-2, -1);    // bottom-left corner
    
    // Bottom edge - straight across (no notches)
    panelShape3.lineTo(2, -1);     // straight across to bottom-right
    
    // Right edge - straight up (holes will be created separately)
    panelShape3.lineTo(2, 0.9);    // straight up to right corner notch level
    panelShape3.lineTo(1, 0.9);    // left 10cm for right corner notch
    panelShape3.lineTo(1, 1);      // up 1cm to top edge
    
    // Top edge - across middle (solid section)
    panelShape3.lineTo(-1, 1);     // left across middle
    
    // Top left corner notch
    panelShape3.lineTo(-1, 0.9);   // down 1cm for left corner notch
    panelShape3.lineTo(-2, 0.9);   // left 10cm to complete left notch
    
    // Left edge - with two notches
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
    panelShape3.lineTo(-2, -1);    // down to close shape
    
    // Create holes on right side (1cm from right edge, same positions as original notches)
    // Panel width = 40cm (4 units), so right edge is at x=2, 1cm inward = x=1.9
    // First hole: 4cm from top (0.6 to 0.2), size 1x4cm, positioned 1cm from right edge
    const rightHole1 = new THREE.Shape();
    rightHole1.moveTo(1.9, 0.2);    // bottom-left of hole (1cm from right edge)
    rightHole1.lineTo(2, 0.2);      // right 1cm (hole width)
    rightHole1.lineTo(2, 0.6);      // up 4cm (hole height)
    rightHole1.lineTo(1.9, 0.6);    // left 1cm
    rightHole1.lineTo(1.9, 0.2);    // close hole
    
    // Second hole: 12cm from top (-0.6 to -0.2), size 1x4cm, positioned 1cm from right edge  
    const rightHole2 = new THREE.Shape();
    rightHole2.moveTo(1.9, -0.6);   // bottom-left of hole (1cm from right edge)
    rightHole2.lineTo(2, -0.6);     // right 1cm (hole width)
    rightHole2.lineTo(2, -0.2);     // up 4cm (hole height)
    rightHole2.lineTo(1.9, -0.2);   // left 1cm
    rightHole2.lineTo(1.9, -0.6);   // close hole
    
    // Add holes to main shape
    panelShape3.holes.push(rightHole1);
    panelShape3.holes.push(rightHole2);
    
    // Create 3D panel
    const geometry3 = new THREE.ExtrudeGeometry(panelShape3, {
        depth: 0.1,  // 1cm thickness
        bevelEnabled: false
    });
    
    const material3 = new THREE.MeshBasicMaterial({ color: 0xD2B48C }); // Light wood color
    const panel3 = new THREE.Mesh(geometry3, material3);
    
    // Position third panel to the right of first panel
    panel3.position.x = 6;   // 60cm to the right
    panel3.position.y = 0;   // Same level as first panel
    
    scene.add(panel3);
}

function createFourthWoodPanel() {
    // แผ่นที่ 4: แผ่นขวาล่าง 40x20x1ซม. มีรอยตัดมุมบน + รูเจาะด้านขวา
    // Create fourth panel shape using THREE.Shape - only top notches
    const panelShape4 = new THREE.Shape();
    
    // Panel dimensions: 40x20cm (scaled to 4x2 units)
    // Only top edge has notches (10x1cm = 1x0.1 units each)
    
    // Start from bottom-left corner 
    panelShape4.moveTo(-2, -1);    // bottom-left corner
    
    // Bottom edge - straight across (no notches)
    panelShape4.lineTo(2, -1);     // straight across to bottom-right
    
    // Right edge - straight up (holes will be created separately)
    panelShape4.lineTo(2, 0.9);    // straight up to right corner notch level
    panelShape4.lineTo(1, 0.9);    // left 10cm for right corner notch
    panelShape4.lineTo(1, 1);      // up 1cm to top edge
    
    // Top edge - across middle (solid section)
    panelShape4.lineTo(-1, 1);     // left across middle
    
    // Top left corner notch
    panelShape4.lineTo(-1, 0.9);   // down 1cm for left corner notch
    panelShape4.lineTo(-2, 0.9);   // left 10cm to complete left notch
    
    // Left edge - with two notches
    // First notch: 4cm from top (1 - 0.4 = 0.6), 1x4cm
    panelShape4.lineTo(-2, 0.6);   // down to first notch start
    panelShape4.lineTo(-1.9, 0.6); // right 1cm
    panelShape4.lineTo(-1.9, 0.2); // down 4cm
    panelShape4.lineTo(-2, 0.2);   // back to left edge
    
    // Second notch: 12cm from top (1 - 1.2 = -0.2), 1x4cm  
    panelShape4.lineTo(-2, -0.2);  // down to second notch start
    panelShape4.lineTo(-1.9, -0.2);// right 1cm
    panelShape4.lineTo(-1.9, -0.6);// down 4cm
    panelShape4.lineTo(-2, -0.6);  // back to left edge
    panelShape4.lineTo(-2, -1);    // down to close shape
    
    // Create holes on right side (1cm from right edge, same positions as original notches)
    // Panel width = 40cm (4 units), so right edge is at x=2, 1cm inward = x=1.9
    // First hole: 4cm from top (0.6 to 0.2), size 1x4cm, positioned 1cm from right edge
    const rightHole1_4 = new THREE.Shape();
    rightHole1_4.moveTo(1.9, 0.2);    // bottom-left of hole (1cm from right edge)
    rightHole1_4.lineTo(2, 0.2);      // right 1cm (hole width)
    rightHole1_4.lineTo(2, 0.6);      // up 4cm (hole height)
    rightHole1_4.lineTo(1.9, 0.6);    // left 1cm
    rightHole1_4.lineTo(1.9, 0.2);    // close hole
    
    // Second hole: 12cm from top (-0.6 to -0.2), size 1x4cm, positioned 1cm from right edge  
    const rightHole2_4 = new THREE.Shape();
    rightHole2_4.moveTo(1.9, -0.6);   // bottom-left of hole (1cm from right edge)
    rightHole2_4.lineTo(2, -0.6);     // right 1cm (hole width)
    rightHole2_4.lineTo(2, -0.2);     // up 4cm (hole height)
    rightHole2_4.lineTo(1.9, -0.2);   // left 1cm
    rightHole2_4.lineTo(1.9, -0.6);   // close hole
    
    // Add holes to main shape
    panelShape4.holes.push(rightHole1_4);
    panelShape4.holes.push(rightHole2_4);
    
    // Create 3D panel
    const geometry4 = new THREE.ExtrudeGeometry(panelShape4, {
        depth: 0.1,  // 1cm thickness
        bevelEnabled: false
    });
    
    const material4 = new THREE.MeshBasicMaterial({ color: 0xD2B48C }); // Light wood color
    const panel4 = new THREE.Mesh(geometry4, material4);
    
    // Position fourth panel to the right of second panel  
    panel4.position.x = 6;   // 60cm to the right
    panel4.position.y = -4;  // Same level as second panel
    
    scene.add(panel4);
}

function createFifthWoodPanel() {
    // แผ่นที่ 5: แผ่นซ้ายสุด 40x40x1ซม. รูเจาะ 4 ด้าน (บน ล่าง ซ้าย ขวา)
    // Create fifth panel shape using THREE.Shape with holes
    // Panel dimensions: 40x40cm (scaled to 4x4 units)
    
    const panelShape5 = new THREE.Shape();
    
    // Create main rectangle shape (40x40cm = 4x4 units)
    panelShape5.moveTo(-2, -2);    // bottom-left corner
    panelShape5.lineTo(2, -2);     // bottom edge
    panelShape5.lineTo(2, 2);      // right edge
    panelShape5.lineTo(-2, 2);     // top edge
    panelShape5.lineTo(-2, -2);    // back to start
    
    // Create hole on top area
    // Hole: 20x1cm (2x0.1 units), starting 10cm from left edge, 1cm from top
    // Panel center is at (0,0), panel top edge is at y=2
    // 1cm from top = y=2-0.1 = y=1.9, hole height = 0.1, so hole from y=1.8 to y=1.9
    
    const topHole = new THREE.Shape();
    topHole.moveTo(-1, 1.8);      // bottom-left of hole (10cm from left, 1cm from top)
    topHole.lineTo(1, 1.8);       // right 20cm (hole width)
    topHole.lineTo(1, 1.9);       // up 1cm (hole height)
    topHole.lineTo(-1, 1.9);      // left 20cm
    topHole.lineTo(-1, 1.8);      // close hole
    
    // Create hole on left side
    // Hole: 1x20cm (0.1x2 units), 1cm from left edge, 10cm from top
    // Panel left edge is at x=-2, 1cm from left = x=-2+0.1 = x=-1.9
    // Panel top edge is at y=2, 10cm from top = y=2-1 = y=1
    // Hole height = 2 units (20cm), so hole from y=1-2 = y=-1 to y=1
    
    const leftHole = new THREE.Shape();
    leftHole.moveTo(-1.9, -1);    // bottom-left of hole (1cm from left edge)
    leftHole.lineTo(-1.8, -1);    // right 1cm (hole width)
    leftHole.lineTo(-1.8, 1);     // up 20cm (hole height)
    leftHole.lineTo(-1.9, 1);     // left 1cm  
    leftHole.lineTo(-1.9, -1);    // close hole
    
    // Create hole on right side
    // Hole: 1x20cm (0.1x2 units), 1cm from right edge, 10cm from top
    // Panel right edge is at x=2, 1cm from right = x=2-0.1 = x=1.9
    // Hole width = 0.1 units (1cm), so hole from x=1.9 to x=2.0, but needs to be 1cm from edge
    // Corrected: hole should be from x=1.8 to x=1.9 (1cm from right edge)
    
    const rightHole = new THREE.Shape();
    rightHole.moveTo(1.8, -1);    // bottom-left of hole (1cm from right edge)
    rightHole.lineTo(1.9, -1);    // right 1cm (hole width) 
    rightHole.lineTo(1.9, 1);     // up 20cm (hole height)
    rightHole.lineTo(1.8, 1);     // left 1cm
    rightHole.lineTo(1.8, -1);    // close hole
    
    // Create hole on bottom area
    // Hole: 20x1cm (2x0.1 units), starting 10cm from left edge, 1cm from bottom
    // Panel center is at (0,0), panel bottom edge is at y=-2
    // 1cm from bottom = y=-2+0.1 = y=-1.9, hole height = 0.1, so hole from y=-1.9 to y=-1.8
    
    const bottomHole = new THREE.Shape();
    bottomHole.moveTo(-1, -1.9);  // bottom-left of hole (10cm from left, 1cm from bottom)
    bottomHole.lineTo(1, -1.9);   // right 20cm (hole width)
    bottomHole.lineTo(1, -1.8);   // up 1cm (hole height)
    bottomHole.lineTo(-1, -1.8);  // left 20cm
    bottomHole.lineTo(-1, -1.9);  // close hole
    
    // Add holes to main shape
    panelShape5.holes.push(topHole);
    panelShape5.holes.push(leftHole);
    panelShape5.holes.push(rightHole);
    panelShape5.holes.push(bottomHole);
    
    // Create 3D panel
    const geometry5 = new THREE.ExtrudeGeometry(panelShape5, {
        depth: 0.1,  // 1cm thickness
        bevelEnabled: false
    });
    
    const material5 = new THREE.MeshBasicMaterial({ color: 0xD2B48C }); // Light wood color
    const panel5 = new THREE.Mesh(geometry5, material5);
    
    // Position fifth panel to the left of first panel (same level)
    panel5.position.x = -6;  // 60cm to the left
    panel5.position.y = 0;   // Same level as first panel
    
    scene.add(panel5);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();