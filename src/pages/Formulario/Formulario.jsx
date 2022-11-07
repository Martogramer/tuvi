import React, { useRef, useState } from 'react'
import { auth, db } from '../../firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Button, Grid, Input } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'



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
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true
            })
        } catch (error) {
            setError('Failed to update value')
            console.error(error.message)
        }
    }

    return (
        <div>
            <Button w={100} fontSize='3xl' colorScheme='gray' variant='ghost' spacing='6' onClick={() => addingFirstStep()} >
                Save
            </Button>
            <Grid templateColumns='repeat(3, 1fr)' gap={5} >
                <Input type="text" isRequired={true} placeholder=' Fist Name ' ref={FirstNameRef} color='teal' m={2} _placeholder={{
                    color: 'red'
                }}
                    textAlign={['left', 'center']}
                    width={600}
                />
                <Input type="text" isRequired placeholder=' Second Name ' ref={SecondNameRef} color='teal' m={2} _placeholder={{
                    color: 'red'
                }}
                    textAlign={['left', 'center']}
                    width={600}
                />
                <Input type="text" isRequired={true} placeholder=' Last Name ' ref={LastNameRef} color='teal' m={2} _placeholder={{
                    color: 'red'
                }}
                    textAlign={['left', 'center']}
                    width={600} />
                <Input type="text" isRequired={true} placeholder=' How old are you? ' ref={OldRef} color='teal' m={2} _placeholder={{
                    color: 'red'
                }}
                    textAlign={['left', 'center']}
                    width={600} />
                <Input type="text" isRequired={true} placeholder=' Nationality ' ref={CountryRef} color='teal' m={2} _placeholder={{
                    color: 'red'
                }}
                    textAlign={['left', 'center']}
                    width={600} />
                <Input type="text" isRequired={true} placeholder=' What is your address? ' ref={AddressRef} color='teal' m={2} _placeholder={{
                    color: 'red'
                }}
                    textAlign={['left', 'center']}
                    width={600} />
            </Grid>
        </div>
    )
}

export default FormUserPostulante