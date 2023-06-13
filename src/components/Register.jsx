import { Formik, Field, Form, ErrorMessage } from "formik"
import { NavLink } from "react-router-dom"
import Button from "./Button"
import './register.css'
import axios from "axios"
import { useState } from "react"

function Register() {
    const [registered, setRegistered] = useState(false)

    if (registered) {
        return (
            <h4>Congratulations ✅! You've been successfully registered!</h4>
        )
    }
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: ''
            }}
            validate={(valores) => {
                let errors = {}

                if (!valores.username) {
                    errors.username = 'Please type a name'
                } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)) {
                    errors.username = 'El nombre solo puede contener letras y espacios'
                }

                if (!valores.email) {
                    errors.email = 'Please type a username'
                } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
                    errors.email = 'El username solo puede contener letras y espacios';
                }

                if (!valores.password) {
                    errors.password = 'Please type a password'
                } else if (!/^.{4,12}$/.test(valores.password)) {
                    errors.password = 'El password tiene que estar entre 4 y 12 caracteres'
                }

                return errors
            }}
            onSubmit={(credentials) => {
                axios.post("http://localhost:3001/api/auth/register", credentials)
                    .then(() => {
                        setRegistered(true)
                    })
            }}>

            {({ errors }) => (
                <Form className="register">
                    <div className="register__container">
                        <label htmlFor="username" className="register__text">Username</label>
                        <Field
                            type="text"
                            id="username"
                            name="username"
                            className="register__input"
                            placeholder="Jhon Doe"
                        />
                        <ErrorMessage name="name" component={() => (
                            <div className="error">{errors.username}</div>
                        )} />
                    </div>
                    <div className="register__container">
                        <label htmlFor="Email" className="register__text">Email</label>
                        <Field
                            type="text"
                            id="email"
                            name="email"
                            className="register__input"
                            placeholder="Jhon Doe"
                        />
                        <ErrorMessage name="name" component={() => (
                            <div className="error">{errors.email}</div>
                        )} />
                    </div>
                    <div className="register__container">
                        <label htmlFor="password" className="register__text">Password</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            className="register__input"
                            placeholder="Password"
                        />
                        <ErrorMessage name="name" component={() => (
                            <div className="error">{errors.password}</div>
                        )} />
                    </div>
                    <Button type="submit" buttonStyle="btn--blue--medium" buttonSize="btn--large">Register</Button>
                    <NavLink className="register__create" to="/login">Login</NavLink>
                </Form>
            )}
        </Formik>
    )
}

export default Register