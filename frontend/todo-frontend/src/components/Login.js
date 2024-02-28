import React, { useEffect, useState } from 'react';
import { Container, TextInput, Button, Paper, Center, Alert, Box, Text, Anchor } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { login } from '../api';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  
  const icon = <IconInfoCircle />;

  useEffect(() => {
    document.title = 'Iniciar sesión';
  }, []);

  const handleLogin = async () => {
    try {
        setErrorMessage("");
        const data = {
            email,
            password
        };

        const response = await login(data);

        if (response.token){
            Cookies.set('token', response.token, {
                expires: 7
            });
            window.location.href = "/mylists";
        }

    } catch (error) {
        setErrorMessage(true);
        setTimeout(() => { setErrorMessage(false) }, 2000);
    }
  };

  return (
    <Box style={{minHeight:"100vh"}}>
        <Container>
            <Center>
                <Paper px="2.5vh" py="10" m={"20vh"} w={"30vw"} shadow="xs">
                    <Center>
                        <h2>Iniciar sesión</h2>
                    </Center>
                    <TextInput
                    label="Usuario"
                    placeholder="Ingresa tu usuario"
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
                    <Center>
                        <Button onClick={handleLogin} style={{ marginTop: '20px' }}>
                        Iniciar sesión
                        </Button>
                    </Center>
                    <Center>
                        <Text>
                            ¿No tenes cuenta? <Anchor href='/register' target='_blank'> Registrate acá. </Anchor>
                        </Text>
                    </Center>
                </Paper>
            </Center>
            <Center>
                <Paper my="-10vh">
                {errorMessage && 
                    <Alert variant="filled" color="blue" title="Error" icon={icon}>
                        Los datos no parecen pertenecer a ningún usuario.
                    </Alert>
                }
                </Paper>
            </Center>
        </Container>
    </Box>
  );
};

export default LoginPage;
