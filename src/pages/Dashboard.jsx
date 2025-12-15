import { useEffect, useState, useContext } from "react";
import { getAllSweets, purchaseSweet, deleteSweet, addSweet, restockSweet } from "../api/sweetApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
    
    // --- NEW STATE VARIABLES ---
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [priceFilter, setPriceFilter] = useState("All"); // New Price Filter State
    const [viewMode, setViewMode] = useState("grid");
    
    const [newSweet, setNewSweet] = useState({
        name: "", category: "", price: "", quantity: "", imageUrl: ""
    });
    
    const { role, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        loadSweets();
    }, []);

    // --- UPDATED FILTER LOGIC ---
    useEffect(() => {
        let result = [...sweets];

        // 1. Filter by Category Button
        if (activeCategory !== "All") {
            result = result.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());
        }

        // 2. Filter by Search Text (Name OR Category)
        if (search) {
            const searchLower = search.toLowerCase();
            result = result.filter(s => 
                s.name.toLowerCase().includes(searchLower) || 
                s.category.toLowerCase().includes(searchLower)
            );
        }

        // 3. Filter by Price Range
        if (priceFilter === "Under 50") {
            result = result.filter(s => s.price < 50);
        } else if (priceFilter === "Under 200") {
            result = result.filter(s => s.price < 200);
        } else if (priceFilter === "500+") {
            result = result.filter(s => s.price >= 500);
        }

        setFilteredSweets(result);
    }, [sweets, activeCategory, search, priceFilter]);

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
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
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
        <div className="dashboard-container">
            <header className="bakery-header">
                <div className="content-wrapper header-inner">
                    <div className="brand-section">
                        <h1 className="brand-logo">The Sweet Spot</h1>
                        <span className="brand-tagline">Freshly Baked, Just for You</span>
                    </div>
                    <div className="user-controls">
                        {role === 'ADMIN' && <span className="admin-badge">Admin Mode</span>}
                        <span className="user-welcome">Hello, <b>{user?.username}</b></span>
                        <button className="btn-logout" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </header>

            <div className="content-wrapper">
                
                {role === 'ADMIN' && (
                    <div className="admin-panel">
                        <h3 className="section-title">✨ Add New Delight</h3>
                        <form onSubmit={handleAddSweet} className="add-sweet-form">
                            <div className="form-group"><input type="text" placeholder="Sweet Name" value={newSweet.name} onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })} required /></div>
                            <div className="form-group"><input type="text" placeholder="Category (e.g., Cake)" value={newSweet.category} onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })} required /></div>
                            <div className="form-group"><input type="number" step="0.01" placeholder="Price ($)" value={newSweet.price} onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })} required /></div>
                            <div className="form-group"><input type="number" placeholder="Quantity" value={newSweet.quantity} onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })} required /></div>
                            <div className="form-group"><input type="url" placeholder="Image URL (Optional)" value={newSweet.imageUrl} onChange={(e) => setNewSweet({ ...newSweet, imageUrl: e.target.value })} /></div>
                            <button type="submit" className="btn-submit">+ Add to Menu</button>
                        </form>
                    </div>
                )}

                {/* --- CONTROLS BAR (Updated with Price Filter) --- */}
                <div className="controls-bar">
                    <div className="search-row">
                        <div className="search-wrapper">
                            <input 
                                type="text" 
                                className="search-input" 
                                placeholder="Search by name or category..." 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                            />
                        </div>
                        
                        {/* New Price Filter Dropdown */}
                        <div className="price-filter-wrapper">
                            <select 
                                className="price-select" 
                                value={priceFilter} 
                                onChange={(e) => setPriceFilter(e.target.value)}
                            >
                                <option value="All">All Prices</option>
                                <option value="Under 50">Under $50</option>
                                <option value="Under 200">Under $200</option>
                                <option value="500+">$500+</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="category-nav">
                        {categories.map(cat => (
                            <button key={cat} className={`cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="view-toggles">
                        <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Grid View">▦</button>
                        <button className={`view-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')} title="List View">☰</button>
                    </div>
                </div>

                {viewMode === 'grid' && (
                    <div className="sweets-grid">
                        {filteredSweets.map((sweet) => (
                            <div key={sweet.id} className="sweet-card">
                                <div className="card-img-wrapper">
                                    <img 
                                        src={sweet.imageUrl || getImageForCategory(sweet.category)} 
                                        alt={sweet.name} 
                                        className="card-img"
                                        onError={(e) => {
                                            if (e.target.src !== getImageForCategory(sweet.category)) {
                                                e.target.src = getImageForCategory(sweet.category);
                                            }
                                        }}
                                    />
                                    <span className={`stock-tag ${sweet.quantity < 5 ? 'low' : 'ok'}`}>
                                        {sweet.quantity} Left
                                    </span>
                                </div>
                                <div className="card-info">
                                    <span className="sweet-category">{sweet.category}</span>
                                    <h3 className="sweet-name">{sweet.name}</h3>
                                    <div className="price-row">
                                        <span className="price">${sweet.price.toFixed(2)}</span>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn-buy" disabled={sweet.quantity < 1} onClick={() => handlePurchase(sweet.id, sweet.name)}>
                                            {sweet.quantity < 1 ? 'Sold Out' : 'Order Now'}
                                        </button>
                                        
                                        {role === 'ADMIN' && (
                                            <div className="admin-actions">
                                                <button className="icon-btn" onClick={() => handleRestock(sweet)} title="Restock">📦</button>
                                                <button className="icon-btn" onClick={() => handleDelete(sweet.id, sweet.name)} title="Delete" style={{color: '#D32F2F'}}>🗑️</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {viewMode === 'table' && (
                    <div className="table-wrapper">
                        <table className="elegant-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSweets.map((sweet) => (
                                    <tr key={sweet.id}>
                                        <td style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                                            <img src={sweet.imageUrl || getImageForCategory(sweet.category)} className="mini-img" alt="" />
                                            <strong>{sweet.name}</strong>
                                        </td>
                                        <td>{sweet.category}</td>
                                        <td>${sweet.price.toFixed(2)}</td>
                                        <td style={{color: sweet.quantity < 5 ? 'red' : 'green'}}>{sweet.quantity} units</td>
                                        <td>
                                            <div style={{display: 'flex', gap: '10px'}}>
                                                <button className="btn-buy" style={{padding: '5px 15px', width: 'auto'}} disabled={sweet.quantity < 1} onClick={() => handlePurchase(sweet.id, sweet.name)}>Buy</button>
                                                {role === 'ADMIN' && (
                                                    <>
                                                        <button className="icon-btn" onClick={() => handleRestock(sweet)}>📦</button>
                                                        <button className="icon-btn" onClick={() => handleDelete(sweet.id, sweet.name)} style={{color: '#D32F2F'}}>🗑️</button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {filteredSweets.length === 0 && (
                    <div className="empty-state">
                        <h3>No sweets found</h3>
                        <p>Our shelves are empty for this selection.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;