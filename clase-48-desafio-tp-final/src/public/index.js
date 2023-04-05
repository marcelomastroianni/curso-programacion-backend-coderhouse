
      const deleteProduct = (uuid) => {
        performDelete(`http://localhost:8080/api/productos/${uuid}`)
        .then((data) => {
            console.log(data);
            showProductList(is_admin());
         });
       }

      const showProductList = (is_admin) => {

        getData('/api/productos')
        .then(products => {
            // fetch template from server
            fetch('/product_list.hbs')
                .then(response => response.text())
                .then(templateStr => {
                const template = Handlebars.compile(templateStr); // compila la plantilla
                //const is_admin = is_admin();
                products.map(product => product.is_admin = is_admin);
                const html = template({products,is_admin}); // genera el html
                document.getElementById("lstProductos").innerHTML = html; // inyecta el html
                });
        });     
      }

      
      


      


      const get_cart_uuid = () => {
        const params = new URLSearchParams(window.location.search);
        let cart_uuid = '-';
        for (const param of params) {
          if (param[0] == 'cart_uuid') {
            cart_uuid = param[1];
          }
        }
        return cart_uuid;
      }
  

      let cartUuid = get_cart_uuid();


      const buyProduct = (uuid) => {
        if (cartUuid=='-'){
          performCreate(`/api/carrito`,{})
          .then((data) => {
            cartUuid = data.uuid;
            performCreate(`/api/carrito/${cartUuid}/productos`,{product_uuid:uuid})
            .then((data) => {
              //console.log(data);
              //showCart(cartId);
            });
          });
        }
        else{
          performCreate(`/api/carrito/${cartUuid}/productos`,{product_uuid:uuid})
          .then((data) => {
            //console.log(data);
            //showCart(cartId);
          });
        }
      }


      const showCart = () => {
        console.log("cartUuid:", cartUuid);
        window.location.href = `/cart.html?cart_uuid=${cartUuid}`;
      }

      
      async function getData(url = '') {
        const access_token = window.sessionStorage.getItem("access_token");

        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+access_token
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer'
        });
        return response.json();
      }

      
  async function postData(url = '', data = {}) {
    const access_token = window.sessionStorage.getItem("access_token");

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+access_token
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data) 
    });
    return response.json();
  }
      

  

  //Se consulta el usuario logueado, en caso de no estar logueado se redirecciona al login
  getData("api/users/profile")
  .then((data) => {
    let divWelcomeMessage = document.getElementById('divWelcomeMessage');
    let txtWelcomeMessage = document.getElementById('txtWelcomeMessage');
    if (data.username){
      divWelcomeMessage.style.display = "block";
      txtWelcomeMessage.innerHTML = `Bienvenido ${data.username}`;
      console.log("Bienvenido", data);
      //alert(`Bienvenido ${data.body.username}`);
      //alert(`Bienvenido is_admin ${data.body.is_admin}`);

      window.sessionStorage.setItem("username", data.username);
      if (data.is_admin){
        window.sessionStorage.setItem("is_admin","true" );//data.is_admin);
      }else{
        window.sessionStorage.setItem("is_admin","false" );//data.is_admin);
      }

      let btnLogout = document.getElementById('btnLogout');
      btnLogout.addEventListener('click', function(e) {
        e.preventDefault();
        window.sessionStorage.setItem("access_token", undefined);
        window.location.href = "/logout.html?username="+data.username;
        /*postData('/api/users/logout', {})
        .then((data_logout) => {
          window.location.href = "/logout.html?username="+data.body.username;
        });*/
      });

      showProductList(is_admin());


    }else{
      divWelcomeMessage.style.display = "none";
      window.location.href = "/login.html";

      console.log("data", data);
    }
  
  }).catch((error) => {
    console.log("Error:", error);
    divWelcomeMessage.style.display = "none";
    window.location.href = "/login.html";
  });


  function validateMessageForm() {
    let email = document.forms["message_form"]["email"].value;
    if (!email) {
      alert("Ingrese su email");
      return false;
    }

    let message = document.forms["message_form"]["message"].value;
    if (!message) {
      alert("Ingrese su mensaje");
      return false;
    }
    
    return true;
  }
  
  
  const socket = io('http://localhost:8080');

  let messages = document.getElementById('messages');
  let message_form = document.getElementById('message_form');
  let input = document.getElementById('input');
  let txtEmail = document.getElementById('txtEmail');

  message_form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(validateMessageForm()){
      if (input.value) {
        socket.emit('chat message', {email:txtEmail.value, msg:input.value});
        input.value = '';
      }
    }
  });

  socket.on('all messages', function(lstMessages) {
    fetch('/messageList.hbs')
      .then(response => response.text())
      .then(templateStr => {
        const template = Handlebars.compile(templateStr); // compila la plantilla
        const html = template({messages:lstMessages}); // genera el html
        messages.innerHTML = "";
        messages.innerHTML = html; // inyecta el resultado en la vista
      });
  });