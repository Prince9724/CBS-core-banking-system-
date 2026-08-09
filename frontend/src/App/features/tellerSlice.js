import {createAsyncThunk , createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchDEposite = createAsyncThunk("fetch/deposite",async(thunkAPI)=>{
    try{
        const res = await axios.post("http://localhost:5003/cbs/customer/deposite",
            {
            withCredentials:true
            });
    }
    catch(err){

    }
})