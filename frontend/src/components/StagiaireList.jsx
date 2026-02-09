import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StagiaireList() {
    const [stagiaires, setStagiaires] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    useEffect(() => {
        const fetchStagiaires = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/stagiaires');
                setStagiaires(response.data);
            } catch (error) {
                console.error("Erreur:", error);
            }
        };
        fetchStagiaires();
    }, []);

    const deleteStagiaire = async (id) => {
        if(window.confirm("tu es sûr de vouloir supprimer ce stagiaire?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/stagiaires/${id}`);
                setStagiaires(stagiaires.filter(stagiaire => stagiaire.id !== id));
            } catch (error) {
                console.error("Erreur de suppression:", error);
            }
        }
    };

    const filteredStagiaires = stagiaires.filter(stagiaire => 
        stagiaire.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stagiaire.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stagiaire.filiere.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className="mb-4 text-center">Liste des Stagiaires</h2>

            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="rechercher par nom, prénom ou filière..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped shadow">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Filière</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStagiaires.length > 0 ? (
                            filteredStagiaires.map((stagiaire) => (
                                <tr key={stagiaire.id}>
                                    <td>{stagiaire.id}</td>
                                    <td>{stagiaire.nom}</td>
                                    <td>{stagiaire.prenom}</td>
                                    <td>{stagiaire.filiere}</td>
                                    <td>
                                        <Link to={`/edit/${stagiaire.id}`} className="btn btn-warning btn-sm me-2">
                                            Modifier
                                        </Link>
                                        <button 
                                            onClick={() => deleteStagiaire(stagiaire.id)} 
                                            className="btn btn-danger btn-sm"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-3 text-muted">
                                    Aucun stagiaire trouvé pour "{searchTerm}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StagiaireList;