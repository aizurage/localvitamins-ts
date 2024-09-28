import { createSlice } from "@reduxjs/toolkit"

export interface EventRecruiterPictureState {
    eventRecruiterPictureUrl: string | null
    eventRecruiterPictureObjectUrl: string | null
    eventRecruiterPicture: File | null
}

const initialState: EventRecruiterPictureState = {
    eventRecruiterPictureUrl: null,
    eventRecruiterPictureObjectUrl: null,
    eventRecruiterPicture: null
}

const eventRecruiterPictureSlice = createSlice({
    name: "eventRecruiterPicture",
    initialState,
    reducers: {
        setEventRecruiterPicture: (state, action) => {
            const picture = action.payload
            if (!picture.target.files || picture.target.files.length === 0) {
                throw new Error("You must select an image to upload.")
            }
            const file = picture.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filename = `${Math.random()}.${fileExt}`
            const filepath = `${filename}`
            
            state.eventRecruiterPictureUrl = filepath
            state.eventRecruiterPictureObjectUrl = URL.createObjectURL(file)
            state.eventRecruiterPicture = file
        },
        deleteEventRecruiterPicture: (state) => {
            state.eventRecruiterPictureUrl = null
            state.eventRecruiterPictureObjectUrl = null
            state.eventRecruiterPicture = null
        }
    }
})

export const { 
    setEventRecruiterPicture, 
    deleteEventRecruiterPicture 
} = eventRecruiterPictureSlice.actions
export const eventRecruiterPictureReducer = eventRecruiterPictureSlice.reducer