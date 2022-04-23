import React,{useState, useEffect} from 'react'
import './payment.css'
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js"
import {useStateValue} from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
import axios from './axios'
import{useHistory , Link} from 'react-router-dom'
import Reducer, { getBasketTotal } from './Reducer'
import {db} from './Firebase'

function Payment() {
    const [{basket,user}, dispatch] = useStateValue()
  
    const history = useHistory()
    const stripe = useStripe()
    const elements = useElements()
    const [succeeded, setSucceeded] = useState('')
    const [processing, setProcessing] = useState('')

    const [error, setError] = useState(null)
    const [disabled, setDisabled]= useState(true)
    const [clientSecret, setClientSecret] = useState(true)
 
 
    //fucking important snippet // getBasketTotal(basket)
    useEffect(()=>{
        const getClientSecret = async ()=>{
            const response = await axios({
                method:  'post',
                url: `/payments/create?total=${getBasketTotal(basket)*100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    },[basket])
    console.log(clientSecret)

    const handleSubmit=async (event) =>{
        event.preventDefault()
        setProcessing(true)

        //uses clientSecret 
        const payload =await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) =>{
            // paymentIntent= Payment Confirmation

            db.collection(`users`)
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount: paymentIntent.amount,
                created: paymentIntent
            })
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
        
    }

    const handleChange = event => {
        setDisabled(event.empty)
        setError(event.error? event.error.message: "")
    }
    const email= "apple@mango.com"
    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>
                    Checkout {<Link to ="/checkout">
                        {basket?.length} items
                        </Link>}
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{email}</p>
                        <p>Kathmandu,Nepal</p>
                    </div>
                </div>

                <div className="payment__section">
                     <div className="payment__title">
                         <h3>Review items and delivery</h3>
                        
                    </div>
                    <div className='payment__items'>
                        
                    {basket.map(item=>(
                        
                        <CheckoutProduct 
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}/>
                    ))}
                    </div>
                    </div>

                 <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit} >
                            <CardElement onChange={handleChange} />
                            <div className="price__container">
                               
                                 <CurrencyFormat 
                                 renderText = {(value) =>(
                                     <h3>Order Total: {value}</h3>
                                 )} 
                                 decimalScale={2}
                                 value= {getBasketTotal(basket)}
                                 displayType={"text"}
                                 thousandSeperator={true}
                                 prefix={"$"}/>
                                 <button disabled={processing || disabled || succeeded}>
                                     <span>{processing?<p>Processing</p>:"Buy Now"}</span>
                                 </button>


                            </div>
                                    {error && <div>{error}</div>}
                        </form>
                     </div>
                    
                    
                 </div>
            </div>
            
        </div>
    )
}

export default Payment
