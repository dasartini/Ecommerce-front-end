import React from 'react'
import AboutStyle from '../styles/AboutStyle'
import happyFarmer from "../assets/happyfarmer.jpg"
import carrito from "../assets/carrito.jpg"
import store from "../assets/store.svg"
import farmer from "../assets/farmer.svg"
import pack from "../assets/pack.svg"
function About() {
  return (
    <AboutStyle>

    <div className='aboutFirst'>
        <h1 style={{fontSize:"3rem", fontStyle:"italic"}}>Resourceful and fair coffee for everyone</h1>
    </div>
    <div className='aboutSecond'>
        <div className='text-side'>
        <h1>The problem:</h1>
        <h3>Coffee farmers in Colombia face a series of difficulties: <br></br>
        -Low prices as they depend on the coffee international price, which fluctuates every day due to supply and demand.<br></br>
        -Sometimes these fluctuations affect the production costs, making the coffee growers lose money<br></br>
        -Many of these farms have a workforce shortage, due to the internal migration of youth to the bigger cities<br></br>
        And many more...
        </h3>
        </div>
        <div className='image-side'>
        <img src={happyFarmer} />
        </div>
        </div>
    <div className='aboutThird'>
    <h1>Who we are?</h1>
    </div>
        
    <div className='aboutSecond'>
        <div className='text-side2'>
        <h3> Tero was founded in 2019 with the clear mission of delivering the freshest Colombian coffee, we get our coffee straight from the finca San Geronimo in the Tolima region, like this, supporting the local production and giving a fair price for the farmers who face the nowadays markets difficulties. </h3>
        <h2>Our mission:</h2>
        <h3>Work with and for the coffee farmers, providing a competitive pay that encourages and rewards their valuable work.
            Bringing at the same time the taste of this coffee to the awareness of the public in the UK and Europe and deliver to any customer the sensation of the region where 
            the coffee was made.
        </h3>
        </div>
        <div className='image-side2'>
        <img src={carrito} />
        </div>

    </div>
    <div class="features-container">
  <div class="feature">
    <div class="icon"><img src={store}/></div>
    <p>New small business</p>
  </div>
  <div class="feature">
    <div class="icon"><img src={farmer}/></div>
    <p>Helping farmers</p>
  </div>
  <div class="feature">
    <div class="icon"><img src={pack}/></div>
    <p>Organic</p>
  </div>
</div>
    </AboutStyle>
  )
}

export default About