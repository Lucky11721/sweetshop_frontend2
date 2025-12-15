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
            {/* Styles for Fonts and Responsiveness */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap');
                
                ::placeholder {
                    color: #a89f91;
                    opacity: 0.8;
                }

                /* Responsive Logic */
                @media (max-width: 768px) {
                    .login-card {
                        flex-direction: column !important;
                        max-width: 400px !important;
                    }
                    .welcome-side {
                        padding: 40px 30px !important;
                        text-align: center;
                    }
                    .form-side {
                        padding: 40px 30px !important;
                    }
                }
                `}
            </style>

            <div className="login-card" style={styles.cardContainer}>
                
                {/* LEFT SIDE: Impressive Welcome Section */}
                <div className="welcome-side" style={styles.welcomeSection}>
                    <div style={styles.brandOverlay}>
                        <h1 style={styles.welcomeTitle}>Welcome Back.</h1>
                        <p style={styles.welcomeSubtitle}>
                            Your curated selection of artisanal treats awaits. 
                        </p>
                        <div style={styles.separator}></div>
                        <p style={styles.welcomeText}>
                            Reconnect with the flavors you love. From our signature velvet cakes to hand-rolled truffles, every bite is crafted to perfection just for you.
                        </p>
                        
                        <div style={styles.featureRow}>
                            <span style={styles.featureBadge}>✨ Handcrafted Daily</span>
                            <span style={styles.featureBadge}>🌿 Premium Ingredients</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Login Form */}
                <div className="form-side" style={styles.formSection}>
                    <div style={styles.formHeader}>
                        <h2 style={styles.brandTitle}>THE SWEET SPOT</h2>
                        <span style={styles.brandTagline}>FRESHLY BAKED, JUST FOR YOU</span>
                    </div>

                    <h3 style={styles.loginHeading}>Sign In to Your Account</h3>

                    {error && (
                        <div style={styles.errorAlert}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email Address</label>
                            <input 
                                style={styles.input}
                                type="email" 
                                placeholder="name@example.com"
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                required 
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <input 
                                style={styles.input}
                                type="password" 
                                placeholder="••••••••"
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            style={isLoading ? styles.buttonDisabled : styles.button}
                            disabled={isLoading}
                        >
                            {isLoading ? "Authenticating..." : "Sign In"}
                        </button>
                    </form>

                    <div style={styles.footer}>
                        <p style={styles.footerText}>
                            Not a member yet? 
                            <Link to="/register" style={styles.link}> Join the Family</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styling Object
const styles = {
    pageContainer: {
        minHeight: '100vh',
        backgroundColor: '#FAF7F2', // Cream
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Poppins', sans-serif",
        padding: '20px',
    },
    cardContainer: {
        display: 'flex',
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: '1000px', // Wider card for split layout
        minHeight: '600px',
        borderRadius: '24px',
        boxShadow: '0 20px 60px -15px rgba(74, 59, 50, 0.15)',
        overflow: 'hidden',
    },
    
    // --- LEFT SIDE (Welcome) ---
    welcomeSection: {
        flex: '1',
        backgroundColor: '#4A3B32', // Dark Coffee
        color: '#FAF7F2', // Cream text
        padding: '60px 50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        backgroundImage: 'radial-gradient(circle at top right, rgba(212, 163, 115, 0.1) 0%, transparent 60%)',
    },
    welcomeTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '3.5rem',
        fontWeight: '700',
        margin: '0 0 15px 0',
        lineHeight: '1.1',
    },
    welcomeSubtitle: {
        fontSize: '1.1rem',
        opacity: '0.9',
        fontWeight: '300',
        marginBottom: '20px',
    },
    separator: {
        width: '60px',
        height: '2px',
        backgroundColor: '#D4A373', // Gold
        marginBottom: '25px',
    },
    welcomeText: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.2rem',
        fontStyle: 'italic',
        lineHeight: '1.6',
        opacity: '0.8',
        marginBottom: '40px',
    },
    featureRow: {
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
    },
    featureBadge: {
        border: '1px solid rgba(250, 247, 242, 0.2)',
        padding: '8px 16px',
        borderRadius: '50px',
        fontSize: '0.85rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },

    // --- RIGHT SIDE (Form) ---
    formSection: {
        flex: '1',
        padding: '60px 50px',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    formHeader: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    brandTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.5rem',
        color: '#4A3B32',
        letterSpacing: '2px',
        margin: '0',
        fontWeight: '700',
    },
    brandTagline: {
        color: '#D4A373',
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        display: 'block',
        marginTop: '5px',
    },
    loginHeading: {
        fontFamily: "'Poppins', sans-serif",
        color: '#6D4C41',
        fontSize: '1.1rem',
        marginBottom: '25px',
        fontWeight: '500',
        textAlign: 'left',
    },
    errorAlert: {
        backgroundColor: '#FFF5F5',
        color: '#C0392B',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '0.9rem',
        marginBottom: '20px',
        textAlign: 'center',
        border: '1px solid #ffcccc',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#4A3B32',
        letterSpacing: '0.5px',
    },
    input: {
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid #E0E0E0',
        fontSize: '1rem',
        color: '#4A3B32',
        outline: 'none',
        transition: 'all 0.3s',
        backgroundColor: '#FAFAFA',
        fontFamily: "'Poppins', sans-serif",
    },
    button: {
        marginTop: '15px',
        padding: '16px',
        backgroundColor: '#4A3B32',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s',
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: '1px',
        boxShadow: '0 5px 15px rgba(74, 59, 50, 0.2)',
    },
    buttonDisabled: {
        marginTop: '15px',
        padding: '16px',
        backgroundColor: '#9E9E9E',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '50px',
        fontSize: '1rem',
        cursor: 'not-allowed',
    },
    footer: {
        marginTop: '30px',
        textAlign: 'center',
    },
    footerText: {
        color: '#8D6E63',
        fontSize: '0.9rem',
    },
    link: {
        color: '#D4A373',
        fontWeight: '600',
        textDecoration: 'none',
        borderBottom: '1px solid #D4A373',
    }
};

export default Login;