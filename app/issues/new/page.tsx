"use client";
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {

    const { register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();
    const [error, setError] = useState("");

    return (
        
        <div className='max-w-xl'>        
            { error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text> { error } </Callout.Text> 
                </Callout.Root>}

            <form className=' space-y-3' onSubmit={handleSubmit(async(data) => {

                // Send the data to the api on post submit then redirect user to issues page

                try {
                    await axios.post("/api/issues", data) 
                    router.push("/issues");
                } catch(error) {
                    setError("An unexpected error ocurred");
                }

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
        </div>
    )
}

export default NewIssuePage