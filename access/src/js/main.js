
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
    let getIsLogin = JSON.parse(localStorage.getItem('islogin')) || {}
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
    localStorage.removeItem('islogin')
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
    checkIsLogin()
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
    checkIsLogin()
}
getSlidesTrending()


//--------------SEARCH MOVIE----------------

const inputSearch = document.querySelector('.input__search')
const btnSearch = document.querySelector('.btn__search')



// async function searchFilm(){
//     let res = await fetch(API)
//     let data =  await res.json()
    
//     let dataFilm = data.phim.phimbo

//     btnSearch.addEventListener('click',(e)=>{
//         let valueInput = inputSearch.value
//         let name = dataFilm.find(film => {
//             // return removeVietnameseTones(film.title).toLowerCase() == removeVietnameseTones(valueInput).toLowerCase();
//             // console.log(removeVietnameseTones(film.title).toLowerCase());
//             // console.log(removeVietnameseTones(valueInput).toLowerCase());
//             // if(.indexOf(removeVietnameseTones(valueInput).toLowerCase())){
//                return removeVietnameseTones(film.title).toLowerCase().indexOf("");
//             // }
//         })
//         console.log(name);
//     })
    
    
// }
// searchFilm()

// function removeVietnameseTones(str) {
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
//     str = str.replace(/đ/g,"d");
//     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
//     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
//     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
//     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
//     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
//     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
//     str = str.replace(/Đ/g, "D");
//     // Some system encode vietnamese combining accent as individual utf-8 characters
//     // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
//     str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
//     str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
//     // Remove extra spaces
//     // Bỏ các khoảng trắng liền nhau
//     str = str.replace(/ + /g," ");
//     str = str.trim();
//     // Remove punctuations
//     // Bỏ dấu câu, kí tự đặc biệt
//     str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
//     return str;
// }