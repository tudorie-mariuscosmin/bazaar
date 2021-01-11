const typeImg = document.getElementById('typeImg')
const typeSelect = document.getElementById('type-select')
const itemsList = document.getElementById('itemList')
const addItemInput = document.getElementById('addItem')
const addItemBtn = document.getElementById('addItemBtn')
const addListBtn = document.getElementById('addBtn')
const listName = document.getElementById('list-name')
const micBtn = document.getElementById('micBtn')

let recognitionOn = false;
console.log(navigator.userAgent)
let i = 0;
if (navigator.userAgent.indexOf("Chrome") !== -1 || navigator.userAgent.indexOf("Android") !== -1) {
    console.log("chrome")
    const speechRecog = new webkitSpeechRecognition();
    speechRecog.lang = "en";
    speechRecog.continuous = true;
    speechRecog.maxAlternatives = 1;

    micBtn.onclick = () => {
        if (recognitionOn) {
            speechRecog.stop();
            recognitionOn = false;
            i = 0;
            micBtn.style = ""
        } else {
            speechRecog.start();
            recognitionOn = true
            micBtn.style = "color:red;"
        }
    }

    let result;

    speechRecog.onresult = (ev) => {
        result = ev.results[i][0].transcript.trim();
        console.log(result)
        if (ev.results[i].isFinal) {
            if (result.substring(0, 3).toLowerCase() === "add") {
                addItemInput.value += result.split(" ").splice(1, 1);
                addItemListener()
            }
            if (result.substring(0, 6).toLowerCase() === "delete") {

                if (items.indexOf(result.split(' ').splice(1, 1).toString()) !== -1) {
                    let index = items.indexOf(result.split(' ').splice(1, 1).toString())
                    console.log(index)
                    deleteItem(index)
                }

            }
            i++;
        }
    }



} else {
    micBtn.style = "display:none"
}

const items = []


const changeTypeImgSrc = (img) => {
    typeImg.src = `img/img-market/png/${img}`
}
typeSelect.onchange = () => {
    switch (typeSelect.value) {
        case 'Groceries':
            changeTypeImgSrc('031-shopping.png')
            break;
        case 'Toiletries':
            changeTypeImgSrc('047-toiletries.png')
            break;
        case 'Electronics':
            changeTypeImgSrc('028-shopping online.png')
            break;
        case 'Dinner':
            changeTypeImgSrc('041-pizza.png')
            break;
        default:
            break;
    }
}

const deleteItem = (id) => {
    items.splice(id, 1)
    displayItems()
}
const displayItems = () => {
    itemsList.innerHTML = ''
    items.forEach((item, index) => {
        const node = document.createElement('li')
        node.innerHTML = `${item}<i class="fas fa-trash" onClick="deleteItem(${index})")></i>`
        itemsList.appendChild(node)
    })
}

displayItems()

addItemBtn.onclick = () => { addItemListener() }

const addItemListener = () => {
    if (addItemInput.value !== '') {
        items.push(addItemInput.value)
        addItemInput.value = '';
        displayItems()
    }

}


addListBtn.onclick = () => {
    const date = new Date();

    let list = {
        name: listName.value,
        type: typeSelect.value,
        finished: false,
        day: date.getDate(),
        month: date.getMonth(),
        items
    }
    addList(list)
    window.location.replace('./lists.html')

}

