function Check() {
  var FullName = document.getElementById("FullName").value;
  var Password = document.getElementById("Password").value;
  var RePassword = document.getElementById("RePassword").value;
  var Telephone = document.getElementById("Telephone").value;
  var Email = document.getElementById("Email").value;
  var err = true;


  if (FullName.length > 5 && FullName.length < 50) {
    document.getElementById("errFullName").innerHTML = "";
  }
  else {
    document.getElementById("errFullName").innerHTML = "Họ và tên phải lớn hơn 5 kí tự và nhỏ hơn 50 kí tự";
    err = false;
  }
  var setPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (setPhone.test(Telephone)) {
    document.getElementById("errTelephone").innerHTML = "";
  }
  else {
    document.getElementById("errTelephone").innerHTML = "Số điện thoại không đúng";
    err = false;
  }

  var setEmail = /^([a-zA-Z0-9])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})$/;
  if (setEmail.test(Email)) {
    document.getElementById("errEmail").innerHTML = "";
  }
  else {
    document.getElementById("errEmail").innerHTML = "Email không tồn tại";
    err = false;
  }

  var setPassword = /^.*(?=.{5,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/;
  if (setPassword.test(Password)) {
    document.getElementById("errPassword").innerHTML = "";
  }
  else {
    document.getElementById("errPassword").innerHTML = "Password phải có 1 kí tự hoa, 1 kí tự số, 1 chữ thường";
    err = false;
  }
  if (RePassword == Password) {
    document.getElementById("errRePassword").innerHTML = "";
  }
  else {
    document.getElementById("errRePassword").innerHTML = "Hai mật khẩu không trùng khớp";
    err = false;
  }

  var User = [];
  User = JSON.parse(localStorage.getItem('User'));
  if (User != null) {
    for (var i = 0; i < User.length; i++) {
      if (Email == User[i].Email) {
        alert("Email đã được đăng kí trước đó");
        err = false;
      }
    }
  }
  if (!err) {
    return false;
  } else {
    alert("đăng ký thành công");
    submitClickHandle();
  }

}

const Users = {      // tạo 1 Object Student lưu data
  storeKey: 'User', // đặt tên key là User
  data: [], //tạo 1 mảng data rỗng
  add: function (User) {
    this.data.push(User);   // thêm toàn bộ dữ liệu vào cuối mảng data
  },
  save: function () {
    const jsonData = JSON.stringify(this.data);  // khai báo hằng số JsonData để lấy đối tượng trong data
    // và chuyển về chuỗi Json
    localStorage.setItem(this.storeKey, jsonData); //lưu nó vào localStorage có key STUDENT_DATA
  },
  get list() {
    return this.data;
  },
  set list(data) {
    this.data = data;
  }
}

function submitClickHandle() {

  Users.add({
    FullName: getInputValue('#FullName'),
    Password: getInputValue('#Password'),
    Email: getInputValue('#Email'),
    Phone: getInputValue('#Telephone'),
  });
  Users.save();

}

// function KT() {
//   function getInputValue(selector) {
//     var inputElement = document.querySelector(selector); // tạo 1 biến để trả về phần tử đầu tiên được tìm thấy
//     return inputElement.value;
//   }
//   var Email = getInputValue('#Email');
//   var User = []
//   User = JSON.parse(localStorage.getItem('User'));
//   if (User != null) {
//     for (var i = 0; i < User.length; i++) {
//       if (Email == User[i].Email) {
//         alert("Email đã được đăng kí trước đó");
//         return false;
//       }
//     }
//   }

// }
function getInputValue(selector) {
  var inputElement = document.querySelector(selector); // tạo 1 biến để trả về phần tử đầu tiên được tìm thấy
  return inputElement.value;
}