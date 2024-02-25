import styles from './ImageFeed.module.css'
import { useAppDispatch, useAppSelector, } from '../../../../app/store/hooks'
import { fetchImageList, } from '../../model/imageFeedSlice'
import { useEffect, useId, } from 'react'
import { Feed, } from '../Feed/Feed'
import { Loader, } from '../../../../shared/ui/Loader/Loader'


interface Props {
  amount: number
}


const getSliderParams = (wrapperId: string, innerId: string) => {
  const wrapper = document.getElementById(wrapperId)!
  const inner = document.getElementById(innerId)!


  let wrapperWidth: number = 0
  let innerWidth: number = 0
  let slideCount: number = 0
  let currentTranslate: number = 0

  const SLIDE_WIDTH = 5 * 16

  if (wrapper && inner) {
    wrapperWidth = wrapper.clientWidth
    innerWidth = inner.clientWidth
    slideCount = (Math.floor(wrapperWidth / SLIDE_WIDTH))

    interface Transform {
      '0': {
        x: {
          value: number
        }
      }
    }

    const transform = inner.computedStyleMap().get('transform') as Transform
    if (transform && ('0' in transform)) {
      currentTranslate = transform['0'].x.value
    }
  }

  const TRANSLATE_LENGTH = ((slideCount * 5 * 16) + (slideCount * .5 * 16))


  return {
    currentTranslate,
    inner,
    wrapperWidth,
    innerWidth,
    TRANSLATE_LENGTH,
  }
}


const toLeft = (wrapperId: string, innerId: string) => {
  const { TRANSLATE_LENGTH, currentTranslate, inner, } = getSliderParams(wrapperId, innerId)

  if (Math.abs(currentTranslate) >= TRANSLATE_LENGTH) {
    inner.style.transform = `translateX(${currentTranslate + TRANSLATE_LENGTH}px)`
  }

  if (Math.abs(currentTranslate) < TRANSLATE_LENGTH) {
    inner.style.transform = `translateX(${0}px)`
  }
}

const toRight = (wrapperId: string, innerId: string) => {
  const { TRANSLATE_LENGTH, currentTranslate, inner, wrapperWidth, innerWidth,  } = getSliderParams(wrapperId, innerId)

  if (Math.abs(currentTranslate) + TRANSLATE_LENGTH > innerWidth - TRANSLATE_LENGTH) {
    inner.style.transform = `translateX(${-(innerWidth - wrapperWidth + 2)}px)`
    return
  }

  if (Math.abs(currentTranslate) < innerWidth - TRANSLATE_LENGTH) {
    inner.style.transform = `translateX(${currentTranslate - TRANSLATE_LENGTH}px)`
  }
}


export const ImageFeed = ({ amount = 1, }: Props): JSX.Element => {
  const isImagesLoading = useAppSelector(store => store.imageFeed.isImagesLoading)
  const dispatch = useAppDispatch()

  const  wrapperId = useId()
  const  innerId = useId()


  useEffect(() => {
    dispatch(fetchImageList(amount))
  }, [ amount, dispatch, ])


  if (isImagesLoading) {
    return (
      <div className={styles.wrapper}>
        <Loader/>
      </div>
    )
  }


  return (
    <div className={styles.wrapper}>
      <button onClick={toLeft.bind(null, wrapperId, innerId)} className={styles.button}>{'<'}</button>

      <Feed wrapperId={wrapperId} innerId={innerId} />

      <button onClick={toRight.bind(null, wrapperId, innerId)} className={styles.button}>{'>'}</button>
    </div>
  )
}
