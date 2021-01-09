function getAllLists() {
    const listsJson = localStorage.getItem('lists');
    if (listsJson)
        return JSON.parse(listsJson);
    else
        return [];
}

function deleteAllLists() {
    localStorage.removeItem('lists')
}

function addList(list) {
    const lists = getAllLists();
    lists.push(list);
    localStorage.setItem('lists', JSON.stringify(lists))
}

function getList(index) {
    const lists = getAllLists();
    if (lists)
        return lists(index)
    else
        return null
}

