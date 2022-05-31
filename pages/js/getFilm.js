
const btnPost = document.querySelector('.post')
const layerTrans = document.querySelector('.layer__form')
const form = document.querySelector('#form__container')
const btnSubmit = document.querySelector('.submit')
document.addEventListener('click', e => {
    if(btnPost.contains(e.target)){
      layerTrans.classList.add('active');
      document.querySelector('body').classList.add('disable-scroll')
    }
    if(form.contains(e.target) || btnPost.contains(e.target)){
      return
    }
    
    layerTrans.classList.remove('active');
    document.querySelector('body').classList.remove('disable-scroll')
})
const content = document.querySelector('.content')

async function getFilm(api){

    let response = await fetch(api)
    let data = await response.json()
    
    let htmls = data.map(item =>{
        
        return`
            <div class="post__item">
                <div class="img-post">
                    <img src="./access/images/user.png" alt="">
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
    let iconUser = document.createElement('img')
    iconUser.setAttribute('src','./access/images/user.png')
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



//---- ĐĂNG BÀI------------

const formPost = document.querySelector('#form__container')

let getNameUser = JSON.parse(localStorage.getItem('islogin')).username

formPost.addEventListener('submit',(e) => {
    e.preventDefault()

    const formData = new FormData(e.target);
    
    let desc = formData.get('desc')
    let link = formData.get('link')
    if(desc == "" || link == ""){
        alert(" Vui lòng không được bỏ trống")
        return
    }
    let getStartCut = link.indexOf('=')
    let idVideo = link.slice(getStartCut+1)
    console.log(idVideo);
    fetch('https://6289f509e5e5a9ad321f5d6e.mockapi.io/products',
    {
        method: "POST",
        headers: {
            accept: 'application.json',
            'Content-type': 'application/json; charset=UTF-8',
        },
        body:JSON.stringify(
            {
                desc,
                link:idVideo,
                name:getNameUser,
                nsx:"nsx"
            }
        )})
            alert("Đăng bài thành công")
})
