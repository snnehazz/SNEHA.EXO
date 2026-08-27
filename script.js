/* =================================
   UI SOUNDS
================================= */

const clickSound = new Audio("sounds/click.mp3");

const closeSound = new Audio("sounds/close.mp3");
const sendSound = new Audio("sounds/send.mp3");
const sentSound = new Audio("sounds/sent.mp3");

clickSound.volume = 0.3;

closeSound.volume = 0.3;
sendSound.volume = 0.4;
sentSound.volume = 0.45;


function playSound(sound) {

    sound.currentTime = 0;

    sound.play().catch(() => {});

}


/* =================================
   BOOT SCREEN
================================= */

const bootProgress =
    document.getElementById("boot-progress");

const bootStatus =
    document.getElementById("boot-status");

const bootScreen =
    document.getElementById("boot-screen");

const desktop =
    document.getElementById("desktop");


let progress = 0;


const bootMessages = [

    "Loading questionable decisions...",

    "Recovering unfinished thoughts...",

    "Booting chaos.exe...",

];


const bootInterval = setInterval(() => {

    progress +=
        Math.floor(Math.random() * 8) + 4;


    if (progress >= 100) {

        progress = 100;

        

        bootProgress.style.width =
            "100%";


        bootStatus.textContent =
            "Ready.";


        clearInterval(bootInterval);


        setTimeout(() => {

            bootScreen.style.display =
                "none";


            desktop.classList.add(
                "visible"
            );

        }, 500);


    } else {

        bootProgress.style.width =
            progress + "%";


        const messageIndex =
            Math.min(
                Math.floor(
                    progress / 20
                ),
                bootMessages.length - 1
            );


        bootStatus.textContent =
            bootMessages[messageIndex];

    }


}, 120);


/* =================================
   WINDOW MANAGEMENT
================================= */

let highestZ = 20;


function openWindow(id) {

    const windowElement =
        document.getElementById(id);


    if (!windowElement) return;


    windowElement.style.display =
        "block";


    windowElement.style.zIndex =
        ++highestZ;


    windowElement.classList.remove(
        "minimized"
    );


    /* WINDOW OPEN = NORMAL CLICK */
    playSound(clickSound);


    closeStartMenu();

}


function closeWindow(id) {

    const windowElement =
        document.getElementById(id);


    if (!windowElement) return;


    windowElement.style.display =
        "none";


    /* WINDOW CLOSE */
    playSound(closeSound);

}


function minimizeWindow(id) {

    const windowElement =
        document.getElementById(id);


    if (!windowElement) return;


    windowElement.style.display =
        "none";

}


function maximizeWindow(id) {

    const windowElement =
        document.getElementById(id);


    if (!windowElement) return;


    windowElement.classList.toggle(
        "maximized"
    );


    if (
        windowElement.classList.contains(
            "maximized"
        )
    ) {

        windowElement.dataset.oldTop =
            windowElement.style.top;


        windowElement.dataset.oldLeft =
            windowElement.style.left;


        windowElement.dataset.oldWidth =
            windowElement.style.width;


        windowElement.style.top =
            "60px";


        windowElement.style.left =
            "5%";


        windowElement.style.width =
            "90%";


    } else {

        windowElement.style.top =
            windowElement.dataset.oldTop;


        windowElement.style.left =
            windowElement.dataset.oldLeft;


        windowElement.style.width =
            windowElement.dataset.oldWidth;

    }

}


/* =================================
   BRING WINDOW FORWARD
================================= */

document.querySelectorAll(
    ".window"
).forEach(windowElement => {

    windowElement.addEventListener(
        "mousedown",
        () => {

            windowElement.style.zIndex =
                ++highestZ;

        }
    );

});


/* =================================
   DRAGGABLE WINDOWS
================================= */

