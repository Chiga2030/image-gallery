import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import type { PayloadAction, } from '@reduxjs/toolkit'
import { fetchImages, } from '../api/fetchImages'
import { Image, } from './types'


interface State {
  isImagesLoading: boolean
  imageList: Image[]
  activeImage: Image | null
}

const initialState: State = {
  isImagesLoading: true,
  imageList: [],
  activeImage: null,
}


export const fetchImageList = createAsyncThunk(
  'image-feed/fetchImageList',
  async (limit: number = 10) => {
    return fetchImages(limit)
  }
)


export const imageFeedSlice = createSlice({
  name: 'image-feed',
  initialState,

  reducers: {
    setImageList: (state, action: PayloadAction<Image[]>) => {
      state.imageList = action.payload
    },

    setActiveImage: (state, action: PayloadAction<Image>) => {
      state.activeImage = action.payload
    },

    setPrevActiveImage: state => {
      const activeImage = state.activeImage
      if (!activeImage) {
        return
      }

      const newActiveImageIndex = state.imageList.findIndex(item => item.id === activeImage.id)

      if (newActiveImageIndex > 0) {
        state.activeImage = state.imageList[newActiveImageIndex - 1]
      }
    },

    setNextActiveImage: state => {
      const activeImage = state.activeImage
      if (!activeImage) {
        return
      }

      const newActiveImageIndex = state.imageList.findIndex(item => item.id === activeImage.id)

      if (newActiveImageIndex < state.imageList.length - 1) {
        state.activeImage = state.imageList[newActiveImageIndex + 1]
      }
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchImageList.pending, state => {
      state.isImagesLoading = true
    })

    builder.addCase(fetchImageList.fulfilled, (state, action: PayloadAction<Image[]>) => {
      state.imageList = action.payload
      state.activeImage = action.payload[0]
      state.isImagesLoading = false
    })
  },

})

// Action creators are generated for each case reducer function
export const { setImageList, setActiveImage, setNextActiveImage, setPrevActiveImage, } = imageFeedSlice.actions
