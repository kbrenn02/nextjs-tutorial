'use client';

import { TextField, Button, Callout, Text } from '@radix-ui/themes'; // radix ui has a lot of pre built ui components that we can add
// into our application. Read documentation to see what all I can add using radix ui
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter(); // use a router to point to the database (the MySQL one we made)
    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    return (
        <div className='max-w-xl'>
            {error && ( // if there is an error, then we show a separate element (called a Callout) showing there was an error
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form 
            className='space-y-3' 
            onSubmit={handleSubmit(async (data) => { // this onSubmit funciton is used to post the data to the database the
                // push the user back to the original users page
                try {
                    setSubmitting(true);
                    await axios.post('/api/issues', data);
                    router.push('/issues');
                } catch (error) {
                    setSubmitting(false);
                    setError('An unexpected error occurred.');
                }
                
            })}> 
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')}/>
                </TextField.Root>
                  <ErrorMessage>
                    {errors.title?.message}
                  </ErrorMessage>
                <Controller 
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>}
                />
                  <ErrorMessage> {/* the ? after the description says to show it if that is a parameter that exists - optional */}
                    {errors.description?.message} 
                  </ErrorMessage>
                <Button disabled={isSubmitting}>
                    Submit New Issue {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default NewIssuePage