window.onload = function(){

    fetch('http://127.0.0.1:5000/api/v2/users/menu',{
        method: 'GET',
        mode:'cors',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

                }
    })
    .then(res=>res.json())
    .then(data =>{
        
        let output = '';
        console.log(data)
        data["Food menu"].forEach(res=>{
            output +=` 
                            <div class="column">
                                <img src="./img/baberque.jpeg" alt="Pizza" >
                                    <div class="colum"  class="bg-1">
                                        <h2>${res['name']}</h2>
                                        <p>${res['description']}</p>
                                        <h2>${res['price']}</h2>
                                        <br>
                                        <button class="ORDER"  onClick="food_order('${res['name']}')">ORDER</button>


                                    </div>
                            </div>`
            }) 
        document.getElementById("container").innerHTML = output;
    })
}
    
function food_order(name){

    fetch(`http://127.0.0.1:5000/api/v2/users/orders`,{
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "name": name
           })
    })
    .then(res=> res.json())
    .then(data=>{
        if (window.localStorage.getItem('username') == "username"){
            document.getElementById('username').value = "";


            alert('Order placed sucessfully') 
    }
        else{ 
            alert('Login to place an order')
        
        }

})
}

var logout = document.getElementById('logout')
logout.onclick = function(){
    if (window.localStorage.getItem('username') == ""){
        redirect: window.location.replace("./userindex.html");
            alert('You are not logged in') 

    }

    else{
        localStorage.clear();
        redirect: window.location.replace("./index.html");
         alert('Successfully logged out') 

    }
}





        