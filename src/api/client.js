const API_BASE = import.meta.env.VITE_BACKEND_URL;

export async function fetchWithAuth(endpoint, token) {
  const url = `${API_BASE}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "API request failed");
  }

  return response.json();
}