import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { view } from "@forge/bridge";
import HomePage from "./Components/DashBoard/HomePage";
import ResourcesPage from "./Components/AnotherPage/ResourcesPage";


function App() {
    const [history, setHistory] = useState(null);

    useEffect(() => {
        view.createHistory().then((newHistory) => {
            setHistory(newHistory);
        });
    }, []);

    const [historyState, setHistoryState] = useState(null);

    useEffect(() => {
        if (!historyState && history) {
            setHistoryState({
                action: history.action,
                location: history.location,
            });
        }
    }, [history, historyState]);

    useEffect(() => {
        if (history) {
            history.listen((location, action) => {
                setHistoryState({
                    action,
                    location,
                });
            });
        }
    }, [history]);

    return (
        <div>
            {history && historyState ? (
                <Router
                    navigator={history}
                    navigationType={historyState.action}
                    location={historyState.location}
                >
                    <Routes>
                        <Route path="/dashboard" element={<HomePage />}></Route>
                        <Route path="/another-page" element={<ResourcesPage />}></Route>
                    </Routes>
                </Router>
            ) : (
                "Loading..."
            )}
        </div>
    );
}

export default App;
