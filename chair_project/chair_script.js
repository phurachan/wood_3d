let scene, camera, renderer, chair, chairParts = [];
let isExploded = false;
let isRotating = false;
let rotationSpeed = 0.01;

const CHAIR_COLORS = {
    seat: 0x8B4513,
    backrest: 0xA0522D,
    frontLegs: 0xCD853F,
    backLegs: 0xDEB887,
    braces: 0xF4A460
};

const CHAIR_DIMENSIONS = {
    seat: { width: 0.45, depth: 0.45, thickness: 0.025 },
    backrest: { width: 0.45, height: 0.4, thickness: 0.025 },
    frontLegs: { width: 0.04, depth: 0.04, height: 0.45 },
    backLegs: { width: 0.04, depth: 0.04, height: 0.85 },
    braces: { width: 0.025, depth: 0.025, length: 0.37 }
};

function init() {
    const container = document.getElementById('container');
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2c1810);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(1, 1, 1);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 5;
    controls.minDistance = 0.5;
    
    setupLighting();
    createChair();
    setupControls();
    animate();
}

function setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    const spotLight = new THREE.SpotLight(0xffffff, 0.3);
    spotLight.position.set(-5, 5, 2);
    scene.add(spotLight);
}

function createRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    
    return shape;
}

function createSeat() {
    const { width, depth, thickness } = CHAIR_DIMENSIONS.seat;
    const seatShape = createRoundedRectShape(width, depth, 0.02);
    const seatGeometry = new THREE.ExtrudeGeometry(seatShape, {
        depth: thickness,
        bevelEnabled: false
    });
    
    const seatMaterial = new THREE.MeshLambertMaterial({ color: CHAIR_COLORS.seat });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 0.45, 0);
    seat.rotation.x = -Math.PI / 2;
    seat.castShadow = true;
    seat.name = 'seat';
    
    return seat;
}

function createBackrest() {
    const { width, height, thickness } = CHAIR_DIMENSIONS.backrest;
    const backrestShape = createRoundedRectShape(width, height, 0.02);
    const backrestGeometry = new THREE.ExtrudeGeometry(backrestShape, {
        depth: thickness,
        bevelEnabled: false
    });
    
    const backrestMaterial = new THREE.MeshLambertMaterial({ color: CHAIR_COLORS.backrest });
    const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
    backrest.position.set(0, 0.65, -0.2125);
    backrest.castShadow = true;
    backrest.name = 'backrest';
    
    return backrest;
}

function createLeg(height, color, name) {
    const { width, depth } = CHAIR_DIMENSIONS.frontLegs;
    const legGeometry = new THREE.BoxGeometry(width, height, depth);
    const legMaterial = new THREE.MeshLambertMaterial({ color });
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.castShadow = true;
    leg.name = name;
    
    return leg;
}

function createFrontLegs() {
    const frontLegs = new THREE.Group();
    const { height } = CHAIR_DIMENSIONS.frontLegs;
    
    const leftFrontLeg = createLeg(height, CHAIR_COLORS.frontLegs, 'leftFrontLeg');
    leftFrontLeg.position.set(-0.18, height / 2, 0.18);
    frontLegs.add(leftFrontLeg);
    
    const rightFrontLeg = createLeg(height, CHAIR_COLORS.frontLegs, 'rightFrontLeg');
    rightFrontLeg.position.set(0.18, height / 2, 0.18);
    frontLegs.add(rightFrontLeg);
    
    return frontLegs;
}

function createBackLegs() {
    const backLegs = new THREE.Group();
    const { height } = CHAIR_DIMENSIONS.backLegs;
    
    const leftBackLeg = createLeg(height, CHAIR_COLORS.backLegs, 'leftBackLeg');
    leftBackLeg.position.set(-0.18, height / 2, -0.18);
    backLegs.add(leftBackLeg);
    
    const rightBackLeg = createLeg(height, CHAIR_COLORS.backLegs, 'rightBackLeg');
    rightBackLeg.position.set(0.18, height / 2, -0.18);
    backLegs.add(rightBackLeg);
    
    return backLegs;
}

function createBraces() {
    const braces = new THREE.Group();
    const { width, depth, length } = CHAIR_DIMENSIONS.braces;
    
    // Side braces
    const leftBrace = new THREE.Mesh(
        new THREE.BoxGeometry(width, depth, length),
        new THREE.MeshLambertMaterial({ color: CHAIR_COLORS.braces })
    );
    leftBrace.position.set(-0.18, 0.25, 0);
    leftBrace.name = 'leftBrace';
    braces.add(leftBrace);
    
    const rightBrace = new THREE.Mesh(
        new THREE.BoxGeometry(width, depth, length),
        new THREE.MeshLambertMaterial({ color: CHAIR_COLORS.braces })
    );
    rightBrace.position.set(0.18, 0.25, 0);
    rightBrace.name = 'rightBrace';
    braces.add(rightBrace);
    
    // Front and back braces
    const frontBrace = new THREE.Mesh(
        new THREE.BoxGeometry(length, depth, width),
        new THREE.MeshLambertMaterial({ color: CHAIR_COLORS.braces })
    );
    frontBrace.position.set(0, 0.25, 0.18);
    frontBrace.name = 'frontBrace';
    braces.add(frontBrace);
    
    const backBrace = new THREE.Mesh(
        new THREE.BoxGeometry(length, depth, width),
        new THREE.MeshLambertMaterial({ color: CHAIR_COLORS.braces })
    );
    backBrace.position.set(0, 0.25, -0.18);
    backBrace.name = 'backBrace';
    braces.add(backBrace);
    
    braces.children.forEach(brace => {
        brace.castShadow = true;
    });
    
    return braces;
}

