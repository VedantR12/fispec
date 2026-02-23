const API_BASE = import.meta.env.VITE_BACKEND_URL;

export async function fetchWithAuth(endpoint, token) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "API request failed");
  }

  return response.json();
}