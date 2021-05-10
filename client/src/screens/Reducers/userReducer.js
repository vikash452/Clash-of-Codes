export const initialState=null

export const reducer=(state,action)=>{
    if(action.type === 'USER'){
        return action.payload;
    }
    else{
        return state;
    }
}