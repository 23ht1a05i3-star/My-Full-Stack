//----------------Products-----------------

const products=[
{id:1,name:"Laptop",category:"Electronics",price:50000},
{id:2,name:"Mouse",category:"Electronics",price:500},
{id:3,name:"Keyboard",category:"Electronics",price:1200},
{id:4,name:"Notebook",category:"Stationery",price:80},
{id:5,name:"Pen",category:"Stationery",price:20},
{id:6,name:"Pencil",category:"Stationery",price:10},
{id:7,name:"Bag",category:"Accessories",price:1500},
{id:8,name:"Watch",category:"Accessories",price:2500},
{id:9,name:"Headphones",category:"Electronics",price:3000},
{id:10,name:"Bottle",category:"Accessories",price:400}
];

let cart=[];
let discount=0;

//----------------Display Products----------------

function displayProducts(list){

let container=document.getElementById("productContainer");

container.innerHTML="";

list.forEach(product=>{

container.innerHTML+=`

<div class="card">

<h3>${product.name}</h3>

<p>ID : ${product.id}</p>

<p>${product.category}</p>

<p>₹${product.price}</p>

<button onclick="addToCart(${product.id})">

Add to Cart

</button>

</div>

`;

});

}

displayProducts(products);

//----------------Search----------------

document.getElementById("search").addEventListener("keyup",filterProducts);

document.getElementById("categoryFilter").addEventListener("change",filterProducts);

function filterProducts(){

let search=document.getElementById("search").value.toLowerCase();

let category=document.getElementById("categoryFilter").value;

let filtered=products.filter(p=>{

let name=p.name.toLowerCase().includes(search);

let cat=(category=="All") || (p.category==category);

return name && cat;

});

displayProducts(filtered);

}

//----------------Cart----------------

function addToCart(id){

let product=products.find(p=>p.id==id);

let existing=cart.find(item=>item.id==id);

if(existing){

existing.qty++;

}
else{

cart.push({...product,qty:1});

}

updateCart();

}

function increase(id){

cart.find(item=>item.id==id).qty++;

updateCart();

}

function decrease(id){

let item=cart.find(i=>i.id==id);

item.qty--;

if(item.qty==0){

remove(id);

}

updateCart();

}

function remove(id){

cart=cart.filter(item=>item.id!=id);

updateCart();

}

function updateCart(){

let body=document.getElementById("cartBody");

body.innerHTML="";

let total=0;

let items=0;

cart.forEach(item=>{

let sub=item.price*item.qty;

total+=sub;

items+=item.qty;

body.innerHTML+=`

<tr>

<td>${item.name}</td>

<td>${item.price}</td>

<td>

<button onclick="decrease(${item.id})">-</button>

${item.qty}

<button onclick="increase(${item.id})">+</button>

</td>

<td>${sub}</td>

<td>

<button onclick="remove(${item.id})">

Remove

</button>

</td>

</tr>

`;

});

document.getElementById("itemCount").innerHTML=items;

document.getElementById("totalPrice").innerHTML=total;

}

//----------------Coupon----------------

function applyCoupon(){

let code=document.getElementById("coupon").value;

if(code=="SAVE10"){

discount=10;

document.getElementById("couponMsg").innerHTML="10% Discount Applied";

}

else if(code=="SAVE20"){

discount=20;

document.getElementById("couponMsg").innerHTML="20% Discount Applied";

}

else{

discount=0;

document.getElementById("couponMsg").innerHTML="Invalid Coupon";

}

}

//----------------Checkout----------------

function checkout(){

if(cart.length==0){

alert("Cart Empty");

return;

}

let customer=document.getElementById("customerName").value;

let subtotal=0;

let productsHTML="";

cart.forEach(item=>{

subtotal+=item.price*item.qty;

productsHTML+=`${item.name} (${item.qty}) - ₹${item.price*item.qty}<br>`;

});

let discountAmount=subtotal*discount/100;

let afterDiscount=subtotal-discountAmount;

let gst=afterDiscount*0.18;

let grand=afterDiscount+gst;

let invoiceNo=Math.floor(Math.random()*100000);

let date=new Date().toLocaleDateString();

document.getElementById("invoice").innerHTML=`

<h2>Invoice</h2>

<p><b>Customer :</b> ${customer}</p>

<p><b>Invoice No :</b> ${invoiceNo}</p>

<p><b>Date :</b> ${date}</p>

<hr>

${productsHTML}

<hr>

<p>Subtotal : ₹${subtotal}</p>

<p>Discount : ₹${discountAmount}</p>

<p>GST (18%) : ₹${gst.toFixed(2)}</p>

<h3>Grand Total : ₹${grand.toFixed(2)}</h3>

`;

alert("Checkout Successful");

cart=[];

discount=0;

updateCart();

document.getElementById("coupon").value="";

document.getElementById("couponMsg").innerHTML="";

}