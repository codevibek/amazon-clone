import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return (
        <div className="home">
            <img src="https://carbonmade-media.accelerator.net/23935436;960x262.png?auto=webp"
                className="home__image"
                alt=""/>
            <div className="home__row">
            <Product id="112"
            title="the Hidden world"
            price={25}
            rating={5}
            image="https://picsum.photos/id/237/536/354"
            />
            <Product id="122"
            title="the Hidden world"
            price={25}
            rating={5}
            image="https://picsum.photos/id/237/536/354"
            />
            </div>
           
           
            <div className="home__row">
            <Product id="1212"
            title="the Hidden world"
            price={25}
            rating={5}
            image="https://picsum.photos/id/237/536/354"
            />
            <Product id="1162"
            title="the Hidden world"
            price={25}
            rating={5}
            image="https://picsum.photos/id/237/536/354"
            />
            <Product id="1512"
            title="the Hidden world"
            price={25}
            rating={5}
            image="https://picsum.photos/id/237/536/354"
            />
            </div>
            
            
            <div className="home__row">
            <Product id="17612"
            title="the Hidden world"
            price={25}
            rating={5}
            image="https://picsum.photos/id/237/536/354"
            />
            </div>
        </div>
    )
}

export default Home
