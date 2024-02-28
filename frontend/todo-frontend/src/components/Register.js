import React, { useEffect, useState } from 'react';
import { Box, Container, Center, Paper, TextInput, Button, Text, Anchor, Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import Cookies from 'js-cookie';
import { login, register } from '../api';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const icon = <IconInfoCircle />;

    useEffect(() => {
        document.title = 'Registrarse';
    }, []);
    
    const handleRegister = async () => {
        try {
            if (password !== confirmPassword) {
                setErrorMessage("Las contraseñas no coinciden!");
                setError(true);
                setTimeout(()=>{setError(false)}, 2000);
                return;
            }
            
            const data = {
                name,
                email,
                password,
            };

            await register(data);
            const loginUser = await login({email, password});
            Cookies.set("token", loginUser.token);
            window.location.href = '/mylists';
            
        } catch (error) {
            if(error.response.data.message === "The email already exists") {
                setErrorMessage("El email ya se encuentra registrado");
                setError(true);
                setTimeout(()=>{setError(false)}, 2000);
                return;
            }

            setErrorMessage("Ocurrió un error durante el registro.");
            setError(true);
            setTimeout(()=>{setError(false)}, 2000);
            return;
        }
        // Lógica para registrar al usuario
    };

    return (
        <Box style={{ minHeight: "100vh" }}>
            <Container>
                <Center>
                    <Paper px="2.5vh" py="10" m={"20vh"} w={"30vw"} shadow="xs">
                        <Center>
                            <h2>Registrarse</h2>
                        </Center>
                        <TextInput
                            label="Nombre"
                            placeholder="Ingresa tu nombre"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <TextInput
                            label="Correo electrónico"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextInput
                            label="Contraseña"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <TextInput
                            label="Confirmar contraseña"
                            type="password"
                            placeholder="Confirma tu contraseña"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                        <Center>
                            <Button onClick={handleRegister} style={{ marginTop: '20px' }}>
                                Registrarse
                            </Button>
                        </Center>
                        <Center>
                            <Text>
                                ¿Ya tienes cuenta? <Anchor href='/login' target='_blank'>Inicia sesión aquí.</Anchor>
                            </Text>
                        </Center>
                    </Paper>
                </Center>
                <Center>
                    <Paper my="-10vh">
                        {error &&
                            <Alert variant="filled" color="blue" title="Error" icon={icon}>
                                {errorMessage}
                            </Alert>
                        }
                    </Paper>
                </Center>
            </Container>
        </Box>
    );
};

export default RegisterForm;
