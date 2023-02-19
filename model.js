import {HumanWalkingPattern} from './HumanWalkingPattern.js';

//read json './IMU_schedule.json'&'./IMU_data.json' synchronously via keywords "await"
let response = await fetch('./IMU_schedule.json');
const IMU_schedule_json = await response.json();
console.log(IMU_schedule_json["IMU_schedule"]);
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
let k = 0;
const frame_num = 60;
console.log("start_animate():");

//run the animation
async function start_animate() {

    requestAnimationFrame(start_animate);

    //send request at beginning
    if (k === 0) {
        // humanWalkingPattern.IMU_data_update(IMU_data_json);
        // worker.postMessage("load");
    }

    //main updating
    if (k <= frame_num) {
        k += 1;
        humanWalkingPattern.mesh_update();
    } else {
        console.log("\trendering", frame_num, "frame over");
        k = 0;
    }

    humanWalkingPattern.renderer.render(humanWalkingPattern.scene,
        humanWalkingPattern.camera);
}

start_animate().then(() => null);


worker.onmessage = function (event) {
    IMU_data_json = event.data;
    // console.log(event.data);
}
    
