
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from "next-auth";
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

interface Props {
    params: { id: string }
}

const fetchUser = cache((issueId: number) => {
    // We don't need an await here because we're returning the value right away
    return prisma.issue.findUnique({ where: { id: issueId }}) 
})

const IssueDetailPage = async ( { params }: Props) => {

    const session = await getServerSession(authOptions);

    // Get specific issue from database

    const issue = await fetchUser(parseInt(params.id));
    if(!issue) notFound();

    // Return the page for layout
    
    return (
        <Grid columns={{ initial: "1", sm: "5"}} gap="5">
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>

            { /* These buttons will only show if a user is logged in */}

            { session && <Box> 
                <Flex direction="column" gap="4">
                    <AssigneeSelect issue={issue}/>
                    <EditIssueButton issueId={issue.id} />            
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box> }

        </Grid>
    )
}

export default IssueDetailPage


export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id));

    return {
        title: issue?.title,
        description: "Details of issue " + issue?.id
    }
}