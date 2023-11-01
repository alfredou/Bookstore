import "./userinfo.css"
import { Formik, Field, Form, ErrorMessage } from "formik"
import Button from "../Button/Button"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import toast, { Toaster } from 'react-hot-toast';
import { apiUrl } from "../../services/api"     

     const notify = () => toast.success('User updated sucessfully');
     
     export function UserInfo() {
         const { user, dispatch } = useContext(AuthContext)

         return (
             <Formik
                 initialValues={{
                     username: user.username,
                     email: user.email,
                     password: '',
                     repeatPassword: ''
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
     
                     if (!/^.{0,12}$/.test(valores.password)) {
                         errors.password = 'El password tiene que estar entre 0 y 12 caracteres'
                     }
                     if (valores.password !== valores.repeatPassword){
                         errors.repeatPassword = 'El password debe ser similar al ingresado'
                     }
                     return errors
                 }}
                 onSubmit={(credentials) => {
                     const {repeatPassword, ...otherData} = credentials
                      
                     apiUrl.patch(`/user/updateUser/${user._id}`, otherData, {
                         withCredentials: true 
                        }).then((res) => {
                            //setUpdated(true)
                             //console.log("data", res.data)
                            if(res.data){
                                //console.log("data", res.data)
                                dispatch({ type: "LOGIN_SUCESS", payload: res.data })
                                notify()
                            }
                         })
                 }}>
     
                 {({ errors }) => (
                     <Form className="update__user">
                         <Toaster
                             position="bottom-right"
                             reverseOrder={false}
                          />
                         <h2 className="updateuser__title">Update user credentials</h2>
                         <div className="updateuser__container">
                             <label htmlFor="username" className="updateuser__text">Username</label>
                             <Field
                                 type="text"
                                 id="username"
                                 name="username"
                                 className="updateuser__input"
                                 placeholder="username"
                             />
                             <ErrorMessage name="username" component={() => (
                                 <div className="error">{errors.username}</div>
                             )} />
                         </div>
                         <div className="updateuser__container">
                             <label htmlFor="Email" className="updateuser__text">Email</label>
                             <Field
                                 type="text"
                                 id="email"
                                 name="email"
                                 className="updateuser__input"
                                 placeholder="email"
                             />
                             <ErrorMessage name="email" component={() => (
                                 <div className="error">{errors.email}</div>
                             )} />
                         </div>
                         <div className="updateuser__container">
                             <label htmlFor="password" className="updateuser__text">Password</label>
                             <Field
                                 type="password"
                                 id="password"
                                 name="password"
                                 className="updateuser__input"
                                 placeholder="Password"
                             />
                             <ErrorMessage name="password" component={() => (
                                 <div className="error">{errors.password}</div>
                             )} />
                         </div>
                         <div className="updateuser__container">
                             <label htmlFor="repeatPassword" className="updateuser__text">Repeat Password</label>
                             <Field
                                 type="password"
                                 id="repeatPassword"
                                 name="repeatPassword"
                                 className="updateuser__input"
                                 placeholder="Password"
                             />
                             <ErrorMessage name="repeatPassword" component={() => (
                                 <div className="error">{errors.repeatPassword}</div>
                             )} />
                             </div>
                         <Button type="submit" buttonStyle="btn--blue--medium" buttonSize="btn--large">Update</Button>
                     </Form>
                 )}
             </Formik>
         )
     }
     