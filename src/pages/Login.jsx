import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login({ email, password });
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <style>{keyframes}</style>
            
            {/* Animated Background Elements */}
            <div style={styles.floatingCandy1}>🍬</div>
            <div style={styles.floatingCandy2}>🍭</div>
            <div style={styles.floatingCandy3}>🍰</div>
            <div style={styles.floatingCandy4}>🧁</div>

            <div className="container mt-5">
                <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                    
                    {/* Welcome Section */}
                    <div className="col-md-5 text-white text-center mb-4 mb-md-0" style={styles.welcomeSection}>
                        <div style={styles.animatedTitle}>
                            <h1 style={styles.brandName}>🍭 SweetShop</h1>
                            <div style={styles.tagline}>Where Every Bite is Delight!</div>
                        </div>
                        
                        <div style={styles.welcomeContent}>
                            <h3 style={styles.welcomeHeading}>Welcome Back!</h3>
                            <p style={styles.welcomeText}>
                                Your favorite delicious sweets are waiting for you! 
                            </p>
                            <p style={styles.welcomeSubtext}>
                                Login to explore our mouthwatering collection of candies, 
                                chocolates, and treats that will make your day sweeter! 🍫✨
                            </p>
                        </div>

                        <div style={styles.features}>
                            <div style={styles.featureItem}>🎂 Fresh Daily</div>
                            <div style={styles.featureItem}>🍪 100+ Varieties</div>
                            <div style={styles.featureItem}>🚚 Quick Delivery</div>
                        </div>
                    </div>

                    {/* Login Form Section */}
                    <div className="col-md-5">
                        <div style={styles.formCard} className="card shadow-lg">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4" style={styles.formTitle}>
                                    Sign In
                                </h2>
                                
                                {error && (
                                    <div className="alert alert-danger" style={styles.errorAlert}>
                                        <strong>Oops!</strong> {error}
                                    </div>
                                )}
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label style={styles.label}>Email Address</label>
                                        <div style={styles.inputGroup}>
                                            <span style={styles.inputIcon}>📧</span>
                                            <input 
                                                className="form-control" 
                                                style={styles.input}
                                                type="email" 
                                                placeholder="Enter your email"
                                                value={email} 
                                                onChange={e => setEmail(e.target.value)} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label style={styles.label}>Password</label>
                                        <div style={styles.inputGroup}>
                                            <span style={styles.inputIcon}>🔒</span>
                                            <input 
                                                className="form-control" 
                                                style={styles.input}
                                                type="password" 
                                                placeholder="Enter your password"
                                                value={password} 
                                                onChange={e => setPassword(e.target.value)} 
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
                                                Signing In...
                                            </>
                                        ) : (
                                            <>
                                                Sign In 🍬
                                            </>
                                        )}
                                    </button>
                                </form>
                                
                                <div className="text-center mt-4">
                                    <p style={styles.registerText}>
                                        Don't have an account? 
                                        <Link to="/register" style={styles.registerLink}>
                                            Join the Sweet Family
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

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
    }
`;

// Styling
const styles = {
    pageContainer: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    floatingCandy1: {
        position: 'absolute',
        fontSize: '60px',
        top: '10%',
        left: '10%',
        animation: 'float 3s ease-in-out infinite',
        opacity: 0.3,
    },
    floatingCandy2: {
        position: 'absolute',
        fontSize: '50px',
        top: '60%',
        right: '15%',
        animation: 'floatReverse 4s ease-in-out infinite',
        opacity: 0.3,
    },
    floatingCandy3: {
        position: 'absolute',
        fontSize: '55px',
        bottom: '15%',
        left: '15%',
        animation: 'float 3.5s ease-in-out infinite',
        opacity: 0.3,
    },
    floatingCandy4: {
        position: 'absolute',
        fontSize: '45px',
        top: '30%',
        right: '10%',
        animation: 'floatReverse 3.2s ease-in-out infinite',
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
    features: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '30px',
        flexWrap: 'wrap',
    },
    featureItem: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '12px 20px',
        borderRadius: '25px',
        margin: '5px',
        fontSize: '0.95rem',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)',
    },
    formCard: {
        animation: 'fadeInUp 1s ease-out',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
    },
    formTitle: {
        color: '#667eea',
        fontWeight: 'bold',
        fontSize: '2rem',
    },
    errorAlert: {
        borderRadius: '10px',
        animation: 'fadeInUp 0.3s ease-out',
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        height: '50px',
        borderRadius: '10px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: 'white',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    },
    buttonLoading: {
        background: 'linear-gradient(135deg, #9ca9ea 0%, #9b7bb2 100%)',
        border: 'none',
        height: '50px',
        borderRadius: '10px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: 'white',
        cursor: 'not-allowed',
    },
    registerText: {
        color: '#666',
        marginBottom: '0',
    },
    registerLink: {
        color: '#667eea',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '5px',
        transition: 'color 0.3s ease',
    },
};

export default Login;
