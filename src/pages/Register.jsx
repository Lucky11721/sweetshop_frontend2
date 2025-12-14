import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");
        
        try {
            await register(formData);
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError("Registration failed. Try a different username or email.");
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <style>{keyframes}</style>
            
            {/* Animated Background Elements */}
            <div style={styles.floatingCandy1}>🍩</div>
            <div style={styles.floatingCandy2}>🍫</div>
            <div style={styles.floatingCandy3}>🍪</div>
            <div style={styles.floatingCandy4}>🎂</div>
            <div style={styles.floatingCandy5}>🧁</div>

            <div className="container mt-5">
                <div className="row justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
                    
                    {/* Welcome Section */}
                    <div className="col-md-5 text-white text-center mb-4 mb-md-0" style={styles.welcomeSection}>
                        <div style={styles.animatedTitle}>
                            <h1 style={styles.brandName}>🍭 Join SweetShop</h1>
                            <div style={styles.tagline}>Your Sweet Journey Starts Here!</div>
                        </div>
                        
                        <div style={styles.welcomeContent}>
                            <h3 style={styles.welcomeHeading}>Become a Sweet Member</h3>
                            <p style={styles.welcomeText}>
                                Register now to unlock exclusive access to our delightful collection! 
                            </p>
                            <p style={styles.welcomeSubtext}>
                                🎉 Get special offers, early access to new treats, 
                                and personalized sweet recommendations just for you!
                            </p>
                        </div>

                        <div style={styles.benefits}>
                            <div style={styles.benefitItem}>
                                <span style={styles.benefitIcon}>🎁</span>
                                <span>Welcome Bonus</span>
                            </div>
                            <div style={styles.benefitItem}>
                                <span style={styles.benefitIcon}>⭐</span>
                                <span>VIP Rewards</span>
                            </div>
                            <div style={styles.benefitItem}>
                                <span style={styles.benefitIcon}>🔔</span>
                                <span>Special Alerts</span>
                            </div>
                        </div>
                    </div>

                    {/* Register Form Section */}
                    <div className="col-md-5">
                        <div style={styles.formCard} className="card shadow-lg">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4" style={styles.formTitle}>
                                    Create Account
                                </h2>
                                
                                {error && (
                                    <div className="alert alert-danger" style={styles.errorAlert}>
                                        <strong>❌ Oops!</strong> {error}
                                    </div>
                                )}
                                
                                {success && (
                                    <div className="alert alert-success" style={styles.successAlert}>
                                        <strong>✅ Success!</strong> {success}
                                    </div>
                                )}
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label style={styles.label}>Username</label>
                                        <div style={styles.inputGroup}>
                                            <span style={styles.inputIcon}>👤</span>
                                            <input 
                                                className="form-control" 
                                                style={styles.input}
                                                type="text"
                                                placeholder="Choose a username"
                                                value={formData.username}
                                                onChange={e => setFormData({...formData, username: e.target.value})} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label style={styles.label}>Email Address</label>
                                        <div style={styles.inputGroup}>
                                            <span style={styles.inputIcon}>📧</span>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                style={styles.input}
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={e => setFormData({...formData, email: e.target.value})} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label style={styles.label}>Password</label>
                                        <div style={styles.inputGroup}>
                                            <span style={styles.inputIcon}>🔒</span>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                style={styles.input}
                                                placeholder="Create a strong password"
                                                value={formData.password}
                                                onChange={e => setFormData({...formData, password: e.target.value})} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="btn w-100" 
                                        style={isLoading ? styles.buttonLoading : styles.button}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                Join the Sweet Family 🎉
                                            </>
                                        )}
                                    </button>
                                </form>
                                
                                <div className="text-center mt-4">
                                    <p style={styles.loginText}>
                                        Already a member? 
                                        <Link to="/login" style={styles.loginLink}>
                                            Sign In Here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Keyframe animations
const keyframes = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
    }

    @keyframes floatReverse {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(20px) rotate(-10deg); }
    }

    @keyframes floatSlow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(-5deg); }
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

// Styling
const styles = {
    pageContainer: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #667eea 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    floatingCandy1: {
        position: 'absolute',
        fontSize: '55px',
        top: '8%',
        left: '8%',
        animation: 'float 3.2s ease-in-out infinite',
        opacity: 0.3,
    },
    floatingCandy2: {
        position: 'absolute',
        fontSize: '50px',
        top: '65%',
        right: '12%',
        animation: 'floatReverse 3.8s ease-in-out infinite',
        opacity: 0.3,
    },
    floatingCandy3: {
        position: 'absolute',
        fontSize: '60px',
        bottom: '10%',
        left: '12%',
        animation: 'floatSlow 4s ease-in-out infinite',
        opacity: 0.3,
    },
    floatingCandy4: {
        position: 'absolute',
        fontSize: '48px',
        top: '25%',
        right: '8%',
        animation: 'float 3.5s ease-in-out infinite',
        opacity: 0.3,
    },
    floatingCandy5: {
        position: 'absolute',
        fontSize: '52px',
        bottom: '40%',
        left: '5%',
        animation: 'floatReverse 3.3s ease-in-out infinite',
        opacity: 0.3,
    },
    welcomeSection: {
        animation: 'fadeInUp 0.8s ease-out',
        padding: '30px',
    },
    animatedTitle: {
        animation: 'pulse 2s ease-in-out infinite',
        marginBottom: '30px',
    },
    brandName: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
        marginBottom: '10px',
    },
    tagline: {
        fontSize: '1.2rem',
        fontStyle: 'italic',
        opacity: 0.9,
        letterSpacing: '2px',
    },
    welcomeContent: {
        marginTop: '40px',
        marginBottom: '40px',
    },
    welcomeHeading: {
        fontSize: '2rem',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: '1.1rem',
        marginBottom: '15px',
        lineHeight: '1.6',
    },
    welcomeSubtext: {
        fontSize: '1rem',
        opacity: 0.9,
        lineHeight: '1.6',
    },
    benefits: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '30px',
    },
    benefitItem: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '15px 25px',
        borderRadius: '15px',
        fontSize: '1rem',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        animation: 'slideIn 0.6s ease-out',
    },
    benefitIcon: {
        fontSize: '1.8rem',
    },
    formCard: {
        animation: 'fadeInUp 1s ease-out',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
    },
    formTitle: {
        color: '#f5576c',
        fontWeight: 'bold',
        fontSize: '2rem',
    },
    errorAlert: {
        borderRadius: '10px',
        animation: 'fadeInUp 0.3s ease-out',
        border: 'none',
    },
    successAlert: {
        borderRadius: '10px',
        animation: 'fadeInUp 0.3s ease-out',
        border: 'none',
    },
    label: {
        fontWeight: '600',
        color: '#555',
        marginBottom: '8px',
    },
    inputGroup: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '15px',
        fontSize: '1.2rem',
        zIndex: 1,
    },
    input: {
        paddingLeft: '45px',
        height: '50px',
        borderRadius: '10px',
        border: '2px solid #e0e0e0',
        transition: 'all 0.3s ease',
        fontSize: '1rem',
    },
    button: {
        background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
        border: 'none',
        height: '50px',
        borderRadius: '10px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: 'white',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
    },
    buttonLoading: {
        background: 'linear-gradient(135deg, #f093fb 0%, #d69ab2 100%)',
        border: 'none',
        height: '50px',
        borderRadius: '10px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: 'white',
        cursor: 'not-allowed',
    },
    loginText: {
        color: '#666',
        marginBottom: '0',
    },
    loginLink: {
        color: '#f5576c',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '5px',
        transition: 'color 0.3s ease',
    },
};

export default Register;
