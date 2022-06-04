

const listProductSearch = document.querySelector('.list__product')
let getDataSearch = JSON.parse(localStorage.getItem('getDataSearch')) || []


function getFilmSearch(){
    if(getDataSearch.length == 0){
        listProductSearch.innerHTML = '<div style="text-align:center ; color:white ; font-size : 3rem">Không có phim bạn tìm !!</div>'
    }else{
        let dataHtmls = [];
        getDataSearch.forEach((item,index) =>{
            let htmls = item.map(film =>{
            return `
                <a href="./watchFilm.html?url=${film.episode.length > 0?film.episode[0].url:''}"  class="item-product">
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
    
    
}
getFilmSearch()