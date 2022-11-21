
    

      const is_admin = () => {
        const params = new URLSearchParams(window.location.search);
        let is_admin = false;
        for (const param of params) {
          if (param[0] == 'is_admin'&& param[1] == 'true') {
            is_admin = true;
          }
        }
        return is_admin;
      }

      

      const deleteProduct = (id) => {
        performDelete(`http://localhost:8080/api/productos/${id}`)
        .then((data) => {
            console.log(data);
            showProductList(is_admin());
         });
       }


      const bindProductForm = () => {
        let productForm = document.getElementById('product_form');

        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
    
              let title = document.forms["product_form"]["title"].value;
              let price = document.forms["product_form"]["price"].value;
              let thumbnail = document.forms["product_form"]["thumbnail"].value;
    
              postData('/api/productos', { title, price, thumbnail})
              .then((data) => {
                document.forms["product_form"]["title"].value = '';
                document.forms["product_form"]["price"].value = '';
                document.forms["product_form"]["thumbnail"].value = '';
              });
            }
          });
      }

      const showProductForm = () => {
        fetch('/product_form.hbs')
            .then(response => response.text())
            .then(templateStr => {
            const template = Handlebars.compile(templateStr); // compila la plantilla
            const html = template({}); // genera el html
            document.getElementById("divCreateProduct").innerHTML = html; // inyecta el html
            bindProductForm();
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

      if(is_admin()){
        showProductForm();
      }
      showProductList(is_admin());
      

  

     