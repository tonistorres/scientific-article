import axios from 'axios';

const API = axios.create({ baseURL: 'https://core.ac.uk:443/api-v2/search' });

export const getWorks = async endpoint => {
	const data = await API.get(endpoint).then(response => response.data.data);
	return data;
};

export const getTitle = async endpoint => {
	const data = await API.get(endpoint).then(response => response.data.data);
	console.log('service:',data);
	return data;
};
