const listsDiv = document.querySelector('.lists')
const preview = document.querySelector('.preview-list')

let lists;

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

displayLists = () => {
    listsDiv.innerHTML = "";
    lists = getAllLists();
    if (lists.length > 0) {
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
                    <div class="finished">
                    ${list.finished ? `<i class="fas fa-check" style="color:green"></i> Complete` : `<i class="fas fa-times" style="color:red"></i> Unfinished`}
                    </div>
                </div>
    
            </div>
        
        `
        });
    } else {
        listsDiv.innerHTML = `<div class="no-lists">
        <i class="far fa-sad-tear fa-5x"></i>
        You don't have any shopping lists
        </div>`
    }

}
displayLists()




const editList = (index) => {
    const list = lists[index];

    preview.style = "display:flex"
    listsDiv.style = "display:none"
    const img = document.getElementById('img')
    const title = document.getElementById('title')
    const type = document.getElementById('type')
    const showLess = document.getElementById('btn-less')
    const itemsList = document.getElementById('items-list')
    const btnDelete = document.getElementById('btn-delete')
    const btnMark = document.getElementById('btn-mark')
    const priceInput = document.getElementById('price');
    const finishedPrev = document.getElementById('finished-prev')


    img.src = getImgSrcFromListType(list.type)
    title.innerHTML = list.name;
    type.innerHTML = list.type;
    finishedPrev.innerHTML = list.finished ? `<i class="fas fa-check" style="color:green"></i> Complete` : `<iclass="fas fa-times" style="color:red"></iclass=> Unfinished`
    itemsList.innerHTML = "";
    list.items.forEach(item => {
        itemsList.innerHTML += `<li>
        <input type="checkbox" id="${item}"/>
        <label for="${item}">${item}</label>
    </li>`
    })

    priceInput.value = list.price ? list.price : null;


    showLess.onclick = closePreviewList
    btnDelete.onclick = () => {
        deleteList(index)
        closePreviewList()
        displayLists()
    }

    btnMark.onclick = () => {
        list.finished = true;
        list.price = priceInput.value;
        updateList(list, index)
        closePreviewList()
        displayLists()
    }



}

closePreviewList = () => {
    preview.style = "display:none"
    listsDiv.style = "display:flex"
}


