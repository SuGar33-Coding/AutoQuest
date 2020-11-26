var reset = false;
var actionid;
var go = false;

function update() {
    width = 0;
    clearInterval(scene);
    var player = { name: "Swaglord86x" };
    actions = 0;
    var element = document.getElementById("myprogressBar");
    var width = 1;
    var label = document.getElementById("actionLabel");
    var tracker = document.getElementById("actionTracker");
    // Calls scene every 50 ms
    // So this resets every 5 seconds
    var identity = setInterval(scene, 10);
    function scene() {
        if (go) {
            label.innerHTML = actionid + "...";
            if (reset) {
                reset = false;
                width = 0;
                actions = 0;
            }
            if (width >= 100) {
                width = 0;
                actions++;
                tracker.innerHTML =
                    player.name +
                    " has been " +
                    actionid +
                    " for " +
                    actions +
                    " actions!";
            } else {
                width++;
                element.style.width = width + "%";
            }
        } else {
            //clearInterval();
            tracker.innerHTML = "";
            label.innerHTML = "stopped.";
        }
    }
}

function start(actionName) {
    reset = true;
    actionid = actionName;
    if (go) {
    } else {
        go = true;
        //update();
    }
}

update();
