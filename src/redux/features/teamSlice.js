import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
  name: 'teams',
  initialState: {
    item:[]
  },
  reducers: {
    addToTeam: (state, action) => {  
      if(state.item.some(user => user.id === action.payload.id || user.domain === action.payload.domain)){
        return
      }else{
        state.item.push(action.payload);
      }
    },
    removeFromTeam:(state,action)=>{
      console.log(action.payload)
      state.item = state.item.filter((user)=> user.id !== action.payload)
    }
  },
});

export const { addToTeam, removeFromTeam } = teamSlice.actions;
export default teamSlice.reducer;
