import Form from '../components/Form';
import "../styles/Login.css"
import { Link } from "react-router-dom";

function Login() {
    return (
    <div className="main-login">
      
      <Form route="/api/token/" method="login" />
      {/* <Link to="/about" className="learn-more-button">
          Learn more
      </Link> */}
    </div>
    );
  }

export default Login;