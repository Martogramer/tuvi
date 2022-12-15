import React, { useRef, useState } from 'react'
import { auth, db } from '../../firebase-config'
import { collection, setDoc, doc } from 'firebase/firestore'
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

    async function addingFirstStep() {
        //e.preventDefault()
        console.log('Start function to push doc in firebase')
        try {
            const firstName = FirstNameRef.current.value
            await setDoc( doc(collection(db, 'FomrUserFirstStep'), firstName), {
                FirstName: firstName,
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
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Input type="number" 
                        isRequired={true} 
                        placeholder=' Número de acta ' 
                        ref={FirstNameRef} 
                        color='teal' m={2} 
                        textAlign={['left', 'center']}
                    />
                    <Input type="text" 
                        isRequired 
                        placeholder=' Lugar de infracción ' 
                        ref={SecondNameRef} 
                        color='teal' m={2}
                        textAlign={['left', 'center']}
                    />
                    <Input type="text" 
                        isRequired={true} 
                        placeholder=' Fecha ' 
                        ref={LastNameRef} 
                        color='teal' m={2} 
                        textAlign={['left', 'center']}
                    />
                    <Input type="text" 
                        isRequired={true} 
                        placeholder=' Hora de infracción ' 
                        ref={OldRef} 
                        color='teal' m={2}
                        textAlign={['left', 'center']}
                    />
                    <Input type="text" 
                        isRequired={true} 
                        placeholder=' Dominio' 
                        ref={CountryRef} 
                        color='teal' m={2}
                        textAlign={['left', 'center']}
                    />
                    <Input type="text" 
                        isRequired={true}
                        placeholder=' Tipo de vehículo ' 
                        ref={AddressRef} 
                        color='teal' m={2} 
                        textAlign={['left', 'center']}
                    />
                    <Input type="text" 
                        isRequired={true}
                        placeholder=' Titular del vehículo ' 
                        ref={AddressRef} 
                        color='teal' m={2} 
                        textAlign={['left', 'center']}
                    />
                    <Button
                            rounded={'full'}
                            size={'lg'}
                            fontWeight={'normal'}
                            mt={6}
                            w={60}
                            colorScheme={'red'}
                            bg={'red.400'}
                            _hover={{ bg: 'red.500' }}
                            onClick={() => addingFirstStep()}>
                            Cargar
                        </Button>
                    


                </Box>
            </Stack>
        </Flex>
    )
}

export default FormUserPostulante