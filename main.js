Webcam.set({
    width: 800,
    height: 500,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'captured_image' src = '" + data_uri +"'>";
    });
}

console.log("ml5's version is", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/y6vpCu6Np/model.json", model_loaded);

function model_loaded(){
    console.log("Model loaded successfully");
}

function recognize(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
   if(error){
       console.log(error);
   }
   else{
       document.getElementById("object_name").innerHTML = result[0].label;
       document.getElementById("object_accuracy").innerHTML = result[0].confidence.toFixed(2);
   }
}