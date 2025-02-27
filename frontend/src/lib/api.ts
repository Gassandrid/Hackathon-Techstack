// API client for interacting with our backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Register a new user
 */
export async function registerUser(name: string, email: string) {
	try {
		const response = await fetch(`${API_URL}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email })
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || 'Failed to register user');
		}

		return data;
	} catch (error) {
		console.error('Registration error:', error);
		throw error;
	}
}
