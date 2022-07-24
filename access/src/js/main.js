
const API = 'https://api.apify.com/v2/key-value-stores/QubTry45OOCkTyohU/records/LATEST?fbclid=IwAR0o4Tue7odpOekyutVtoTNTb24b4lmAnI0jHqAP-ma35cLmvGfcPccbeEY'


$(document).ready(function(){
    $('.slides').slick({
        autoplay :true,
        autoplaySpeed : 2000,
        prevArrow : '<i class="fa-solid fa-angle-left slick-prev slick-arrow"></i>',
        nextArrow : '<i class="fa-solid fa-angle-right slick-next slick-arrow"></i>',
        focusOnSelect:true
    });
});


function getSlickJS(listSlide){
    $(document).ready(function(){
        $(`${listSlide}`).slick({
            autoplay :true,
            autoplaySpeed : 2000,
            prevArrow : '<i class="fa-solid fa-angle-left slick-prev slick-arrow"></i>',
            nextArrow : '<i class="fa-solid fa-angle-right slick-next slick-arrow"></i>',
            focusOnSelect:true,
            infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
        });
      });
}


function checkIsLogin(){
    const signInHTML = document.querySelector('.sign__in')
    const logoutLink = document.querySelector('.sign__in--link')
    const getIsLogin = JSON.parse(localStorage.getItem('islogin')) || {}
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
        toggleFormChangeUser()
    }

    logoutLink.addEventListener('click',(e)=>{
        localStorage.removeItem('islogin')
    })
   
}
checkIsLogin()


function showInfoUserPreview(){
    const users = JSON.parse(localStorage.getItem('users'))
    const nameUser = document.querySelector('.name__user').innerHTML
    const infoName = document.querySelector('.info__name')
    const infoEmail = document.querySelector('.info__email')
    const getInfoUser = users.filter(user => {
        return user.username ===nameUser
    })
    
    infoName.setAttribute('value',getInfoUser[0].username)
    infoEmail.setAttribute('value',getInfoUser[0].email)
    
}
showInfoUserPreview()


//------------------CHANGE PASSWORD--------------------------

function changePassword(){
    const inputPass = document.querySelector('.info__pass')
    const inputUsername = document.querySelector('.info__name').value
    const btnPreview = document.querySelector('.btn__preview')
    const users = JSON.parse(localStorage.getItem('users'))
    
    let newPassPreview
    inputPass.addEventListener('change',(e)=>{
        newPassPreview = e.target.value
        if(e.target.value !== "") {
            btnPreview.style.background = "#0D90F3"
            btnPreview.disabled = false
        }else {
            btnPreview.style.background = "#595A5E"
            btnPreview.disabled = true
        }
    })
    
    btnPreview.addEventListener('click',()=>{
        
        let newUsers = users.filter(user =>{
            return user.username === inputUsername ? user.password = newPassPreview : inputPass.value
        })
        localStorage.setItem('users',JSON.stringify(newUsers))
        inputPass.setAttribute('value',newPassPreview)
        
        toastr.success('Bạn đã thay đổi thông tin thành công !!')
        setTimeout(()=>{
            window.location.reload()
        },1000)
    })
}
changePassword()



//------------------END CHANGE PASSWORD--------------------------
function toggleFormChangeUser(){
const layerTrans = document.querySelector('.layer__form')
const form = document.querySelector('#form__container')
const user = document.querySelector('.user')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
    })
    document.addEventListener('click',(e)=>{
        if(user.contains(e.target)){
            layerTrans.classList.add('active');
            document.querySelector('body').classList.add('disable-scroll')
        }
        if(form.contains(e.target) || user.contains(e.target)){
          return
        }
        
        layerTrans.classList.remove('active');
        document.querySelector('body').classList.remove('disable-scroll')
    })

}


// CLICK SLIDE WATCH FILM
const listProduct = document.querySelector('.list__product')

async function getSlides(){
    let response = await fetch(API)
    let data = await response.json()
    let dataSlide = data.phim.phimbo
    let spliceData = dataSlide.splice(1,7)
    let htmls = spliceData.map((slide,index) =>{
        return `
        <a href="./watchFilm.html?url=${slide.episode.length > 0?slide.episode[0].url : ''}&length=${index}&theloai=undefined" data="${slide.category}" episode="${slide.episode.length} Tập" class="item__product">
            <div class="img__product">
                <img src="${slide.imageUrl}" alt="">
            </div>
            <div class="title__product">
                <h3 class="heading__product">${slide.title}</h3>
            </div>
        </a>
        `
    })
    listProduct.innerHTML = htmls.join("")
    getSlickJS('.list__product')
    setValueFilmOnLoCal(listProduct)
}
getSlides()


function setValueFilmOnLoCal(listHTML){
    const films = listHTML.querySelectorAll('.item__product')
    films.forEach((film ,index)=> {
        film.addEventListener('click',(e)=>{
            
            let nameFilm = film.querySelector('.heading__product').innerHTML
            let categoryFilm = film.getAttribute('data')
            let episodes = film.getAttribute('episode')
            let objFilm ={
                name: nameFilm,
                length: index + 1,
                category : categoryFilm,
                episodes : episodes
            }
            let setFilm = localStorage.setItem('film',JSON.stringify(objFilm));
            
        })
        
    })
}

// GET PRODUCT SLIDE TRENĐING FILM
const listTrendingFilm = document.querySelector('.list__product--trending');
async function getSlidesTrending(){
    let response = await fetch(API)
    let data = await response.json()
    let dataSlide = data.phim.phimhoathinh
    let spliceData = dataSlide.splice(1,7)
    let htmls = spliceData.map((slide,index) =>{
        return `
        <a href="./watchFilm.html?url=${slide.episode.length > 0?slide.episode[0].url:''}&length=${index}&theloai=phimhoathinh" data="${slide.category}" episode="${slide.episode.length} Tập" class="item__product">
            <div class="img__product">
                <img src="${slide.imageUrl}" alt="">
            </div>
            <div class="title__product">
                <h3 class="heading__product">${slide.title}</h3>
            </div>
        </a>
        `
    })
    listTrendingFilm.innerHTML = htmls.join("")
    getSlickJS('.list__product--trending')
    setValueFilmOnLoCal(listTrendingFilm)
    
}
getSlidesTrending()


export {showInfoUserPreview,changePassword,toggleFormChangeUser}

