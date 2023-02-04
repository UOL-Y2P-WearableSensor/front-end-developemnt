export class DigitalTwin {
    scene;
    camera;
    renderer;
    mesh_joints = [];
    mesh_knots = [];
    mesh_origin;
    axesHelper_knots = [];
    axesHelper_joints = [];
    IMU_schedule;
    

    constructor(IMU_schedule) {
        this.IMU_schedule = IMU_schedule;
        this.#scene_init();
        this.#light_init();
        this.#camera_init();
        this.#render_init();

 
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
        this.camera.position.set(0, 15, 20);
        this.camera.lookAt(0, 0, 0);
    }

    #render_init() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }
    

}