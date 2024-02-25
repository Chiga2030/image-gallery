import { ImageFeed, } from '../../entities/image-feed'
import { ImagePreview, } from '../../entities/image-preview'


export const ImageGallery = (): JSX.Element => {
  return (
    <section>
      <ImagePreview />

      <ImageFeed amount={40}/>
    </section>
  )
}
