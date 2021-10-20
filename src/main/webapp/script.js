document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit_button").addEventListener("click", (e) => submit(e))
})

function checkY() {
    let y = document.getElementById("y_arg");
    if (y.value.trim() === "") {
        wrongFieldY.textContent = "Поле Y должно быть заполнено";
        return false;
    }
    y.value = y.value.substring(0, 10).replace(',', '.');
    if (!(y.value && !isNaN(y.value))) {
        wrongFieldY.textContent = "Y должен быть числом!";
        return false;
    }
    if (!((y.value >= -3) && (y.value <= 5))) {
        wrongFieldY.textContent = "Y должен принадлежать промежутку: (-3; 5)!";
        return false;
    }
    return true;
}

function checkX(valX) {
    const maxX = 5;
    const minX = -3;
    return valX <= maxX && valX >= minX;
}

function clickOnChart(canvas, event) {
    let rect = canvas.getBoundingClientRect()
    let width = canvas.width;
    let height = canvas.height;
    let x = (event.clientX - rect.left - width / 2) / scale;
    let y = (height / 2 - event.clientY + rect.top) / scale;
    let r = $("#r_arg").val();
    shoot(x, y, r).then(function (answer) {
        drawShoot(event.clientX - rect.left, event.clientY - rect.top, answer.isHit);
    });

}

function changeR() {
    drawAxis();
}

function getData(valX, valY, valR) {
    return new Promise(function (resolve, reject) {
        $.get('filter', {
            'isFromCanvas': true,
            'x': valX,
            'y': valY,
            'r': valR
        }).done(function (data) {
            let arr = JSON.parse(data);
            if (arr.isValid === false)
                reject("Wrong coordinates.");
            else {
                let row = '<tr>';
                row += '<td><b>' + parseFloat(arr.x.toFixed(8)) + '</b></td>';
                row += '<td><b>' + parseFloat(arr.y.toFixed(8)) + '</b></td>';
                row += '<td><b>' + parseFloat(arr.r.toFixed(8)) + '</b></td>';
                row += '<td><b>' + arr.check + '</b></td>';
                row += '<td><b>' + parseFloat(arr.exec_time.toFixed(8)) + '</b></td>';
                row += '<td><b>' + arr.time + '</b></td>';
                row += '</tr>';
                $('#history-table tr:first').after(row);
                resolve();
            }
        }).catch(function (err) {
            alert(err);
        });
    });
}

function shoot(x, y, r) {
    //TODO: тестит попадания, потом переделать в AJAX
    let canvas = document.getElementById("canvas")
    const rect = canvas.getBoundingClientRect()
    const h = canvas.height;
    const w = canvas.width;
    const radiusX = 10 + 0.9 * (w - 20) - w / 2
    const radiusY = 10 + 0.7 * (h - 20) - h / 2
    r = $("#r_arg").val();
    let res = isAreaHit(x, y, r)
    x = xToCanvas(x, canvas.width, r)
    y = yToCanvas(y, canvas.height, r)
    console.log("IS_HIT: " + isAreaHit(x, y, r))
    drawShoot(x, y, res)
}

function xToCanvas(x, w, currentR) {
    return w / 2 + x * 30
}

function yToCanvas(y, h, currentR) {
    const radiusY = 10 + 0.9 * (h - 20) - h / 2
    return h / 2 - y * (radiusY / currentR)
}

function submit(e) {
    wrongFieldY.textContent = ""
    const valY = $("#y_arg").val();
    const valX = $("#x_arg").val();
    const valR = $("#r_arg").val();
    if (!checkY(valY)) {
        e.preventDefault()
        //getData(valX, valY, valR)
        //shoot(valX, valY, valR)
    }

}

function clear_table() {

    $.get('filter', {
        'clear': true
    }).fail(function (err) {
        alert('Что-то пошло не так!')
    });
    // drawAxis();
    $("#history-table tr:gt(0)").remove();
    clearCanvas()
}

let wrongFieldY = document.getElementById("wrong_field_Y");