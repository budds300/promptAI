"use client"
import {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter, useSearchParams} from 'next/navigation'; // Import Router instead of useRouter
import Form from '@components/Form';
import axios from 'axios';

const EditPrompt = () => {
    const [submitting,
        setSubmitting] = useState(false);

    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const {push} = useRouter()
    const [post,
        setPost] = useState({prompt: '', tag: ''});

    useEffect(() => {
        const getPromptDetails = async() => {
            const response = await axios.get(`/api/prompt/${promptId}`)

            const data = response.data

            setPost({prompt: data.prompt, tag: data.tag})

        }
        if (promptId) 
            getPromptDetails()
            // return () => {
        
        // };
    }, [promptId]);

    const updatePrompt = async(e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!prompt) 
            return alert('Prompt ID not found')

        try {
            const response = await axios.patch(`/api/prompt/${promptId}`, {
                prompt: post.prompt,

                tag: post.tag
            });

            console.log('Response:', response.data);

            if (response.status === 200) {
                push('/');
            }
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            {console.log(post)}
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}/>
        </div>
    );
};

export default EditPrompt;
