const PDI_KEY = "pdip_apps";

let pdip = [];


function renderpdip() {
    for (pdi of pdip) {
        const newpdi = createpdi(pdi.id, pdi.title, pdi.author, pdi.year, pdi.isComplete);

        if (pdi.isComplete) {
            document.getElementById(COMPLETE_PDI).append(newpdi);
        } else {
            document.getElementById(INCOMPLETE_PDI).append(newpdi);
        }
    }
}


function fetchpdi() {
    let data = JSON.parse(localStorage.getItem(PDI_KEY));

    if (data !== null) {
        pdip = data;
    }

    document.dispatchEvent(new Event("fechpdi"));
}

function updatepdi() {
    if (StorageSupport()) {
        localStorage.setItem(PDI_KEY, JSON.stringify(pdip));
    }
}


function deletepdi(idpdi) {
    for (let arrayPosition = 0; arrayPosition < pdip.length; arrayPosition++) {
        if (pdip[arrayPosition].id == idpdi) {
            pdip.splice(arrayPosition, 1);
            break;
        }
    }
}

function StorageSupport() {
    if (typeof Storage === "undefined") {
        alert(" Aplikasi tidak mendukung web storage!");
        return false;
    } else {
        return true;
    }
}

function composepdi(id, title, author, year, isComplete) {
    return {
        id, title, author, year, isComplete,
    };
}




