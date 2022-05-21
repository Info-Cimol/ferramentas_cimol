//////////////////  |  NAVBAR  |  //////////////////
let list = document.getElementById("list-img");

list.addEventListener("click", function(e){
    let itmList = document.getElementById("nav-itens");
    let navList = this.parentNode;

    if (itmList.classList.contains("list-active")){
        itmList.classList.remove("list-active");
        itmList.classList.add("list-disabled");
        navList.style.width = "2.1em";
        navList.style.height = "2.1em";

    }else{
        itmList.classList.add("list-active");
        itmList.classList.remove("list-disabled");

        navList.style.width = "100%";
        navList.style.height = "100%";
    }
    e.preventDefault();
})

////////////////  |  CLICK-LOGIN  |  //////////////
let btn_createAccCad = document.getElementById("btn-create-cad");

/*btn_createAccCad.addEventListener("click", function(e){
    let email = document.getElementById("input-email-login");
    let password = document.getElementById("input-password-login");

    let myInit = {
        "method": "POST",
        "body": {
            "email": email,
            "senha": password
        }
    }

    fetch(`http://localhost:3000/register`, myInit);

    e.preventDefault();
})
*/
let btn_login = document.getElementById("btn-conn-lg");

btn_login.onclick = (e) => {
    let email = document.getElementById("input-email-login");
    let password = document.getElementById("input-password-login");

    let myInit = {
        method: "POST",
        mode: "cors",
        cache: "default",
        body: {
            "email": email,
            "password": password
        }
    }

    fetch("http://127.0.0.1:3000/login", myInit).then((response) => {
        let token = response;
        console.log(token);
    })


    e.preventDefault();
}
