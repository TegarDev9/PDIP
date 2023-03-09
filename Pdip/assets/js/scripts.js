document.addEventListener("DOMContentLoaded", function () {

    const formpdi= document.getElementById("inputpdi");
    const formSearchpdi = document.getElementById("searchpdi");

    formpdi.addEventListener("submit", function (event) {
        event.preventDefault();
        addpdi();

        document.getElementById("inputpdiTitle").value = "";
        document.getElementById("inputpdiAuthor").value = "";
        document.getElementById("inputpdiYear").value = "";
        document.getElementById("inputpdiIsComplete").checked = false;
    });

    formSearchpdi.addEventListener("submit", function (event) {
        event.preventDefault();

        const inputSearchpdi = document.getElementById("searchpdiTitle").value;
        pdipsearch(inputSearchpdi);
    })

    if (StorageSupport()) {
        fetchpdi();
    }
});

document.addEventListener("fechpdi", function () {
    renderpdip();
});



