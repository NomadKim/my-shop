import { useRef } from "react";

export function Index() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  function signInClick (event) {
      event.preventDefault();

     fetch(process.env.baseUrl + "/signin", {
         method: "POST",
          headers: {
             "Accept": 'application/json',
             'Content-Type': 'application/json',   
           },
         body: JSON.stringify({
             email: email.current.value,
             password: password.current.value,
         })  
     }).then((res)=>{
      if(res.status === 201){
        return res.json();
      }else{
          alert("wrong email or password")
      }
     })
     .then((data)=>{
      if(data.Authorization){
          // document.cookie = "auth=" + data.Authorization
          // window.location.href="/main";
     }
  })
     .catch(()=>{alert("something wrong")});
  }


  return (
    <div className="container">
    <div className="screen">
        <div className="screen__content">
            <form className="login">
                <div className="login__field">
                    <i className="login__icon fas fa-user"></i>
                    <input type="text" ref={email} className="login__input" placeholder="User name / Email"/>
                </div>
                <div className="login__field">
                    <i className="login__icon fas fa-lock"></i>
                    <input type="password" ref={password} className="login__input" placeholder="Password"/>
                </div>
                <button onClick={signInClick} className="button login__submit">
                    <span className="button__text">Log In Now</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                </button>				
            </form>
        </div>
        <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>		
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
        </div>		
    </div>
</div>
  );
}

export default Index;
