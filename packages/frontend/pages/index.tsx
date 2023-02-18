import { SubmitHandler, useForm } from "react-hook-form";
import { UserDTO } from "@my-shop/dtos";

export function Index() {
    const {register, handleSubmit} = useForm<UserDTO>();
    const signInClick: SubmitHandler<UserDTO> = (data) => {
        fetch(process.env.baseUrl + "/signin", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',   
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),  
        }).then((res)=>{
            if(res.status === 201){
                return res.json();
            }else{
                alert("wrong email or password")
            }
        }).then((data)=>{
            if(data.Authorization){
                document.cookie = "auth=" + data.Authorization
                window.location.href="/main";
            }
        }).catch(()=>{alert("something wrong, try again")});
    }


    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={handleSubmit(signInClick)}>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text" {...register("email")} className="login__input" placeholder="User name / Email"/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password" {...register("password", {required: true, min:8})} className="login__input" placeholder="Password"/>
                        </div>
                        <button className="button login__submit">
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
