import { useEffect, useState } from "react";
// Ensure this import matches your file casing exactly!
import { getAllSweets, addSweet, deleteSweet, restockSweet } from "../api/sweetApi"; 
import { Link } from "react-router-dom";

const SweetManagement = () => {
    const [sweets, setSweets] = useState([]);
    
    // Updated state to include imageUrl
    const [newSweet, setNewSweet] = useState({ 
        name: "", 
        category: "", 
        price: "", 
        quantity: "", 
        imageUrl: "" 
    });

    useEffect(() => {
        loadSweets();
    }, []);

    const loadSweets = async () => {
        try {
            const data = await getAllSweets();
            setSweets(data);
        } catch (err) {
            console.error("Failed to load sweets", err);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            // Prepare payload with correct data types
            const payload = {
                name: newSweet.name,
                category: newSweet.category,
                price: parseFloat(newSweet.price),     // Ensure number
                quantity: parseInt(newSweet.quantity), // Ensure integer
                imageUrl: newSweet.imageUrl            // Send URL string
            };

            await addSweet(payload);
            
            // Reset form
            setNewSweet({ name: "", category: "", price: "", quantity: "", imageUrl: "" });
            loadSweets();
            alert("✅ Sweet added successfully!");
        } catch (err) {
            console.error("Add Error:", err);
            const msg = err.response?.data?.message || err.message;
            alert(`❌ Failed to add sweet: ${msg}`);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this sweet?")) {
            try {
                await deleteSweet(id);
                loadSweets();
            } catch (error) {
                alert("Failed to delete sweet.");
            }
        }
    };

    const handleRestock = async (id) => {
        const qty = prompt("Enter quantity to add:");
        if (qty && !isNaN(qty)) {
            try {
                await restockSweet(id, parseInt(qty));
                loadSweets();
                alert("Stock updated!");
            } catch (error) {
                alert("Restock failed.");
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>⚙️ Inventory Management</h2>
                <Link to="/dashboard" className="btn btn-outline-primary">Back to Shop</Link>
            </div>
            
            {/* Add Form */}
            <div className="card p-4 mb-4 bg-light shadow-sm">
                <h5 className="mb-3">Add New Item</h5>
                <form onSubmit={handleAdd}>
                    <div className="row g-2">
                        {/* Name & Category */}
                        <div className="col-md-6">
                            <input className="form-control" placeholder="Sweet Name" 
                                value={newSweet.name} onChange={e => setNewSweet({...newSweet, name: e.target.value})} required />
                        </div>
                        <div className="col-md-6">
                            <input className="form-control" placeholder="Category (e.g. Chocolate, Cake)" 
                                value={newSweet.category} onChange={e => setNewSweet({...newSweet, category: e.target.value})} required />
                        </div>

                        {/* Price & Quantity */}
                        <div className="col-md-6">
                            <input className="form-control" type="number" step="0.01" placeholder="Price ($)" 
                                value={newSweet.price} onChange={e => setNewSweet({...newSweet, price: e.target.value})} required />
                        </div>
                        <div className="col-md-6">
                            <input className="form-control" type="number" placeholder="Quantity (Stock)" 
                                value={newSweet.quantity} onChange={e => setNewSweet({...newSweet, quantity: e.target.value})} required />
                        </div>

                        {/* Image URL Input */}
                        <div className="col-md-12">
                            <input className="form-control" placeholder="Image URL (e.g., https://example.com/cake.jpg)" 
                                value={newSweet.imageUrl} onChange={e => setNewSweet({...newSweet, imageUrl: e.target.value})} />
                            <small className="text-muted">Paste a link to an image to override the auto-generated one.</small>
                        </div>

                        {/* Submit Button */}
                        <div className="col-md-12 mt-3">
                            <button className="btn btn-success w-100 fw-bold">Add Sweet 🍬</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Inventory Table */}
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Image</th> {/* New Column */}
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sweets.map(s => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>
                                    {s.imageUrl ? (
                                        <img src={s.imageUrl} alt="mini" style={{width: "40px", height: "40px", objectFit: "cover", borderRadius: "5px"}} />
                                    ) : (
                                        <span className="text-muted small">Auto</span>
                                    )}
                                </td>
                                <td>{s.name}</td>
                                <td><span className="badge bg-secondary">{s.category}</span></td>
                                <td>${s.price.toFixed(2)}</td>
                                <td className={s.quantity < 5 ? "text-danger fw-bold" : "text-success"}>{s.quantity}</td>
                                <td>
                                    <button className="btn btn-sm btn-info me-2 text-white" onClick={() => handleRestock(s.id)}>Restock</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SweetManagement;