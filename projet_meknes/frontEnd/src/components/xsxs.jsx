import { useState, useEffect } from "react";
import axios from "axios";

const  FF= () => {
    const [ecoles, setEcoles] = useState([]);
    const [cycles, setCycles] = useState([]);
    const [niveaux, setNiveaux] = useState([]);
    const [specialtes, setSpecialtes] = useState([]);

    const [selectedEcole, setSelectedEcole] = useState(null);
    const [selectedCycle, setSelectedCycle] = useState(null);
    const [selectedNiveau, setSelectedNiveau] = useState(null);

    // Fetch ecoles (assuming you already have an API for fetching ecoles)
    useEffect(() => {
        axios.get("http://localhost:8000/api/ecoles")
            .then(response => setEcoles(response.data))
            .catch(error => console.error("Error fetching ecoles:", error));
    }, []);

    // Fetch cycles when ecole is selected
    const handleEcoleChange = (ecoleId) => {
        setSelectedEcole(ecoleId);
        axios.get(`http://localhost:8000/api/ecole/${ecoleId}/cycles`)
            .then(response => setCycles(response.data))
            .catch(error => console.error("Error fetching cycles:", error));
    };

    // Fetch niveaux when cycle is selected
    const handleCycleChange = (cycleId) => {
        setSelectedCycle(cycleId);
        axios.get(`http://localhost:8000/api/cycle/${cycleId}/niveaux`)
            .then(response => setNiveaux(response.data))
            .catch(error => console.error("Error fetching niveaux:", error));
    };

    // Fetch specialtes when niveau is selected
    const handleNiveauChange = (niveauId) => {
        setSelectedNiveau(niveauId);
        axios.get(`http://localhost:8000/api/niveau/${niveauId}/specialtes`)
            .then(response => setSpecialtes(response.data))
            .catch(error => console.error("Error fetching specialtes:", error));
    };

    return (
        <div>
            {/* Ecole Select */}
            <select onChange={e => handleEcoleChange(e.target.value)}>
                <option value="">Select Ecole</option>
                {ecoles.map(ecole => (
                    <option key={ecole.id_ecole} value={ecole.id_ecole}>
                        {ecole.nom_ecole}
                    </option>
                ))}
            </select>

            {/* Cycle Select */}
            <select onChange={e => handleCycleChange(e.target.value)} disabled={!selectedEcole}>
                <option value="">Select Cycle</option>
                {cycles.map(cycle => (
                    <option key={cycle.id_cycle} value={cycle.id_cycle}>
                        {cycle.libelle}
                    </option>
                ))}
            </select>

            {/* Niveau Select */}
            <select onChange={e => handleNiveauChange(e.target.value)} disabled={!selectedCycle}>
                <option value="">Select Niveau</option>
                {niveaux.map(niveau => (
                    <option key={niveau.id_niveau} value={niveau.id_niveau}>
                        {niveau.libelle}
                    </option>
                ))}
            </select>

            {/* Specialte Select */}
            <select disabled={!selectedNiveau}>
                <option value="">Select Specialte</option>
                {specialtes.map(specialte => (
                    <option key={specialte.id_specialite} value={specialte.id_specialite}>
                        {specialte.libelle}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FF;
