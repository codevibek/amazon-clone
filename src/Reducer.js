

export const initialState = {
    basket: [] ,
    user:''
}


// selector
export const getBasketTotal=(basket)=>
    basket?.reduce((amount,item)=> item.price +amount, 0 )
///////mutable updates
function Reducer(state, action){
console.log(action)

    switch(action.type){
    case 'ADD_TO_BASKET':
    //logoc for adding
    
    return{
        ...state,
        basket: [...state.basket, action.item]
    }
     
    case 'REMOVE_FROM_BASKET':
        //logic remove
        let newBasket = [...state.basket]
        const index =  state.basket.findIndex((basketItem)=> basketItem.id === action.id)
        console.log(index)
        if(index>=0){
            newBasket.splice(index,1)
        }
       
       
        return{...state,
             basket: newBasket}
    case 'SET_USER':
                return{
                    ...state,
                    user:action.user
                }
    case 'EMPTY_BASKET':
        return{
            ...state,
            basket:[]
        }
    

    default:
        return state
}}

export default Reducer