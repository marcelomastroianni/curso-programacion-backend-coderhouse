


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
            window.location.href = `/index.html?is_admin=${is_admin()}`;
        });
    }


    const volverAListadoProductos = () => {
        window.location.href = `/index.html?is_admin=${is_admin()}&cart_uuid=${get_cart_uuid()}`;
    }


    showCart(get_cart_uuid());

      
      
      

  

     