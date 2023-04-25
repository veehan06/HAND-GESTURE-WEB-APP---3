prediction_1 = "";
Webcam.set({
    height:300,
    width:350,
    img_format:'png',
    png_quality:100
});
camera = document.getElementById("camera");
Webcam.attach("#camera")
function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src='"+data_uri+"'/>"
    });
}
console.log("ml5 version", ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/iKjxGN7RV/model.json", modelLoaded)
function modelLoaded(){
    console.log("Model Loaded");
}
function speak(){
    var synth = window.speechSynthesis
    speak_data_1 = "The prediction is "+ prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById("captured_img")
    classifier.classify(img, gotResult)
}
function gotResult(error, results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        document.getElementById("pred1").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "OK Hand"){
            document.getElementById("pred1").innerHTML = "&#128076;";
        }
        if(results[0].label == "thumbs up"){
            document.getElementById("pred1").innerHTMl = "&#128077;";
        }
        if(results[0].label == "victory hand"){
            document.getElementById("pred1").innerHTML = "&#9996;";
        }
        if(results[0].label == "clapping hands"){
            document.getElementById("pred1").innerHTML = "&#128079;";
        }
        if(results[0].label == "sign of the horns"){
            document.getElementById("pred1").innerHTML = "&#129304;";
        }
    }
}
