
      const params = new URLSearchParams(window.location.search);
      let is_admin = false;
      for (const param of params) {
        if (param[0] == 'is_admin'&& param[1] == 'true') {
          is_admin = true;
        }
      }

      fetch('/product_form.hbs')
        .then(response => response.text())
        .then(templateStr => {
          const template = Handlebars.compile(templateStr); // compila la plantilla
          const html = template({}); // genera el html
          document.getElementById("divCreateProduct").innerHTML = html; // inyecta el html
        });
        

      fetch('/api/productos')
      .then(response => response.json())
      .then(products => {
          // fetch template from server
          fetch('/product_list.hbs')
            .then(response => response.text())
            .then(templateStr => {
              const template = Handlebars.compile(templateStr); // compila la plantilla
              const html = template({products}); // genera el html
              document.getElementById("lstProductos").innerHTML = html; // inyecta el html
            });
      });

      
      let productForm = document.getElementById('product_form');

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