document.querySelectorAll(
    ".window"
).forEach(windowElement => {

    const header =
        windowElement.querySelector(
            ".window-header"
        );


    let dragging = false;

    let offsetX = 0;
    let offsetY = 0;


    if (!header) return;


    header.addEventListener(
        "mousedown",
        (event) => {

            if (
                window.innerWidth <= 700
            ) return;


            dragging = true;


            const rect =
                windowElement
                    .getBoundingClientRect();


            offsetX =
                event.clientX -
                rect.left;


            offsetY =
                event.clientY -
                rect.top;


            windowElement.style.zIndex =
                ++highestZ;

        }
    );


    document.addEventListener(
        "mousemove",
        (event) => {

            if (!dragging) return;


            windowElement.style.left =
                event.clientX -
                offsetX +
                "px";


            windowElement.style.top =
                event.clientY -
                offsetY +
                "px";

        }
    );


    document.addEventListener(
        "mouseup",
        () => {

            dragging = false;

        }
    );

});


/* =================================
   START MENU
================================= */

const startMenu =
    document.getElementById(
        "start-menu"
    );


function toggleStartMenu() {

    startMenu.classList.toggle(
        "open"
    );

}


function closeStartMenu() {

    startMenu.classList.remove(
        "open"
    );

}


/* =================================
   CLOCK
================================= */

function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );


    const now =
        new Date();


    let hours =
        now.getHours();


    let minutes =
        now.getMinutes();


    hours =
        String(hours).padStart(
            2,
            "0"
        );


    minutes =
        String(minutes).padStart(
            2,
            "0"
        );


    clock.textContent =
        hours + ":" + minutes;

}


updateClock();


setInterval(
    updateClock,
    1000
);


/* =================================
   PHOTO VIEWER
================================= */

function openPhoto(
    imagePath,
    imageName
) {

    const viewer =
        document.getElementById(
            "photo-viewer"
        );


    const image =
        document.getElementById(
            "viewer-image"
        );


    const name =
        document.getElementById(
            "viewer-name"
        );


    image.src =
        imagePath;


    name.textContent =
        imageName;


    viewer.classList.add(
        "open"
    );

}


function closePhotoViewer() {

    const viewer =
        document.getElementById(
            "photo-viewer"
        );


    viewer.classList.remove(
        "open"
    );

}


/* =================================
   GUESTBOOK
================================= */

async function sendMessage() {

    /* SEND BUTTON SOUND */
    playSound(sendSound);


    const name =
        document
            .getElementById("guest-name")
            .value
            .trim();


    const message =
        document
            .getElementById("guest-message")
            .value
            .trim();


    const response =
        document
            .getElementById("guest-response");


    if (!name || !message) {

        response.textContent =
            "please fill in both fields ♡";

        return;

    }


    response.textContent =
        "sending... ♡";


    try {

        await fetch(

            "https://script.google.com/macros/s/AKfycbyoztx_wKzO-q58e3CGAi46ZtQGFdjxGbo8fzTqucSQqJX3A3adhkNsS4Z5ycWlEh65/exec",

            {

                method: "POST",

                mode: "no-cors",

                headers: {

                    "Content-Type":
                        "text/plain;charset=utf-8"

                },

                body:
                    JSON.stringify({

                        name: name,

                        message: message

                    })

            }

        );


        response.textContent =
            "message sent successfully ♡";


        /* SUCCESSFUL MESSAGE SOUND */
        playSound(sentSound);


        /* SHOW POPUP */
        showMessagePopup();


        document
            .getElementById(
                "guest-name"
            )
            .value = "";


        document
            .getElementById(
                "guest-message"
            )
            .value = "";


    } catch (error) {

        console.error(error);


        response.textContent =
            "something went wrong :(";

    }

}


/* =================================
   GUESTBOOK SUCCESS POPUP
================================= */

function showMessagePopup() {

    const popup =
        document.getElementById(
            "message-popup"
        );


    if (!popup) return;


    popup.classList.add(
        "show"
    );

}


function closeMessagePopup() {

    const popup =
        document.getElementById(
            "message-popup"
        );


    if (!popup) return;


    popup.classList.remove(
        "show"
    );

}


/* =================================
   CLOSE PHOTO VIEWER
   WHEN CLICKING OUTSIDE
================================= */

const photoViewer =
    document.getElementById(
        "photo-viewer"
    );


if (photoViewer) {

    photoViewer.addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closePhotoViewer();

            }

        }
    );

}