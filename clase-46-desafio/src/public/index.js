
      const deleteProduct = (uuid) => {
        performDelete(`http://localhost:8080/api/productos/${uuid}`)
        .then((data) => {
            console.log(data);
            showProductList(is_admin());
         });
       }

      const showProductList = (is_admin) => {
        fetch('/api/productos')
        .then(response => response.json())
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
      window.sessionStorage.setItem("is_admin","true" );//data.is_admin);


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

     