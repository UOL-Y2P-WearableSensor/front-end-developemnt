export class DigitalTwin {
    scene;
    camera;
    renderer;
    meshes = [];
    IMU_schedule;
    

    constructor(IMU_schedule) {
        this.IMU_schedule = IMU_schedule;
        this.#scene_init();
        this.#light_init();
        this.#camera_init();
        this.#render_init();
        this.#meshes_init();
        this.#scene_graph_init();
    }

    #scene_init() {
        this.scene = new THREE.Scene();
    }

    #light_init() {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this.scene.add(light);
    }

    #camera_init() {
        const fov = 75;
        const aspect = window.innerWidth / window.innerHeight;  // 相机默认值
        const near = 5;
        const far = 100;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, 0);
    }

    #render_init() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    #meshes_init() {
        let material = new THREE.MeshPhongMaterial({color: 0xff00});
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let mesh;
        const mesh_fixed = new THREE.Mesh(geometry, material);
        this.meshes.push(mesh_fixed);
        for (let i = 0; i < this.IMU_schedule.length; i++) {
            // console.log(IMU_schedules[i].name);
            geometry = new THREE.BoxGeometry(1, 6, 1);
            mesh = new THREE.Mesh(geometry, material);
            this.meshes.push(mesh);
        }
    }

    #scene_graph_init() {
        // let material = new THREE.MeshPhongMaterial({color: 0xff00});
        // let geometry = new THREE.BoxGeometry(1, 6, 1);
        // const body = new THREE.Mesh(geometry, material);
        
        this.scene.add(this.meshes[0]);
        
        // for (let i = 0; i < this.IMU_schedule.length; i++) {
        //     this.meshes[this.IMU_schedule[i]["parent_terminal"]]
        //         .add(this.meshes[this.IMU_schedule[i]["child_terminal"]]);
        //
        // }
    }
    k=0;
    mesh_fixed_update(){
        this.meshes[0].rotation.y += 0.01;
        this.k+=0.1;
        this.meshes[0].position.set(0, Math.sin(this.k), 0);
    }
    
    

}