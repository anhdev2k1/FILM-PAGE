

let admin = {
    username:'admin',
    password:123
}
let setAdmin = localStorage.setItem('admin',JSON.stringify(admin));


// Đăng kí
function signIn(){
    let username = document.querySelector('.username').value
    let password = document.querySelector('.password').value
    let email = document.querySelector('.email').value
    let user ={
        username : username,
        password : password,
        email : email
    }
    if(username == "" || password == "" || email == ""){
        toastr.error("Vui lòng nhập đủ thông tin")
    }
    else{
        let setUser = localStorage.setItem(username,JSON.stringify(user));
        toastr.success("Đăng kí thành công")
        setTimeout(nextPageLogin,1000)
    }

}

function nextPageLogin(){
    window.location.href = "./login.html"
}
function nextPageHome(){
    window.location.href ="./index.html"
}
// Đăng nhập
function login(){
    let username = document.querySelector('.username').value
    let password = document.querySelector('.password').value
    let data = JSON.parse(localStorage.getItem(username))
    let isLogin = {
        islogin : true,
        username : username
    }
    
    if(data == null){
        toastr.error("Đăng nhập thất bại , vui lòng kiểm trai lại !!")

    }else if(username == admin.username && password == admin.password){
        toastr.success("Đăng nhập thành công")
        
        window.location.href ="./admin.html"
    }else if(username == data.username && password == data.password){  
        toastr.success("Đăng nhập thành công")
        localStorage.setItem('islogin',JSON.stringify(isLogin)) // Nếu login thành công , gán islogin vào storage
        setTimeout(nextPageHome,1000)
    }
    else{
        toastr.error("Đăng nhập thất bại")
    }


}

