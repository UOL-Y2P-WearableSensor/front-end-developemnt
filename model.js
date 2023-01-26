window.onload = function() {
    const scene = new THREE.Scene();
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;  // 相机默认值
    const near = 5;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let material = new THREE.MeshPhongMaterial({color: 0xff00});
    let geometry = new THREE.BoxGeometry(1, 6, 1);
    
    geometry.translate(0,-3,0);
    const body = new THREE.Mesh(geometry, material);

    // geometry.translate(0,0,0);
    const left_hand = new THREE.Mesh(geometry, material);
    // left_hand.position.set(0,3,0);
    left_hand.rotation.x=0;
    left_hand.rotation.z=-1;

    const right_hand = new THREE.Mesh(geometry, material);
    // left_hand.position.set(0,3,0);
    right_hand.rotation.x=0;
    right_hand.rotation.z=1;
    
    scene.add(body);
    body.add(left_hand);
    body.add(right_hand);
    
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    let tmp=2*Math.PI/8, k=0;

    function animate() {
 
        requestAnimationFrame(animate);
        
        if (k > 4) {
            left_hand.rotation.x -=0.3;
            right_hand.rotation.x +=0.3;
            k=0;
        }else {
            k+=1;
        }
        
        renderer.render(scene, camera);
    };

    animate();
}