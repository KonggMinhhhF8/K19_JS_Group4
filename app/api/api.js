import { getAccessToken, logout } from "./auth.js";

const API_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com";

const get = async (endpoint) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        logout();
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            logout();
            return;
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const post = async (endpoint, body) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        logout();
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            logout();
            return;
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const deleteById = async (endpoint, id) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        logout();
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            logout();
            return;
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const patch = async (endpoint, id, body) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        logout();
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            logout();
            return;
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const put = async (endpoint, id, body) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        logout();
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            logout();
            return;
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export { get, post, deleteById, patch, put };
