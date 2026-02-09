import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import StagiaireList from './components/StagiaireList';
import CreateStagiaire from './components/CreateStagiaire';
import EditStagiaire from './components/EditStagiaire';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-5">
        
        <div className="row justify-content-center">
            
            <div className="col-md-10">
                
                <nav className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white shadow-sm rounded border">
                    <h4 className="m-0 text-primary fw-bold">Gestion Stagiaires</h4>
                    <div>
                        <Link to="/" className="btn btn-outline-primary me-2">Liste</Link>
                        <Link to="/create" className="btn btn-success">Ajouter</Link>
                    </div>
                </nav>

                <div className="card shadow-sm p-4 bg-white">
                    <Routes>
                        <Route path="/" element={<StagiaireList />} />
                        <Route path="/create" element={<CreateStagiaire />} />
                        <Route path="/edit/:id" element={<EditStagiaire />} />
                    </Routes>
                </div>

            </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;