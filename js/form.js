const typeImg = document.getElementById('typeImg')
const typeSelect = document.getElementById('type-select')
const itemsList = document.getElementById('itemList')
const addItemInput = document.getElementById('addItem')
const addItemBtn = document.getElementById('addItemBtn')
const addListBtn = document.getElementById('addBtn')
const listName = document.getElementById('list-name')


const lists = getAllLists()
console.log(lists);
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

addItemBtn.onclick = () => {
    if (addItemInput.value !== '') {
        items.push(addItemInput.value)
        addItemInput.value = '';
        displayItems()
    }

}


addListBtn.onclick = () => {
    let list = {
        name: listName.value,
        type: typeSelect.value,
        items
    }
    addList(list)
    window.location.replace('./lists.html')

}

