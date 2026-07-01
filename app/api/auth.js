import router from "../plugins/router.js";

const API_URL = "https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com";

const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        return await response.json();
    } catch (error) {
        console.error("Login failed:", error);
    }
};

const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    router.navigate("/login");
    router.resolve();
};

const getAccessToken = () => localStorage.getItem("accessToken");

const getRefreshToken = () => localStorage.getItem("refreshToken");

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        logout();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken: refreshToken,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            logout();
            return;
        }

        const { accessToken, refreshToken } = data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        return accessToken;
    } catch (error) {
        console.error("Refresh token failed:", error);
        logout();
    }
};

const isAuthenticated = () => {
    return !!getAccessToken();
};

const requireAuth = (callback) => {
    if (!isAuthenticated()) {
        router.navigate("/login");
        return;
    }
    callback();
};

export {
    login,
    logout,
    getAccessToken,
    getRefreshToken,
    refreshAccessToken,
    isAuthenticated,
    requireAuth,
};
