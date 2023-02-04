import {HumanWalkingPattern} from './HumanWalkingPattern.js';

//read json './IMU_schedule.json' synchronously via keywords "await"
const response = await fetch('./IMU_schedule.json');
const json = await response.json();

//create DigitalTwin via the json
let humanWalkingPattern = new HumanWalkingPattern(json["IMU_schedule"]);
let k = 0;

function start_animate(){

    requestAnimationFrame(start_animate);
    
    // if (k > 4) {
        
        humanWalkingPattern.mesh_update();
    //     k = 0;
    // } else {
    //     k += 1;
    // }
    

    humanWalkingPattern.renderer.render(humanWalkingPattern.scene, 
        humanWalkingPattern.camera);
}

start_animate();



    
