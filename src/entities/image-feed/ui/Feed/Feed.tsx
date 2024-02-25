import { clsx, } from 'clsx'
import { useAppDispatch, useAppSelector, } from '../../../../app/store/hooks'
import styles from './Feed.module.css'
import { setActiveImage, } from '../../model/imageFeedSlice'
import { Image, } from '../../model/types'
import { useEffect, } from 'react'


interface Props {
  wrapperId :string
innerId :string
}


export const Feed = ({ wrapperId, innerId, }: Props): JSX.Element => {
  const imageList = useAppSelector(store => store.imageFeed.imageList)
  const activeImage = useAppSelector(store => store.imageFeed.activeImage)
  const dispatch = useAppDispatch()

  const didImageClicked = (image: Image) => {
    dispatch(setActiveImage(image))
  }


  useEffect(() => {
    const activeImage = document.querySelector(`.${styles.image_active}`)
    const wrapper = activeImage?.parentElement?.parentElement
    const inner = activeImage?.parentElement

    if (!inner || !wrapper) {
      return
    }

    const imageStart = activeImage.getBoundingClientRect().left
    const imageEnd = activeImage.getBoundingClientRect().right

    const wrapperStart = wrapper.getBoundingClientRect().left
    const wrapperEnd = wrapper.getBoundingClientRect().right


    interface Transform {
      '0': {
        x: {
          value: number
        }
      }
    }

    let currentTranslate = 0
    const transform = inner.computedStyleMap().get('transform') as Transform
    if (transform && ('0' in transform)) {
      currentTranslate = transform['0'].x.value
    }

    if (imageStart < wrapperStart) {
      inner.style.transform = `translateX(${currentTranslate + wrapperStart - imageStart}px)`
      return
    }

    if (imageEnd > wrapperEnd) {
      inner.style.transform = `translateX(-${Math.abs(currentTranslate) + imageEnd - wrapperEnd}px)`
      return
    }
  }, [ activeImage, ])


  return (
    <div className={styles.wrapper} id={wrapperId}>
      <div className={styles.inner} id={innerId}>
        {imageList.map(item => (
          <img
            src={item.url}
            alt={item.description}
            key={item.id}
            className={clsx(styles.image, { [styles.image_active]: item.id === activeImage?.id, })}
            onClick={() => didImageClicked(item)}
          />
        ))}
      </div>
    </div>
  )
}
