
let myChart = document.getElementById('myChart').getContext('2d');
// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

let massPopChart = new Chart(myChart, {
  type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:['Lượng truy cập', 'Lượng tài khoản', 'Lượng đăng bài'],
    datasets:[{
      label:'Population',
      data:[
        50,
        30,
        20,
        0
      ],
      //backgroundColor:'green',
      backgroundColor:[
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:3,
      hoverBorderColor:'#000'
    }]
  },
  options:{
    title:{
      display:true,
      text:'THỐNG KÊ TRANG WEB',
      fontSize:30
    },
    legend:{
      display:true,
      position:'right',
      labels:{
        fontColor:'#000'
      }
    },
    layout:{
      padding:{
        left:50,
        right:0,
        bottom:0,
        top:0
      }
    },
    tooltips:{
      enabled:true
    }
  }
});



function openmodal(evt, content) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(content).style.display = "block";
    evt.currentTarget.className += " active";
}

const list__manage = document.querySelector('.list__manage')
function openManage(evt, content) {
    let tabcontent = document.querySelectorAll(".tab-manage");
    for ( let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
     let tablinks = document.querySelectorAll(".manage-link");
    for ( let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(content).style.display = "block";
    evt.currentTarget.className += " active";
}


const getUsers = JSON.parse(localStorage.getItem('users'))
const listUserHTML = document.querySelector('.list__user')
function showUser(dataUser){
  if(dataUser.length == 0){
    return listUserHTML.innerHTML = "<div style='text-align : center; margin-top: 50px'>No user !!</div>"
  }
  let htmls = dataUser.map(user =>{
      return `
      <div class="user">
          <div class="name__user user-item">${user.username}</div>
          <div class="email__user user-item">${user.email}</div>
          <i class="fa-solid fa-trash user-item" idName = "${user.username}"></i>
      </div>`
  })
  listUserHTML.innerHTML = htmls.join('')
}
showUser(getUsers)

/*----FOCUS USER */
const userFocus = document.querySelectorAll('.user')

userFocus.forEach(user =>{
    user.addEventListener('click',()=>{
        userFocus.forEach(item => item.classList.remove('active'));
        user.classList.add('active')
    })
})

/*--------DELETE USER TO ADMIN----------- */

const btnDel = document.querySelectorAll('.fa-trash')

btnDel.forEach((btn) => {
  btn.addEventListener('click',()=>{
    let idName = btn.getAttribute('idName')
    let indexUser = getUsers.findIndex(user => {
      return user.username === idName
    })
    
    let del = getUsers.splice(indexUser,1)
    localStorage.setItem('users',JSON.stringify(getUsers))
    showUser(getUsers)
    toastr.success("Đã xóa user")
    setTimeout(reload,1000)
  })
})

//----------------------------DELETE POST------------
const listPostHTML = document.querySelector('.list__post')

async function apiPost(api){
  let res = await fetch(api)
  let data = await res.json()
  showPosts(data)
}

apiPost('https://6289f509e5e5a9ad321f5d6e.mockapi.io/products')


function showPosts(dataPosts){
  let htmls = dataPosts.map(post => {
    return `<div class="post">
    <div class="name__user-post post-item">${post.name}</div>
    <div class="link__user-post post-item">https://youtube.com/embed/${post.name}</div>
    <div class="desc__user-post post-item">${post.desc}</div>
    <i class="fa-solid fa-trash delete post-item"index="${post.id}"></i>
    </div>`
  })
  listPostHTML.innerHTML = htmls.join('')
  delPost()
  focusPost()
}

function delPost (){
  const btnDelPost = listPostHTML.querySelectorAll('.delete')
  btnDelPost.forEach(btn => {
    btn.addEventListener('click',()=>{
      let idBtn = btn.getAttribute('index')
      fetch(`https://6289f509e5e5a9ad321f5d6e.mockapi.io/products/${idBtn}`,{
        method: "DELETE",
      })
      toastr.success("Đã xóa bài đăng")
      // alert("Đã xóa bài đăng")
      setTimeout(reload,1000)
    })
  })
}

function reload(){
  window.location.reload()
}


//-----------FOCUS POST---------------
function focusPost(){
  const postFocus = document.querySelectorAll('.post')
  console.log(postFocus);
  postFocus.forEach(post =>{
    post.addEventListener('click',()=>{
        postFocus.forEach(item => item.classList.remove('active'));
        post.classList.add('active')
      })
  })
}

