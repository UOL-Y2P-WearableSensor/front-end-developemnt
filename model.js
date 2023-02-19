import {HumanWalkingPattern} from './HumanWalkingPattern.js';

//read json './IMU_schedule.json'&'./IMU_data.json' synchronously via keywords "await"
let response = await fetch('./IMU_schedule.json');
const IMU_schedule_json = await response.json();
response = await fetch('./IMU_data.json');
let IMU_data_json = await response.json();

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
let pose = 0, round=0;
const poses_per_request = IMU_data_json["L_F"].length;
console.log("start animation, where "+poses_per_request+" poses for one round");

//round: render the whole poses in the IMU_data.json
//frame: render one pose in the IMU_data.json
async function start_animate() {

    requestAnimationFrame(start_animate);

    //send request(will be used in the next poses_round) at beginning
    if (pose === 0) {
        console.log("[worker] send the request");
        humanWalkingPattern.IMU_data_update(IMU_data_json);
        worker.postMessage("load");
    }

    //render poses in the previous poses_round stored
    if (pose < poses_per_request) {
        humanWalkingPattern.time_idx = pose++;
        humanWalkingPattern.mesh_update();
        console.log("\trender No."+humanWalkingPattern.time_idx+" pose over");
    } else {
        console.log("\tround "+(round++)+"th round over");
        pose = 0;
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
    
