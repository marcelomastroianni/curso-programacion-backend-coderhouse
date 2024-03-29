
 //graphql execute query
 const executeGraphqlQuery = (query,callback) => {
  fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  .then(res => res.json())
  .then(res => {
    callback(res.data);
  });
}


const deleteProduct = (uuid) => {



  const queryDeleteProduct = `
  mutation{
    deleteProduct(uuid: "${uuid}")
  }
  `;

  executeGraphqlQuery(queryDeleteProduct, (data) => {
    console.log(data);
    showProductList(is_admin());
  });

  }

const showProductList = (is_admin) => {


  const queryGetListaProductos = `
  query{
    products{
      uuid
      name
      price
      description
      code
      stock
      photo_url
    }
  }
  `;


  executeGraphqlQuery(queryGetListaProductos, (data) => {

      fetch('/product_list.hbs')
      .then(response => response.text())
      .then(templateStr => {
      const template = Handlebars.compile(templateStr); // compila la plantilla
      //const is_admin = is_admin();
      data.products.map(product => product.is_admin = is_admin);
      const html = template({products:data.products,is_admin}); // genera el html
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

          //Create carg through GraphQL

          const queryCreateCart = `
          mutation{
            createCart{
              uuid
            }
          }
          `;
          executeGraphqlQuery(queryCreateCart, (data) => {
              cartUuid = data.createCart.uuid;
              const queryAddProductToCart = `
              mutation{
                addProductToCart(uuid: "${cartUuid}", product_uuid: "${uuid}"){
                  uuid
                }
              }
              `;
              executeGraphqlQuery(queryAddProductToCart, (data_add_product_response) => {
                console.log(data_add_product_response);
                //showCart(cartId);
              });
          });
        }
        else {

          const queryAddProductToCart = `
          mutation{
            addProductToCart(uuid: "${cartUuid}", product_uuid: "${uuid}"){
              uuid
            }
          }
          `;
          executeGraphqlQuery(queryAddProductToCart, (data_add_product_response) => {
            console.log(data_add_product_response);
            //showCart(cartId);
          });
          
          
        }

      }
    
      /*

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
      */


      const showCart = () => {
        console.log("cartUuid:", cartUuid);
        window.location.href = `/cart.html?cart_uuid=${cartUuid}`;
      }

      
      async function getData(url = '') {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer'
        });
        return response.json();
      }

      
  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
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
    if (data.body.username){
      divWelcomeMessage.style.display = "block";
      txtWelcomeMessage.innerHTML = `Bienvenido ${data.body.username}`;
      console.log("Bienvenido", data);
      //alert(`Bienvenido ${data.body.username}`);
      //alert(`Bienvenido is_admin ${data.body.is_admin}`);

      window.sessionStorage.setItem("username", data.body.username);
      window.sessionStorage.setItem("is_admin", data.body.is_admin);


      let btnLogout = document.getElementById('btnLogout');
      btnLogout.addEventListener('click', function(e) {
        e.preventDefault();
        postData('/api/users/logout', {})
        .then((data_logout) => {
          window.location.href = "/logout.html?username="+data.body.username;
        });
      });

      showProductList(is_admin());


    }else{
      divWelcomeMessage.style.display = "none";
      window.location.href = "/login.html";
    }
  
  });

     