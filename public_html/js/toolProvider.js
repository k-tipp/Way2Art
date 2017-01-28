function getTool(name) {
    var selectedTool = null;
    switch (name) {
        case "default":
            selectedTool = getDefault(canvas);
            break;
        case "pencil":
            selectedTool = getPencil(canvas);
            break;
        default:
            break;
    }
    return selectedTool;
}

function getDefault() {
    var defaultTool = {
        cursor: "default",
        isDrawingTool: false,
        surrounding: null,
        drawTool: function (x, y) {} //do nothing special
    }
    return defaultTool;
}

function getPencil() {
    var circle = new fabric.Circle({
        radius: $('#penSize').val(),
        strokeDashArray: [3, 3],
        stroke: 'black',
        strokeWidth: 1,
        fill: 'rgba(0,0,0,0)'
    });
    
    var brush = new fabric.PencilBrush();
            brush.width = 20;
            brush.color = '#0000ff';
            brush.shadowBlur = 0;
    
    var pencil = {
        cursor: "crosshair",
        isDrawingTool: true,
        surrounding: circle,
        brush: brush,
        setSize: function (size) {
            this.surrounding.radius = parseInt(size) + 1;
            this.brush.width = parseInt(size) * 2;
        },
        getSize: function () {
            return parseInt(this.surrounding.radius);
        },
        drawTool: function (posX, posY) {
            this.surrounding.set({
                radius: this.getSize(), // why must radius be set here again?
                left: posX - this.getSize(),
                top: posY - this.getSize()
            });
        }
    }
    return pencil;
}




