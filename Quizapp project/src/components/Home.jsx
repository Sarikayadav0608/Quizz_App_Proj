import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <main
            style={{
                minHeight: "100vh",
                backgroundImage: 'url("/quiz.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                color: "#fff",
            }}
        >
            
            <div
                className="container"
                style={{
                    paddingTop: "100px", 
                }}
            >
                <div className="bg-dark bg-opacity-75 p-4 rounded shadow w-75 mx-auto text-center" style={{marginTop:"-25px"}}>
                    <h1 className="fw-bold display-5">Welcome to the Online Quiz App</h1>
                    <p className="lead mt-3 mb-0">
                        Test your knowledge with interactive quizzes and improve your skills!
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Home;
