"use client";
import React, {useState} from 'react';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {usePathname, useRouter} from 'next/navigation';

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
    const [copied,
        setCopied] = useState("");
    const pathName = usePathname()
    const {data: session} = useSession()
    const router = useRouter()

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator
            .clipboard
            .writeText(post.prompt);

        // Reset the "Copied" message after 3 seconds
        setTimeout(() => setCopied(""), 3000);
    };
    const viewProfile = () => {
        console.log(post.creator)
        if (post.creator._id === session
            ?.user.id) 
            return router.push('/profile')
        router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
    }

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div
                    className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
                    onClick={viewProfile}>
                    {/* User Image */}
                    <Image
                        src={post.creator.image}
                        alt={'user_image'}
                        width={40}
                        height={40}
                        className="rounded-full object-contain"/> {/* User Information */}
                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900 text-xl">{post.creator.username}</h3>
                        <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
                    </div>
                </div>

                {/* Copy Button */}
                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={copied === post.prompt
                        ? '/assets/icons/tick.svg'
                        : '/assets/icons/copy.svg'}
                        height={12}
                        width={12}/>
                </div>
            </div>

            {/* Prompt Content */}
            <p className="my-4 font-sato text-sm text-gray-700">{post.prompt}</p>

            {/* Tag */}
            <p
                className="font-inner text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick && handleTagClick(post.tag)}>
                #{post.tag}
            </p>
            {session
                ?.user.id === post.creator._id && pathName === '/profile' && (
                    <div className="mt-5 flex-end gap-4 border-t border-gray-100 pt-3 ">
                        <p
                            className="font-inter text-sm green_gradient cursor-pointer "
                            onClick={handleEdit}>Edit</p>
                        <p
                            className="font-inter text-sm orange_gradient cursor-pointer "
                            onClick={handleDelete}>Delete</p>
                    </div>
                )}
        </div>
    );
};

export default PromptCard;
