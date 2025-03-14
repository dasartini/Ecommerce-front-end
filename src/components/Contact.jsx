import { useState } from 'react';
import ContactFormStyle from '../styles/ContactFormStyle';
import { sendContactEmail } from '../../api';

export default function Contact() {
    const [sending, setSending] = useState(false)
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

    return (
      <ContactFormStyle>
        <div className="form-container">
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
          </div>
        </div>
      </ContactFormStyle>
    );
}
