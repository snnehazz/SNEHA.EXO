
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
    "Loading personal files...",
    "Opening favorites...",
    "Starting music player...",
    "Checking games...",
    "Loading SNEHA.EXE..."
];


const bootInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 4;

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

    closeStartMenu();

}


function closeWindow(id) {

    const windowElement =
        document.getElementById(id);

    if (!windowElement) return;

    windowElement.style.display =
        "none";

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


/* Bring window forward */

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


    header.addEventListener(
        "mousedown",
        (event) => {

            if (
                window.innerWidth <= 700
            ) return;

            dragging = true;

            const rect =
                windowElement.getBoundingClientRect();

            offsetX =
                event.clientX - rect.left;

            offsetY =
                event.clientY - rect.top;

            windowElement.style.zIndex =
                ++highestZ;

        }
    );


    document.addEventListener(
        "mousemove",
        (event) => {

            if (!dragging) return;

            windowElement.style.left =
                event.clientX - offsetX + "px";

            windowElement.style.top =
                event.clientY - offsetY + "px";

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
   MUSIC BUTTON
================================= */

const playButton =
    document.getElementById(
        "play-button"
    );

let playing = false;


if (playButton) {

    playButton.addEventListener(
        "click",
        () => {

            playing = !playing;

            playButton.textContent =
                playing
                    ? "Ⅱ"
                    : "▶";

        }
    );

}


/* =================================
   GUESTBOOK
================================= */

async function sendMessage() {

    const name = document
        .getElementById("guest-name")
        .value
        .trim();

    const message = document
        .getElementById("guest-message")
        .value
        .trim();

    const response = document
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

                body: JSON.stringify({
                    name: name,
                    message: message
                })
            }
        );


        response.textContent =
            "message sent successfully ♡";


        document.getElementById(
            "guest-name"
        ).value = "";


        document.getElementById(
            "guest-message"
        ).value = "";


    } catch (error) {

        console.error(error);

        response.textContent =
            "something went wrong :(";

    }

}


/* =================================
   TRASH
================================= */

function trashMessage() {

    alert(
        "Trash is empty.\n\n" +
        "You haven't deleted anything yet ♡"
    );

}


/* =================================
   CLOSE PHOTO VIEWER
   WHEN CLICKING OUTSIDE
================================= */

document.getElementById(
    "photo-viewer"
).addEventListener(
    "click",
    function(event) {

        if (
            event.target === this
        ) {

            closePhotoViewer();

        }

    }
);
