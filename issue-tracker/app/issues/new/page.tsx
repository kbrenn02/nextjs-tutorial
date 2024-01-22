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

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter(); // use a router to point to the database (the MySQL one we made)
    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');

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
                    await axios.post('/api/issues', data);
                    router.push('/issues');
                } catch (error) {
                    setError('An unexpected error occurred.');
                }
                
            })}> 
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')}/>
                </TextField.Root>
                {errors.title && <Text color="red" as="p">{errors.title.message}</Text>} {/* if errors.title is truthy, then the 
                Text container will show, with the text of the error message*/}
                <Controller 
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>}
                />
                {errors.description && <Text color="red" as="p">{errors.description.message}</Text>} {/* the "as='p'" means
                that we want this error to show up as a paragraph element. This helps with how the text is shown */}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage