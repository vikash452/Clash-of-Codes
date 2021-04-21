import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import './design.css'
import BlobbyButton from './BlobbyButton'

function DSA() {


    const [topic, setTopic] = useState('greedy');
    const [difficulty, setDifficulty] = useState('easy')
    const [questions, setQuestions] = useState([])
    const [alreadySolved, setAlreadySolved] = useState([])
    // var alreadySolved=[]
    var user;

    useEffect(() => {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
        user = JSON.parse(localStorage.getItem('user'))
        // console.log(user.dsaQuestion.includes('abc'))
        // setAlreadySolved(user.dsaQuestion)
        var temp = []
        user.dsaQuestion.forEach((qu) => {
            // console.log(qu._id)
            temp.push(qu._id)
        })

        // console.log(temp)
        // console.log(alreadySolved)
        setAlreadySolved(temp)

    }, [])

    function GetQuestions() {
        // console.log(alreadySolved)
        fetch(`/question/getQuestion?topic=${topic}&difficulty=${difficulty}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setQuestions(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function MarkAsDone(questionID) {
        fetch('/question/markAsDone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                id: questionID
            })
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                // setQuestions(data)
                if (!data.error) {
                    localStorage.setItem('user', JSON.stringify(data))
                    user = data
                    var temp = alreadySolved;
                    setAlreadySolved([
                        ...alreadySolved,
                        questionID
                    ])
                    // console.log(alreadySolved)
                }
                else {
                    console.log(data)
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    function Undone(questionID) {
        // console.log(alreadySolved)
        fetch('/question/undone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                id: questionID
            })
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                // setQuestions(data)
                if (!data.error) {
                    localStorage.setItem('user', JSON.stringify(data))
                    user = data
                    // var temp=alreadySolved
                    var temp = alreadySolved.filter((item) => {
                        return item != questionID
                    })
                    // temp.pull(questionID

                    setAlreadySolved(temp)
                }
                else {
                    console.log(data)
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="DSA-div" style={{}}>
            <h2 className="msg">Let's us help you hone your knowledge of <br></br>Data Structures and Algorithms.</h2>
            {/* <div style={{display:'flex' , justifyContent:'space-evenly'}}> */}
            {/* <div style={{width:'600px'}}> */}
            <div className="content">
                <h3>Start by choosing questions based on the topic as well as the difficulty level.</h3>

                <div className="options" style={{}}>
                    <select onChange={(e) => {
                        setTopic(e.target.value)
                    }}>
                        <option value={'greedy'}>Greedy</option>
                        <option value={'dp'}>DP</option>
                        <option value={'bitmasking'}>Bit Masking</option>
                        <option value={'stacks'}>Stacks</option>
                        <option value={'queues'}>Queues</option>
                        <option value={'array'}>Arrays</option>
                        <option value={'string'}>Strings</option>
                        <option value={'sorting'}>Sorting</option>
                        <option value={'graphs'}>Graphs</option>
                        <option value={'backtracking'}>Backtracking</option>
                    </select>

                    <select onChange={(e) => {
                        setDifficulty(e.target.value)
                    }}>
                        <option value={'easy'}>Easy</option>
                        <option value={'medium'}>Medium</option>
                        <option value={'difficult'}>Difficult</option>
                    </select>
                </div>

                {/* style={{backgroundColor:'blueviolet'}} */}
                {/* <button className='btn btn-large' onClick={()=>{GetQuestions()}}>Get Questions</button> */}
                <div className="button-class">
                    <button className="blobby-button" onClick={() => { GetQuestions() }} style={{
                        // marginLeft: '0.9rem',
                        // fontSize: '1.2rem'
                    }}>
                        Get Questions
                    <BlobbyButton />
                    </button>
                </div>

                <h3> Your past performance </h3>
                <div className="performance" style={{
                    // backgroundColor: 'whitesmoke',
                    //  color: 'blueviolet', 
                    //  marginLeft: '10%', 
                    //  marginRight: '10%', 
                    //  opacity: '0.8', 
                    //  boxShadow: '5px 5px 15px black'
                }}>
                    <table className="questions">
                        <thead>
                            <tr className="table-header">
                                <td className="col1" ><h4>S.No</h4></td>
                                <td className="col1" ><h4>Question</h4></td>
                                <td className="col1" ><h4>Status</h4></td>
                            </tr>
                        </thead>
                        <tbody className="data">
                            {
                                questions.map((item, index) => {
                                    var questionID = item._id
                                    return (
                                        <tr key={questionID}>
                                            <td style={{}}><h5>{index + 1}</h5></td>
                                            <td style={{}}><h5><a href={item.url} target='_blank' style={{
                                                color: '#000'
                                            }}>{item.questionName}</a></h5></td>
                                            <td style={{ textAlign: 'center' }}>
                                                {
                                                    alreadySolved.includes(item._id)
                                                        ?
                                                        <h5 style={{
                                                            fontFamily: '"Nova Round", cursive',
                                                            textAlign: 'center',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}><span style={{ 
                                                            borderRadius: '5px',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            flexDirection: 'row'
                                                    }}><i className='material-icons small' style={{background: '#67ff02',}}>done</i><h5 style={{margin: '0', padding: '1px 6px'}}>Already Done</h5>  </span><button onClick={() => {
                                                            Undone(questionID)
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            background: 'rgba(230, 236, 233, 0.8)',
                                                            color: '#000'
                                                        }}>Undone</button> </h5>
                                                        :
                                                        <button onClick={() => {
                                                            MarkAsDone(questionID)
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            background: 'rgba(230, 236, 233, 0.5)',
                                                            color: '#000'
                                                        }}><h5 style={{
                                                            fontFamily: '"Nova Round", cursive',
                                                            textAlign: 'center',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}><i className='material-icons small'>edit</i>Mark as Done</h5> </button>

                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>


            </div>
            {/* <div style={{width:'600px'}}>
                    <h3>Here you will have statistics</h3>
                </div> */}
            {/* </div> */}

        </div>
    )
}

export default DSA;