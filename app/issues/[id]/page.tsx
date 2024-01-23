import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';

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
            <p> { issue.title }</p>
            <p> { issue.description }</p>
            <p> { issue.status}</p>
        </>
    )
}

export default IssueDetailPage