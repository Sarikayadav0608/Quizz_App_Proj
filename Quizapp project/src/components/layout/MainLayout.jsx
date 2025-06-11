// src/components/layout/MainLayout.jsx
import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

const { Content, Footer } = Layout;

function MainLayout() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <Content style={{ padding: "16px" }}>
                <Outlet />
            </Content>
            <Footer
                style={{
                    textAlign: "center",
                    background: "linear-gradient(90deg,rgb(0, 0, 0) 0%,rgb(1, 3, 8) 100%)", // dark blue-black gradient
                    color: "#fff",
                    letterSpacing: "1px",
                    fontWeight: 500,
                }}
            >
                Quiz App ©{new Date().getFullYear()} 
            </Footer>
        </Layout>
    );
}

export default MainLayout;