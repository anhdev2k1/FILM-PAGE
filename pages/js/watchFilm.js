const API = 'https://api.apify.com/v2/key-value-stores/QubTry45OOCkTyohU/records/LATEST?fbclid=IwAR0o4Tue7odpOekyutVtoTNTb24b4lmAnI0jHqAP-ma35cLmvGfcPccbeEY'

let getFilm = JSON.parse(localStorage.getItem('film'))
let getURL = new URLSearchParams(window.location.search).get("url") || "";

const containerVideo = document.querySelector('.container-video') 
const video = document.querySelector('.video')
video.setAttribute('src',getURL);


if(getURL === ""){
   
    containerVideo.innerHTML = '<h1>Hiện phim đã bị xóa , mong bạn thông cảm ^ ^</h1>'
}



// Hiện thông tin phim
function getValueFilmOnLocal(){

    const nameVideo = document.querySelector('.name__video')
    const categoryVideo = document.querySelector('.category__video')
    
    const episodeVideo = document.querySelector('.episode__video')
    nameVideo.innerHTML = getFilm.name
    categoryVideo.innerHTML = getFilm.category
    episodeVideo.innerHTML = `Phim có tất cả ${getFilm.episodes}`
}

getValueFilmOnLocal()

let getTheLoai = new URLSearchParams(window.location.search).get("theloai") || "";
async function callAPI(){
    let response = await fetch(API)
    let data = await response.json()
    showEpisodeFilm(data)
}
callAPI()

const listEpisode = document.querySelector('.list__episode')


// Hiện tập phim
function showEpisodeFilm(data){
    let dataCate;
    let htmls;
    let filterFilm;
    let episodeFilm;
    
    dataCate = data.phim
    let dataCateArray = Object.entries(dataCate)
    let objFilm = [];
    dataCateArray.forEach(cate =>{
        filterFilm = cate[1].filter(item =>{
            let name = item.title
            return removeVietnameseTones(name).toLowerCase().includes(removeVietnameseTones(getFilm.name).toLowerCase())
        })
        if(filterFilm.length > 0){
            objFilm.push(filterFilm)
        }else{
            return
        }
        episodeFilm = objFilm[0][0].episode;
        htmls = episodeFilm.map(episode =>{
            return `${episode.episode > 0 ?`<a href="${episode.url}" class="episode__link">Tập ${episode.episode}</a>` : '' }`
        })
        listEpisode.innerHTML = htmls.join('')
        getURLEpisode();
    })
}

function getURLEpisode(){
    
    const getURLEpisode = document.querySelectorAll('.episode__link')
    getURLEpisode.forEach(item =>{
        item.addEventListener('click',(e)=>{

            getURLEpisode.forEach(episode => episode.classList.remove('active'));
            item.classList.add('active');   
            
            const nameVideo = document.querySelector('.name__video')
            nameVideo.innerHTML = `${getFilm.name} - ${item.innerHTML}`

            e.preventDefault()
            let url = item.getAttribute('href')
            video.setAttribute('src',url)
        })
    })
}
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}