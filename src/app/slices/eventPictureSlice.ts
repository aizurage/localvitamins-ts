import { createSlice } from "@reduxjs/toolkit";

export interface EventPictureState {
    eventPictureUrl: string | null
    eventPictureObjectUrl: string | null
    eventPicture: File | null
}

const initialState: EventPictureState = {
    eventPictureUrl: null,
    eventPictureObjectUrl: null,
    eventPicture: null
}

const eventPictureSlice = createSlice({
    name: "eventPicture",
    initialState,
    reducers: {
        setEventPicture: (state, action) => {
            const picture = action.payload
            if (!picture.target.files || picture.target.files.length === 0) {
                throw new Error("You must select an image to upload.")
            }
            const file = picture.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filename = `${Math.random()}.${fileExt}`
            const filepath = `${filename}`
            
            state.eventPictureUrl = filepath
            state.eventPictureObjectUrl = URL.createObjectURL(file)
            state.eventPicture = file
        },
        deleteEventPicture: (state) => {
            state.eventPictureUrl = null
            state.eventPictureObjectUrl = null
            state.eventPicture = null
        }
    }
})

export const { setEventPicture, deleteEventPicture } = eventPictureSlice.actions
export const eventPictureReducer = eventPictureSlice.reducer