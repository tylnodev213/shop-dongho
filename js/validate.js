function validate(){
    var check=0;
    var regexName = /[a-zA-Z/sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂ ưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/;
    var ho_ten =document.getElementById("ho_ten").value;
    if(ho_ten.length == 0){
        document.getElementById("error-ho_ten").innerHTML="Phải nhập họ tên";
        check++;
    }else if(regexName.test(ho_ten)){
        document.getElementById("error-ho_ten").innerHTML="";   
    }else{
        document.getElementById("error-ho_ten").innerHTML="Họ tên không phù hợp";
        check++;
    }
    var sdt =document.getElementById("sdt").value;
    var regexPhone = /^[\+]?[0-9]{10,11}$/;
    if(sdt.length == 0){
        document.getElementById("error-sdt").innerHTML="Phải nhập số điện thoại";
        check++;
    }else if(regexPhone.test(sdt) && sdt.length<=12){
        document.getElementById("error-sdt").innerHTML="";
    }else if(sdt.length>12){
        document.getElementById("error-sdt").innerHTML="Số điện thoại quá dài";
    }else{
        document.getElementById("error-sdt").innerHTML="Số điện thoại không phù hợp";
        check++;
    }
    var email =document.getElementById("email").value;
    var regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.length == 0){
        document.getElementById("error-email").innerHTML="Phải nhập email";
        check++;
    }else if(regexEmail.test(email)){
        document.getElementById("error-email").innerHTML="";
    }else{
        document.getElementById("error-email").innerHTML="Email không phù hợp";
        check++;
    }
    var diachi = document.getElementById("diachi").value;
    if(diachi.length == 0){
        document.getElementById("error-diachi").innerHTML="Phải nhập địa chỉ";
        check++;
    }else{
        document.getElementById("error-diachi").innerHTML="";
    }
    var checkbox = document.getElementById("check");
    if(checkbox.checked){
        document.getElementById("error-check").innerHTML="";
    }else{
        document.getElementById("error-check").innerHTML="Bạn chưa đồng ý điều khoản này";
        check++;
    }
    let summary=localStorage.getItem('totalCost');
    if(summary==0){
        alert("Chưa có sản phẩm trong giỏ hàng");
        check++;
    }
    if(check!=0){
        return false;
    }else{
        localStorage.clear();
        return true;
    }   
}