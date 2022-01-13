img = "";
dstatus = "";
objects = [];

function preload() {
    song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(450, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450, 450)
    video.hide();
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stats").innerHTML = "Status: Detecting Objects";
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(0);
}

function draw() {
    image(video, 0, 0, 640, 450);

    if (dstatus != "") {
        objectdetector.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("stats").innerHTML = "Status: Objects Detected";            
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);

            if (objects[i].label == "person") {
                song.stop();
                document.getElementById("stats").innerHTML = "Status : Object Detected";
                document.getElementById("baby").innerHTML = "Baby detected";
            } else {
                document.getElementById("stats").innerHTML = "Status : Object  Not Detected";
                document.getElementById("baby").innerHTML = "Baby not detected";
                song.play();
            }
        }
        if(objects.length== 0){
            song.play();
            document.getElementById("stats").innerHTML = "Status : Object  Not Detected";
            document.getElementById("baby").innerHTML = "Baby not detected";
        }

    }

}

function modelLoaded() {
    console.log('Model Loaded!');
    dstatus = true;
    objectdetector.detect(video, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
    }
    objects = results;
}