// Turn loggin on or off with single variable.
print_log = true;

function log(string) {
    if (print_log == true) {
        console.log(string);
    }
}

// Deselecet prevoius and select new
function selectVerse(id) {
    log("[selectVerse] Selected id: " + id);

    var verse_id_new = id;
    var verse_id_prev = document.querySelector(".selected").id;
    document.getElementById(verse_id_prev).classList.toggle("selected");
    document.getElementById(verse_id_new).classList.toggle("selected");

};


//Select verse when clicked on.
document.querySelectorAll(".verse").forEach(item => {
    item.addEventListener("click", event => {
        log(event.target);
        selectVerse(event.target.id);
    })
    log("[eventlistener] addEventListener to item id:" + item.id);
});

// Play <audio> tag in the same <div> as selected <p> tag. 
document.onkeydown = function checkKey(event) {
    if (event.key == "Enter") {
        audio = document.querySelector(".selected").parentElement.firstElementChild;
        audio.play();
    }
};

// DRIVER CODE


