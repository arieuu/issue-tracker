"use client";
import React from 'react';
import Link from 'next/link';
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classNames from 'classnames'; // Library to handle dynamic classes/classnames
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from '@radix-ui/themes';

const Navigation = () => {
    
    const currentPath = usePathname();
    const { status, data: session } = useSession();

    // Put all links in an array so we can style them all at once

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" }
    ]

    return (
    <nav className='border-b mb-5 px-5 py-3 items-center'>
        <Container>
            <Flex justify="between">
                <Flex align="center" gap="3">
                    <Link href="/"> <AiFillBug /> </Link>

                    <ul className='flex space-x-6'>

                        { links.map((link) => {
                            return <li key={link.href}> <Link  href={link.href} className={classNames({
                                "text-zinc-900": link.href === currentPath,
                                "text-zinc-500": link.href !== currentPath,
                                "hover:text-zinc-800 transition-colors": true
                            })}> { link.label } </Link> </li>
                        })}

                    </ul>
                </Flex>
                
                <Box>
                    { status === "authenticated" && <Link href="/api/auth/signout"> Log out </Link>}
                    { status === "unauthenticated" && <Link href="/api/auth/signin"> Log in </Link>}
                </Box>
                
            </Flex>
        </Container>
    </nav>
    )
}

export default Navigation