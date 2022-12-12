import React, { useRef, useState } from 'react'
import { auth, db } from '../../firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
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
    useToast,
    useColorModeValue,
} from '@chakra-ui/react';
import { } from '@chakra-ui/react'



const FormUserPostulante = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const toast = useToast()
    const [loading, setLoading] = useState(false)



    const FirstNameRef = useRef()
    const SecondNameRef = useRef()
    const LastNameRef = useRef()
    const OldRef = useRef()
    const CountryRef = useRef()
    const AddressRef = useRef()

    async function addingFirstStep(e) {
        //e.preventDefault()
        console.log('Start function to push doc in firebase')
        try {
            const docRef = await addDoc(collection(db, 'FomrUserFirstStep'), {
                FirstName: FirstNameRef.current.value,
                SecondName: SecondNameRef.current.value,
                LastName: LastNameRef.current.value,
                Old: OldRef.current.value,
                Country: CountryRef.current.value,
                Address: AddressRef.current.value
            })
            console.log('the first question', FirstNameRef.current.value)
            console.log('the second question', SecondNameRef.current.value)
            console.log('the third question', LastNameRef.current.value)
            console.log('the fourth question', OldRef.current.value)
            console.log('the fifty question', CountryRef.current.value)
            console.log('the sixty question', AddressRef.current.value)

            toast({
                title: 'Acta creada.',
                description: "Tu acta se guardó en la base de datos",
                status: 'success',
                duration: 6000,
                isClosable: true
            })
        } catch (error) {
            setError('Failed to update value')
            console.error(error.message)
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={2} mx={'auto'} minW={'lg'} py={12} px={6}>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Link>
                        <Box my="2" w={'lg'} h={'20px'} border="1px"></Box>
                    </Link>
                    <Link>
                        <Box my="2" w={'lg'} h={'20px'} border="1px"></Box>
                    </Link>
                    <Link>
                        <Box my="2" w={'lg'} h={'20px'} border="1px"></Box>
                    </Link>
                </Box>
            </Stack>
        </Flex>
    )
}

export default FormUserPostulante