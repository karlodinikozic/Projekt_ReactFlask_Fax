import React, { useEffect,useState } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";


import { Form, Button, Container, Col } from 'react-bootstrap'


function Login(props) {

    //invalid username password
    const [invalidUP,setInvalidUP] = useState(false)
    return (
        <Formik
        initialValues = {{
            username : "",
            password : "",
        }}
        onSubmit={
            (values,{setSubmitting})=>{

                if(values.username === "admin" && values.password==="123"){
                    props.history.push("/home")
                }
                else{
                    setInvalidUP(true)
                    setTimeout(() => {
                        console.log("Logging in", values);
                        setSubmitting(false);
                      }, 500);
                }

                
            }
        }

        //schema
        validationSchema = {
            Yup.object().shape({
                username: Yup.string()
                .max(30, "Username can't be over 30 characters long ")
                .min(3,"Username must be at least 3 characters long")
                .required("Required"),
                password: Yup.string()
                .required("Required")
                .max(10,"Password can't be over 10 characters long ")
                .min(3,"Password must be at least 3 characters long")
                
            })
        }
    >
    {props =>{
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
            
        return(
            <Container>
                <Form noValidate  onSubmit={handleSubmit} >
                    <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationFormik03">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.username && touched.username && "error" }
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationFormik02">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.username && touched.username && "error" }
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button type="submit" disabled={isSubmitting}>Login</Button>
                    </Form.Row>
                </Form>
                {
                    invalidUP?
                    <Col stlye={errorMsg}>
                    <h2>Invalid Credentials</h2>
                    </Col>
                    :
                    null
                }
               

            </Container>
        )
    }}


    </Formik>
    )
}


const errorMsg = {
    color:" rgb(235, 54, 54)",
    fontSize: "14px",
}
export default Login



