

const listProductSearch = document.querySelector('.list__product')
let getDataSearch = JSON.parse(localStorage.getItem('getDataSearch')) || []

function getFilmSearch(){
    if(getDataSearch.length == 0){
        listProductSearch.innerHTML = '<div style="text-align:center ; color:white ; font-size : 3rem">Không có phim bạn tìm !!</div>'
    }else{
        let dataHtmls = [];
        getDataSearch.forEach((item) =>{
            let htmls = item.map(film =>{
               
            return `
                <a href="./watchFilmSearch.html?url=${film.episode.length > 0?film.episode[0].url:''}&getNameFilm=${film.title}"  class="item-product">
                    <div class="img-product">
                        <img src="${film.imageUrl}" alt="">
                    </div>
                    <div class="title-product">
                        <h3 class="heading-product">${film.title}</h3>
                        <p class="category-product">${film.category}</p>
                        <p class="episode-product">${film.episode.length} Tập</p>
                    </div>
                </a>
                `
            })
            dataHtmls.push(htmls)
            
        })
        listProductSearch.innerHTML = dataHtmls.join('')
    }
    
    const itemProduct = document.querySelectorAll('.item-product')
    itemProduct.forEach(item =>{
        item.addEventListener('click',(e)=>{
            let nameFilm = item.querySelector('.heading-product').innerHTML
            console.log(nameFilm);
            let cateFilm = item.querySelector('.category-product').innerHTML
            let episode = item.querySelector('.episode-product').innerHTML
            let objFilm ={
                name: nameFilm,
                category:cateFilm,
                episodes : episode
            }
            localStorage.setItem('film',JSON.stringify(objFilm));
        })
    })
}
getFilmSearch()







