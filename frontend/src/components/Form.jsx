import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method: initialMethod }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [method, setMethod] = useState(initialMethod);

    const handleRegisterClick = () => {
        setMethod("register");
        navigate("/register");
    };
    const handleLoginClick = () => {
        setMethod("login");
        navigate("/login");
    };

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setError("");

        try {
            const formData = { username, password };
            if (method === "register") {
                formData.full_name = fullName;
                formData.email = email;
            }

            const res = await api.post(route, formData);
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError("Username or email already exists.");
                } else if (error.response.status === 401) {
                    setError("Incorrect username or password.");
                } else {
                    setError("An error occurred. Please try again.");
                }
            } else {
                setError("An error occurred. Please check your connection and try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            {error && <div className="error-message">{error}</div>}
            <h1 className="form-name">{name}</h1>
            <div className="form-option">
                <label className="form-label">Username</label>
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
            </div>
            {method === "register" && (
                <>
                    <div className="form-option">
                        <label className="form-label">Full name</label>
                        <input
                            className="form-input"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name"
                        />
                    </div>
                    <div className="form-option">
                        <label className="form-label">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                </>
            )}
            <div className="form-option">
                <label className="form-label">Password</label>
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            {loading && <LoadingIndicator />}
            <div className="form-buttons">
                <button className="form-button" type="submit">
                    {name}
                </button>
                {method === "login" && (
                    <button className="form-button" type="button" onClick={handleRegisterClick}>
                        Register
                    </button>
                )}
                {method === "register" && (
                    <button className="form-button" type="button" onClick={handleLoginClick}>
                        Login
                    </button>
                )}
            </div>
        </form>
    );
}

export default Form;
