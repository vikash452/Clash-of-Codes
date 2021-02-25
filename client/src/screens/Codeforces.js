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
    const [handle,setHandle]=useState('Marcos_0901')
    var user;

    useEffect(()=>{
        user=JSON.parse(localStorage.getItem('user'))
        if(!user)
        {
            history.push('/signin')
        }
        setHandle(user.codeforces)
    },[]);

    useEffect(()=>{
        let arr = [];
        var dtype = [];
        let i = 0;
        let nmap = new Map();

        fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
        .then(response => response.json())
        .then(data =>{
            //console.table(data);
            data.result.forEach(function(element){
          
                //console.log(element.problem.tags);
                
                if( element.verdict === "OK"){
                    i += 1;
                    arr[i] = element.problem.tags;
                }
            });
            i = 0;
            //console.log(i);
            //console.table(arr);
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
            //console.log(nmap);
            for (let [key, value] of nmap) {
                //console.log(key + ' = ' + value);
                dtype[i] = { label : key, y : value };
                i += 1;
              }
            dtype.sort(compare);
            // console.log(dtype);
            var options2 = {
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
             setOptions(options2)
        })
        .catch((err)=>{
            console.log(err)
        })
    }    
    ,[handle])


    return (
        
        <div>
            <CanvasJSChart options = {options}/>

            <div className="parallax"></div>
        </div>
        
    );
}

export default Codeforces;