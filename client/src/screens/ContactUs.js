import mypic from '../images/my pic.jpg'
import umang2 from '../images/umang2.jpeg'
import linkedin from '../images/linkedin.png'
import github from '../images/github.png'

function ContactUs()
{
    return (
        <div style={{marginTop:'40px'}}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <div>
                    <h3>
                        Contact us at :
                    </h3>
                </div>
                 
                <div>
                    <h3>
                        <a href='mailto:ClashOfCodes1729@gmail.com' target='_blank'>
                            ClashOfCodes
                        </a>
                    </h3>
                </div>
                
            </div>
            
            <div className='developerCard'>
                <div>
                    <h3>
                        About the developers
                    </h3>
                </div>

                <div style={{display:'flex', flexDirection:'row', marginBottom:'20px', justifyContent:'space-around', marginLeft:'10px', marginRight:'10px'}}>
                    <img src={mypic}  style={{width:'200px', height:'200px', borderRadius:'150px'}}/>
                    <h4>
                        Hi! my name is Vikash.
                        I am II year student at Delhi Technological University.
                        I am MERN stack developer and a technological enthusiast.
                        <div style={{marginTop:'10px'}}>

                            <a href='https://www.linkedin.com/in/vikash-prasad-482944197' target='_blank'>
                                <img src={linkedin} style={{width:'50px', height:'50px'}}/>
                            </a>

                            <a href='https://github.com/vikash452' target='_blank'>
                                <img src={github} style={{width:'50px', height:'50px', marginLeft:'50px'}}/>
                            </a>
                            
                        </div>
                        
                    </h4>
                </div>
                
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around' ,marginLeft:'10px', marginRight:'10px', paddingBottom:'20px'}}>
                    <img src={umang2}  style={{width:'200px', height:'200px', borderRadius:'100px'}}/>
                    <h4>
                        Hi! my name is Umang Gupta.
                        I am II year student at Delhi Technological University.
                        I am a front end developer and competitive programmer.
                        <div style={{marginTop:'10px'}}>

                            <a href='https://www.linkedin.com/in/umang-gupta-4801a519a' target='_blank'>
                                <img src={linkedin} style={{width:'50px', height:'50px'}}/>
                            </a>

                            <a href='https://github.com/Umang2023' target='_blank'>
                                <img src={github} style={{width:'50px', height:'50px', marginLeft:'50px'}}/>
                            </a>
                            
                        </div>
                        
                    </h4>
                </div>

            </div>
        </div>
    )
}

export default ContactUs;