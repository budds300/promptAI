"use client"
import { useState ,useEffect} from "react"
import PromptCard from "./PromptCard"
import axios from "axios"

const PromptCardList=({data,handleTagClick})=>{
  return(
    <div className="flex justify-around" >
    
    <div className="mt-16 prompt_layout  ">
     { data.map((post)=>(
        <PromptCard key={post._id} post= {post} handleTagClick={handleTagClick}/>
      ))}
    </div>
    </div>
  )

}
const Feed = () => {
  const[searchText ,setSearchText]=useState("");
  const[posts ,setSPosts]=useState([]);
  
  const filteredPosts = posts.filter((post) =>
    post.creator.username.toLowerCase().includes(searchText.toLowerCase()) ||
    post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
    post.prompt.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleTagClick= (tag)=>{
    posts.filter((post)=>post.tag.toLowerCase() === tag.toLowerCase())
    setSearchText(tag)
  }
  

useEffect(() => {
  const fetchPosts = async ()=>{
    try {
      const response = await axios.get('/api/prompt')
      const data = response.data
      setSPosts(data)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  fetchPosts()
 
}, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center ">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={(e)=>setSearchText(e.target.value)} className="search_input peer"/>
      </form>
    
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed
