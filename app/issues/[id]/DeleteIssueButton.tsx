"use client";

import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
    issueId: number
}

const DeleteIssueButton = ({ issueId }: Props) => {
    console.log("here")
    const router = useRouter();
    const [ isError, setIsError ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);

    const handleDelete = async () => {
                                
        try {
            setIsDeleting(true);
            await axios.delete("/api/issues/" + issueId);
            router.push("/issues");
            router.refresh();

        } catch(error) {
            setIsDeleting(false);
            setIsError(true);
        }

    }

    return (

        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={ isDeleting }>
                         Delete issue 
                         { isDeleting && <Spinner /> }
                    </Button>
                </AlertDialog.Trigger>

                <AlertDialog.Content>
                    <AlertDialog.Title> Confirm deletion </AlertDialog.Title>
                
                    <AlertDialog.Description>
                        Are you sure you want to delete? This action cannot be undone.
                    </AlertDialog.Description>

                    <Flex mt="4" gap="3">
                        <AlertDialog.Cancel>
                            <Button color='gray' variant='soft'> Cancel </Button>
                        </AlertDialog.Cancel>

                        <AlertDialog.Action>

                            <Button color='red' onClick={ handleDelete } > Delete issue </Button>

                        </AlertDialog.Action>
                    </Flex>

                </AlertDialog.Content>


            </AlertDialog.Root>

            { /** This dialog box will only open if there's an error */}

            <AlertDialog.Root open={isError}>
                <AlertDialog.Content>

                    <AlertDialog.Title> Error </AlertDialog.Title>
                    <AlertDialog.Description> Something went wrong. This issue could not be deleted! </AlertDialog.Description>
                    <Button color='gray' variant='soft' mt="2" onClick={() => setIsError(false)}> OK </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>

        </>

  )
}

export default DeleteIssueButton