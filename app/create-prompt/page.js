"use client"
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import Router instead of useRouter
import Form from '@components/Form';
import axios from 'axios';

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const{push}=useRouter()
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post('/api/prompt/new', {
        prompt: post.prompt,
        userId: session?.user.id,
        tag: post.tag,
      });

      console.log('Response:', response.data);

      if (response.status === 200) {
        push('/');
      }
    } catch (error) {
      console.error('Error:', error.message);
    } 
    finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  );
};

export default CreatePrompt;
