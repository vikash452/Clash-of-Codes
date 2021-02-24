import {useEffect,useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
//import canvas from 'canvasjs';
var CanvasJSReact = require('../assets/canvasjs.react.js');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Codeforces(){
    const handle = 'umanggupta001122';
    var options;
    useEffect(()=>{
        options = {
            title: {
              text: "Basic Column Chart in React"
            },
            data: [{				
                      type: "column",
                      dataPoints: [
                          { label: "Apple",  y: 10  },
                          { label: "Orange", y: 15  },
                          { label: "Banana", y: 25  },
                          { label: "Mango",  y: 30  },
                          { label: "Grape",  y: 28  }
                      ]
             }]
         }
    },[])
    return (
        <div>
            <CanvasJSChart options = {options}/>
            This is codeforces div.
        </div>
    );
}

export default Codeforces;