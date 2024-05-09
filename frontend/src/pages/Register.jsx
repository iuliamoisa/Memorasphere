import Form from "../components/Form"
import "../styles/Register.css"

function Register() {
    return (
    <div className="main-register">
        <Form route="/api/user/register/" method="register" />
    </div>
    );
}

export default Register