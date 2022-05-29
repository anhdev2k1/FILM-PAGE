

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

$(document).ready(function(){
  $('.list__product').slick({
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