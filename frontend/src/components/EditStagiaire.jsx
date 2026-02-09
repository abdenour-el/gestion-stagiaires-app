import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditStagiaire() {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [filiere, setFiliere] = useState("");

  useEffect(() => {
    const getStagiaire = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/stagiaires/${id}`);
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setEmail(response.data.email);
        setFiliere(response.data.filiere);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
    getStagiaire();
  }, [id]);

  const updateStagiaire = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/stagiaires/${id}`, {
        nom,
        prenom,
        email,
        filiere
      });
      navigate("/");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour du stagiaire.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-warning text-dark">
            <h4>Modifier le Stagiaire</h4>
        </div>
        <div className="card-body">
            <form onSubmit={updateStagiaire}>
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" 
                        value={nom} onChange={(e) => setNom(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prénom</label>
                    <input type="text" className="form-control" 
                        value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" 
                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Filière</label>
                    <input type="text" className="form-control" 
                        value={filiere} onChange={(e) => setFiliere(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-warning w-100">Mettre à jour</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default EditStagiaire;