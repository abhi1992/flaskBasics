async function load_image() {
    let photo = document.getElementById("image-file").files[0]; // TODO: Visible bug
    let formData = new FormData();
    formData.append("photo", photo);
    const response = await fetch('/upload/image', {method: "POST", body: formData});
    if (response.status === 200) {
        let data = await response.text();
        const c = document.getElementById("canvas");
        const ctx = c.getContext("2d");
        const img = document.getElementById("img");
        document.getElementById("img").src = "./img/"+data;
        img.onload = function(){
            drawImageScaled(img, ctx);
        };
    }
}
let drag = false;
let x = 0, y = 0, w = 0, h = 0;
window.onload = function () { 
    document.getElementById("canvas").onmousedown = function(e) {handleMouseDown(e)};
    document.getElementById("canvas").onmouseup = function(e) {handleMouseUp(e)};
    document.getElementById("canvas").onmousemove = function(e) {handleMouseMove(e)};
    document.getElementById("canvas").onmouseout = function(e) {handleMouseOut(e)};
}

// get references to the canvas and context
var canvas = document.getElementById("canvas");
var overlay = document.getElementById("overlay");
var ctx = canvas.getContext("2d");
var ctxo = overlay.getContext("2d");

// style the context
ctx.strokeStyle = "blue";
ctx.lineWidth = 3;
ctxo.strokeStyle = "blue";
ctxo.lineWidth = 3;

// calculate where the canvas is on the window
// (used to help calculate mouseX/mouseY)
var c = document.getElementById("canvas");
const rect = c.getBoundingClientRect();
var offsetX = rect.left;
var offsetY = rect.top;
var scrollX = canvas.scrollLeft;
var scrollY = canvas.scrollTop;

// this flage is true when the user is dragging the mouse
var isDown = false;

// these vars will hold the starting mouse position
var startX;
var startY;

var prevStartX = 0;
var prevStartY = 0;

var prevWidth  = 0;
var prevHeight = 0;

function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    // save the starting x/y of the rectangle
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // set a flag indicating the drag has begun
    isDown = true;
}

function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;
    ctxo.strokeRect(prevStartX, prevStartY, prevWidth, prevHeight);
}

function handleMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;
}

function handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    // if we're not dragging, just return
    if (!isDown) {
        return;
    }

    // get the current mouse position
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here

    

    // calculate the rectangle width/height based
    // on starting vs current mouse position
    var width = mouseX - startX;
    var height = mouseY - startY;

        // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw a new rect from the start position 
    // to the current mouse position
    ctx.strokeRect(startX, startY, width, height);
    
        prevStartX = startX;
        prevStartY = startY;

        prevWidth  = width;
        prevHeight = height;
}

function drawImageScaled(img, ctx) {
    const canvas = ctx.canvas ;
    const hRatio = canvas.width  / img.width    ;
    const vRatio =  canvas.height / img.height  ;
    const ratio  = Math.min ( hRatio, vRatio );
    const centerShift_x = ( canvas.width - img.width*ratio ) / 2;
    const centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(img, 0,0, img.width, img.height,
                       centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
}

