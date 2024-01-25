"use client"
import Profile from "@components/Profile"
import axios from "axios"
import { useParams } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useEffect,useState } from "react"



const UserProfile = ({params}) => {
    const searchParams = useSearchParams()
    const userName = searchParams.get('name')
    const [userPost, setUserPosts]= useState([])

    useEffect(() => {
      const fetchPosts = async ()=>{
        const response = await axios.get(`/api/users/${params?.id}/posts`)
        const data=  response.data

         setUserPosts(data)
      }
    
      if(params?.id)  fetchPosts()
    }, [params.id])
    
console.log(params.id);

  return (
    <Profile
                name={userName}
                desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
                data={userPost}
                
            />
  )
}

export default UserProfile