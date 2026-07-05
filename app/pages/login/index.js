import { get, post, deleteById, patch } from "/app/api/api.js";
import { login } from "/app/api/auth.js";
import router from "../../plugins/router.js";
// import "../../assets/css/login.css";

const app = document.getElementById("app");

const html = `
    <div class="login-card">
        <div class="logo">
            <h1>ShopAdmin</h1>
            <p>Đăng nhập vào hệ thống quản lý cửa hàng</p>
        </div>

        <form id="loginForm">
            <div class="form-group">
                <label>Email</label>

                <div class="input-group">
                    <i class="fas fa-envelope"></i>

                    <input
                        id="email"
                        type="email"
                        placeholder="Nhập email"
                        required
                    />
                </div>
            </div>

            <div class="form-group">
                <label>Mật khẩu</label>

                <div class="input-group">
                    <i class="fas fa-lock"></i>

                    <input
                        id="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </div>
            </div>

            <div class="remember">
                <label>
                    <input type="checkbox" />
                    Ghi nhớ đăng nhập
                </label>

                <a href="#">Quên mật khẩu?</a>
            </div>

            <button type="submit">Đăng nhập</button>
            <p id="login-error" class="error-message"></p>
        </form>

        <div class="demo-account">
            <h4>Tài khoản demo</h4>

            <p><strong>Email: </strong>bangtx@test.com</p>
            <p><strong>Mật khẩu: </strong>12345678</p>
        </div>
    </div>
`;

const LoginPage = () => {
    app.innerHTML = "";
    const container = document.createElement("div");
    container.classList.add("login-container");
    app.appendChild(container);
    container.innerHTML = html;

    const form = document.getElementById("loginForm");
    const errorElement = document.getElementById("login-error");

    errorElement.textContent = "";

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const response = await login(email, password);

        if (!response) {
            errorElement.textContent = "Không thể kết nối tới máy chủ.";
            return;
        }

        if (response.accessToken) {
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);

            router.navigate("/");
            router.resolve();
            return;
        }

        errorElement.textContent = response.message;
    });
};

export default LoginPage;
