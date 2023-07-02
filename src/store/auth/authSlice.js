import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
    udi: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login: ( state ) => {

    },
    logout: ( state ) => {

    },
    checkingCredentials: ( state ) => {

    }

  },
})

export const { login, logout, checkingCredentials } = authSlice.actions;