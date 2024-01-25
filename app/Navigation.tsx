"use client";
import React from 'react';
import Link from 'next/link';
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classNames from 'classnames'; // Library to handle dynamic classes/classnames
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const Navigation = () => {
    
    return (
    <nav className='border-b mb-5 px-5 py-3 items-center'>
        <Container>
            <Flex justify="between">
                <Flex align="center" gap="3">
                    <Link href="/"> <AiFillBug /> </Link>
                    <NavLinks /> 
                </Flex>

                <AuthStatus />
            </Flex>
        </Container>
    </nav>
    )
}

// A subcomponent to contain the dropdown menu and separate it from the main login

const AuthStatus = () => {
    
    const { status, data: session } = useSession();

    if(status === "loading") return null;

    if(status === "unauthenticated") return <Link className='nav-link' href="/api/auth/signin"> Log in </Link>

    return(
        <Box>
            <DropdownMenu.Root>
            
                <DropdownMenu.Trigger>
                    <Avatar src={session!.user!.image!} fallback="?" size="2" radius='full' 
                        className='cursor-pointer'
                        referrerPolicy='no-referrer' 
                    /> 
                </DropdownMenu.Trigger>

                
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">
                            { session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>

                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout"> Logout </Link>
                    </DropdownMenu.Item>

                </DropdownMenu.Content>
            </DropdownMenu.Root>

        </Box>
    )
}


const NavLinks = () => {

    const currentPath = usePathname();

    // Put all links in an array so we can style them all at once

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" }
    ]

    return(
        <ul className='flex space-x-6'>

            { links.map((link) => {
                return <li key={link.href}> <Link  href={link.href} className={classNames({
                    "nav-link": true, // render this at all times except when a link is active
                    "!text-zinc-900": link.href === currentPath, // This style (!) overrides the one by "nav-link"
                })}> { link.label } </Link> </li>
            })}

        </ul>
    )
}
export default Navigation