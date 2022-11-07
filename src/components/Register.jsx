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
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { Alert } from "./Alert";
import { FcGoogle } from 'react-icons/fc'


export default function SimpleCard() {
    const signInWithGoogle=() => {
        signInWithPopup(auth, provider).then(() => {
        })
    }
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const {signup} = useAuth()
    const [error, setError] = useState();
    const navigate = useNavigate();
    const handleSubmit= async (e) => {
        e.preventDefault()
        setError("")
        try {
            await signup( user.email, user.password )
            navigate("/home")
            console.log(user.email, user.password )
        } catch (error){
            setError(error.message)
        }
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>

            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Registrarse</Heading>
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
                            <Input type="email" name="email" onChange={(e)=> setUser({ ...user, email: e.target.value})}  />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name="password" onChange={(e)=> setUser({ ...user, password: e.target.value})}/>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Repetir Password</FormLabel>
                            <Input type="password" name="password" onChange={(e)=> setUser({ ...user, password: e.target.value})}/>
                        </FormControl>
                        <Stack spacing={4}>
                            <Stack
                                mt={4}
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Text fontSize={'lg'} color={'gray.600'}>
                                Ya estas registrado?
                                    👉
                                </Text>
                                <Link href='/login' color={'blue.400'}>Loguearse</Link>
                                <Link color={'blue.400'}></Link>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                type="submit"
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Registrarse
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
                        </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}