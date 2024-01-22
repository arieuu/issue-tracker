"use client";
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {

    const { register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();

    return (

        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async(data) => {

            // Send the data to the api on post submit then redirect user to issues page

            await axios.post("/api/issues", data) 
            router.push("/issues");
        })}>

            <TextField.Root>
                <TextField.Input placeholder='Issue title' { ...register("title")}/>
            </TextField.Root>

            <Controller 
                name='description'
                control={control}
                render={ ({field}) => <SimpleMDE placeholder='Issue description' {...field}/> } />
            

            <Button> Submit new Issue </Button>
        </form>
    )
}

export default NewIssuePage