import React , {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import Login from './Login'
import {auth} from './Firebase'
import {useStateValue} from './StateProvider'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Payment from './Payment'
import Orders from './Orders'

const promise = loadStripe('pk_test_51HeywyKcm3I702bLx9RrFH9E2C8ffzNAbKfZpdcs3tuIAnyWA33GwQLguCiq1c4AxFk7ajeK1BwZB1eEuETib9gE00fMfkdYeZ')

function App() {

  const [{}, dispatch] = useStateValue()
  useEffect(() => {
     auth.onAuthStateChanged(authUser=>{
      

       if (authUser){
          dispatch({
            type:'SET_USER',
            user: authUser
          })
       }
       else{
          dispatch({
            type:'SET_USER',
            user:null
          })
       }
     })}
      
  , [])
  return (
    <div className="app">
      <Router>
      <Switch>
        <Route path='/checkout'>
          <Header />
            <Checkout />
        </Route>
        <Route path='/login'>
         <Login/>
        </Route>
        <Route path='/payment'>
        <Header />
          <Elements stripe={promise}>
            <Payment/>
          </Elements>
        </Route>
        <Route path='/orders'>
        <Header />
          <Orders/>
        </Route>
        <Route path='/'>
         <Header />
         <Home />
        </Route>
        
        
        
        
      </Switch>
      </Router>
      
    </div>
  );
}

export default App;
