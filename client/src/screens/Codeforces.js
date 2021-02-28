import {useEffect,useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import CanvasJSReact from '../assets/canvasjs.react'
import './design.css';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function compare(a, b){
    return b.y - a.y;
}
function Codeforces(){
    const history=useHistory()
    // const handle = 'Marcos_0901';
    const [loaded,setLoaded]=useState(false)
    const [options,setOptions]=useState({})
    const [handle,setHandle]=useState('')
    const [totalQuestions,setTotalQuestion]=useState(0);
    const [options2,setOptions2]=useState({})
    var user;

    useEffect(()=>{
        user=JSON.parse(localStorage.getItem('user'))
        if(!user)
        {
            history.push('/signin')
        }
        setHandle(user.codeforces)
        
        if(handle)
        trigger_after_page_loading()
    },[handle]);

    function trigger_after_page_loading()
    {
        if(handle.length == 0)
        {
            alert("Please set your codeforces handle");
            history.push('/profile');
        }
        
        let arr = [];
        var dtype = [];
        let i = 0;
        let nmap = new Map();

        fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
        .then(response => response.json())
        .then(data =>{
            
            var total_question=new Set()
            var questions_per_day_map=new Map()
            var questions_per_day_array=[];
            data.result.forEach((element)=>{
                if(element.verdict === 'OK')
                {
                    total_question.add(element.problem.contestId.toString() + element.problem.index)
                    var dateOfQues = new Date(element.creationTimeSeconds*1000);
                    var formattedDate = dateOfQues.getDate() + '/' + (dateOfQues.getMonth()+1) + '/' + dateOfQues.getFullYear();

                    if(questions_per_day_map.has(formattedDate))
                    {
                        questions_per_day_map.set( formattedDate , questions_per_day_map.get(formattedDate)+1);
                    }
                    else
                    {
                        questions_per_day_map.set( formattedDate , 1);
                    }
                }
            })

            const iterator1=questions_per_day_map[Symbol.iterator]();
            for(const item of iterator1)
            {
                var temp_object={
                    label:item[0],
                    y:item[1]
                }
                questions_per_day_array.push(temp_object)
            }

            // questions_per_day_array.reverse()
            // console.log(questions_per_day_array)

            var temp_options_2={
                animationEnabled: true,
			        theme: "light2",
			        title:{
                        text: "Questions done per day",
                        fontSize :30,
                        fontColor : "Green",
                        fontFamily: "Helvetica",
                        horizontalAlign : "center",
                        padding: 5,
			        },
			        axisX: {
			        	title: "Date",
                        reversed: true,
                        labelAutoFit:true,
                        labelFontSize:15,
			        },
			        axisY: {
			        	title: "Number of Questions successfully solved",
                        labelAutoFit:true,
                        labelFontSize:15,
                    },
                    height : 500,
			        data: [{
			        	type: "spline",
                        dataPoints: questions_per_day_array
			        }]
            }

            setOptions2(temp_options_2)

            setTotalQuestion(total_question.size)

            data.result.forEach(function(element){
                
                if( element.verdict === "OK"){
                    i += 1;
                    arr[i] = element.problem.tags;
                }
            });
            i = 0;
            arr.forEach( function(element){
                element.forEach(function(str){
                    if( nmap.has(str) == false )
                        nmap.set(str, 1);
                    else{
                        let v = nmap.get(str);
                        nmap.set(str, v+1);
                    }
                })
            })
            for (let [key, value] of nmap) {
                //console.log(key + ' = ' + value);
                dtype[i] = { label : key, y : value };
                i += 1;
              }
            dtype.sort(compare);
            var temp_options_1 = {
                    animationEnabled: true,
			        theme: "light2",
			        title:{
                        text: "Your Overall Codeforces performance",
                        fontSize :30,
                        fontColor : "Purple",
                        fontFamily: "Helvetica",
                        horizontalAlign : "center",
                        padding: 5,
                        //borderThickness: 2,
                        //dockInsidePlotArea : true
			        },
			        axisX: {
			        	title: "Problem tags",
                        reversed: true,
                        labelAutoFit:true,
                        labelFontSize:20,
                        interval:1,
                        tickLength: 1,
                        // labelMaxWidth: 70
			        },
			        axisY: {
			        	title: "Number of Questions successfully solved",
			        	includeZero: true,
                        labelFontSize:20,
                        // interval:1,
                        tickLength: 1,
                        labelMaxWidth: 70
                    },
                    height : 700,
			        data: [{
			        	type: "bar",
                        dataPoints: dtype
			        }]
             }
             setOptions(temp_options_1)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        
        <div>
            <h2>You have done {totalQuestions} questions</h2>
            <div className="parallax1"></div>
            <CanvasJSChart options = {options}/>
            <div className="parallax2"></div>
            <CanvasJSChart options = {options2}/>

            <div className="parallax"></div>
        </div>
        
    );
}

export default Codeforces;