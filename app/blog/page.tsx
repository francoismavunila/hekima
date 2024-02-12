import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image"
import Image from "next/image"
import { blogPreview } from "@/lib/interfaces"
import Link from "next/link"
export const revalidate = 30;

async function getData() {
    const query = `*[_type == 'post'] | order(_createdAt desc) {title,"current_slug":slug.current,"author":author._ref,"image":mainImage.asset._ref,"categories":categories[0]._ref,publishedAt,introduction}`
    
    try {
        const res = await client.fetch(query)  
        console.log(res)
        return res
    } catch (error) {
        console.error(error)
    }
    
    
}
  
export default async function Blog() {
const data : blogPreview[] = await getData()
console.log(data)
return (
    <div className="mx-auto">
        <h2 className="text-center my-10 text-3xl">Insights in AI, Business, and Tech: Unleashing the Future</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 px-4">
        {data && data.map((post, key)=>{
            let date = new Date(post.publishedAt)
            const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
            const formattedDateTime = formatter.format(date);
            return (
                <Link href={`/blog/${post.current_slug}`} key={key}>
                <Card  className="transition-transform duration-200 ease-in-out hover:scale-105">
                    <Image
                        src={urlForImage(post.image)}
                        alt={post.title}
                        width={500}
                        height={500}
                        className="rounded-t-lg h-[200px] object-cover "/>
                    <CardHeader>
                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{post.introduction}</CardDescription>
                    </CardHeader>
                    {/* <CardContent className="mt-5">
                        <p>{post.body}</p>
                    </CardContent> */}
                    <CardFooter>
                        <p>{formattedDateTime}</p>
                    </CardFooter>
                </Card>
                </Link>
            )
        })}
        </div>
    </div>
)
}