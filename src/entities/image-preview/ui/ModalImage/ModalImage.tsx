import { ModalWindow, } from '../../../../shared/ui/ModalWindow/ModalWindow'
import styles from './ModalImage.module.css'


interface Props {
  onClose: () => void
  src?: string
  alt?: string
}


export const ModalImage = ({
  onClose,
  src,
  alt,
}: Props): JSX.Element => {
  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper} style={{
          background: `url(${src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
          <img src={src} alt={alt} className={styles.imageModal}/>
        </div>
      </div>
    </ModalWindow>
  )
}
