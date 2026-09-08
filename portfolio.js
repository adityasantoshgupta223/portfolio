
let barBox = document.querySelector(".barBox");
let box = document.querySelector(".box");

barBox.addEventListener('click', () => {
  barBox.classList.toggle('active');
  box.classList.toggle('active');
})


let menuElements = document.querySelectorAll("nav ul li");

menuElements.forEach(element => {
  element.addEventListener('click', () => {
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

function showLoader(container) {
    container.innerHTML = `
      <div  style="justify-self: center; align-self: center;" class="loaderBox">
        <h2>Please Wait...</h2>
        <div class="loader"></div>
       </div>
    `;
}

function hideLoader(container) {
    const loader = container.querySelector(".loaderBox");

    if (loader) {
        loader.remove();
    }
}


function getProjectsData() {

      let projContainer = document.querySelector(".container");
 
      showLoader(projContainer)

  fetch(`${API}/projects`)
    .then((response) => response.json())
    .then((projects) => {


      projects.forEach((proj) => {
        projContainer.innerHTML += `
                <div class="card" onmouseenter="viewButtons(this)" onmouseleave="hideButtons(this)">
        <div class="card-box">
          <div class="info-box">
          <p><b><span id="project-title">${proj.title}</span></b></p>
          <p id="project-desc">${proj.description}</p>
          </div>
        <div class="photo">
         <img src="${API}/projects/images/${proj.thumbnailId}"  onerror="this.onerror=null; this.src='assets/images/upload error.svg'; this.classList.add('image-error');"  alt="">
        </div>
        </div>
        <div class="btn-box hide">
         <button onclick='window.open("${proj.repoLink}")'>Visit GitHub Repo</button>
         ${proj.liveLink
            ? `<button onclick='window.open("${proj.liveLink}")'>Live Demo</button>`
            : ""
          }
         ${proj.apkDownloadLink
            ? `<a href="${proj.apkDownloadLink}">
          <button>Download APK</button>
            </a>`
            : ""
          }
          </div>`;
      });
    })
    .catch(error => {
        console.error(error);
    })
   .finally(() => hideLoader(projContainer))
}

function getCertData() {
      let certContainer = document.querySelector(".cert-container");
      certContainer.style.display = 'flex'
      showLoader(certContainer)

  fetch(`${API}/certs`)
    .then(response => response.json())
    .then((certs) => {
      certs.forEach(cert => {
        console.log(cert)
        certContainer.innerHTML += `
                <div class="certCard">
        <div class="imgBox">
          <img src="${API}/certs/images/${cert.certThumbnailId}" onerror="this.onerror=null; this.src='../assets/images/upload error.svg'; this.classList.add('image-error');"  alt="${cert.certName}" />
        </div>
       <button onclick='window.open("${API}/certs/${cert.certId}/pdf")'>View PDF</button>
      </div>
      `
      });
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
      hideLoader(certContainer)
      certContainer.style.display = 'grid'
    })
}


function getSkillsData() {
  let skillContainer = document.querySelector(".row");

  showLoader(skillContainer)

  fetch(`${API}/skills`)
    .then((response) => response.json())
    .then((skills) => {

      skills.forEach((skill) => {
        skillContainer.innerHTML += `
                  <div class="skill-card">
                      <img src="${skill.skillIconUrl}" onerror="this.onerror=null; this.src='assets/images/upload error.svg';"  alt="Not Found" />
                      <span title="${skill.skillName}">${skill.skillName}</span>
                  </div>`;
      });
    })
    .catch(error => {
        hideLoader(skillContainer);
        console.error(error);
    })
     .finally(() => hideLoader(skillContainer))
}



getProjectsData();
getCertData();
getSkillsData();

