import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore.js";
import "./signIn.css";

const SignInPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);

    const onFinish = async (values) => {
        try {
            await login(values);
            message.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Login failed. Please check your username and password.";
            message.error(errorMessage);
        }
    };

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center relative"
            style={{
                backgroundImage: "url('/login.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                paddingTop: 100,
            }}
        >
            <div
                className="w-[400px] px-8 py-10 rounded-xl shadow-xl absolute top-1/2 login-fadein"
                style={{
                    left: "40%",
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
                }}
            >
                <h2 className="text-3xl font-bold text-center text-white mb-8">
                    Sign In
                </h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    validateTrigger={["onBlur", "onChange"]} 
                >
                    <Form.Item
                        name="username"
                        label={<span className="text-white">Username</span>}
                        rules={[
                            { required: true, message: "Please enter your username!" },
                            { min: 3, message: "Username must be at least 3 characters!" }
                        ]}
                        validateTrigger="onBlur"
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Username"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<span className="text-white">Password</span>}
                        rules={[
                            { required: true, message: "Please enter your password!" },
                            { min: 6, message: "Password must be at least 6 characters!" }
                        ]}
                        validateTrigger="onBlur"
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox className="text-white">Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className="text-center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full"
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center text-white text-sm">
                    Don't have an account?{" "}
                    <a className="font-semibold text-blue-200" href="/register">
                        Register now!
                    </a>
                </div>
                
            </div>
        </div>
    );
};

export default SignInPage;
