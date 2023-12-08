import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'
import { useOutletContext } from '@remix-run/react'

export function links(){
  return[
    {
      rel:'stylesheet',
      href:styles
    },
    {
      rel:'preload',
      href:imagen,
      as:'image'
    }
  ]
}

export function meta() {
  return (
    {
      title: 'GuitarLA - Nosotros',
      description:'Venta de Guitarras, blog de musica y más'
    }
  )
}

const Nosotros = () => {

  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="imagen sobre nosotros" />

        <div>
          <p>Aenean risus lectus, scelerisque venenatis arcu dictum, laoreet hendrerit velit. Nulla lacinia nulla quis iaculis dignissim. Pellentesque venenatis elit eget lorem tempor porttitor. Nullam suscipit, quam a lobortis pulvinar, arcu leo finibus dui, in feugiat tellus justo vel odio. Nam pretium dolor nec dolor congue, et tincidunt est egestas. Sed porttitor condimentum egestas. Nulla tristique nibh id eros aliquet dapibus. Vivamus in mi sit amet dolor placerat tempus eu in tortor. Aliquam sagittis justo eu faucibus pellentesque. Pellentesque quis auctor sapien. Nunc rhoncus urna eget nulla cursus aliquam.</p>
          <p>Aenean risus lectus, scelerisque venenatis arcu dictum, laoreet hendrerit velit. Nulla lacinia nulla quis iaculis dignissim. Pellentesque venenatis elit eget lorem tempor porttitor. Nullam suscipit, quam a lobortis pulvinar, arcu leo finibus dui, in feugiat tellus justo vel odio. Nam pretium dolor nec dolor congue, et tincidunt est egestas. Sed porttitor condimentum egestas. Nulla tristique nibh id eros aliquet dapibus. Vivamus in mi sit amet dolor placerat tempus eu in tortor. Aliquam sagittis justo eu faucibus pellentesque. Pellentesque quis auctor sapien. Nunc rhoncus urna eget nulla cursus aliquam.</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros