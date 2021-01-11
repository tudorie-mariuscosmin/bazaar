const listsDiv = document.querySelector('.lists')
const preview = document.querySelector('.preview-list')

const lists = getAllLists();
console.log(lists)

const getImgSrcFromListType = (type) => {
    const constantRoute = "img/img-market/png/";
    switch (type) {
        case 'Groceries':
            return constantRoute + "031-shopping.png";
        case 'Electronics':
            return constantRoute + "028-shopping%20online.png";
        case "Toiletries":
            return constantRoute + "047-toiletries.png";
        case 'Dinner':
            return constantRoute + '041-pizza.png'
        default:
            return constantRoute + '005-basket.png'
    }
}

lists.forEach((list, index) => {
    listsDiv.innerHTML += `
    <div class="list">
            <div class="list-img-container">
                <img src=${getImgSrcFromListType(list.type)} class="list-img" />
            </div>
            <div class="list-info">
                <div class="list-title">${list.name}</div>
                <div class="list-type">${list.type}</div>
            </div>
            <div class="btn-container">
                <button class="btn" onclick="editList(${index})">Show more</button>
            </div>

        </div>
    
    `
});



const editList = (index) => {
    const list = lists[index];

    preview.style = "display:flex"
    listsDiv.style = "display:none"
    const img = document.getElementById('img')
    const title = document.getElementById('title')
    const type = document.getElementById('type')
    const showLess = document.getElementById('btn-less')
    const itemsList = document.getElementById('items-list')

    img.src = getImgSrcFromListType(list.type)
    title.innerHTML = list.name;
    type.innerHTML = list.type;
    itemsList.innerHTML = "";
    list.items.forEach(item => {
        itemsList.innerHTML += `<li>
        <input type="checkbox" id="${item}"/>
        <label for="${item}">${item}</label>
    </li>`
    })


    showLess.onclick = closePreviewList



}

closePreviewList = () => {
    preview.style = "display:none"
    listsDiv.style = "display:flex"
}


