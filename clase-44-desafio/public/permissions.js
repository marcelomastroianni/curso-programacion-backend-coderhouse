
/*
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
*/

/*
const is_admin = async () => {

  const data = await getData("api/users/profile");

  if (data.body.username){
    return data.body.is_admin;
  }else{
    window.location.href = "/login.html";
  }

  return false;
}
*/


const is_admin =  () => {  
  return (window.sessionStorage.getItem("is_admin")=="true");
}

