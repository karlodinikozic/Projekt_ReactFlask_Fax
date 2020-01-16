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
    padding: "10",
    border:"1px solid black",

}
export default HomePage
