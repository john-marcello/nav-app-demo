// hooks/usePlayerData.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import randomNumber from '../utils/randomNumber.js';

 // fetch data source from JSON file via axios request and prevent re-renders
const usePlayerData = () => {
    const [data, setData] = useState({ players: [], isLoading: true, error: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the API
                const response = await axios.get('http://localhost:9292/players');
                // Transform the response data to match the desired structure
                const playersWithScores = response.data.map(player => ({
                    id: player.id,
                    type: player.type,
                    attributes: {
                        display_name: player.display_name,
                        market: player.market,
                        team_name: player.team_name,
                        position: player.position,
                        image_url: player.image_url,
                        score: randomNumber() // Assign a random score here
                    }
                }));
                // Store the transformed data in sessionStorage
                sessionStorage.setItem('playerData', JSON.stringify(playersWithScores));
                // Update the state with the transformed data
                setData({ players: playersWithScores, isLoading: false, error: '' });
            } catch (error) {
                // Handle errors if any occur during data fetching 
                console.error('Error fetching data: ', error);
                setData({ players: [], isLoading: false, error: 'Error fetching data' });
            }
        };
        // Call the fetchData function
        fetchData();
    }, []);

    return data;
};

export default usePlayerData;
