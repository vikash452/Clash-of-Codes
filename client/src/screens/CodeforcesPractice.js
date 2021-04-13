import { useState } from "react";

function CodeforcesPractice()
{
    const [initialRating, setInitialRating] = useState(800);

    return (
        <div style={{marginTop:'200px'}}>
            Codeforces Practice page
            <div>
                <h6>
                    Select initial rating of questions
                    <select className='browser-default' onChange={(e)=>{setInitialRating(e.target.value)}}>
                        <option value={800}>800</option>
                        <option value={900}>900</option>
                        <option value={1000}>1000</option>
                        <option value={1100}>1100</option>
                        <option value={1200}>1200</option>
                        <option value={1300}>1300</option>
                        <option value={1400}>1400</option>
                        <option value={1500}>1500</option>
                        <option value={1600}>1600</option>
                    </select>
                </h6>
                <h5>OR</h5>
                <h6>Generate mix</h6>
            </div>
            
        </div>
    )
}

export default CodeforcesPractice;