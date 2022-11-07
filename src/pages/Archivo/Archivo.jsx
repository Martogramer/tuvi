import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase-config';
export default function UserProfileEdit() {
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const toast = useToast()

  const nombreRef = useRef()
  const apellidoRef = useRef()
  const edadRef = useRef()
  const ubicacionRef = useRef()

  //Funcion para actualizar perfil
  async function perfilLoad() {
    console.log('started update user profile')
    try {
      setError('')
      const updateRef = await addDoc(collection(db, 'archivo'), {
        name: nombreRef.current.value,
        apellido: apellidoRef.current.value,
        edad: edadRef.current.value,
        ubicacion: ubicacionRef.current.value,
      });
      console.log('Informacion de usuario : ', updateRef.id)
    } catch (error) {
      setError('error in perfil load')
      console.log(error)
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >

        <FormControl id="userName">
          {/* <FormLabel left='-50px' >User Icon</FormLabel> */}
          <Stack direction={['column', 'row']} spacing={6}>
            <Center w="full">
              <Button w="full"  >Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id=" Nombre " isRequired>
          <FormLabel>  Nombre </FormLabel>
          <Input
            ref={nombreRef}
            placeholder=" Nombre "
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="text" isRequired>
          <FormLabel>Apellido</FormLabel>
          <Input
            ref={apellidoRef}
            placeholder="Apellido"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="edad" isRequired>
          <FormLabel>Edad</FormLabel>
          <Input
            ref={edadRef}
            placeholder="Edad"
            _placeholder={{ color: 'gray.500' }}
            type="number"
          />
        </FormControl>
        <FormControl id="Ubicacion" isRequired>
          <FormLabel>Ubicación</FormLabel>
          <Input
            ref={ubicacionRef}
            placeholder="Ubicación"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={() => perfilLoad()}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}