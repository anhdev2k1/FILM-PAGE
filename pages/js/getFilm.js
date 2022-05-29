const content = document.querySelector('.content')


async function getFilm(api){

    let response = await fetch(api)
    let data = await response.json()
    
    let htmls = data.map(item =>{
        
        return`
            <div class="post__item">
                <div class="img-post">
                    <img src="../images/post.jpg" alt="">
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


