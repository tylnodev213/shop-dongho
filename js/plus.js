showPageCart();

function showPageCart(){
    let cartItems = localStorage.getItem('productsInCart');
    let numberItems = localStorage.getItem('cartNumbers')
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".productPageCart");
    if(cartItems && productContainer){
        productContainer.innerHTML='<tr>'+
        '<th colspan="2">Sản phẩm</th>'+
        '<th>Giá</th>'+
        '<th>Số lượng</th>'+
        '<th>Thành tiền</th>'+
        '<th>&nbsp</th>'+
        '</tr>';
        Object.values(cartItems).map((item,index) =>{
            productContainer.innerHTML+=`
            <tr>    
                <td><img src="${item.img}" class="productPageCart_img"></td>
                <td><pre class="productPageCart_name">${item.name}</pre></td>
                <td><pre class="productPageCart_price"> ${item.price} vnđ</pre></td>
                <td><button class="dec-button" class="spinner-button" onclick="subNumber(${index})" >-</button>
                <input type="number" min="1" max="50" step="1" value="${item.sl}" class="productPageCart_sl">
                <button class="inc-button" class="spinner-button" onclick="addNumber(${index})" >+</button>
                </td>
                <td><pre class="productPageCart_tt">${item.price*item.sl} vnđ</pre></td>
                <td><button class="deleteProductCart" onclick="removeProductCart(${index})"><i class="far fa-trash-alt"></i></button></td>    
            </tr> 
            `
        }); 
        productContainer.innerHTML+='<tr>'+
        '<th colspan="4">Tổng cộng:</th>'+
        '<th><span class="totalSumCart">0</span> vnđ</th>'+
        '<th>&nbsp</th>'+
        '</tr>';
    }
    let summary=localStorage.getItem('totalCost');
    let sum="";
    let count=0;

    for(let i=(summary.length)-1;i>=0;i--){
        count++;
        sum+=summary[i];
        if(count%3==0 && i!=0){
            sum+=".";
        }
    }
    let total="";
    for(let i=0;i<sum.length;i++){
        total+=sum[(sum.length)-i-1];
    }
    document.querySelector('.totalSumCart').textContent=total;
    document.querySelector('.totalSum').textContent=total;
    document.querySelector('.numbers_product').textContent=numberItems;
    let quantityProductBlur = document.querySelectorAll('.productPageCart_sl');
    for(let i=0;i<quantityProductBlur.length;i++){
        quantityProductBlur[i].addEventListener('blur',()=>{
            console.log("ok")
            updateQuantityProduct(i);
        });
    }  
}
function removeProductCart(i){  
    let delProduct = document.querySelectorAll('.deleteProductCart');
    let blockProduct= delProduct[i].parentElement.parentElement;
    blockProduct.remove();
    let nameProduct = blockProduct.querySelector('.productPageCart_name').innerText;
    let tagProduct="";
    for(let i=0;i<nameProduct.length;i++){
        if(nameProduct[i]!=" "){
            tagProduct+=nameProduct[i];
        }
    }
    let keyProduct= localStorage.getItem('productsInCart');
    keyProduct = JSON.parse(keyProduct);
    let priceProduct =keyProduct[tagProduct].price;
    let quantityProduct =keyProduct[tagProduct].sl;
    delete keyProduct[tagProduct];
    localStorage.setItem("productsInCart", JSON.stringify(keyProduct));
    let summary = localStorage.getItem("totalCost");
    let productNumbers = localStorage.getItem('cartNumbers');
    localStorage.setItem("cartNumbers", parseInt(productNumbers)-quantityProduct)
    localStorage.setItem("totalCost", parseInt(summary)-(priceProduct*quantityProduct))
    document.querySelector('.totalSumCart').textContent=parseInt(summary)-(priceProduct*quantityProduct);
    document.querySelector('.totalSum').textContent=parseInt(summary)-(priceProduct*quantityProduct);
    document.querySelector('.numbers_product').textContent=parseInt(productNumbers)-quantityProduct;
    showPageCart();
}
function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.numbers_product').textContent= productNumbers;
    }
}
function updateQuantityProduct(i){
    let quantityProductBlur = document.querySelectorAll('.productPageCart_sl');
    let new_quantityProduct = quantityProductBlur[i].value;
    let blockProduct= quantityProductBlur[i].parentElement.parentElement;
    let nameProduct = blockProduct.querySelector('.productPageCart_name').innerText;
    let tagProduct="";
    for(let i=0;i<nameProduct.length;i++){
        if(nameProduct[i]!=" "){
            tagProduct+=nameProduct[i];
        }
    }
    let keyProduct= localStorage.getItem('productsInCart');
    let productNumber=parseInt(localStorage.getItem('cartNumbers'));
    keyProduct = JSON.parse(keyProduct);
    let quantityProduct = parseInt(keyProduct[tagProduct].sl)
    if(quantityProduct<=50 && new_quantityProduct<=50 && new_quantityProduct>0){
        productNumber=productNumber-quantityProduct;
        productNumber+=parseInt(new_quantityProduct);
        let summary = parseInt(localStorage.getItem('totalCost'));
        let priceProduct = parseInt(keyProduct[tagProduct].price);
        summary=summary-quantityProduct*priceProduct;
        quantityProduct=new_quantityProduct;
        keyProduct[tagProduct].sl=quantityProduct;
        localStorage.setItem("productsInCart", JSON.stringify(keyProduct));
        localStorage.setItem("cartNumbers", productNumber);
        localStorage.setItem("totalCost", summary+priceProduct*quantityProduct);
        document.querySelector('.totalSumCart').textContent=summary+priceProduct*quantityProduct;
        document.querySelector('.productPageCart_tt').textContent=priceProduct*quantityProduct;
    }else if(new_quantityProduct>50){
        alert("Khách hàng chỉ được mua tối đa 50 cái đồng hồ cùng loại");
    }else{
        if(confirm("Khách hàng muốn xóa sản phẩm này khỏi giỏ hàng ?")==true){
            removeProductCart(i);
        }
    }
    showPageCart();
}
function addNumber(i){
    let addBlock = document.querySelectorAll('.inc-button');
    document.getElementsByClassName("productPageCart_sl")[i].stepUp(1);
    let blockProduct= addBlock[i].parentElement.parentElement;
    let nameProduct = blockProduct.querySelector('.productPageCart_name').innerText;
    let tagProduct="";
    for(let i=0;i<nameProduct.length;i++){
        if(nameProduct[i]!=" "){
            tagProduct+=nameProduct[i];
        }
    }
    let keyProduct= localStorage.getItem('productsInCart');
    let productNumber=parseInt(localStorage.getItem('cartNumbers'));
    keyProduct = JSON.parse(keyProduct);
    let quantityProduct = parseInt(keyProduct[tagProduct].sl)
    if(quantityProduct<50){
        quantityProduct+=1;
        productNumber+=1;
        keyProduct[tagProduct].sl=quantityProduct;
        localStorage.setItem("productsInCart", JSON.stringify(keyProduct));
        localStorage.setItem("cartNumbers", productNumber);
        let summary = parseInt(localStorage.getItem('totalCost'));
        let priceProduct = parseInt(keyProduct[tagProduct].price);
        localStorage.setItem("totalCost", summary+priceProduct);
        document.querySelector('.totalSumCart').textContent=summary+priceProduct;
        document.querySelector('.productPageCart_tt').textContent=priceProduct*quantityProduct;
    }else{
        alert("Khách hàng chỉ được mua tối đa 50 cái đồng hồ cùng loại")
    }
    showPageCart();
}
function subNumber(i){
    let subBlock = document.querySelectorAll('.dec-button');
    document.getElementsByClassName("productPageCart_sl")[i].stepUp(-1);
    let blockProduct= subBlock[i].parentElement.parentElement;
    let nameProduct = blockProduct.querySelector('.productPageCart_name').innerText;
    let tagProduct="";
    for(let i=0;i<nameProduct.length;i++){
        if(nameProduct[i]!=" "){
            tagProduct+=nameProduct[i];
        }
    }
    let keyProduct= localStorage.getItem('productsInCart');
    let productNumber=parseInt(localStorage.getItem('cartNumbers'));
    keyProduct = JSON.parse(keyProduct);
    let quantityProduct = parseInt(keyProduct[tagProduct].sl)
    if(quantityProduct>1){
        quantityProduct-=1;
        productNumber-=1;
        keyProduct[tagProduct].sl=quantityProduct;
        localStorage.setItem("productsInCart", JSON.stringify(keyProduct));
        localStorage.setItem("cartNumbers", productNumber);
        let summary = parseInt(localStorage.getItem('totalCost'));
        let priceProduct = parseInt(keyProduct[tagProduct].price);
        localStorage.setItem("totalCost", summary-priceProduct);
        document.querySelector('.totalSumCart').textContent=summary-priceProduct;
        document.querySelector('.productPageCart_tt').textContent=priceProduct*quantityProduct;
    }else{
        if(confirm("Khách hàng muốn xóa sản phẩm này khỏi giỏ hàng ?")==true){
            removeProductCart(i);
        }
    }
    showPageCart();
}

onloadCartNumbers();