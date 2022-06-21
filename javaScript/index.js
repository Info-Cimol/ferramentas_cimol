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
let btn_login = document.getElementById("btn-conn-lg");

btn_login.onclick = async (e) => {
    let email = document.getElementById("input-email-login").value;
    let password = document.getElementById("input-password-login").value;

    let myInit = {
        method: "POST",
        mode: "cors",
        cache: "default",
        body: new URLSearchParams({
            'email': email,
            'password': password
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    }

    fetch("http://127.0.0.1:3000/api/login", myInit).then(
        async (response) => {
            const data = await response.json();
            console.log(data)
        }
    )

    e.preventDefault();
}
/*let btn_createAccCad = document.getElementById("btn-create-cad");
btn_createAccCad.addEventListener("click", function(e){
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

/*
let myInit2 = {
    method: "POST",
    mode: "cors",
    cache: "default",
    body: new URLSearchParams({
        'token': data.token
    }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
}

fetch("http://127.0.0.1:3000/api/login/verify", myInit2).then(
    async (response) => {
        const data2 = await response.json();
        console.log(data2)
    }
)
*/