
window.onload = async () => {
    const response = await fetch('https://api.mocki.io/v1/5bd2f00e')
    const data = await response.json()

    const cuponHolders = document.querySelectorAll('.cupon-holder')
    data.forEach((cupon, index) => {
        cuponHolders[index].innerHTML = `
        <div class="cupon" draggable="true" no="${index}">
                <div class="title">${cupon.title}</div>
                <div class="info">
                    <div class="expiration">${cupon.exp}</div>
                    <div class="store">${cupon.store}</div>
                </div>
            </div>
        `
    });

    const cupons = document.querySelectorAll('.cupon')
    let currentCuppon;
    for (let cupon of cupons) {
        console.log(cupon)
        cupon.addEventListener('dragstart', function () {
            //console.log(cupon.getAttribute("no"))
            setTimeout(() => this.className = 'displayNone', 0)
            currentCuppon = cupon
        });
        cupon.addEventListener('dragend', function () {
            this.className = "cupon"
        });
    }

    for (let holder of cuponHolders) {
        holder.addEventListener('dragover', (e) => {
            e.preventDefault()
        })
        holder.addEventListener('dragenter', (e) => {
            e.preventDefault()
            e.target.classList.add('hovered')
        })
        holder.addEventListener('dragleave', (e) => {
            e.target.classList.remove('hovered')
        })
        holder.addEventListener('drop', (e) => {
            e.target.classList.remove('hovered')
            e.target.append(currentCuppon);
        })
    }

    const deleteDiv = document.querySelector('.delete')
    deleteDiv.addEventListener('dragover', (e) => {
        e.preventDefault()
    })
    deleteDiv.addEventListener('dragenter', (e) => {
        e.preventDefault()
        e.target.classList.add('hovered')
    })
    deleteDiv.addEventListener('dragleave', (e) => {
        e.target.classList.remove('hovered')
    })
    deleteDiv.addEventListener('drop', (e) => {
        e.target.classList.remove('hovered')
        for (let holder of cuponHolders) {
            if (holder.children.length > 0 && holder.children[0].className === "displayNone") {
                console.log(holder)
                holder.removeChild(currentCuppon)
            }

        }
    })


}

