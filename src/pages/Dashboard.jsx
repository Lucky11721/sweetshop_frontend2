import { useEffect, useState, useContext } from "react";
import { getAllSweets, purchaseSweet, deleteSweet, addSweet, restockSweet } from "../api/sweetApi";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const getImageForCategory = (category) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("chocolate") || cat.includes("truffle")) return "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80";
    if (cat.includes("cake") || cat.includes("pastry")) return "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80";
    if (cat.includes("indian") || cat.includes("ladoo") || cat.includes("barfi")) return "https://images.unsplash.com/photo-1605197584506-c505224f9c07?w=600&q=80";
    if (cat.includes("cookie") || cat.includes("biscuit")) return "https://images.unsplash.com/photo-1499636138143-bd630f5cf386?w=600&q=80";
    if (cat.includes("donut")) return "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80";
    return "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=600&q=80";
};

const Dashboard = () => {
    const [sweets, setSweets] = useState([]);
    const [filteredSweets, setFilteredSweets] = useState([]);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    
    // Add Sweet Form State
    const [newSweet, setNewSweet] = useState({
        name: "", category: "", price: "", quantity: "", imageUrl: ""
    });
    
    const { role, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        loadSweets();
    }, []);

    useEffect(() => {
        let result = [...sweets];
        if (activeCategory !== "All") {
            result = result.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());
        }
        if (search) {
            result = result.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
        }
        setFilteredSweets(result);
    }, [sweets, activeCategory, search]);

    const loadSweets = async () => {
        try {
            const data = await getAllSweets();
            setSweets(data);
            setFilteredSweets(data);
        } catch (err) {
            console.error("Error loading sweets:", err);
        }
    };

    const handlePurchase = async (id, name) => {
        try {
            await purchaseSweet(id, 1);
            alert(`✨ Purchased ${name} successfully!`);
            loadSweets();
        } catch (error) {
            alert(error.response?.data?.message || "Could not complete purchase");
        }
    };

    const handleRestock = async (sweet) => {
        const addQuantity = prompt(`Current stock for ${sweet.name}: ${sweet.quantity}\nEnter quantity to add:`, "10");
        if (addQuantity && !isNaN(addQuantity) && parseInt(addQuantity) > 0) {
            try {
                await restockSweet(sweet.id, parseInt(addQuantity));
                alert(`✅ Restocked ${sweet.name}! Added ${addQuantity} units.`);
                loadSweets();
            } catch (error) {
                alert("Failed to restock. " + (error.response?.data?.message || "Please try again."));
            }
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
            try {
                await deleteSweet(id);
                loadSweets(); 
            } catch (error) {
                alert("Failed to delete. " + (error.response?.data?.message || "Please try again."));
            }
        }
    };

    const handleAddSweet = async (e) => {
        e.preventDefault();
        try {
            const sweetData = {
                name: newSweet.name,
                category: newSweet.category,
                price: parseFloat(newSweet.price),
                quantity: parseInt(newSweet.quantity),
                imageUrl: newSweet.imageUrl || ""
            };
            await addSweet(sweetData);
            alert(`✅ Added ${newSweet.name} successfully!`);
            setNewSweet({ name: "", category: "", price: "", quantity: "", imageUrl: "" });
            loadSweets();
        } catch (error) {
            alert("Failed to add sweet. " + (error.response?.data?.message || "Check your inputs."));
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            logout();
            navigate('/login');
        }
    };

    const categories = ["All", ...new Set(sweets.map(s => s.category))];

    return (
        <div className="dashboard-wrapper">
            <div className="chocolate-drip-top"></div>
            
            <nav className="navbar-chocolate">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="d-flex align-items-center gap-3">
                            <span className="chocolate-icon">🍫</span>
                            <h1 className="brand-title mb-0">Sweet Inventory</h1>
                        </div>
                        
                        <div className="d-flex align-items-center gap-3">
                            
                            {/* User Badge Section */}
                            <div className="user-menu-container">
                                <div className="user-badge-wrapper" title={`Logged in as ${user?.username}`}>
                                    <div className="user-badge">
                                        {role === 'ADMIN' ? 'A' : 'U'}
                                    </div>
                                    <span className="user-name-nav">{user?.username || 'User'}</span>
                                </div>
                                
                                {/* 🚪 Logout Button beside logo */}
                                <button className="btn-logout" onClick={handleLogout} title="Logout">
                                    🚪
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                {/* Add Sweet Form (Admin Only) */}
                {role === 'ADMIN' && (
                    <div className="golden-form-card">
                        <h5 className="form-title">🍰 Add New Item</h5>
                        <form onSubmit={handleAddSweet}>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <input type="text" className="chocolate-input" placeholder="Sweet Name"
                                        value={newSweet.name} onChange={(e) => setNewSweet({...newSweet, name: e.target.value})} required />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="chocolate-input" placeholder="Category"
                                        value={newSweet.category} onChange={(e) => setNewSweet({...newSweet, category: e.target.value})} required />
                                </div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <input type="number" step="0.01" min="0" className="chocolate-input" placeholder="Price ($)"
                                        value={newSweet.price} onChange={(e) => setNewSweet({...newSweet, price: e.target.value})} required />
                                </div>
                                <div className="col-md-6">
                                    <input type="number" min="0" className="chocolate-input" placeholder="Quantity"
                                        value={newSweet.quantity} onChange={(e) => setNewSweet({...newSweet, quantity: e.target.value})} required />
                                </div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-12">
                                    <input type="url" className="chocolate-input" placeholder="Image URL (optional)"
                                        value={newSweet.imageUrl} onChange={(e) => setNewSweet({...newSweet, imageUrl: e.target.value})} />
                                </div>
                            </div>
                            <button type="submit" className="btn-add-sweet">✨ Add Sweet</button>
                        </form>
                    </div>
                )}

                {/* Search & Filter */}
                <div className="controls-section">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-5">
                            <div className="search-bar">
                                <span className="search-icon">🔍</span>
                                <input type="text" className="search-input" placeholder="Search sweets..." 
                                    value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="category-chips">
                                {categories.map(cat => (
                                    <button key={cat} className={`chip-btn ${activeCategory === cat ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(cat)}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header Row */}
                <div className="inventory-header">
                    <div className="row text-center fw-bold align-items-center">
                        <div className="col-1">#</div>
                        <div className="col-2">Image</div>
                        <div className="col-2">Name</div>
                        <div className="col-2">Category</div>
                        <div className="col-1">Price</div>
                        <div className="col-1">Stock</div>
                        <div className="col-3">Actions</div>
                    </div>
                </div>

                {/* Sweets List */}
                <div className="wooden-shelf-container">
                    {filteredSweets.map((sweet, index) => (
                        <div key={sweet.id} className="shelf-row">
                            <div className="row align-items-center text-center">
                                <div className="col-1">
                                    <span className="item-id">{index + 1}</span>
                                </div>
                                <div className="col-2 d-flex justify-content-center">
                                    <img 
                                        src={sweet.imageUrl || getImageForCategory(sweet.category)} 
                                        alt={sweet.name} 
                                        className="product-img-small"
                                        onError={(e) => { 
                                            if (e.target.src !== getImageForCategory(sweet.category)) {
                                                e.target.src = getImageForCategory(sweet.category);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="col-2">
                                    <span className="product-name-small">{sweet.name}</span>
                                </div>
                                <div className="col-2">
                                    <span className="category-badge">{sweet.category}</span>
                                </div>
                                <div className="col-1">
                                    <span className="price-text">${sweet.price.toFixed(2)}</span>
                                </div>
                                <div className="col-1">
                                    <span className={`stock-badge ${sweet.quantity < 5 ? 'low' : 'ok'}`}>
                                        {sweet.quantity}
                                    </span>
                                </div>
                                <div className="col-3">
                                    <div className="action-buttons">
                                        {role === 'ADMIN' && (
                                            <button className="btn-restock" onClick={() => handleRestock(sweet)} title="Add Stock">
                                                📦 Restock
                                            </button>
                                        )}
                                        <button 
                                            className="btn-purchase" 
                                            disabled={sweet.quantity < 1} 
                                            onClick={() => handlePurchase(sweet.id, sweet.name)}
                                            title="Buy Item">
                                            {sweet.quantity < 1 ? "Sold Out" : "🛒 Buy"}
                                        </button>
                                        {role === 'ADMIN' && (
                                            <button className="btn-delete" onClick={() => handleDelete(sweet.id, sweet.name)} title="Delete">
                                                🗑️
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredSweets.length === 0 && (
                        <div className="empty-state">
                            <h3>🍽️ No sweets found</h3>
                            <p>Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


