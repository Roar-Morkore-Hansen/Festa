var x = document.getElementById("audio-vers_1"); 

document.onkeydown = function checkKey(event) {
    if (event.key == "Enter") {
        x.play()
    }
};