import { Link, useNavigate } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, Space } from 'antd';
import {
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    PlusOutlined,
    SolutionOutlined,
    UserOutlined
} from '@ant-design/icons';
import useAuthStore from "../../store/authStore.js";

const { Header } = Layout;

function Navbar() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const currentUser = useAuthStore((state) => state.currentUser);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const currentUserId = currentUser?.userId;

    const menuItems = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <Link to="/">Home</Link>
        },
        ...(isAuthenticated ? [{
            key: 'my-attempts',
            icon: <SolutionOutlined />,
            label: <Link to={`/my-attempts/${currentUserId || ''}`}>My Attempts</Link>
        }] : [])
    ];

    const dropdownMenuItems = [
        { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', onClick: handleLogout },
    ];

    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 32px',
                background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                height: 64,
                zIndex: 1000,
            }}
        >
            <Link to="/" style={{ fontSize: 24, fontWeight: 600, color: '#fff' }}>
                Quiz App
            </Link>

            <Menu
                theme="dark"
                mode="horizontal"
                items={menuItems}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    background: 'transparent',
                    fontWeight: 500,
                    fontSize: 16
                }}
            />

            <Space>
                {/* Dashboard Button - visible for all users */}
                <Link to="/dashboard">
                    <Button
                        icon={<SolutionOutlined />}
                        style={{
                            backgroundColor: '#fff',
                            color: '#1e3c72',
                            fontWeight: 600,
                            borderRadius: 6,
                            marginRight: 8,
                        }}
                    >
                        Dashboard
                    </Button>
                </Link>
                {isAuthenticated ? (
                    <Dropdown menu={{ items: dropdownMenuItems }} placement="bottomRight">
                        <Space
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                padding: '6px 12px',
                                borderRadius: 6,
                                cursor: 'pointer',
                                color: '#fff',
                            }}
                        >
                            <Avatar
                                icon={<UserOutlined />}
                                style={{ backgroundColor: '#ffd700', color: '#1e3c72' }}
                            />
                            {currentUser?.userName || 'User'}
                        </Space>
                    </Dropdown>
                ) : (
                    <>
<Link to="/about">
    <Button
        icon={<InfoCircleOutlined />}
        style={{
            backgroundColor: '#fff',
            color: '#1e3c72',
            fontWeight: 600,
            borderRadius: 6,
            marginRight: 8,
        }}
    >
        About Us
    </Button>
</Link>
                        <Link to="/login">
                            <Button icon={<LoginOutlined />} style={{
                                backgroundColor: '#ffd700',
                                color: '#1e3c72',
                                fontWeight: 600,
                                borderRadius: 6,
                            }}>
                                Sign In
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button icon={<PlusOutlined />} style={{
                                background: 'transparent',
                                border: '1px solid #ffd700',
                                color: '#fff',
                                borderRadius: 6,
                                fontWeight: 500,
                            }}>
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}
            </Space>
        </Header>
    );
}

export default Navbar;