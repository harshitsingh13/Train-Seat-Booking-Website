import { createSlice } from '@reduxjs/toolkit'

const initialState = { subscription: {name:"",
            phone:"",
            doc_name:"",
            gender:"Male",
			date:"",
			consult:"Consult",
			age:"",
			time:"",
			btntext:"Book Appointment"} }

export const jsonSlice = createSlice({
  name: 'jsonObj',
  initialState,
  reducers: {
	  
    addUserData(state, action){ 
		let key=action.payload.key;
		let value=action.payload.value;
		state.subscription[key]=value;
	},
	updateUserData(state, action){ 
		state.subscription=action.payload;
	}
	
  },
    
})

export const { addUserData, updateUserData } = jsonSlice.actions

export default jsonSlice.reducer