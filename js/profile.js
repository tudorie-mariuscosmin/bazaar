const avatar = document.querySelector('.profile-pic')
const genderSelect = document.getElementById('gender-select')
const filterSelect = document.getElementById('filter-select')
const nameInput = document.getElementById('nameInput')
const saveBtn = document.querySelector('.save')
const errorMsg = document.getElementById('errormsg')


genderSelect.onchange = () => {
    if (genderSelect.value === "Man") {
        avatar.src = "img/img-avatars/avatar-man.JPG"
    } else {
        avatar.src = "img/img-avatars/avatar-woman.JPG"
    }
}

filterSelect.onchange = () => {
    switch (filterSelect.value) {
        case "Black and white":
            avatar.style.filter = "grayscale(100%)"
            break;
        case "Sepia":
            avatar.style.filter = "sepia(100%)"
            break;
        case "Invert":
            avatar.style.filter = "invert(100%)"
            break;

        case "Hue Rotate":
            avatar.style.filter = `hue-rotate(${Math.round(Math.random() * 360)}deg)`
            break;
        default:
            avatar.style.filter = "none"
            break;
    }

}

saveBtn.onclick = () => {
    if (nameInput.value === "") {
        nameInput.classList.add('error')
        errorMsg.style = "color: red; display:block;"
    } else {
        nameInput.classList.remove('error')
        errorMsg.style = " display:none;"
        const user = {
            gender: genderSelect.value,
            filter: filterSelect.value,
            name: nameInput.value
        }

        localStorage.setItem('user', JSON.stringify(user))
    }


}


const userJson = localStorage.getItem("user")
if (userJson) {
    const user = JSON.parse(userJson)
    if (user) {
        console.log(user)
        genderSelect.value = user.gender
        genderSelect.onchange()
        filterSelect.value = user.filter
        filterSelect.onchange()
        nameInput.value = user.name
    }
}
