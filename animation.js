const sections = document.querySelectorAll("main");
const navLinks = document.querySelectorAll(".box a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        
        link.classList.remove("buttonActive");
        if (link.getAttribute("href") === `#${currentSection}`) {
            console.log(link.getAttribute("href"))
            
            link.classList.add("buttonActive");
        }
    });
});

let barBox = document.querySelector(".barBox");
let box = document.querySelector(".box");

function handleNav(){
  barBox.classList.toggle('active');
  box.classList.toggle('active');
}
let menuElements = document.querySelectorAll(".box a");

menuElements.forEach(element => {
  element.addEventListener('click', () => {
    menuElements.forEach(element => element.classList.remove("buttonActive"));
    element.classList.add("buttonActive");
     handleNav()
  })
})