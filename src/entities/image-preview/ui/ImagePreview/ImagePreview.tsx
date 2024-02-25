import { useState, } from 'react'
import { useAppDispatch, useAppSelector, } from '../../../../app/store/hooks'
import { setNextActiveImage, setPrevActiveImage, } from '../../../image-feed/model/imageFeedSlice'
import styles from './ImagePreview.module.css'
import { createPortal, } from 'react-dom'
import { ModalImage, } from '../ModalImage/ModalImage'


export const ImagePreview = (): JSX.Element => {
  const [ showModal, setShowModal, ] = useState(false)
  const activeImage = useAppSelector(store => store.imageFeed.activeImage)
  const isImagesLoading = useAppSelector(store => store.imageFeed.isImagesLoading)


  const dispatch = useAppDispatch()

  const didPrevButtonClicked = () => {
    dispatch(setPrevActiveImage())
  }

  const didNextButtonClicked = () => {
    dispatch(setNextActiveImage())
  }


  if (isImagesLoading) {
    return <>{null}</>
  }


  return (
    <>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={didPrevButtonClicked}>{'<'}</button>

        <div className={styles.imageWrapper}>
          <img src={activeImage?.url} alt={activeImage?.description} className={styles.image} onClick={() => setShowModal(true)} />
        </div>

        <button className={styles.button} onClick={didNextButtonClicked}>{'>'}</button>
      </div>

      {showModal && createPortal(
        <ModalImage onClose={() => setShowModal(false)} src={activeImage?.url} alt={activeImage?.description} />,
        document.body
      )}
    </>
  )
}
