import {HumanWalkingPattern} from './HumanWalkingPattern.js';


//read json './IMU_schedule.json'&'./IMU_data.json' synchronously via keywords "await"
let response = await fetch('./IMU_schedule.json');
const IMU_schedule_json = await response.json();
response = await fetch('./IMU_data.json');
let IMU_data_json = await response.json();
console.log(IMU_data_json);

//create web worker for rest async works
let worker;
if (typeof (Worker) !== "undefined") {
    worker = new Worker('./fetch_data.js');
} else {
    console.log("ERROR: browser does not support Web Worker！");
}

//create DigitalTwin via the json
let humanWalkingPattern = new HumanWalkingPattern(
    IMU_schedule_json["IMU_schedule"],
    IMU_data_json);
let pose = 0;
const poses_per_request = IMU_data_json["L_F"].length + humanWalkingPattern.interpolation_num;
console.log("start animation, where "+poses_per_request+" poses for one round");




let last_time=performance.now(), fps=0;
//round: render the whole poses in the IMU_data.json
//frame: render one pose in the IMU_data.json
async function start_animate() {

    requestAnimationFrame(start_animate);
    if (performance.now()-last_time > 1000){
        document.getElementById("p1").innerHTML=("FPS: "+fps);
        fps=0;
        last_time = performance.now();
    }
    //send request(will be used in the next poses_round) at beginning
    if (pose === 0) {
        humanWalkingPattern.IMU_data_update(IMU_data_json);
        console.log("new round, loaded the data from [worker]");

        console.log("[worker] sending next request");
        worker.postMessage("load");
    }

    //render poses in the previous poses_round stored
    if (pose < poses_per_request) {
        humanWalkingPattern.time_idx = pose++;
        fps++;
        humanWalkingPattern.mesh_update();
        console.log("\trender No."+humanWalkingPattern.time_idx+" pose over");
    } else {
        console.log("\n\n\n\n\n\n");
        pose = 0;
        return;
    }

    humanWalkingPattern.renderer.render(humanWalkingPattern.scene,
        humanWalkingPattern.camera);
}

//run the animation
start_animate().then(() => null);


worker.onmessage = function (event) {
    IMU_data_json = event.data;
    console.log("[worker] get the data for next round");
}

// window.onresize=function(){
//     humanWalkingPattern.renderer.setSize(window.innerWidth,window.innerHeight);
//
//     const fov = 75;
//     const aspect = window.innerWidth / window.innerHeight;
//     const near = 5;
//     const far = 100;
//     this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     this.camera.position.set(0, 15, 20);
//     this.camera.lookAt(0, 0, 0);
//
//     humanWalkingPattern.camera.updateProjectionMatrix ();
// };

