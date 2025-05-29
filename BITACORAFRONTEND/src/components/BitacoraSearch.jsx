import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BitacoraSearch = () => {
    const [bitacoras, setBitacoras] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchBitacoras();
    }, []);

    const fetchBitacoras = async () => {
        try {
            const response = await axios.get('https://bitacoraapp.onrender.com/api/bitacoras');
            setBitacoras(response.data);
        } catch (error) {
            console.error('Error fetching bitacoras:', error);
            setError('Error al cargar las bitácoras');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredBitacoras = bitacoras.filter(bitacora =>
        bitacora.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bitacora.tipoAeronave.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bitacora.matricula.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Bitácoras</h1>
                <button
                    onClick={() => navigate('/newBitacora')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Nueva Bitácora
                </button>
            </div>
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar por folio, tipo de aeronave o matrícula..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Folio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Aeronave</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matrícula</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organismo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBitacoras.map((bitacora) => (
                            <tr key={bitacora._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{bitacora.folio}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{bitacora.tipoAeronave}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{bitacora.matricula}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{bitacora.organismo}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => navigate(`/correccion/${bitacora.folio}`)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                                    >
                                        Corregir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BitacoraSearch; 