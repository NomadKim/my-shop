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

async function signInClick (event) {
    event.preventDefault();
    fetch("/products", {
        method: 'get',
        // headers: {
        //     'Content-Type': 'application/json',
        //     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImsxbWZAZGtqa2suY29tIiwicGFzc3dvcmQiOiJzZmFzZGYiLCJpYXQiOjE2NzYyODczODgsImV4cCI6MTY3NzM2NzM4OH0.MzNM4EDgt8wYOHYtXTXG8WROxRwP15b9aI-kKyKzZCE"
        //   },
        mode: "no-cors",
        // body: JSON.stringify({
        //     email: "1mf@dkjkk.com",
        //     password: "sfasdf",
        // })  
    }).then((res)=>{
        console.log(res.body);
        return res.json()})
        .catch((err)=>{
            console.log(err)
        });

}
  
export default SignInLayout;
  