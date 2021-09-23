import './contact-form.css';
import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [result, setResult] = useState(null)

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/email/send' , formData);
            setResult(res.data);
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            setResult({
                success: false,
                message: 'Something went wrong. Try again later.'
            });
        }

    }

    return (
        <div className="contact_form_wrapper">
            <form action="" className="contact_form" onSubmit={submitHandler}>
                <div className="input_wrapper">
                    <input
                        type="text"
                        name="name"
                        className="contact_input"
                        placeholder="Name"
                        required
                        onChange={onChangeHandler}
                        value={formData.name}
                    />
                </div>
                <div className="input_wrapper">
                    <input
                        type="email"
                        name="email"
                        className="contact_input"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="input_wrapper">
                    <textarea
                        name="message"
                        rows="10"
                        className="contact_input"
                        placeholder="Enter your message here..."
                        required
                        value={formData.message}
                        onChange={onChangeHandler}
                    ></textarea>
                </div>
                <div className="input_wrapper">
                    <button
                        type="submit"
                        className="button primary_btn"
                    >Submit</button>
                </div>
            </form>
            {result && (
                <p className={`${result.success ? 'success' : 'error'}`}>
                    {result.message}
                </p>
            )}
        </div>
    );
};

export default ContactForm;