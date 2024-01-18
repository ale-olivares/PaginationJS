let users;
const page = document.querySelector(".page");
const contactList = document.querySelector(".contact-list");
const pagination = document.querySelector(".pagination");

let currentPage=0;
let rows = 10;

fetch("json/users.json")
.then(response => response.json())
.then(data => {
    users = data.users;

    //Modifying the total amount of contact
    const contacts = document.querySelector("h3");
    contacts.textContent = `Total: ${users.length}`;

    displayUsers(users, contactList, rows, currentPage);
    settingPagination(users,pagination,currentPage);
});

function settingPagination(users, pagination,currentPage){
    pagination.innerHTML=''; //Clean pagination each time
    let totalPages = Math.ceil(users.length/rows);
    for (let i = 1 ; i <= totalPages ; i++){
        let pageNum = document.createElement("li");
       
        if (currentPage == i-1){
            pageNum.innerHTML = `<a class="active">${i}</a>`;
        }else{
            pageNum.innerHTML = `<a>${i}</a>`;
        }
         pageNum.addEventListener("click", function(){
            currentPage= i-1;  
            displayUsers(users, contactList, rows, currentPage);
            settingPagination(users,pagination,currentPage);
         })
         pagination.appendChild(pageNum);
    }
}

function displayUsers(users, contactList, rows, currentPage){
    contactList.innerHTML =""; //Clean each page
    let start = rows * currentPage;
    let temp = users.slice(start, start + rows); //Create a temporary array 
    //console.log(temp, rows, currentPage);
    for(let i = 0 ; i<temp.length; i++){
        let nameArray = temp[i].name.split(" ");
        let email = `${nameArray[0]}${nameArray[1]}@example.com`
        let contactItem = document.createElement("li");
        contactItem.className = "contact-item cf";
        let contactDetails = document.createElement("div");
        contactDetails.className = "contact-details";
        contactDetails.innerHTML =
            `<img class="avatar" src="${temp[i].image}">
            <h3>${temp[i].name}<h3>
            <span class="email">${email}</span>`;

        let joinedDetails = document.createElement("div");
        joinedDetails.className="joined-details";
        joinedDetails.innerHTML=`<span class="date">Joined ${temp[i].joined}</span>`;    

        contactItem.appendChild(contactDetails);
        contactItem.appendChild(joinedDetails);
        contactList.appendChild(contactItem);
    }
}