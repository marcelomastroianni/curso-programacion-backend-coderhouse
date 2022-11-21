


      const get_cart_id = () => {
        const params = new URLSearchParams(window.location.search);
        let cart_id = 0;
        for (const param of params) {
          if (param[0] == 'cart_id') {
            cart_id = param[1];
          }
        }
        return cart_id;
      }
  


   

      const showCart = (cartId) => {
        console.log("cartId:", cartId);
        
        fetch(`/api/carrito/${cartId}/productos`)
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

      showCart(get_cart_id());

      
      
      

  

     