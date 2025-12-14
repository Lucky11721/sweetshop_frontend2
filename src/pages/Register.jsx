import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            alert("Registration failed. Try a different username or email.");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Register</h2>
            <div className="card shadow p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Username</label>
                        <input className="form-control" onChange={e => setFormData({...formData, username: e.target.value})} required />
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={e => setFormData({...formData, email: e.target.value})} required />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={e => setFormData({...formData, password: e.target.value})} required />
                    </div>
                    <button className="btn btn-success w-100">Sign Up</button>
                </form>
                <div className="mt-3 text-center">
                    <Link to="/login">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;