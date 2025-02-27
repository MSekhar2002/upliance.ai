//userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

interface UserState {
  users: UserData[];
  currentUser: UserData | null;
}

const initialState: UserState = {
  users: JSON.parse(localStorage.getItem('users') || '[]'),
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<UserData, 'id' | 'createdAt'>>) => {
      const newUser = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      
      state.users.push(newUser);
      state.currentUser = newUser;
      
      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    
    updateUser: (state, action: PayloadAction<UserData>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      
      if (index !== -1) {
        state.users[index] = action.payload;
        state.currentUser = action.payload;
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = state.users.find(user => user.id === action.payload) || null;
    },
    
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { addUser, updateUser, setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;