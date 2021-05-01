async function UniqueSubmissions(handle)
{
    // console.log('in function')
    var acceptedSubmissions=[]      // will remove this array in future
    var sub_data_promise=await fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
    var sub_data=await sub_data_promise.json()
    var checker_map=new Map()
    sub_data.result.forEach(element => {
        if(element.verdict === 'OK')
        {
            var unique=element.problem.contestId.toString() + element.problem.index
            if(!checker_map.has(unique))
            {
                acceptedSubmissions.push(element)
                checker_map.set(unique,element)
            }
        }
    });
    // console.log(checker_map)
    return checker_map;
}

async function AllSubmissions(handle)
{
    var promise=await fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
    var data=await promise.json()
    var all_submissions=new Map()

    data.result.forEach((element)=>{
        var unique=element.problem.contestId.toString() + element.problem.index
        if(!all_submissions.has(unique))
        {
            all_submissions.set(unique,element)
        }
    })
    return all_submissions
}

// export {UniqueSubmissions,AllSubmissions};
export default UniqueSubmissions;
export {AllSubmissions};