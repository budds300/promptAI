"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const MyProfile = () => {
    const { data: session } = useSession()
    const [posts, setPosts] = useState([])
    const router= useRouter()
    
    const handleDelete = async (post) => {
        // Implement your delete logic
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
        if(hasConfirmed){
          try {
            await axios.delete(`/api/prompt/${post.slug}`)
            const filteredPosts = posts.filter((p)=>p._id!==post._id)
            setPosts(filteredPosts)
            
          } catch (error) {
            console.log(error.message);
          }
        }

    }

    const handleEdit = (post) => {
        // Implement your edit logic
        router.push(`/update-prompt?id=${post.slug}`)
    }


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Make sure the component is still mounted
                if (!session) return;

                const response = await axios.get(`/api/users/${session?.user.id}/posts`)
                const data = response.data

                // Check if the component is still mounted before updating the state
                if (session) {
                    setPosts(data)
                    console.log(data);
                }
            } catch (error) {
                // Handle errors more gracefully
                console.error("Error fetching posts:", error.message);
            }
        }

        // Check if the user ID is available before fetching posts
        if (session?.user.id) {
            fetchPosts();
        }
    }, [session]);  // Include session in the dependency array to run the effect when session changes

    return (
        <div>
            {/* Render the Profile component with user information and posts */}
            <Profile
                name="My"
                desc="Welcome to your personalized profile page"
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            {/* Log the posts to the console for debugging */}
            {console.log(posts)}
        </div>
    )
}

export default MyProfile
