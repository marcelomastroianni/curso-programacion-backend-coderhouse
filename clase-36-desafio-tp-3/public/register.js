

  let login_form = document.getElementById('login_form');

    login_form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const isAdmin = document.getElementById('chktIsAdmin').checked;
        const username = document.getElementById('txtNombre').value;
        const password = document.getElementById('txtPassword').value;
        const email = document.getElementById('txtEmail').value;
        const alias = document.getElementById('txtAlias').value;
        const edad = document.getElementById('txtEdad').value;
        const direccion = document.getElementById('txtDireccion').value;
        const telefono = document.getElementById('txtTelefono').value;
        const avatar = document.getElementById('txtAvatar').value;


        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ is_admin:isAdmin, username,password,email,alias,edad,address:direccion,phone:telefono,avatar})
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
