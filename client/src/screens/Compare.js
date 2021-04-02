import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import M from 'materialize-css'
import CanvasJSReact from '../assets/canvasjs.react'
import './design.css';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Compare() {
    const [friendList, setFriendList] = useState([])
    const [friendhandle, setFriendHandle] = useState('Marcos_0901');
    const [userHandle, setUserhandle] = useState('Marcos_0901');
    const [content_1, setContent_1] = useState(null)
    const [content_2, setContent_2] = useState(null)
    const [visible1, setVisible1] = useState(false)
    const [rating1, setRating1] = useState([])
    const [rating2, setRating2] = useState([])
    const [usrsubms, setUserSubms] = useState([])
    const [frndsubms, setFrndSubms] = useState([])

    const history = useHistory()

    useEffect(() => {

        var user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
            history.push('/profile')
        }

        setUserhandle(user.codeforces)
        // console.log(user.codeforces)
        fetch('/user/getFriendList', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setFriendList(data.friends)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    function getRatingChange_user() {
        // console.log(userHandle)
        var list = []
        fetch(`https://codeforces.com/api/user.rating?handle=${userHandle}`)
            .then(res => res.json())
            .then((data) => {
                // data.result.reverse()
                data.result.forEach((element) => {
                    var temp_object = {
                        x: new Date(element.ratingUpdateTimeSeconds * 1000),
                        y: element.newRating
                    }
                    list.push(temp_object)
                })
                // console.log(list)
                setRating1(list)
            })
    }

    function getRatingChange_friend() {
        var list = []
        fetch(`https://codeforces.com/api/user.rating?handle=${friendhandle}`)
            .then(res => res.json())
            .then((data) => {
                // data.result.reverse()
                data.result.forEach((element) => {
                    // console.log(typeof(element.newRating))
                    var temp_object = {
                        x: new Date(element.ratingUpdateTimeSeconds * 1000),
                        y: element.newRating
                    }
                    list.push(temp_object)
                })
                // console.log(list)
                setRating2(list)
            })
    }

    // IS FUNCTION TO FILL KRNA HAI
    function getSubmissionStats(handle_to_find) {
        var accepted = 0;
        var wrong_answer = 0;
        var tle = 0;
        var memory_limit = 0;
        var runtime_error = 0;
        //IN VARIABLES KI VALUE FILL KRWA DIO
        //BAAKI RETURN ME KRWA DUNGA EK OBJECT BNA KE
        //IS PAGE KI FORMATTING BHUT DHYAAN SE KRNI HOGI
        //CANVAS BHUT ERROR DE RHA THA
        //********HANDLE WITH CARE****************//
        fetch(`https://codeforces.com/api/user.status?handle=${handle_to_find}&from=1`)
            .then(response => response.json())
            .then((data) => {
                //console.log(data.result);
                data.result.forEach((element) => {
                    if (element.verdict === "OK")
                        accepted += 1;
                    if (element.verdict === "TIME_LIMIT_EXCEEDED")
                        tle += 1;
                    if (element.verdict === "WRONG_ANSWER")
                        wrong_answer += 1;
                    if (element.verdict === "MEMORY_LIMIT_EXCEEDED")
                        memory_limit += 1;
                    if (element.verdict === "RUNTIME_ERROR")
                        runtime_error += 1;
                })
                //console.log(accepted, tle, wrong_answer, memory_limit, runtime_error);
                let subms = [];
                subms.push({ label: "Accepted", y: accepted });
                subms.push({ label: "Wrong Answer", y: wrong_answer });
                subms.push({ label: "Time Limit Exceeded", y: tle });
                subms.push({ label: "Memory Limit Exceeded", y: memory_limit });
                subms.push({ label: "Runtime Error", y: runtime_error });

                console.table(subms);
                if( handle_to_find === userHandle )
                    setUserSubms(subms);
                else
                    setFrndSubms(subms);
                // var submission_chart = {
                //     exportEnabled: true,
                //     animationEnabled: true,
                //     title: {
                //         text: "Car Parts Sold in Different States"
                //     },
                //     subtitles: [{
                //         text: "Click Legend to Hide or Unhide Data Series"
                //     }],
                //     axisX: {
                //         title: "States"
                //     },
                //     axisY: {
                //         title: "Oil Filter - Units",
                //         titleFontColor: "#4F81BC",
                //         lineColor: "#4F81BC",
                //         labelFontColor: "#4F81BC",
                //         tickColor: "#4F81BC",
                //         includeZero: true
                //     },

                //     toolTip: {
                //         shared: true
                //     },
                //     legend: {
                //         cursor: "pointer",
                //         // itemclick: toggleDataSeries
                //     },
                //     data: [{
                //         type: "column",
                //         name: "Oil Filter",
                //         showInLegend: true,
                //         yValueFormatString: "#,##0.# Units",
                //         dataPoints: [
                //             { label: "New Jersey", y: 19034.5 },
                //             { label: "Texas", y: 20015 },
                //             { label: "Oregon", y: 25342 },
                //             { label: "Montana", y: 20088 },
                //             { label: "Massachusetts", y: 28234 }
                //         ]
                //     },
                //     {
                //         type: "column",
                //         name: "Clutch",
                //         axisYType: "secondary",
                //         showInLegend: true,
                //         yValueFormatString: "#,##0.# Units",
                //         dataPoints: [
                //             { label: "New Jersey", y: 210.5 },
                //             { label: "Texas", y: 135 },
                //             { label: "Oregon", y: 425 },
                //             { label: "Montana", y: 130 },
                //             { label: "Massachusetts", y: 528 }
                //         ]
                //     }]
                // };
                // setsubmissions(submission_chart);
            
    })
}

function Compare() {
    //USER DETAILS
    fetch(`https://codeforces.com/api/user.info?handles=${userHandle};${friendhandle}`)
        .then(res => res.json())
        .then((data) => {
            console.log(data.result[0])
            console.log(data.result[1])
            setContent_1(data.result[0])
            setContent_2(data.result[1])
        })
    getRatingChange_user()
    getRatingChange_friend()
    getSubmissionStats(userHandle)
    getSubmissionStats(friendhandle)
    setVisible1(true)
}

return (
    <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            Compare With
                <select style={{ maxWidth: 'fit-content' }} className='browser-default' onChange={(e) => { setFriendHandle(e.target.value) }}>
                {
                    friendList.map((item) => {    //MATERIALIZE SELECT NOT WORKING
                        // console.log(item.codeforces)
                        return (
                            <option key={item.email} value={item.codeforces}>{item.codeforces}</option>
                        )
                    })

                }
            </select>
                OR
                <input type='text' onChange={(e) => { setFriendHandle(e.target.value) }} style={{ maxWidth: 'fit-content' }} />
            <button onClick={() => {
                // console.log(friendhandle)
                Compare()
            }}>Compare</button>
        </div>
        <div className='compareTable'>
            {
                (content_1 && content_2)
                    ?

                    <table>
                        <thead>
                            <tr>
                                <td style={{ textAlign: 'center' }}>
                                    <img src={content_1.titlePhoto} style={{ width: '100px', height: '100px' }} />
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <img src={content_2.titlePhoto} style={{ width: '100px', height: '100px' }} />
                                </td>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {content_1.handle}
                                </td>
                                <td>
                                    {content_2.handle}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {content_1.rank}
                                </td>
                                <td>
                                    {content_2.rank}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {content_1.rating1} {content_1.rank} (max rating : {content_1.maxRating} , {content_1.maxRank})
                                </td>
                                <td>
                                    {content_2.rating1} {content_2.rank} (max rating : {content_2.maxRating} , {content_2.maxRank})
                                </td>
                            </tr>
                        </tbody>

                    </table>

                    :
                    <></>
            }
        </div>

        <div>
            {
                visible1
                    ?
                    <CanvasJSChart options={

                        {
                            animationEnabled: true,
                            theme: "light2",
                            backgroundColor: 'rgba(0,0,0,0)',
                            lineColor: 'White',
                            title: {
                                text: "Your rating change",
                                fontSize: 30,
                                fontColor: "White",
                                fontFamily: "Helvetica",
                                horizontalAlign: "center",
                                padding: 5,
                            },
                            axisX: {
                                title: "Date",
                                // reversed: true,
                                labelAutoFit: true,
                                labelFontSize: 15,
                                labelFontColor: 'White',
                                titleFontColor: 'White',
                                lineColor: 'White',
                            },
                            axisY: {
                                title: "Rating",
                                labelAutoFit: true,
                                labelFontSize: 15,
                                labelFontColor: 'White',
                                titleFontColor: 'White',
                                lineColor: 'White',
                            },
                            height: 500,
                            // width:1000,
                            legend: {
                                fontColor: 'White'
                            },
                            data: [
                                {
                                    type: "spline",
                                    // markerSize:0,
                                    showInLegend: true,
                                    legendText: `${userHandle}`,
                                    dataPoints: rating1,
                                    // lineColor:'White'
                                },
                                {
                                    type: "spline",
                                    // markerSize:0,
                                    showInLegend: true,
                                    legendText: `${friendhandle}`,
                                    dataPoints: rating2,
                                    // lineColor:'White'
                                }
                            ]
                        }
                    }
                    />
                    :
                    <></>
            }
        </div>
        <div style={{marginTop: '5rem'}}>
            {
                (usrsubms.length > 0 && frndsubms.length >0 )
                ?
                <CanvasJSChart options={

                    {
                        animationEnabled: true,
                        theme: "light2",
                        backgroundColor: 'rgba(0,0,0,0)',
                        lineColor: 'White',
                        title: {
                            text: "Your submission profile",
                            fontSize: 30,
                            fontColor: "White",
                            fontFamily: "Helvetica",
                            horizontalAlign: "center",
                            padding: 5,
                        },
                        axisX: {
                            title: "Date",
                            // reversed: true,
                            labelAutoFit: true,
                            labelFontSize: 15,
                            labelFontColor: 'White',
                            titleFontColor: 'White',
                            lineColor: 'White',
                        },
                        axisY: {
                            title: "Number of questions",
                            labelAutoFit: true,
                            labelFontSize: 15,
                            labelFontColor: 'White',
                            titleFontColor: 'White',
                            lineColor: 'White',
                        },
                        height: 500,
                        // width:1000,
                        legend: {
                            fontColor: 'White'
                        },
                        data: [
                            {
                                type: "column",
                                // markerSize:0,
                                showInLegend: true,
                                legendText: `${userHandle}`,
                                dataPoints: usrsubms,
                                // lineColor:'White'
                            },
                            {
                                type: "column",
                                // markerSize:0,
                                showInLegend: true,
                                legendText: `${friendhandle}`,
                                dataPoints: frndsubms,
                                // lineColor:'White'
                            }
                        ]
                    }
                }
                />
                :
                <>
                </>


            }
        </div>
    </div>
)
}

export default Compare;