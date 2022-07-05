import "../../styles/global.scss";
import "./style.scss";
import background from "../../Assets/background.png";
import GoogleIcon from "../../Assets/googleLogo.png";
import { AuthContext } from "../../Context/Auth";
import { useContext } from "react";

export function Login() {
  const { signInWithGoogle } = useContext(AuthContext);

  return (
    <div id="login-container">
      <img src={background} id="back-ground" alt="svg" />
      <div id="content">
        <h1>Bem Vindo/a!!</h1>
        <p>Plataforma de missões</p>
        <div onClick={signInWithGoogle} id="google-login">
          <img src={GoogleIcon} alt="googleIcon" />
          <h2>Entrar com o Google</h2>
        </div>
      </div>
    </div>
  );
}
