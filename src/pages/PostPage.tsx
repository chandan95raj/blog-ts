import { db } from '@/config/fireBaseConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'

interface IPost {
    postId: string;
    title: string;
    content: string;
    date: Date;
    author: string;

}

const PostPage = () => {
    const [posts, setPosts] = useState<IPost[] | null>(null);
    const getData = async () => {
        try {
            const result: IPost[] = [];
            const response = await getDocs(collection(db, "blogs"));
            response.forEach((doc) => {
                const data: IPost = {
                    ...doc.data(),
                    postId: doc.id.toString()
                }
                result.push(data);
                // console.log(data);

            });
            setPosts(result);
        } catch (error) {
            //
            console.log(error);

        }
    }


    useEffect(() => {

        getData()
    }, [])

    return (
        <>
            <div className='flex flex-wrap justify-center gap-4 m-2'>
                {posts !== null ? <>{posts.map((post) => (<Card key={post.postId} className='w-2/5 hover:scale-105' > <CardHeader> <CardTitle>{post.title}</CardTitle>  <span>{post.author}</span>  </CardHeader><CardContent><div dangerouslySetInnerHTML={{ __html: post.content }}></div></CardContent></Card>))}</> : <>Loading...</>}
            </div>
            {posts?.length == 0 && <>No Post Yet</>}
        </>
    )
}

export default PostPage