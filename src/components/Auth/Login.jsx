import React, { useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc'
import { auth, provider } from '../../firebase-config';
import { signInWithPopup } from 'firebase/auth'
import { useAuth } from '../../Context/authContext'
import { useNavigate } from 'react-router-dom'
import { Alert } from "../Alert";

export default function SimpleCard() {
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            loginWithGoogle(user.email)
            navigate("/home")
            console.log("bienvenido", user.email)
        })
    }
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const { login, loginWithGoogle, resetPassword } = useAuth()
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(user.email, user.password)
            navigate("/home")
            console.log(user.email, user.password)
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!user.email) return setError("Write an email to reset password");
        try {
            await resetPassword(user.email);
            setError('We sent you an email. Check your inbox')
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Loguearse</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Conseguí trabajo creando un <Link color={'blue.400'}>perfil</Link> con nosotros ✌️
                    </Text>
                </Stack>
                {error && <Alert message={error} />}
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit}>
                            <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <Input type="email" name="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                            </FormControl>
                            <Stack spacing={4}>
                                <Stack
                                    mt={4}
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Recuérdame</Checkbox>
                                    <Link onClick={handleResetPassword} color={'blue.400'}>Olvidé mi contraseña</Link>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    type="submit"
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                                <Button
                                    onClick={signInWithGoogle}
                                    bg={'gray.100'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'gray.200',
                                    }}>
                                    <FcGoogle />
                                </Button>
                                <Stack
                                    mt={4}
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'center'}>
                                    <Text fontSize={'lg'} color={'gray.600'}>
                                        Eres nuevo por aquí? 👉
                                    </Text>
                                    <Link href='/register' color={'blue.400'}>Registrarse</Link>
                                </Stack>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}