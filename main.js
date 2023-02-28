let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'Create';
let tmp;
//get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
         total.innerHTML = result ;
         total.style.background='#040';
    }else{
    total.innerHTML = '' ;
    total.style.background='#a00d02';
   }
}

//create product
let dataPro;
if(localStorage.product != null){
    dataPro =JSON.parse(localStorage.product);
}else{
dataPro = [];
}

submit.onclick =function(){
    //object
    let newPro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    //count
    if(mood === 'Create'){
        if(newPro.count > 1){
            for(let i=0;i < newPro.count;i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }


    }else{
        dataPro[tmp] = newPro;
        mood = 'Create';
        submit.innerHTML= 'Create';
        count.style.display = 'block';
    }

    localStorage.setItem('product',  JSON.stringify(dataPro));
    clearData();
    showData();

}

//get local storage 
//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
showData();
//read
function showData(){
    let table =''; // i wanna to add dataPro to this var 
    for(let i=0 ; i<dataPro.length ; i++){
        table += ` 
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData( ${i} )" id="update">Update</button></td>
        <td><button onclick="deleteData( ${i} )"  id="delete">Delete</button></td>
    </tr>
    `
    }
    document.getElementById('tbody').innerHTML = table ;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `.
        <button onclick="deleteAll()">Delete all (${dataPro.length})</button> `
    }else{
        btnDelete.innerHTML = '';
    }
}


//delete
function deleteData(i){
    //should take parameter to know index of item i wanna to delete
    dataPro.splice(i,1);// delete item from array  , because array connecting with local storage , should i delete from it also 
    localStorage.product = JSON.stringify(dataPro); //delete from local storage 
    showData();
}

function deleteAll(){
    //we have data on array and local storage 
    localStorage.clear()
    dataPro.splice(0)
    showData();
}

//update
function updateData(i){
    title.value = dataPro[i].title ;
    price.value = dataPro[i].price ;
    taxes.value = dataPro[i].taxes ;
    ads.value = dataPro[i].ads ;
    discount.value = dataPro[i].discount ;
    category.value = dataPro[i].category ;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML= 'Update';
    mood ='Update'
    tmp = i; // this idea is very simple and good 

}
//search
//clean data