
 function validateRegisterForm(){

    const username = document.getElementById('txtNombre').value;

    if (username.length < 3){
        alert("El nombre debe tener al menos 3 caracteres");
        return false;
    }

    const password = document.getElementById('txtPassword').value;
    const repetirPassword = document.getElementById('txtRepetirPassword').value;
 

    if (password.length < 3){
        alert("Debe ingresar la contraseña. Debe tener al menos 3 caracteres");
        return false;
    }

    if (password !== repetirPassword){
        alert("Las contraseñas no coinciden");
        return false;
    }

    const email = document.getElementById('txtEmail').value;

    if (email.length < 3){
        alert("El email debe tener al menos 3 caracteres");
        return false;
    }

    const alias = document.getElementById('txtAlias').value;

    if (alias.length < 3){
        alert("El alias debe tener al menos 3 caracteres");
        return false;
    }

    const edad = document.getElementById('txtEdad').value;

    if (edad.length < 1){
        alert("Debe ingresar la edad");
        return false;
    }

    const direccion = document.getElementById('txtDireccion').value;

    if (direccion.length < 3){
        alert("Debe ingresar la dirección");
        return false;
    }

    const telefono = document.getElementById('txtTelefono').value;
    
    if (telefono.length < 3){
        alert("Debe ingresar el teléfono");
        return false;
    }
    


    return true;

 }
 
 
 let register_form = document.getElementById('register_form');

  register_form.addEventListener('submit', async (e) => {
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


        if (validateRegisterForm()){

            let response = null
            try{
                response = await fetch('/api/users/register', {
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

                    const access_token = data.access_token;
                    window.sessionStorage.setItem("access_token", access_token);
                    console.log("access_token", access_token);
                    
                    console.log("data", data);

                    if (data.statusCode === 401){
                        window.location.href = '/registerfail.html'

                    }else{
                        window.location.href = '/';
                    }


                    /*
                    if (data.status === 'ok') {
                        window.location.href = '/';
                    }
                    else {
                        alert(data.body.error);
                    }*/
                }

            }catch(err){
                console.log(err);
                window.location.href = '/registerfail.html'
            }
        }
        
    }
    );
