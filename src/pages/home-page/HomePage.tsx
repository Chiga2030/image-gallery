import styles from './HomePage.module.css'
import { ImageGallery, } from '../../widgets/image-gallery'


export function HomePage () {
  return (
    <main className={ styles.page }>
      <ImageGallery/>
    </main>
  )
}
