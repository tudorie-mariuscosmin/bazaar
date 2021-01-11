const canvas = document.getElementById('statsCanvas')
const ctx = canvas.getContext('2d')
let width = canvas.width;
let height = canvas.height;
ctx.fillStyle = "white"
ctx.fillRect(0, 0, width, height)


const lists = getAllLists()
console.log(lists.filter(list => list.finished).map(list => parseFloat(list.price)))

const values = lists.filter(list => list.finished).map(list => parseFloat(list.price))

const n = values.length;
const widthL = width / n;
const maxVal = Math.max(...values);
ctx.strokeStyle = "#2291ff";
ctx.lineWidth = 2;
console.log(width, height)
ctx.beginPath();
for (let i = 0; i < n; i++) {
    let x = i * widthL;
    let y = height - values[i] * height / maxVal;
    ctx.font = "7px Roboto"
    ctx.fillStyle = "black"
    ctx.fillText(values[i], x - 5, y + 20)
    ctx.lineTo(x, y + 30);
    console.log(x, y)

}

ctx.stroke();
ctx.beginPath();
ctx.strokeStyle = "red"
ctx.lineWidth = 1;
let sum = values.reduce((acc, cur) => acc + cur)
let mean = sum / values.length
let meanY = height - mean * height / maxVal
ctx.moveTo(2, meanY + 30)
ctx.lineTo(width, meanY + 30)
ctx.stroke()

ctx.beginPath();
ctx.lineWidth = 2;
ctx.moveTo(2, 30);
ctx.lineTo(2, height - 2);
//ctx.lineTo(n * widthL, y + 50);
ctx.lineTo(width, height - 2)
ctx.strokeStyle = "black";
ctx.stroke();

