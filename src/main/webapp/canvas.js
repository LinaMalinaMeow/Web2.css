window.onload = draw

function clearCanvas() {
    let canvas = document.getElementById("canvas");
    const context = canvas.getContext('2d');
    // Сохраняем текущую матрицу трансформации
    // context.save();
// Используем идентичную матрицу трансформации на время очистки
    context.clearRect(0, 0, canvas.width, canvas.height);
// Возобновляем матрицу трансформации
//     context.restore();
    draw()
}

function draw() {
    const canvas = document.getElementById("canvas");
    canvas.addEventListener('click', function (e) {
        isHit1(canvas, e)
    })
    const h = canvas.height;
    const w = canvas.width;
    const c = canvas.getContext('2d');
    c.font = "14px Verdana";
    c.fillStyle = "white";
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#359aff";
    drawBat(c, w, h);
    drawAxes(canvas, "black");
}

function drawAxes(canvas, color) {
    const h = canvas.height;
    const w = canvas.width;
    const c = canvas.getContext('2d');
    c.save();

    c.strokeStyle = color;
    c.fillStyle = color;

    c.setTransform(1, 0, 0, 1, 0, 0); //устанавливаем значение по умолчанию
    //рисуем вертикальную ось
    c.beginPath();
    c.moveTo(0.5 * w, h - 10);
    c.lineTo(0.5 * w, 10);
    c.lineTo(0.5 * w - 5, 15);
    c.moveTo(0.5 * w + 5, 15);
    c.lineTo(0.5 * w, 10);
    c.closePath();
    c.stroke();
    //подпись к вертикальной оси
    c.strokeText("y", 0.5 * w + 5, 15);

    //рисуем горизонтальную ось
    c.beginPath();
    c.moveTo(10, 0.5 * h);
    c.lineTo(w - 10, 0.5 * h);
    c.lineTo(w - 15, 0.5 * h - 5);
    c.moveTo(w - 15, 0.5 * h + 5);
    c.lineTo(w - 10, 0.5 * h);
    c.closePath();
    c.stroke();
    //подпись к горизонтальной оси
    c.strokeText("x", w - 15, 0.5 * h + 15);

    //перемещаем координаты в центр
    // c.setTransform(1, 0, 0, 1, w/2, h/2);
    //отсечки на вертикальной оси
    c.beginPath();
    c.moveTo(0.5 * w - 3, 10 + 0.9 * (h - 20));
    c.lineTo(0.5 * w + 3, 10 + 0.9 * (h - 20));
    c.moveTo(0.5 * w - 3, 10 + 0.7 * (h - 20));
    c.lineTo(0.5 * w + 3, 10 + 0.7 * (h - 20));
    c.moveTo(0.5 * w - 3, 10 + 0.3 * (h - 20));
    c.lineTo(0.5 * w + 3, 10 + 0.3 * (h - 20));
    c.moveTo(0.5 * w - 3, 10 + 0.1 * (h - 20));
    c.lineTo(0.5 * w + 3, 10 + 0.1 * (h - 20));
    c.closePath();
    c.stroke();
    //подпись на отсечках вертикальной оси
    c.fillText("R", 0.5 * w + 5, 10 + 0.1 * (h - 20) + 5);
    c.fillText("R/2", 0.5 * w + 5, 10 + 0.3 * (h - 20) + 5);
    c.fillText("-R/2", 0.5 * w + 5, 10 + 0.7 * (h - 20) + 5);
    c.fillText("-R", 0.5 * w + 5, 10 + 0.9 * (h - 20) + 5);

    //отсечки на горизонтальной оси
    c.beginPath();
    c.moveTo(10 + 0.9 * (w - 20), 0.5 * h - 3);
    c.lineTo(10 + 0.9 * (w - 20), 0.5 * h + 3);
    c.moveTo(10 + 0.7 * (w - 20), 0.5 * h - 3);
    c.lineTo(10 + 0.7 * (w - 20), 0.5 * h + 3);
    c.moveTo(10 + 0.3 * (w - 20), 0.5 * h - 3);
    c.lineTo(10 + 0.3 * (w - 20), 0.5 * h + 3);
    c.moveTo(10 + 0.1 * (w - 20), 0.5 * h - 3);
    c.lineTo(10 + 0.1 * (w - 20), 0.5 * h + 3);
    c.closePath();
    c.stroke();
    //подписи на отсечках горизонтальной оси
    c.fillText("R", 10 + 0.9 * (w - 20) - 4, 0.5 * h + 15);
    c.fillText("R/2", 10 + 0.7 * (w - 20) - 12, 0.5 * h + 15);
    c.fillText("-R/2", 10 + 0.3 * (w - 20) - 18, 0.5 * h + 15);
    c.fillText("-R", 10 + 0.1 * (w - 20) - 8, 0.5 * h + 15);

    c.restore();
}

function toNormalAxes(ctx, weight, height) {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // устанавливаем значения по умолчанию
    //ctx.translate(weight / 2, height / 2);
    //ctx.scale(1, -1);
}

function drawBat(ctx, weight, height) {
    ctx.save();
    toNormalAxes(ctx, weight, height);
    //weight = weight / 2 - 10;
    //height = height / 2 - 10;
    //drawRightPieceOfBat(ctx, weight, height);
    //ctx.scale(-1, 1);
    drawRightPieceOfBat(ctx, weight, height);
    ctx.restore();
}

