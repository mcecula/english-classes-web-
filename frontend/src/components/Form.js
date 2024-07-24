import axios from 'axios'
import config from '../config';
import { useState } from 'react';
import './Form.css'

const Form = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [message, setMessage,] = useState('')
    const [errors, setErrors] = useState([])

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangeTel = (e) => {
        setTel(e.target.value)
    }

    const handleChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const saveEvent = (eventObj) => {
        axios.post(config.api.url + '',eventObj, { mode: 'cors' })
        .then((res) => {
            /* props.getEvents() */
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const resetForm = () => {
        setName('')
        setEmail('')
        setTel('')
        setMessage('')
        setErrors([])
    }

    const validateForm = (e) => {
        e.preventDefault()
        let errorsValidate = []
        if (name.trim() === '') {
            errorsValidate.push('Enter first name and last name')
        }
        if (email.trim() === '') {
            errorsValidate.push('Enter email')
        }
        if (tel.trim() === '') {
            errorsValidate.push('Enter contact number')
        }
        if (errorsValidate.length > 0) {
            setErrors(
                errorsValidate.map((errorText, index) => {
                    return <li key={index}>{errorText}</li>
                })
            )
            return false
        }

        const newEvent = {
            name: name,
            email: email,
            tel: tel,
            message: message,
        }
        saveEvent(newEvent)
        resetForm()
    }


    return (
        <div className='background'>
        <div className="formWrapper">
            <form className='form' onSubmit={validateForm}>
                <div className="wrapper">
                    <label htmlFor="name" >First name and last name:</label>
                    <input type="text" id='name' placeholder="First name and last name" value={name} onChange={handleChangeName} />
                </div>

                <div className="wrapper">
                    <label htmlFor="email" >Email:</label>
                    <input type="text" id='email' placeholder="Email" value={email} onChange={handleChangeEmail} />
                </div>

                <div className="wrapper">
                    <label htmlFor="tel" >Contact number:</label>
                    <input type="number" id='tel' placeholder="Contact number" value={tel} onChange={handleChangeTel} />
                </div>
                <label htmlFor="tel" >Message:</label>
                <textarea name="message" id="message" placeholder="You notes" className="form-field" value={message} onChange={handleChangeMessage}></textarea>

                <div className="wrapper">
                    <button type="submit" className='submit'>Sign up</button>
                </div>
                
            </form>
            <div className="errorsWrapper">
                <ul className="errors">
                    <strong>{errors}</strong>
                </ul>
            </div>
        </div>
        </div>
    )
}
export default Form