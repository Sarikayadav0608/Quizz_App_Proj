// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Layout, message as AntdMessage, Spin } from 'antd';

import useAuthStore from './store/authStore';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

import MainLayout from './components/layout/MainLayout';
import Home from './components/Home';
import AboutUs from './pages/AboutUs';

import QuizList from './pages/quizzes/QuizList';
import QuizDetail from './pages/quizzes/QuizDetail';
import QuizForm from './pages/quizzes/QuizForm';
import QuestionList from './pages/questions/QuestionList';
import QuestionForm from './pages/questions/QuestionForm';
import TakeQuiz from './pages/attempts/TakeQuiz';
import UserAttempts from './pages/attempts/UserAttempts';
import QuizResults from './pages/results/QuizResults';
import NotFound from './pages/common/NotFound';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ResultDetail from './pages/results/ResultsDetail';
import VerifyEmail from './pages/common/VerifyEmail';

const AppRoutes = () => {
    const initializeAuth = useAuthStore((state) => state.initializeAuth);
    const loading = useAuthStore((state) => state.loading);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    if (loading) {
        return (
            <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" tip="Checking authentication..." />
            </Layout>
        );
    }

    return (
        <Routes>
            {/* All pages wrapped with MainLayout (includes Navbar + Footer) */}
            <Route element={<MainLayout />}>
                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/register" element={<SignUpPage />} />
                     <Route path="/about" element={<AboutUs />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                </Route>

                {/* Protected Pages */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<QuizList />} />
                    <Route path="/quizzes" element={<QuizList />} />
                    <Route path="/quizzes/new" element={<QuizForm />} />
                    <Route path="/quizzes/:id" element={<QuizDetail />} />
                    <Route path="/quizzes/:id/edit" element={<QuizForm />} />
                    <Route path="/quizzes/:quizId/questions" element={<QuestionList />} />
                    <Route path="/quizzes/:quizId/questions/new" element={<QuestionForm />} />
                    <Route path="/quizzes/:quizId/questions/:id/edit" element={<QuestionForm />} />
                    <Route path="/take-quiz/:quizId" element={<TakeQuiz />} />
                    <Route path="/my-attempts/:userId" element={<UserAttempts />} />
                    <Route path="/results/:attemptId" element={<ResultDetail />} />
                    <Route path="/results/quiz/:quizId" element={<QuizResults />} />
                </Route>

                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

function App() {
    const [messageApi, contextHolder] = AntdMessage.useMessage();

    return (
        <ConfigProvider>
            {contextHolder}
            <Router>
                <AppRoutes />
            </Router>
        </ConfigProvider>
    );
}

export default App;
