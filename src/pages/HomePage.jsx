import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '@mui/material/Button';

export default function HomePage() {
    const [error, setError] = useState("");
    const { currentUser, currentUsername, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        try {
            await logout();
            history.push('/');
        } catch {
            setError("Failed to logout");
        }
    }

    return (
        <div className="HomePage">
            <Link to="/anime">
                <Button variant="outlined">Anime</Button>
            </Link>
            <p></p>
            <Link to="/signin">
                <Button variant="outlined">Login</Button>
            </Link>
            <p>HomePage {error}</p>
            <Button variant="outlined" onClick={handleLogout}>Sign Out</Button>
            <p>{currentUsername && JSON.stringify(currentUsername)}</p>
            <p>{currentUser && JSON.stringify(currentUser)}</p>
        </div>
    )
}
