img="";
status="";
objects=[];
function preload(){
    img=loadImage("dog_cat.jpg");
    alarm=loadSound("alarm.mp3");
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();


    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            if(objects[i].label == "person"){
                document.getElementById("status").innerHTML="Status: person detected"; 
                alarm.stop();
                document.getElementById("baby_found").innerHTML="Baby Found";
                fill(r, g, b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);

            noFill();
            stroke(r, g, b);
            rect(objects[i].x-20, objects[i].y, objects[i].width, objects[i].height);
            }
            else{
                alarm.play();
                document.getElementById("baby_found").innerHTML="Baby Not Found";
            }
            
            
            
            
        } 


    }

}

function modelLoaded(){
    console.log("CocoSSD is initialized");
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    if(results){
        console.log(results);
        objects=results;
    }
}