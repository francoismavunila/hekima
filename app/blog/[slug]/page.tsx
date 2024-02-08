import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image"
import {PortableText} from '@portabletext/react'
export const revalidate = 30;

async function getData(slug: string){
  const query = `*[_type == 'post' && slug.current == '${slug}'] {title,"current_slug":slug.current,"author":author._ref,"image":mainImage.asset._ref,"categories":categories[0]._ref,publishedAt,body}`
    
  try {
      const res = await client.fetch(query)  
      console.log(res[0])
      return res[0]
  } catch (error) {
      console.error(error)
  }
}
export default async function BlogDetails({
    params,
  }: {
    params: { slug: string };
  }){
    let post = await getData(params.slug) 
    return (
      <div className="max-w-screen-md mx-auto p-4">
      <div className="flex flex-col justify-between items-center border-b pb-4">
        <h1 className="text-4xl font-bold text-gray-400">{post.title}</h1>
        <div className="text-sm my-12 text-gray-500">Published on {post.publishedAt}</div>
      </div>
      <img src={urlForImage(post.image)} alt={post.title} className="w-full h-auto my-4 rounded" />
      {/* <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">{post.categories}</span>
      </div> */}
      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primar max-w-none text-gray-300 mb-8">
        <PortableText value= {post.body} />
      </div>
      <div className="border-t pt-4">
        <div className="flex items-center">
          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-4" />
          <div>
            <p className="font-bold text-gray-900">{post.author.name}</p>
            <p className="text-sm text-gray-600">{post.author.bio}</p>
          </div>
        </div>
      </div>
    </div>
    );
}