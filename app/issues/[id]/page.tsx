import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ( { params }: Props) => {

    // Get specific issue from database

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    
    if(!issue) notFound();

    return (
        <>
            <Heading> { issue.title }</Heading>
            
            <Flex className='space-x-3' my="2">
                <IssueStatusBadge status={ issue.status} />
                <Text> { issue.createdAt.toDateString() } </Text>
            </Flex>


            <Card>
                <p> { issue.description}</p>
            </Card>
        </>
    )
}

export default IssueDetailPage