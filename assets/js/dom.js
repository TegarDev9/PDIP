const INCOMPLETE_PDI = "incompletepdi";
const COMPLETE_PDI = "completepdi";


function pdipsearch(keyword) {
    const filterpdi = keyword.toUpperCase();
    const tittle = document.getElementsByTagName("h5");

    for (let i = 0; i < tittle.length; i++) {
        const tittlepdi = tittle[i].textContent || tittle[i].innerText;

        if (tittlepdi.toUpperCase().indexOf(filterpdi) > -1) {
            tittle[i].closest(".card").style.display = "";
        } else {
            tittle[i].closest(".card").style.display = "none";
        }
    }
}


function addpdi() {
    const idpdi = +new Date();
    const inputpdiTitle = document.getElementById("inputpdiTitle").value;
    const inputpdiAuthor = document.getElementById("inputpdiAuthor").value;
    const inputpdiYear = document.getElementById("inputpdiYear").value;
    const inputpdiIsComplete = document.getElementById("inputpdiIsComplete").checked;

    const pdi = createpdi(idpdi, inputpdiTitle, inputpdiAuthor, inputpdiYear, inputpdiIsComplete);
    const pdiObject = composepdi(idpdi, inputpdiTitle, inputpdiAuthor, inputpdiYear, inputpdiIsComplete);

    pdip.push(pdiObject);

    if (inputpdiIsComplete) {
        document.getElementById(COMPLETE_PDI).append(pdi);
    } else {
        document.getElementById(INCOMPLETE_PDI).append(pdi);
    }

    updatepdi();
}


function addActionpdi(inputpdiIsComplete, idpdi) {
    const cardActions = document.createElement("div");

    const Delete = createDeletepdi(idpdi);
    const Read = createReadpdi(idpdi);
    const Undo = createUndopdi(idpdi);

    cardActions.append(Delete);

    if (inputpdiIsComplete) {
        cardActions.append(Undo);
    } else {
        cardActions.append(Read);
    }

    return cardActions;
}



function createReadpdi(idpdi) {
    const action = document.createElement("button");
    action.classList.add("btn", "btn-sm-icon", "btn-link");

    const img = document.createElement("img");
    img.src = "assets/image/icons/alt.png"; 
    img.alt = "Icon Tombol "; 

 
     action.appendChild(img);


   action.addEventListener("click", function () {
       const cardParent = document.getElementById(idpdi);

       const pdiTitle = cardParent.querySelector(".card-content > h5").innerText;
       const pdiAuthor = cardParent.querySelectorAll(".card-content > span")[0].innerText;
       const pdiYear = cardParent.querySelectorAll(".card-content > span")[1].innerText;

       cardParent.remove();

       const pdi = createpdi(idpdi, pdiTitle, pdiAuthor, pdiYear, true);
       document.getElementById(COMPLETE_PDI).append(pdi);

       deletepdi(idpdi);
       const pdiObject = composepdi(idpdi, pdiTitle, pdiAuthor, pdiYear, true);

       pdip.push(pdiObject);
       updatepdi();
   })

   return action;
}


function createpdi(idpdi, inputpdiTitle, inputpdiAuthor, inputpdiYear, inputpdiIsComplete) {
    const pdi = document.createElement("article");
    pdi.setAttribute("id", idpdi)
    pdi.classList.add("card", "my-5");

    const pdiTitle = document.createElement("h5");
    pdiTitle.classList.add("text-truncate");
    const title = document.createElement("p");
    title.classList.add("pdi-title");
    pdiTitle.style.maxWidth = "400px";
    pdiTitle.innerText =  inputpdiTitle;


    const pdiAuthor = document.createElement("span");
    pdiAuthor.classList.add("text-truncate", "d-inline-block");
    const author = document.createElement("p");
    author.classList.add("pdi-author");
    pdiAuthor.style.maxWidth = "350px";
    pdiAuthor.innerText = inputpdiAuthor;


    const pdiYear = document.createElement("span");
    const year = document.createElement("p");
    year.classList.add("pdi-year");
    pdiYear.innerText = inputpdiYear;
    
    const br = document.createElement("br");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-body",  "border", "border-danger", "d-flex", "justify-content-between");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardAction = addActionpdi(inputpdiIsComplete, idpdi);

    cardContent.append(pdiTitle, pdiAuthor, br, pdiYear);
    cardContainer.append(cardContent);
    cardContainer.append(cardAction);
    pdi.append(cardContainer);

    return pdi;
}


function createDeletepdi(idpdi) {
    const Delete = document.createElement("button");
    Delete.classList.add("btn", "btn-sm-icon", "btn-link");

    const img = document.createElement("img");
    img.src = "assets/image/icons/logo_hapus.png"; 
    img.alt = "Icon-delete "; 

    Delete.appendChild(img);

    Delete.addEventListener("click", function () {
        let confirmation = confirm("apakah anda yakin ingin menghapus buku dari perpustakaan PDI?");

        if (confirmation) {
            const cardParent = document.getElementById(idpdi);
            cardParent.addEventListener("Delete", function (event) {
                event.target.remove();
            });
            cardParent.dispatchEvent(new Event("Delete"));

            deletepdi(idpdi);
            updatepdi();
        }
    });

    return Delete;
}


function createUndopdi(idpdi) {
    const action = document.createElement("button");
    action.classList.add("btn", "btn-sm-icon", "btn-link");

    const img = document.createElement("img");
    img.src = "assets/image/icons/alt.png"; 
    img.alt = "Icon Tombol "; 

    action.appendChild(img);
   

    action.addEventListener("click", function () {
        const cardParent = document.getElementById(idpdi);

        const pdiTitle = cardParent.querySelector(".card-content > h5").innerText;
        const pdiAuthor = cardParent.querySelectorAll(".card-content > span")[0].innerText;
        const pdiYear = cardParent.querySelectorAll(".card-content > span")[1].innerText;

        cardParent.remove();

        const pdi = createpdi(idpdi, pdiTitle, pdiAuthor, pdiYear, false);
        document.getElementById(INCOMPLETE_PDI).append(pdi);

        deletepdi(idpdi);
        const pdiObject = composepdi(idpdi, pdiTitle, pdiAuthor, pdiYear, false);

        pdip.push(pdiObject);
        updatepdi();
    })

    return action;
}



  