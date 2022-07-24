

let admin = {
    username:'admin',
    password:'123'
}
let setAdmin = localStorage.setItem('admin',JSON.stringify(admin));


// Đăng kí
function signIn(){
    let username = document.querySelector('.username').value
    let password = document.querySelector('.password').value
    let email = document.querySelector('.email').value
    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
    if(username == "" || password == "" || email == ""){
        toastr.error("Vui lòng nhập đủ thông tin")
    }
    else{
        let users = JSON.parse(localStorage.getItem('users')) || []
        const newUser ={
            username : username,
            password : password,
            email : email
        }
        if( users.length == 0){
            if(validateEmail(email)){
                console.log("Email đúng định dang");
                users.push(newUser)
                localStorage.setItem("users",JSON.stringify(users));
                toastr.success("Đăng kí thành công")
                setTimeout(nextPageLogin,1000)
            }else{
                toastr.error("Email không đúng định dạng")
            }
            
        }
        else{
            let currentUser = users.find(user => user.username == username)
            let currentUserEmail = users.find(user => user.email == email)
            if(currentUser){
                toastr.error("Username đã tồn tại")
            }else if(currentUserEmail){
                toastr.error("Email đã tồn tại")
            }else{
                if(validateEmail(email)){
                    users.push(newUser)
                    localStorage.setItem("users",JSON.stringify(users));
                    toastr.success("Đăng kí thành công")
                    setTimeout(nextPageLogin,1000)
                }else{
                    toastr.error("Email không đúng định dạng")
                }
                
            }
        }
        
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
    let users = JSON.parse(localStorage.getItem('users'))
    let isLogin = {
        islogin : true,
        username,
        password,
    }
    if(username == "" || password == ""){
        toastr.error("Đăng nhập thất bại , vui lòng kiểm trai lại !!")
        
    }else{
        let currentUser = users.find( user => user.username == username )
        
        if(currentUser){
            if(currentUser.password == password ){
                toastr.success("Đăng nhập thành công")
                localStorage.setItem('islogin',JSON.stringify(isLogin))
                setTimeout(nextPageHome,1000)
            }
            else{
                toastr.error("Không đúng mật khẩu")
            }
        }else if(username == admin.username){
            if(admin.password === password){
                toastr.success("Đăng nhập admin thành công")
                setTimeout(nextAdmin,1000)
            }
            else{
                toastr.error("Không đúng mật khẩu")
            }
        }
        else{
            toastr.error("Không đúng tài khoản")
        }
        
    }
}
function nextAdmin(){
    window.location.href = "./admin.html"
}

object.history = {
    
}

