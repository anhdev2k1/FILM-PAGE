const API = 'https://api.apify.com/v2/key-value-stores/QubTry45OOCkTyohU/records/LATEST?fbclid=IwAR0o4Tue7odpOekyutVtoTNTb24b4lmAnI0jHqAP-ma35cLmvGfcPccbeEY'

let getFilm = JSON.parse(localStorage.getItem('film'))
let getURL = new URLSearchParams(window.location.search).get("url") || "";
const containerVideo = document.querySelector('.container-video') 
const video = document.querySelector('.video')
video.setAttribute('src',getURL);


if(getURL === ""){
   
    containerVideo.innerHTML = '<h1>Hiện phim đã bị xóa , mong bạn thông cảm ^ ^</h1>'
}




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
function showEpisodeFilm(data){
    let dataCate;
    let indexVideo;
    let htmls;
    switch(getTheLoai){
        
        case 'undefined':
            indexVideo = getFilm.length
            dataCate = data.phim.phimbo[indexVideo].episode
            htmls = dataCate.map(episode =>{
                return `
                ${episode.episode > 0 ?`<a href="${episode.url}" class="episode__link">Tập ${episode.episode}</a>` : '' }
                `
            })
            listEpisode.innerHTML = htmls.join('')
            getURLEpisode();
            break;
        case 'phimle':
            indexVideo = getFilm.length
            dataCate = data.phim.phimle[indexVideo].episode
            htmls = dataCate.map(episode =>{
                return `
                <a href="${episode.url}" class="episode__link">Tập ${episode.episode}</a>
                `
            })
            listEpisode.innerHTML = htmls.join('')
            getURLEpisode();
            break;
        case 'phimchieurap':
            indexVideo = getFilm.length
            dataCate = data.phim.phimchieurap[indexVideo].episode
            htmls = dataCate.map(episode =>{
                return `
                <a href="${episode.url}" class="episode__link">Tập ${episode.episode}</a>
                `
            })
            listEpisode.innerHTML = htmls.join('')
            getURLEpisode();
            break;
        case 'phimhoathinh':
            indexVideo = getFilm.length
            dataCate = data.phim.phimhoathinh[indexVideo].episode
            htmls = dataCate.map(episode =>{
                return `
                <a href="${episode.url}" class="episode__link">Tập ${episode.episode}</a>
                `
            })
            listEpisode.innerHTML = htmls.join('')
            getURLEpisode();
            break;
    }
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