function drawRightPieceOfBat(ctx, w, h) {
    //Радиусы большого эллипса
    const radiusX = 10 + 0.9 * (w - 20) - w / 2
    const radiusY = 10 + 0.7 * (h - 20) - h / 2
    ctx.fillStyle = "#359aff";

    //Большой эллипс
    ctx.beginPath();
    ctx.ellipse(0.5 * w, 0.5 * h, radiusX, radiusY, 0, 0, 2 * Math.PI)
    ctx.fill();
    ctx.fillStyle = "#ffffff";

    //Верх
    ctx.beginPath();
    //Штука сверху слева
    ctx.ellipse(0.5 * w - (radiusX / 4), 0.5 * h - (radiusY), radiusX * 0.15, radiusY * 0.8, 0, 0, 2 * Math.PI)
    //Штука сверху справа
    ctx.ellipse(0.5 * w + (radiusX / 4), 0.5 * h - (radiusY), radiusX * 0.15, radiusY * 0.8, 0, 0, 2 * Math.PI)
    //Штука сверху по центру
    ctx.ellipse(0.5 * w, 0.5 * h - (radiusY), radiusX * 0.1, radiusY * 0.3, 0, 0, 2 * Math.PI)
    ctx.fill();

    //Низ
    ctx.beginPath();
    //Штука снизу слева ближе к центру
    ctx.ellipse(0.5 * w - (radiusX / 9), 0.5 * h + (radiusY), radiusX / 9, radiusY * 0.6, 0, 0, 2 * Math.PI)
    //Штука снизу справа ближе к центру
    ctx.ellipse(0.5 * w + (radiusX / 9), 0.5 * h + (radiusY), radiusX / 9, radiusY * 0.6, 0, 0, 2 * Math.PI)
    //Штука снизу совсем слева
    ctx.ellipse(0.5 * w - (radiusX / 3.2), 0.5 * h + (radiusY), radiusX / 9, radiusY * 0.8, 0, 0, 2 * Math.PI)
    //Штука снизу совсем справа
    ctx.ellipse(0.5 * w + (radiusX / 3.2), 0.5 * h + (radiusY), radiusX / 9, radiusY * 0.8, 0, 0, 2 * Math.PI)
    ctx.fill();
}

function isHit1(canvas, event) {
    //TODO: тестит попадания, потом переделать в AJAX
    const rect = canvas.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top
    const h = canvas.height;
    const w = canvas.width;
    const radiusX = 10 + 0.9 * (w - 20) - w / 2
    const radiusY = 10 + 0.7 * (h - 20) - h / 2
    let r = $("#r_arg").val();
    let x = (clickX - w / 2) * (r / radiusX)
    let y = (-1) * (clickY - h / 2) * (r / radiusY / 2)
    //let x = (event.clientX - rect.left - w / 2) / 30;
    //let y = (h / 2 - event.clientY + rect.top) / 30;S
    console.log("IS_HIT: " + isAreaHit(x, y, r))
    getData(x, y, r)
    drawShoot(clickX, clickY, isAreaHit(x, y, r))
}

function isAreaHit(x, y, r) {
    // alert("x="+x+" y="+y+" r="+r)
    /*console.log("BIG: " + isBigEllipseHit(x, y, r))
    console.log("SMALL: " + areSmallEllipsesHit(x, y, r))*/
    return isBigEllipseHit(x, y, r) && !areSmallEllipsesHit(x, y, r)
}

function isBigEllipseHit(x, y, r) {
    const XR = r
    const YR = r / 2
    /*console.log("X: " + x  + ", Y: " + y + ", x^2/R^2: " + (x * x) / (XR * XR) + ", y^2/R^2 " + (y * y) / (YR * YR))*/
    return (x * x) / (XR * XR) + (y * y) / (YR * YR) <= 1
}

function areSmallEllipsesHit(x, y, r) {
    x = Math.abs(x)
    const XR = r
    const YR = r / 2
    return (x - XR / 4) * (x - XR / 4) / (XR * 0.15 * XR * 0.15) + (y - YR) * (y - YR) / (YR * 0.8 * YR * 0.8) <= 1 ||
        (x) * (x) / (XR * 0.1 * XR * 0.1) + (y - YR) * (y - YR) / (YR * 0.3 * YR * 0.3) <= 1 ||
        (x - XR / 9) * (x - XR / 9) / (XR / 9 * XR / 9) + (y + YR) * (y + YR) / (YR * 0.6 * YR * 0.6) <= 1 ||
        (x - XR / 3.2) * (x - XR / 3.2) / (XR / 9 * XR / 9) + (y + YR) * (y + YR) / (YR * 0.8 * YR * 0.8) <= 1
}

function drawShoot(x, y, isHit) {
    let canvas = document.getElementById('canvas');
    let chart = canvas.getContext('2d');
    console.log(isHit, '2');
    let color;
    if (isHit) {
        color = 'green';
    } else {
        color = 'red';
    }
    chart.beginPath();
    chart.arc(x, y, 5, 0, Math.PI * 2);
    chart.fillStyle = color;
    chart.strokeStyle = color;
    // chart.globalAlpha = 0.45;
    chart.fill();
    chart.stroke();
}
