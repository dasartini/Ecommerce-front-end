import { useState, useRef } from 'react';
import { sendContactEmail } from '../../api';
import ContactFormStyle from "../styles/ContactFormStyle"
import stand from "../assets/stand.jpg"
import contactPic from "../assets/contactPic.jpg"
import cafetiere from "../assets/cafetiere.jpg"
export default function Contact() {
    const [sending, setSending] = useState(false)
    const formRef = useRef(null);
    const [formDataState, setFormDataState] = useState({
      email: '',
      message: '',
      sender: '',
      phoneNumber: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormDataState(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setSending(true)

      if (!formDataState.email || !formDataState.message || !formDataState.sender || !formDataState.phoneNumber) {
        alert('All fields are required.');
        setSending(false);
        return;
      }

      const data = {
        email: formDataState.email,
        message: formDataState.message,
        sender: formDataState.sender,
        phoneNumber: formDataState.phoneNumber,
      };

      sendContactEmail(data)
        .then(response => {
          if (response) {
            alert('Email sent successfully!');
          } else {
            alert('Failed to send email.');
          }
        })
        .then(()=>{
            setSending(false)
        })
        .catch(error => {
            console.log(error)
          console.error('Error:', error);
        });
    };
    const scrollToForm = () => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (<>
      


      <ContactFormStyle>
      <div className='contactPageFirst'   >
      <div className='contactText'>
        <h1> Events </h1>
        <p>Get Tero into your coorporative, party or any event <br></br> <br></br>
      We will make sure that your invitees can taste the delicious experience of an organic and well resourced coffee <br></br><br></br>
        We count with one of the best baristas and will serve in your event. Prices from 40 an hour</p>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dicta soluta, quia placeat vel nam eius, maxime eaque veniam et enim, delectus sapiente in corrupti iste dolores nisi a obcaecati.
      Any event, any chance we will be there
      <button onClick={scrollToForm} type="submit" className="enquireButton">Enquire</button>

      </div>
      <img className='teroStand' src={stand
      }/>
     

      </div>
      <div className='contactPageSecond'   >

      <img className='teroShop' src={cafetiere}/>

      <div className='contactTextSecond'>
        <h1> Sell our products in your business </h1>
        <p>We can provide premium products that will stand out in your shop <br></br> <br></br>
          At tero we know how important is to provide to your customers the best value for what they are paying, that's why we have a partnership program where we
          can provide the most premium blends to your coffee shop or your store<br></br><br></br>
        Make the difference with a responsible resourced and original coffee from the country with the best coffee in the world.</p>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dicta soluta, quia placeat vel nam eius, maxime eaque veniam et enim, delectus sapiente in corrupti iste dolores nisi a obcaecati.
      Any event, any chance we will be there
      <button onClick={scrollToForm} type="submit" className="enquireButton">Enquire</button>

      </div>
     

      </div>
        <div ref={formRef} className="form-container">
          <div className="form-left">
            <h1>Send us an enquiry</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name:</label>
                <input
                  name="sender"
                  value={formDataState.sender}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone number:</label>
                <input
                  name="phoneNumber"
                  value={formDataState.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formDataState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message:</label>
                <textarea
                  name="message"
                  value={formDataState.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='sendContainer'>
              <button type="submit" className="submit-btn">{sending? <div className="loaderMail"></div>:<>Send</>}</button>
              
              </div>
            </form>
          </div>
          <div className="form-right">
            <img src={contactPic}/>
          </div>
        </div>
      </ContactFormStyle>

      </>
    );
}
