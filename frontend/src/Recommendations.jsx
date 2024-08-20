import React, { useEffect, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

const Recommendations = () =>{
    const [recs, setRecs] = useState([]);
    const [formData, setFormData] = useState({ id: '', name: '', muscles_targeted: '', description: '' });
    const [isEditMode, setIsEditMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() =>{
        fetchRecommendations();
    },[]);

    const fetchRecommendations = () =>{
        fetch('http://localhost:8000/myapp/recommendations/')
            .then(response =>{
                if (!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setRecs(data))
            .catch(error => console.error('Error fetching recommendations:', error));
    };

    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (isEditMode) {
            updateRecommendation(formData);
        } else {
            addRecommendation(formData);
        }
    };

    const addRecommendation = (recommendation) =>{
        fetch('http://localhost:8000/myapp/recommendations/',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recommendation),
        })
            .then(response => {
                if (!response.ok){
                    throw new Error('Failed to add recommendation');
                }
                return response.json();
            })
            .then(() =>{
                fetchRecommendations();
                closeModal();
            })
            .catch(error => console.error('Error adding recommendation:', error));
    };

    const updateRecommendation = (recommendation) =>{
        fetch(`http://localhost:8000/myapp/recommendations/${recommendation.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recommendation),
        })
            .then(response => {
                if (!response.ok){
                    throw new Error('Failed to update recommendation');
                }
                return response.json();
            })
            .then(() =>{
                fetchRecommendations();
                closeModal();
            })
            .catch(error => console.error('Error updating recommendation:', error));
    };

    const deleteRecommendation = (id) =>{
        fetch(`http://localhost:8000/myapp/recommendations/${id}/`,{
            method: 'DELETE',
        })
            .then(response =>{
                if (!response.ok){
                    throw new Error('Failed to delete recommendation');
                }
                fetchRecommendations();
            })
            .catch(error => console.error('Error deleting recommendation:', error));
    };

    const handleEdit = (recommendation) =>{
        setFormData(recommendation);
        setIsEditMode(true);
        openModal();
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () =>{
        setIsOpen(false);
        setFormData({ id: '', name: '', muscles_targeted: '', description: '' });
        setIsEditMode(false);
    };

    return (
        <div>    
        <button onClick={openModal} className="add-button">
        {isEditMode ? 'Edit Recommendation' : 'Add Recommendation'}
    </button>

            <Dialog open={isOpen} onClose={closeModal}>
                <div className="modal-overlay" aria-hidden="true" />
             
                <DialogPanel>
                    <form onSubmit={handleSubmit} className="modal-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="muscles_targeted"
                            placeholder="Muscles Targeted"
                            value={formData.muscles_targeted}
                            onChange={handleInputChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="modal-buttons">
                            <button type="submit">{isEditMode ? 'Update' : 'Add'} Recommendation</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </div>
                    </form>
                </DialogPanel>
            </Dialog>

            <ul>
                {recs.map(recommendation => (
                    <li key={recommendation.id}>
                        <p>Name: {recommendation.name}</p>
                        <p>Muscles Targeted: {recommendation.muscles_targeted}</p>
                        <p>Description: {recommendation.description}</p>
                        <button onClick={() => handleEdit(recommendation)}>Edit</button>
                        <button onClick={() => deleteRecommendation(recommendation.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    
    );
};

export default Recommendations;
