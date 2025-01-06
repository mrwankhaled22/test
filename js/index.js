var SiteNameInput = document.getElementById("SiteName");
var UrlInput = document.getElementById("url");

var WebsiteList = [];
var currentindex = 0;
var httpsRegex = /^https?:\/\//;
var nameRegex = /^[a-z]{3,}/i;


var nameValid = SiteNameInput.value;
var urlValid = UrlInput.value;


function validationcolour (regexElement ,   element) {

    if (regexElement.test(element.value)) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
    }

    else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
    }

}







if (localStorage.getItem("UrlStorage") != null) {
    WebsiteList = JSON.parse(localStorage.getItem("UrlStorage"));
    displaydata();
}





function AddUrl(event) {

    event.preventDefault();
    if (!nameRegex.test(SiteNameInput.value) || !httpsRegex.test(UrlInput.value)) {
        showAlert();
        
        return;
    }


    var website = {
        name: SiteNameInput.value,
        url: UrlInput.value,
    }


    WebsiteList.push(website);
    localStorage.setItem("UrlStorage", JSON.stringify(WebsiteList));


    displaydata();
    clearinput();


}





function showAlert() {
    if (!nameRegex.test(SiteNameInput.value) || !httpsRegex.test(UrlInput.value)) {
        document.getElementById("Alert").classList.remove("d-none")
    }
}

function closeAlert() {
   
    document.getElementById("Alert").classList.add("d-none");
}





function clearinput() {
    SiteNameInput.value = null;
    UrlInput.value = null;
}


function displaydata() {

    var container = "";


    for (var i = 0; i < WebsiteList.length; i++) {


        container += getHtmlCode(i);

    }

    document.getElementById("Data").innerHTML = container;

}

function getHtmlCode(i) {
    return `
    
              <tr>
            <th scope="row">${i + 1}</th>
            <td>${WebsiteList[i].name}</td>
            <td><a href="${WebsiteList[i].url}" id="visitBtn" target="_blank"  class="btn btn-success"><i class="fa-solid fa-eye"></i>     Visit</a></td>
            <td><button class="btn btn-danger" id="deleteBtn" onclick="deleteitem(${i})"><i class="fa-solid fa-trash"></i>     Delete</button></td>
          </tr>
    
    
    
    
    `;
}

function deleteitem(i) {


    WebsiteList.splice(i, 1);

    localStorage.setItem("UrlStorage", JSON.stringify(WebsiteList));

    displaydata();

}


