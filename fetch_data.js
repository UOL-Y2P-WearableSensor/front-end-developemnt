self.addEventListener('message', function(event) {
    if (event.data ==="load"){
        // self.postMessage("load detected");

        function a(){
            console.log("[fetch] begin");
            fetch('./IMU_data.json')
                .then(response => response.json())
                .then((data) => {
                    console.log("[fetch] data:",data);
                });
        }
        a();

    }
})
