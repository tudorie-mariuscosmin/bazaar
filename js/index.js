const canvas = document.getElementById('statusCanvas')
const ctx = canvas.getContext("2d")
let width = canvas.width;
let height = canvas.height;
ctx.fillStyle = "white"
ctx.fillRect(0, 0, width, height)


const lists = getAllLists()
console.log(lists)

const values = lists.filter(list => list.finished).map(list => parseFloat(list.price))
const unfinished = lists.filter(list => !list.finished).length
console.log(unfinished)
let sum = values.reduce((acc, cur) => acc + cur)
let mean = sum / values.length
let maxVal = Math.max(...values)
let minVal = Math.min(...values)

const messages = [`You have spent an average of ${Math.round(mean)} this month!`, `Your most expensive cart this month was ${maxVal} `,
`Your least expensive cart this month was ${minVal}`, `You curently have ${unfinished} unfinished lists`]
let index = 0
if (lists.length > 0) {

    setInterval(() => {
        if (index < messages.length) {
            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, width, height)
            ctx.font = "13px Verdana"
            ctx.fillStyle = "black"
            ctx.fillText(messages[index++], 0, 10)
        } else {
            index = 0
        }

    }, 2000)
}
