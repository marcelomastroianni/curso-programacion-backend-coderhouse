
      const deleteProduct = (id) => {
        performDelete(`http://localhost:8080/api/productos/${id}`)
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


      let cartId = -1;

      const buyProduct = (id) => {
        if (cartId==-1){
          performCreate(`/api/carrito`,{})
          .then((data) => {
            cartId = data.id;
            performCreate(`/api/carrito/${cartId}/productos`,{product_id:id})
            .then((data) => {
              //console.log(data);
              //showCart(cartId);
            });
          });
        }
        else{
          performCreate(`/api/carrito/${cartId}/productos`,{product_id:id})
          .then((data) => {
            //console.log(data);
            //showCart(cartId);
          });
        }
      }


      const showCart = () => {
        console.log("cartId:", cartId);

        window.location.href = `/cart.html?cart_id=${cartId}&is_admin=${is_admin()}`;


       
      }

      
      
      

  

     