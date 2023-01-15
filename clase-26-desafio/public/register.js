

  let login_form = document.getElementById('login_form');

    login_form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('txtNombre').value;
        const password = document.getElementById('txtPassword').value;


        const response = await fetch('/api/users/register', {
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
