export function SignInLayout(props) {
    return (
      <div className="container">
      <div className="screen">
          <div className="screen__content">
              <form className="login">
                  <div className="login__field">
                      <i className="login__icon fas fa-user"></i>
                      <input type="text" className="login__input" placeholder="User name / Email"/>
                  </div>
                  <div className="login__field">
                      <i className="login__icon fas fa-lock"></i>
                      <input type="password" className="login__input" placeholder="Password"/>
                  </div>
                  <button onClick={signInClick} className="button login__submit">
                      <span className="button__text">{props.actions} Now</span>
                      <i className="button__icon fas fa-chevron-right"></i>
                  </button>				
              </form>
              <div className="social-login">
                  {/* <h3>log in via</h3> */}
                  <div className="social-icons">
                      <a href="#" className="social-login__icon fab fa-instagram"></a>
                      <a href="#" className="social-login__icon fab fa-facebook"></a>
                      <a href="#" className="social-login__icon fab fa-twitter"></a>
                  </div>
              </div>
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

function signInClick (event) {
     event.preventDefault();
    fetch(process.env.baseUrl + "/signin", {
        method: "POST",
         headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            // "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFtZkBka2pray5jb20iLCJwYXNzd29yZCI6InNmYXNkZiIsImlhdCI6MTY3NjQ1Mzc2OSwiZXhwIjoxNjc3NTMzNzY5fQ.IKPUWZEAmtSxT0CLqYlmaH_0FfEMHtZpO8doNLIOqKc"

          },
        body: JSON.stringify({
            email: "1mf@dkjkk.com",
            password: "sfasdf",
        })  
    }).then((g)=>{
        const gr = g.json();
        console.log(g.headers.get('Authorization'));
        return gr;
    })
    .then((daata)=>{console.log(daata)});
}
  
export default SignInLayout;
  