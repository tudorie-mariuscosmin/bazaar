const navBtns = document.querySelectorAll('nav ul li a');

const sound = new Audio('../audio/btnClickSound.mp3')
sound.volume = 0.3

for (let i = 0; i < navBtns.length; i++) {
    navBtns[i].addEventListener('mousedown', () => { sound.play() })
    navBtns[i].addEventListener('touchstart', () => { sound.play() }, { passive: false })
}