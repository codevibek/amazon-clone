import React,{useState} from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import {useStateValue } from './StateProvider'
import {getBasketTotal} from './Reducer'
import {useHistory, Link} from 'react-router-dom'

function Subtotal() {
    const [{basket}] = useStateValue()
    const history=useHistory()
    return (
        <div className="subtotal">
            <CurrencyFormat
            renderText = {(value) =>(
                <>
                    <p>
                        Subtotal {basket.length} items : <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox"/>This order contains a gift
                    </small>
                </>

            )
            }
            decimalScale ={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeperator={true}
            prefix={"$"}
            />
            <Link to='/payment'>
              <button>Proceed to Checkout</button>
              </Link>
            
        </div>
    )
}

export default Subtotal
