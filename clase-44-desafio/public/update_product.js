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

const queryUpdateProduct = (uuid,name,description,code,price,stock,photo_url) => {
  return `
  mutation{
    updateProduct(uuid: "${uuid}", name: "${name}",description: "${description}",code: "${code}",price: ${price},stock: ${stock},photo_url: "${photo_url}"){
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


      const get_product_uuid = () => {
        const params = new URLSearchParams(window.location.search);
        let product_uuid = '-';
        for (const param of params) {
          if (param[0] == 'product_uuid') {
            product_uuid = param[1];
          }
        }
        return product_uuid;
      }


      const bindProductForm = (prdoduct_uuid) => {
        let productForm = document.getElementById('product_form');

        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
    
              let name = document.forms["product_form"]["name"].value;
              let description = document.forms["product_form"]["description"].value;
              let code = document.forms["product_form"]["code"].value;
              let price = document.forms["product_form"]["price"].value;
              let stock = document.forms["product_form"]["stock"].value;
              let photo_url = document.forms["product_form"]["photo_url"].value;
    

              executeGraphqlQuery(queryUpdateProduct(prdoduct_uuid,name,description,code,price,stock,photo_url), (data) => {
                window.location.href = `/index.html`;
              });

            }
          });
      }

      const showProductForm = (product) => {
        fetch('/product_form.hbs')
        .then(response => response.text())
        .then(templateStr => {
          const template = Handlebars.compile(templateStr); // compila la plantilla
          const html = template({product}); // genera el html
          document.getElementById("divUpdateProduct").innerHTML = html; // inyecta el html
          bindProductForm(product.uuid);
        });
      }

      const getProductInfo = (uuid) => {
          performGet(`http://localhost:8080/api/productos/${uuid}`)
          .then((data) => {
            console.log(data);
            showProductForm(data);
          });
      }
            


      if(is_admin()){
        getProductInfo(get_product_uuid());
      }


  

     