import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function UpdateProfile() {
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);    
        const loginData = {
            email: data.get('email'),
            password: data.get('password'),
            passwordConfirm: data.get('passwordConfirm')
        };

        if (loginData.password !== loginData.passwordConfirm) {
            return setError("Passwords do not match")
        }

        const promises = [];
        setLoading(true);
        setError("");
        setConfirmation("");

        if (loginData.email !== currentUser.email){
            promises.push(updateEmail(loginData.email));
        }
        if (loginData.password){
            promises.push(updatePassword(loginData.password));
        }

        Promise.all(promises)
            .then(() => {
                setConfirmation("Updated Accound Information");
            })
            .catch(() => {
                setError("Failed to update account");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Update Profile
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {confirmation && <Alert severity="success">{confirmation}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                helperText="Leave empty to keep the same password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="passwordConfirm"
                                label="Password Confirmation"
                                type="password"
                                id="passwordConfirm"
                                autoComplete="new-password"
                                helperText="Leave empty to keep the same password"
                            />
                        </Grid>
                        <Button
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset Password
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/" variant="body2">
                                    Cancel
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}