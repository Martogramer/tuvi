import React from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useAuth } from "../context/authContext"

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error(error.message);
        }

    }

    /* if (loading) return <h1>loading</h1> */
    return (
        <>
            <Box px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
                        {/* <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack> */}
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <ColorModeSwitcher justifySelf="flex-end" />
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={4}>
                                <IconButton
                                    size={'md'}
                                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                                    aria-label={'Open Menu'}
                                    onClick={isOpen ? onClose : onOpen}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Actas</MenuItem>
                                <MenuItem>Cargar acta</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={handleLogout} >Cerrar sesión</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
                {/* {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null} */}
            </Box>
        </>
    );
}