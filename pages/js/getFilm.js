const content = document.querySelector('.content')


async function getFilm(api){

    let response = await fetch(api)
    let data = await response.json()
    
    let htmls = data.map(item =>{
        
        return`
            <div class="post__item">
                <div class="img-post">
                    <img src="./access/images/post.jpg" alt="">
                </div>
                <div class="title">
                    <h3 class="title-heading">${item.name}</h3>
                    <p class="title-desc">${item.desc}</p>
                    <iframe style="width: 100%; height: 300px;" class"video" src="https://youtube.com/embed/${item.link}"></iframe>
                </div>
                <div class="btn-like" id="btn-like">
                    <i class="fa-solid fa-heart"></i>
                </div>
            </div>
        `
        
    })

    content.innerHTML = htmls.join('')
    
}

getFilm('https://6289f509e5e5a9ad321f5d6e.mockapi.io/products')

function createUser(){
    const signInHTML = document.querySelector('.sign__in')
const logoutLink = document.querySelector('.sign__in--link')
let getIsLogin = JSON.parse(localStorage.getItem('islogin'))

if(getIsLogin.islogin){
    const logOut = document.querySelector('.text-signin')
    logOut.innerHTML = "Log out"

    let userHTML = document.createElement('div')
    userHTML.className = "user"
    signInHTML.appendChild(userHTML)
    let iconUser = document.createElement('i')
    iconUser.className = "fa-solid fa-user"
    userHTML.appendChild(iconUser)
    let nameUser = document.createElement('h3')
    nameUser.className = "name__user"
    userHTML.appendChild(nameUser)

    nameUser.innerHTML = getIsLogin.username
    
}

logoutLink.addEventListener('click',(e)=>{
    
    let removeIsLogin = localStorage.removeItem('islogin')
})
}
createUser()
