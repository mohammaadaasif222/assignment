import { createSlice } from '@reduxjs/toolkit';
import { users } from '../../data';

const initialState = {
  users: users, 
  filteredUsers: users, 
  filters: {
    domain: '',
    gender: '',
    available: null,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers:(state, action)=>{
     state.filteredUsers = action.payload
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    filterUsers: (state) => {
      const { domain, gender, available } = state.filters;
      
      state.filteredUsers = state.users.filter((user) => {
        let passFilter = true;
        if (domain && user.domain !== domain) {
          passFilter = false;
        }
        if (gender && user.gender !== gender) {
          passFilter = false;
        }
        if (available && user.available !== true) {
          passFilter = false;
        }
        return passFilter;
      });
    },
  },
});

export const { setFilters, filterUsers , setUsers} = usersSlice.actions;
export default usersSlice.reducer;
