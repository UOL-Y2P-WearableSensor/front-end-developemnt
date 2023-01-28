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
        
        humanWalkingPattern.mesh_fixed_update();
    //     k = 0;
    // } else {
    //     k += 1;
    // }
    

    humanWalkingPattern.renderer.render(humanWalkingPattern.scene, 
        humanWalkingPattern.camera);
}

start_animate();

//     geometry.translate(0, -3, 0);
//     const body = new THREE.Mesh(geometry, material);
//
// // geometry.translate(0,0,0);
//     const left_hand = new THREE.Mesh(geometry, material);
// // left_hand.position.set(0,3,0);
//     left_hand.rotation.x = 0;
//     left_hand.rotation.z = -1;
//
//     const right_hand = new THREE.Mesh(geometry, material);
// // left_hand.position.set(0,3,0);
//     right_hand.rotation.x = 0;
//     right_hand.rotation.z = 1;
//
//     scene.add(body);
//     body.add(left_hand);
//     body.add(right_hand);


    