function createChair() {
    chair = new THREE.Group();
    
    const seat = createSeat();
    const backrest = createBackrest();
    const frontLegs = createFrontLegs();
    const backLegs = createBackLegs();
    const braces = createBraces();
    
    chair.add(seat);
    chair.add(backrest);
    chair.add(frontLegs);
    chair.add(backLegs);
    chair.add(braces);
    
    chairParts = [seat, backrest, frontLegs, backLegs, braces];
    
    scene.add(chair);
    
    // Add ground plane
    const groundGeometry = new THREE.PlaneGeometry(4, 4);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x8B7355 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);
}

function explodeChair() {
    if (isExploded) return;
    
    chairParts.forEach((part, index) => {
        const direction = new THREE.Vector3();
        switch(part.name) {
            case 'seat':
                direction.set(0, 0.3, 0);
                break;
            case 'backrest':
                direction.set(0, 0.2, -0.3);
                break;
            default:
                if (part.children) {
                    part.children.forEach(child => {
                        const childDirection = new THREE.Vector3();
                        if (child.name.includes('front')) {
                            childDirection.set(0, -0.1, 0.3);
                        } else if (child.name.includes('back')) {
                            childDirection.set(0, 0.1, -0.3);
                        } else if (child.name.includes('left')) {
                            childDirection.set(-0.3, 0, 0);
                        } else if (child.name.includes('right')) {
                            childDirection.set(0.3, 0, 0);
                        }
                        
                        new THREE.TWEEN.Tween(child.position)
                            .to({
                                x: child.position.x + childDirection.x,
                                y: child.position.y + childDirection.y,
                                z: child.position.z + childDirection.z
                            }, 1000)
                            .easing(THREE.TWEEN.Easing.Quadratic.Out)
                            .start();
                    });
                    return;
                }
                break;
        }
        
        new THREE.TWEEN.Tween(part.position)
            .to({
                x: part.position.x + direction.x,
                y: part.position.y + direction.y,
                z: part.position.z + direction.z
            }, 1000)
            .easing(THREE.TWEEN.Easing.Quadratic.Out)
            .start();
    });
    
    isExploded = true;
}

function assembleChair() {
    if (!isExploded) return;
    
    // Reset seat
    new THREE.TWEEN.Tween(chairParts[0].position)
        .to({ x: 0, y: 0.45, z: 0 }, 1000)
        .easing(THREE.TWEEN.Easing.Quadratic.Out)
        .start();
    
    // Reset backrest
    new THREE.TWEEN.Tween(chairParts[1].position)
        .to({ x: 0, y: 0.65, z: -0.2125 }, 1000)
        .easing(THREE.TWEEN.Easing.Quadratic.Out)
        .start();
    
    // Reset front legs
    chairParts[2].children.forEach((leg, index) => {
        const x = index === 0 ? -0.18 : 0.18;
        new THREE.TWEEN.Tween(leg.position)
            .to({ x: x, y: 0.225, z: 0.18 }, 1000)
            .easing(THREE.TWEEN.Easing.Quadratic.Out)
            .start();
    });
    
    // Reset back legs
    chairParts[3].children.forEach((leg, index) => {
        const x = index === 0 ? -0.18 : 0.18;
        new THREE.TWEEN.Tween(leg.position)
            .to({ x: x, y: 0.425, z: -0.18 }, 1000)
            .easing(THREE.TWEEN.Easing.Quadratic.Out)
            .start();
    });
    
    // Reset braces
    const bracePositions = [
        { x: -0.18, y: 0.25, z: 0 },
        { x: 0.18, y: 0.25, z: 0 },
        { x: 0, y: 0.25, z: 0.18 },
        { x: 0, y: 0.25, z: -0.18 }
    ];
    
    chairParts[4].children.forEach((brace, index) => {
        new THREE.TWEEN.Tween(brace.position)
            .to(bracePositions[index], 1000)
            .easing(THREE.TWEEN.Easing.Quadratic.Out)
            .start();
    });
    
    isExploded = false;
}

function setupControls() {
    document.getElementById('explodeButton').addEventListener('click', explodeChair);
    document.getElementById('assembleButton').addEventListener('click', assembleChair);
    
    document.getElementById('rotateButton').addEventListener('click', () => {
        isRotating = !isRotating;
        document.getElementById('rotateButton').textContent = isRotating ? 'หยุดหมุน' : 'หมุนดู';
    });
    
    document.getElementById('exportButton').addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'chair_3d.png';
        link.href = renderer.domElement.toDataURL();
        link.click();
    });
}

function animate() {
    requestAnimationFrame(animate);
    
    THREE.TWEEN.update();
    
    if (isRotating) {
        chair.rotation.y += rotationSpeed;
    }
    
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize when page loads
window.addEventListener('load', init);