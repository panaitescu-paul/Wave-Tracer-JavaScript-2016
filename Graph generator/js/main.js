$(function() {

	console.log('Apples');

	var canvas = document.getElementById("canvas");

var points = {}; // Keep track of the points in an object with key = x, value = y
var counter = 0; // Keep track when the moving code should start
var step = 0.1;
function f(x, step) {
    return 120 * Math.sin(step * x) + 121;
}


if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.lineWidth = 0.7;
	ctx.strokeStyle = "rgb(71, 100, 130)";
    var x = 0,
        y = f(0);
    var timeout = setInterval(function() {
        if(counter < 1000) { // If it doesn't need to move, draw like you already do
            ctx.beginPath();
            ctx.moveTo(x, y);
            points[x] = y;
            x += 1;
            y = f(x, 0.1);
            ctx.lineTo(x, y);
            ctx.stroke();
            if (x > 1000) {
                clearInterval(timeout);
            }
        } else { // The moving part...
            ctx.clearRect(0, 0, 1000, 1000); // Clear the canvas
            ctx.beginPath();
            points[x] = y;
            x += 1;
            if (counter%100 == 0) {
                    step = step + 0.1;
                    console.log('step', step);
                }
            y = f(x, step);
            for(var i = 0; i < 1000; i++) {
                // Draw all lines through points, starting at x = i + ( counter - 100 )
                // to x = counter. Note that the x in the canvas is just i here, ranging
                // from 0 to 100


                ctx.lineTo(i, points[i + counter - 1000]);
            }

            ctx.stroke();
        }
        counter++;
    }, 1.5);
}


});