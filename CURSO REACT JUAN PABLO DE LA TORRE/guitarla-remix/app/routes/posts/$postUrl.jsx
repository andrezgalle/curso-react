import { useLoaderData } from "react-router"
import { getPost } from "../../models/post.server";
import { formatearFecha } from "../../utils/helpers";
import styles from '~/styles/blog.css'

export async function loader({params}){
    const {postUrl} = params;
    const post = await getPost(postUrl);

    if(post.data.length === 0){
        throw new Response('',{
            status:404,
            statusText:'Post no encontrado'
        })
    }

    return post
}

export function meta({data}){

    if(!data){
        return{
            title:'GuitarLA - post no encontrado',
            description:'Guitarras , venta de guitarras , post no encontrado'
        }
    }

    return{
        title:`GuitarLa - ${data.data[0].attributes.titulo}`,
        description:`Guitarras , venta de guitarras , guitarra ${data.data[0].attributes.titulo}`
    }
}

export function links(){

    return[
        {
            rel:'stylesheet',
            href:styles
        }
    ]
}

const Post = () => {
    const post = useLoaderData();
    const {titulo,contenido,publishedAt,imagen} = post?.data[0].attributes
  return (
    <article className="post mt-5">
        <img src={imagen?.data?.attributes.url} className='imagen' alt={`imagen del post ${titulo}`} />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className="fecha">{formatearFecha(publishedAt)}</p>
            <p className="texto">{contenido}</p>
        </div>
    </article>
  )
}

export default Post