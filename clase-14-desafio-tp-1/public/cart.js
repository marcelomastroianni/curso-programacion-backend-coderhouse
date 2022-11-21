


  


   

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

      showCart(2);

      
      
      

  

     