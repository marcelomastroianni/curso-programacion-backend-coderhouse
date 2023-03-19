

  let login_form = document.getElementById('login_form');

    login_form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('txtNombre').value;
        const password = document.getElementById('txtPassword').value;


        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username,password })
        });

        if (response.redirected) {
            window.location.href = response.url;
        }else{
            const data = await response.json();
            if (data.status === 'ok') {
                window.location.href = '/';
            }
            else {
                alert(data.body.error);
            }
        }


    }
    );



    //Graphql queries
    const query = `
    query{
      hello
    }
    `;

    const query2 = `
    query{
      products{
        uuid
        title
        price
        thumbnail
      }
    }
    `;

    //graphql execute query
    const executeQuery = (query) => {
      fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      .then(res => res.json())
      .then(res => {
        console.log(res.data);
        alert(res.data.hello);
      });
    }
      


     executeQuery(query);  