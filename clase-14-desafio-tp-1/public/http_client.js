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

  async function performDelete(url = '') {
    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'is_admin': is_admin()
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: null
    });
    return response.json();
  }