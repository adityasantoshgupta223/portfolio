
let barBox = document.querySelector(".barBox");
let box = document.querySelector(".box");

barBox.addEventListener('click', ()=>{
    barBox.classList.toggle('active');
    box.classList.toggle('active');
})


let menuElements = document.querySelectorAll("nav ul li");

menuElements.forEach(element => {
  element.addEventListener('click', () =>{
    menuElements.forEach(element => element.classList.remove("buttonActive"));
    element.classList.add("buttonActive");
  })
})

function viewButtons(card) {
  card.querySelector(".btn-box").classList.remove("hide");
  card.querySelector(".info-box").style.webkitLineClamp = 'none';
  card.querySelector(".info-box").style.lineClamp = 'none';
}

function hideButtons(card) {
  card.querySelector(".btn-box").classList.add("hide");
  card.querySelector(".info-box").style.webkitLineClamp = '3';
  card.querySelector(".info-box").style.lineClamp = '3';

}



function getProjectsData() {
  fetch("data/projects.json")
    .then((response) => response.json())
    .then((projects) => {
        
      let projContainer = document.querySelector(".container");

      projects.forEach((proj) => {
        projContainer.innerHTML += `
                <div class="card" onmouseenter="viewButtons(this)" onmouseleave="hideButtons(this)">
        <div class="card-box">
          <div class="info-box">
          <p><b><span id="project-title">${proj.title}</span></b></p>
          <p id="project-desc">${proj.desc}</p>
          </div>
        <div class="photo">
         <img src="${proj.image}"  onerror="this.onerror=null; this.src='assets/images/upload error.svg'; this.classList.add('image-error');"  alt="">
        </div>
        </div>
        <div class="btn-box hide">
         <button onclick='window.open("${proj.github}")'>Visit GitHub Repo</button>
         ${
           proj.liveDemo
             ? `<button onclick='window.open("${proj.liveDemo}")'>Live Demo</button>`
             : ""
         } </div>`;
      });
    });
}

function getCertData(){
    fetch("data/cert.json")
    .then(response => response.json())
    .then((certs) => {
      let certContainer = document.querySelector(".cert-container");
        console.log(cert)
        certs.forEach(cert => {
       certContainer.innerHTML += `
                <div class="certCard">
        <div class="imgBox">
          <img src="${cert.thumbnail}" onerror="this.onerror=null; this.src='assets/images/upload error.svg';" alt="Not Found" />
        </div>
       <button onclick='window.open("${cert.pdfLink}")'>View PDF</button>
      </div>
      `
        });
    })
}


function getSkillsData() {
  fetch("data/skills.json")
    .then((response) => response.json())
    .then((skills) => {
      let skillContainer = document.querySelector(".row");

      skills.forEach((skill) => {
        skillContainer.innerHTML += `
                  <div class="skill-card">
                      <img src="${skill.icon}" onerror="this.onerror=null; this.src='assets/images/upload error.svg';"  alt="Not Found" />
                      <span>${skill.name}</span>
                  </div>`;
      });
    });
}

getProjectsData();
getCertData();
getSkillsData();

