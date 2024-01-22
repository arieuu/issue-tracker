"use client";
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextField.Input placeholder='Issue title'/>
        </TextField.Root>

        <SimpleMDE placeholder='Issue description'/>

        <Button> Submit new Issue </Button>
    </div>
  )
}

export default NewIssuePage