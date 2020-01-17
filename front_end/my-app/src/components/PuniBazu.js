import React,{useState} from 'react'
import axios from 'axios';
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Col, Container } from 'react-bootstrap';

function PuniBazu(props) {

    const {students} = props

    console.log(students)

    const [JMBAGinUse,setJMBAGinUse] = useState({used:false,JMBAG:-1})

    const checkIfJMBAGexists = (JMBAG)=>{
        return students.filter(student => {
  
        
          if(student.JMBAG === JMBAG){
            
            return student
          }
        }).length === 1;
  
       
      }
  
    return (
        <Formik
        initialValues = {{
            ime : "",
            prezime : "",
            JMBAG : ""
        }}
        
        onSubmit={
            (values,{setSubmitting})=>{  
                if(!checkIfJMBAGexists(values.JMBAG)){
                    setJMBAGinUse({used:false,JMBAG:-1})
                    axios.post("https://kdkman.pythonanywhere.com/student",values)
                    .then(res=>console.log(res.data))
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 1000);
                    
                }
                else{
                    setJMBAGinUse({used:true,JMBAG:values.JMBAG})
                }

                

                
            }
        }

        //schema
        validationSchema = {
            Yup.object().shape({
                ime: Yup.string()
                .max(30, "Ime can't be over 30 characters long ")
                .min(3,"Ime must be at least 3 characters long")
                .matches(/^[a-zA-ZčČćĆžŽđĐšŠ]+$/,"Ime can only have characters")
                .required("Required"),
                prezime: Yup.string()
                .required("Required")
                .matches(/^[a-zA-ZčČćĆžŽđĐšŠ]+$/,"Prezime can only have characters")
                .max(10,"Prezime can't be over 10 characters long ")
                .min(3,"Prezime must be at least 3 characters long"),
                JMBAG: Yup.string()
                .required("Required")
                .max(10,"JMBAG must be 10 numbers")
                .min(10,"JMBAG must be 10 numbers")
                .matches(/^[0-9]+$/,"JMBAG must be only numbers")
                
                
                
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
                        <Form.Label>Ime</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ime"
                            name="ime"
                            value={values.ime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.ime && touched.ime && "error" }
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.ime}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationFormik02">
                        <Form.Label>Prezime</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Prezime"
                            name="prezime"
                            value={values.prezime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.prezime && touched.prezime && "error" }
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.prezime}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationFormik02">
                        <Form.Label>JMBAG</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="JMBAG"
                            name="JMBAG"
                            value={values.JMBAG}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.JMBAG && touched.JMBAG && "error" }
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.JMBAG}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button type="submit" disabled={isSubmitting}>Dodaj Studenta</Button>
                    </Form.Row>
                </Form>
                {
                    JMBAGinUse.used && values.JMBAG === JMBAGinUse.JMBAG?
                    <Col>
                        <h2>JMBAG {values.JMBAG} is already in use</h2>
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

export default PuniBazu
