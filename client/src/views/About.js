import React from 'react'


class About extends React.Component {
    render(){
    return (
        <div className="About">
            <h1>ABOUT</h1>  
            <h3>What is Quilt?</h3>
                <p className="aboutBody">
                    Quilt is a creative space where writers can play and collaborate with each other. 
                    You start by posting an opening snippet of a new piece of work. Other members can suggest 
                    adlibs to append to the work. Adlibs that hit the likes threshold will be appended to the work.
                </p>
            <h3>Our ethos:</h3>
                <p className="aboutBody">
                    Let your imaginations run amok, together!
                </p>

        </div>
    )
    }
}

export default About