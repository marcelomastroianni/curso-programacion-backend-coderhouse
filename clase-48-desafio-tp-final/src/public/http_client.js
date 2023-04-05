async function performCreate(url = '', data = {}) {
  const access_token = window.sessionStorage.getItem("access_token");

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+access_token

      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data) 
    });
    return response.json();
  }


  async function performUpdate(url = '', data = {}) {
    const access_token = window.sessionStorage.getItem("access_token");

    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+access_token
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data) 
    });
    return response.json();
  }


  async function performDelete(url = '') {
    const access_token = window.sessionStorage.getItem("access_token");

    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+access_token
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: null
    });
    return response.json();
  }

  async function performGet(url = '') {
    const access_token = window.sessionStorage.getItem("access_token");

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+access_token
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: null
    });
    return response.json();
  }