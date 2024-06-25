import React, { useState } from 'react'

import { Button } from "@/shared/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@//shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"

import { Edit } from 'lucide-react'
import ReactQuill from 'react-quill'
import { useForm } from 'react-hook-form'
import { IPost } from './ListPosts'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/config/fireBaseConfig'

interface IProps {
    post: IPost,
    setMutate: (mutate: boolean) => void
}

const UpdatePost: React.FC<IProps> = ({ post, setMutate }) => {
    const myColors = [
        "purple",
        "#785412",
        "#452632",
        "#856325",
        "#963254",
        "#254563",
        "white"
    ];
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: myColors }],
            [{ background: myColors }]
        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align"
    ];

    const [close, setClose] = useState<boolean>(false);
    const [code, setCode] = useState(post.content);
    const handleProcedureContentChange = (content: any) => {
        setCode(content);
    };
    const { register, reset, handleSubmit, } = useForm({ defaultValues: { title: post.title } });

    const onSubmit = async (data: unknown) => {


        try {
            console.log(data);
            const customObject = {
                title: data.title,
                content: code,
                author: post.author,
                date: new Date(),
            }

            const response = await setDoc(doc(db, "blogs", post.postId), customObject)
            console.log(response);
            setMutate(true);
            setClose(false);

        } catch (error) {
            //
        }
    }
    return (
        <Dialog open={close}>
            <DialogTrigger asChild>
                <Button onClick={() => setClose(true)} variant="outline">Edit Post <Edit /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    <Input placeholder='Title' type='text' {...register("title")} />
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={code}
                        onChange={handleProcedureContentChange}
                        className='mt-3'
                    />
                    <DialogFooter>
                        <Button type="submit" className='mt-3'>Update</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default UpdatePost