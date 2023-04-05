


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
        
        performGet(`/api/carrito/${cartUuid}/productos`)
        //fetch(`/api/carrito/${cartUuid}/productos`)
        //.then(response => response.json())
        .then(products => {
            // fetch template from server
            fetch('/cart.hbs')
                .then(response => response.text())
                .then(templateStr => {
                const template = Handlebars.compile(templateStr); // compila la plantilla
                const html = template({products}); // genera el html
                document.getElementById("divCart").innerHTML = html; // inyecta el html
                });
        });     
        
      }

      const deleteProductFromCart = (productUuid) => {
        const cartUuid = get_cart_uuid();
        performDelete(`/api/carrito/${cartUuid}/productos/${productUuid}`)
        .then((data) => {
            showCart(cartUuid);
        });
      }

      const deleteCart = () => {
        const cartUuid = get_cart_uuid();
        performDelete(`/api/carrito/${cartUuid}`)
        .then((data) => {
            window.location.href = `/index.html`;
        });
    }


    const volverAListadoProductos = () => {
        window.location.href = `/index.html?cart_uuid=${get_cart_uuid()}`;
    }


    showCart(get_cart_uuid());

      
      
      

  

     