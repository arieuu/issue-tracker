"use client";

import { AlertDialog, Button, Flex } from '@radix-ui/themes'

interface Props {
    issueId: number
}

const DeleteIssueButton = ({ issueId }: Props) => {
  return (

    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button color='red'> Delete issue </Button>
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
                    <Button color='red'> Delete issue </Button>
                </AlertDialog.Action>
            </Flex>

        </AlertDialog.Content>


    </AlertDialog.Root>

  )
}

export default DeleteIssueButton