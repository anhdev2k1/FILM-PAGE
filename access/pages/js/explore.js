
const API = 'https://api.apify.com/v2/key-value-stores/QubTry45OOCkTyohU/records/LATEST?fbclid=IwAR3lGy3ALWMcGE8QVfGyjiwZcmfoLA11NGWXzNcYoGxmA7gihbUcOTqXDGI'

const listProduct = document.querySelector('.list__product')


// Hàm Call api phim
async function getProduct(){
    try{
        let response = await fetch(API)
        let data = await response.json()
        showProducts(data.phim.phimbo) // Gán mặt định data là phim bộ
        setValueFilmOnLoCal()
        const nameCategorys = document.querySelectorAll('.btn-category')
        //Xử lí click vào category nào thì đổ data đó
        nameCategorys.forEach((nameCategory) =>{
            let dataCate;
            let category;
            
            nameCategory.addEventListener('click',() => {
                category = nameCategory.getAttribute('data')
                switch(category){
                    case 'phimbo':
                        dataCate = data.phim.phimbo
                        showProducts(dataCate,category)
                        setValueFilmOnLoCal()
                        break;
                    case 'phimle':
                        dataCate = data.phim.phimle
                        showProducts(dataCate,category)
                        setValueFilmOnLoCal();
                        break;
                    case 'phimchieurap':
                        dataCate = data.phim.phimchieurap
                        showProducts(dataCate,category)
                        setValueFilmOnLoCal()
                        break;
                    case 'phimhoathinh':
                        dataCate = data.phim.phimhoathinh
                        showProducts(dataCate,category)
                        setValueFilmOnLoCal()
                        break;
                }
            })
        })
        
    }catch(err){
        console.log("failed to load data",err);
    }
}

// Hàm show item Phim 
function showProducts(data,theloai){
    let htmls = data.map(item => {
        return `
        <a href="./watchFilm.html?url=${item.episode.length > 0?item.episode[0].url:''}&theloai=${theloai}"  class="item-product">
            <div class="img-product">
                <img src="${item.imageUrl}" alt="">
            </div>
            <div class="title-product">
                <h3 class="heading-product">${item.title}</h3>
                <p class="category-product">${item.category}</p>
                <p class="episode-product">${item.episode.length} Tập</p>
            </div>
        </a>
        `
    })
    listProduct.innerHTML = htmls.join('')
}

// Set active cho các category button
function setActiveButton(){
    let buttons = document.querySelectorAll('.btn-category');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');        
        });
    });

}

// get value của từng category trong select
function categoryChanged(obj){
    let data = obj.value
}


function setValueFilmOnLoCal(){
    const films = document.querySelectorAll('.item-product')
    films.forEach((film ,index)=> {
        film.addEventListener('click',()=>{
            
            let nameFilm = film.querySelector('.heading-product').innerHTML
            let cateFilm = film.querySelector('.category-product').innerHTML
            let episode = film.querySelector('.episode-product').innerHTML
            let objFilm ={
                name: nameFilm,
                category:cateFilm,
                episodes : episode,
                length: index
            }
            let setFilm = localStorage.setItem('film',JSON.stringify(objFilm));
            
        })
        
    })
}

//Hàm xử lý các button category
// function category(){

//     const nameCategorys = document.querySelectorAll('.btn-category')
    
//     //Xử lí click vào category nào thì đổ data đó
//     nameCategorys.forEach(nameCategory =>{
        
//         getProduct() // Mặc định cho category = phim bộ
//         nameCategory.addEventListener('click',() => {
//             nameCategory.classList.add('active')
//             let category = nameCategory.getAttribute('data')
//            switch(category){
//                 case 'phimbo':
//                     getProduct()
//                     break;
//                 case 'phimle':
                   
                    
//                     break;
//                 case 'phimchieurap':
                    
//                     break;
//                 case 'phimhoathinh':
                    
//            }
//         })
//     })
// }



// --------------- GỌI HÀM------------------------
getProduct()
setActiveButton()