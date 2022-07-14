// cart on homepage
let carts= document.querySelectorAll('.addToCart');
let products=[];
for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(i);
    })
}
function addToCart(){
    let productBox=document.querySelector('#addToCart').parentElement.parentElement;
    let productName=productBox.querySelector('.product_infor_name').innerText;
    let productImg=document.querySelector('.img_product_main').src;
    let productSale=productBox.querySelector('.sale').innerText;
    let productPrice="";
    for(let i=0;i<productSale.length;i++){
        if(productSale[i]!="."){
            productPrice+=productSale[i];
        }
    }
    let productTag="";
    for(let i=0;i<productName.length;i++){
        if(productName[i]!=" "){
            productTag+=productName[i];
        }
    }
    let product={
        img: productImg,
        name: productName,
        tag: productTag,
        price: productPrice,
        sl:0
    }
    products.push(product);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.numbers_product').textContent=productNumbers+1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.numbers_product').textContent=1;
    }
    setItems(product);
}
function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.numbers_product').textContent= productNumbers;
    }
}
function cartNumbers(index){
    let productBox=carts[index].parentElement;
    let productName=productBox.querySelector('.name-item').innerText;
    let productImg=productBox.querySelector('.img-item').src;
    let productSale=productBox.querySelector('.sale').innerText;
    let productPrice="";
    for(let i=0;i<productSale.length;i++){
        if(productSale[i]!="."){
            productPrice+=productSale[i];
        }
    }
    let productTag="";
    for(let i=0;i<productName.length;i++){
        if(productName[i]!=" "){
            productTag+=productName[i];
        }
    }
    let product={
        img: productImg,
        name: productName,
        tag: productTag,
        price: productPrice,
        sl:0
    }
    products.push(product);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.numbers_product').textContent=productNumbers+1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.numbers_product').textContent=1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems= localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems ={
                ...cartItems,
                [product.tag]:product
            }
            
        }
        cartItems[product.tag].sl+=1;
    }else{
        product.sl=1;
        cartItems={
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    totalCost(product);
}
function totalCost (product) {
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost!=null){
        cartCost=parseInt(cartCost);
        product.price=parseInt(product.price);
        localStorage.setItem('totalCost',cartCost+product.price)
    }else{
        product.price=parseInt(product.price);
        localStorage.setItem('totalCost',product.price);
    } 
    showCart();   
}
function showCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".showCart");
    if(cartItems && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItems).map((item,index) =>{
            productContainer.innerHTML+=`
            <div class="product">
            <h3>${item.name}</h3>
            <div class="product_info">
            <img src="${item.img}">
            <p>${item.sl} x ${item.price} vnđ</p>
            <button class="deleteProduct" onclick="removeProduct(${index})"><i class="fas fa-times-circle"></i></button>
            </div>  
            </div>
            `
        });
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
    document.querySelector('.sumTotal').textContent=total;
    document.querySelector('.totalSum').textContent=total;
}

function removeProduct(i){
    let del = document.querySelectorAll('.deleteProduct');
    let blockProduct= del[i].parentElement.parentElement;
    let nameProduct = blockProduct.querySelector('h3').innerText;
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
    document.querySelector('.sumTotal').textContent=parseInt(summary)-(priceProduct*quantityProduct);
    document.querySelector('.totalSum').textContent=parseInt(summary)-(priceProduct*quantityProduct);
    document.querySelector('.numbers_product').textContent=parseInt(productNumbers)-quantityProduct;
    blockProduct.remove();
    showCart();
}
showCart();
onloadCartNumbers();


