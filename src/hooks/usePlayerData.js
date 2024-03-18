// hooks/usePlayerData.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import randomNumber from '../utils/randomNumber.js';

 // fetch data source from JSON file via axios request and prevent re-renders
const usePlayerData = () => {
    const [data, setData] = useState({ players: [], isLoading: true, error: '' });

    useEffect(() => {
        const savedData = sessionStorage.getItem('playerData');
        if (savedData) {
            setData({ players: JSON.parse(savedData), isLoading: false, error: '' });
        } else {
            const fetchData = async () => {
                try {
                    const response = await axios.get('../data.json');
                    const playersWithScores = response.data.data.map(player => ({
                        ...player,
                        attributes: {
                            ...player.attributes,
                            score: randomNumber()
                        }
                    }));
                    sessionStorage.setItem('playerData', JSON.stringify(playersWithScores));
                    setData({ players: playersWithScores, isLoading: false, error: '' });
                } catch (error) {
                    console.error('Error fetching data: ', error);
                    setData({ players: [], isLoading: false, error: 'Error fetching data' });
                }
            };
            fetchData();
        }
    }, []);

    return data;
};

export default usePlayerData;
