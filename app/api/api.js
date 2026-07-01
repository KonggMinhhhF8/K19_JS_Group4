import {
    getAccessToken,
    getNewAccessToken,
    logout,
    isTokenExpired,
} from "./auth.js";

const API_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com";

const get = async (endpoint) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
        logout();
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            if (isTokenExpired(data)) {
                const newAccessToken = await getNewAccessToken();

                if (!newAccessToken) {
                    return null;
                }

                return await get(endpoint);
            }

            return data;
        }

        return data;
    } catch (error) {
        console.error(error);

        return {
            message: "Không thể kết nối tới máy chủ.",
        };
    }
};

const post = async (endpoint, body) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
        logout();
        return null;
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

        const data = await response.json();

        if (!response.ok) {
            if (isTokenExpired(data)) {
                const newAccessToken = await getNewAccessToken();

                if (!newAccessToken) {
                    return null;
                }

                return await post(endpoint, body);
            }

            return data;
        }

        return data;
    } catch (error) {
        console.error(error);

        return {
            message: "Không thể kết nối tới máy chủ.",
        };
    }
};

const put = async (endpoint, id, body) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
        logout();
        return null;
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

        const data = await response.json();

        if (!response.ok) {
            if (isTokenExpired(data)) {
                const newAccessToken = await getNewAccessToken();

                if (!newAccessToken) {
                    return null;
                }

                return await put(endpoint, id, body);
            }

            return data;
        }

        return data;
    } catch (error) {
        console.error(error);

        return {
            message: "Không thể kết nối tới máy chủ.",
        };
    }
};

const patch = async (endpoint, id, body) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
        logout();
        return null;
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

        const data = await response.json();

        if (!response.ok) {
            if (isTokenExpired(data)) {
                const newAccessToken = await getNewAccessToken();

                if (!newAccessToken) {
                    return null;
                }

                return await patch(endpoint, id, body);
            }

            return data;
        }
        return data;
    } catch (error) {
        console.error(error);

        return {
            message: "Không thể kết nối tới máy chủ.",
        };
    }
};

const deleteById = async (endpoint, id) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
        logout();
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            if (isTokenExpired(data)) {
                const newAccessToken = await getNewAccessToken();

                if (!newAccessToken) {
                    return null;
                }

                return await deleteById(endpoint, id);
            }

            return data;
        }

        return data;
    } catch (error) {
        console.error(error);

        return {
            message: "Không thể kết nối tới máy chủ.",
        };
    }
};

export { get, post, put, patch, deleteById };
