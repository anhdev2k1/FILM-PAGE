

let admin = {
    username:'admin',
    password:123
}
let setAdmin = localStorage.setItem('admin',JSON.stringify(admin));
function signIn(e){
    let username = document.querySelector('.username').value
    let password = document.querySelector('.password').value
    let email = document.querySelector('.email').value
    let user ={
        username : username,
        password : password,
        email : email
    }
    
    let setUser = localStorage.setItem(username,JSON.stringify(user));
    alert("Đăng kí thành công")
}

function login(e){
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
        // alert("Bạn thành công vào tải khoản quản trị")
        toastr.success("Đăng nhập thành công")
        
        window.location.href ="./admin.html"
    }else if(username == data.username && password == data.password){
        // alert("Bạn đăng nhập thành công")
        
        toastr.success("Đăng nhập thành công")
        localStorage.setItem('islogin',JSON.stringify(isLogin)) // Nếu login thành công , gán islogin vào storage
        window.location.href ="./index.html"
        
        
    }
    
    else{
        // alert("Bạn đăng nhập thất bại")
        toastr.error("Đăng nhập thất bại")
    }


}

