import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
    message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuthStore from "../store/authStore.js";
import AuthService from "../service/authService.js";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const SignUpPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const setLoading = useAuthStore((state) => state.setLoading);
    const loading = useAuthStore((state) => state.loading);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await AuthService.register({
                username: values.username,
                password: values.password,
                email: values.email,
                role: values.role,
            });
            message.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center relative"
            style={{
                backgroundImage: "url('/register.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                paddingTop: 100,
            }}
        >
            <div
                className="w-[600px] px-10 py-10 rounded-xl shadow-xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
                }}
            >
                <h2 className="font-bold text-center text-3xl text-white mb-10">Register Account</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        label={<span className="text-white">Username</span>}
                        rules={[
                            { required: true, message: 'Please enter your username!' },
                            { min: 3, max: 50, message: 'Username must be between 3 and 50 characters!' },
                            { whitespace: true, message: 'Username cannot start or end with whitespace!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={<span className="text-white">E-mail</span>}
                        rules={[
                            { type: 'email', message: 'Invalid email!' },
                            { required: true, message: 'Please enter your email!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<span className="text-white">Password</span>}
                        rules={[
                            { required: true, message: 'Please enter your password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label={<span className="text-white">Confirm Password</span>}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label={<span className="text-white">Role</span>}
                        rules={[{ required: true, message: 'Please select a role!' }]}
                        initialValue="USER"
                    >
                        <Select placeholder="Select a role">
                            <Option value="USER">User</Option>
                            <Option value="ADMIN">Admin</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms of use!')),
                            },
                        ]}
                    >
                        <Checkbox className="text-white">
                            I agree to the terms of use of the application
                        </Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default SignUpPage;
