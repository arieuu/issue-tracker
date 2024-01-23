"use client";
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from "zod";
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

// Creating a type/interface from our schema using zod

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
    const router = useRouter();
    const [error, setError] = useState("");
    const [ isSubmiting, setSubmiting ] = useState(false);
    
    
    // Function to handle form submission

    const onSubmit = handleSubmit(async(data) => {

        // Send the data to the api on post submit then redirect user to issues page

        try {
            setSubmiting(true);
            await axios.post("/api/issues", data) 
            router.push("/issues");

        } catch(error) {
            setSubmiting(false);
            setError("An unexpected error ocurred");
        }

    });

    return (
        
        <div className='max-w-xl'>        
            { error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text> { error } </Callout.Text> 
                </Callout.Root>}

            <form className=' space-y-3' onSubmit={onSubmit}>

                <TextField.Root>
                    <TextField.Input placeholder='Issue title' { ...register("title")}/>
                </TextField.Root>

                <ErrorMessage> {errors.title?.message } </ErrorMessage>

                <Controller 
                    name='description'
                    control={control}
                    render={ ({field}) => <SimpleMDE placeholder='Issue description' {...field}/> } />

                <ErrorMessage> { errors.description?.message } </ErrorMessage>
                

                <Button disabled={ isSubmiting }> Submit new Issue { isSubmiting && <Spinner />} </Button>
            </form>
        </div>
    )
}

export default NewIssuePage