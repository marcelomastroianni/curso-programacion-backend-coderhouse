
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

      
      showProductList(is_admin());


      


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
        window.location.href = `/cart.html?cart_uuid=${cartUuid}&is_admin=${is_admin()}`;
      }

      
      
      

  

     