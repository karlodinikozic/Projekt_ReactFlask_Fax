import React from 'react'
import StudentsNeedHelp from './StudentsNeedHelp'

function HomePage() {
    return (
        <div>
            
            <div style = {container}>
                <h1>Home Page</h1>
                <StudentsNeedHelp/>
            </div>
        </div>
    )
}
const container = {
    maring:"0 auto ",
    padding: "10",
    border:"1px solid black",
    width:"960px",

}
export default HomePage
