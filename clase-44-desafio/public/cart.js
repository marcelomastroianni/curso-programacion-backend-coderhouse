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

const queryGetProductsFromCart = (cartUuid) => {
  return `
  query{
    productsFromCart(uuid: "${cartUuid}"){
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


      const showCart = (cartUuid) => {
        console.log("cartUuid:", cartUuid);


        const query = queryGetProductsFromCart(cartUuid);

        executeGraphqlQuery(query, (data) => {
          console.log(data);

          fetch('/cart.hbs')
          .then(response => response.text())
          .then(templateStr => {
          const template = Handlebars.compile(templateStr); // compila la plantilla
          const html = template({products:data.productsFromCart}); // genera el html
          document.getElementById("divCart").innerHTML = html; // inyecta el html
          });

          
        });





        /*
        fetch(`/api/carrito/${cartUuid}/productos`)
        .then(response => response.json())
        .then(products => {
            // fetch template from server
            fetch('/cart.hbs')
                .then(response => response.text())
                .then(templateStr => {
                const template = Handlebars.compile(templateStr); // compila la plantilla
                const html = template({products}); // genera el html
                document.getElementById("divCart").innerHTML = html; // inyecta el html
                });
        });  */   
        
      }

      const deleteProductFromCart = (productUuid) => {
        const cartUuid = get_cart_uuid();


        const queryDeleteProductFromCart = `
        mutation{
          deleteProductFromCart(uuid: "${cartUuid}", product_uuid: "${productUuid}"){
            uuid
            timestamp
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
        }
        `;
        executeGraphqlQuery(queryDeleteProductFromCart, (data) => {
          showCart(cartUuid);
        });

      }

      const deleteCart = () => {
        const cartUuid = get_cart_uuid();


        const queryDeleteCart = `
        mutation{
          deleteCart(uuid: "${cartUuid}")
        }
        `;

        executeGraphqlQuery(queryDeleteCart, (data) => {
          
          window.location.href = `/index.html`;
        });




        /*
        performDelete(`/api/carrito/${cartUuid}`)
        .then((data) => {
            window.location.href = `/index.html`;
        });
        */
    }


    const volverAListadoProductos = () => {
        window.location.href = `/index.html?cart_uuid=${get_cart_uuid()}`;
    }


    showCart(get_cart_uuid());

      
      
      

  

     