"use client";
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

/**
 * Lazy loading simple mde because it might cause issues since it has client
 * side interactions while being pre-rendered in the server
 */

const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
)

// Creating a type/interface from our schema using zod

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
    issue?: Issue
}

const IssueForm = ({ issue }: Props) => {

    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({ resolver: zodResolver(issueSchema) });
    const router = useRouter();
    const [error, setError] = useState("");
    const [ isSubmiting, setSubmiting ] = useState(false);
    
    
    // Function to handle form submission

    const submitFunction = handleSubmit(async(data) => {

        // Send the data to the api on post submit then redirect user to issues page

        try {
            setSubmiting(true);

            // Logic to decide if we create a new issue or update existing one

            if(issue) {
                await axios.patch("/api/issues/" + issue.id, data);

            } else {
                await axios.post("/api/issues", data) 
            }

            router.push("/issues");
            
            // Refresh the page to show the newly added issue 

            router.refresh()

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

            <form className=' space-y-3' onSubmit={submitFunction}>

                <TextField.Root>
                    <TextField.Input defaultValue={ issue?.title } placeholder='Issue title' { ...register("title")}/>
                </TextField.Root>

                <ErrorMessage> {errors.title?.message } </ErrorMessage>

                <Controller 
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={ ({field}) => <SimpleMDE placeholder='Issue description' {...field}/> } />

                <ErrorMessage> { errors.description?.message } </ErrorMessage>
                

                <Button disabled={ isSubmiting }> { issue ? "Update issue " : "Create issue " } { isSubmiting && <Spinner />} </Button>
            </form>
        </div>
    )
}

export default IssueForm;