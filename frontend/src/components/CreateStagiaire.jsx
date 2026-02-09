import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateStagiaire() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [filiere, setFiliere] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/stagiaires', {
                nom, prenom, email, filiere
            });
            navigate('/');
        } catch (error) {
            console.error("Erreur:", error);
            alert("error: email doit être unique et tous les champs sont obligatoires.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Ajouter un Stagiaire</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Nom</label>
                    <input type="text" className="form-control" 
                        value={nom} onChange={(e) => setNom(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Prénom</label>
                    <input type="text" className="form-control" 
                        value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" 
                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Filière</label>
                    <input type="text" className="form-control" 
                        value={filiere} onChange={(e) => setFiliere(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </form>
        </div>
    );
}

export default CreateStagiaire;