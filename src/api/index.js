import axios from 'axios';

export const fetchTestData = () => axios.get('./thirty-day-data.json');
