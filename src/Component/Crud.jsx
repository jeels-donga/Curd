import React, { useEffect, useState } from 'react'

function Crud() {
    const [arr, setArr] = useState([]);
    const [data, setData] = useState({
        FirstName: "",
        LastName: "",
        Gender: "",
    })
    const [login, setLogin] = useState(false);
    const [Index, setIndex] = useState();


    const handChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const Submit = () => {
        // debuggerR
        if (!login) {
            InsertData();
            setData({
                FirstName: "",
                LastName: ""
            })
        } else {
            UpdateInsertData();
            setData({
                FirstName: "",
                LastName: ""
            })
        }
    }
    const InsertData = () => {
        setArr([...arr, data]);
        setData(data);
        if (data.FirstName == "" || data.LastName == "") {
            alert("firstname and lastname are empty");
        } else {
            var data1 = JSON.stringify([...arr, data]);
            localStorage.setItem("data", data1);
        }
    }
    useEffect(() => {
        let list = localStorage.getItem("data");
        let arr1 = arr;
        arr1 = JSON.parse(list);
        if (arr1 == null) {
            setArr([])
        }
        else {
            setArr(arr1);
        }
    }, [])

    const DeleteData = (id) => {
        let arr1 = [...arr]
        arr1.splice(id, 1);
        setArr(arr1);
        var data1 = JSON.stringify(arr1);
        localStorage.setItem("data", data1);
    }
    const EditData = (id) => {
        // debugger
        setData(arr[id]);
        setIndex(id);
        setLogin(true);
    }
    const UpdateInsertData = () => {
        let prearr = [...arr];
        prearr.splice(Index, 1, data)
        setArr(prearr)
        setLogin(false)
        var data1 = JSON.stringify(prearr);
        localStorage.setItem("data", data1);

    }
    return (
        <>
            <div>
                <input type="text" placeholder='FirstName' name='FirstName' value={data.FirstName} onChange={(e) => handChange(e)} /><br />
                < input type="text" placeholder='LastName' name='LastName' value={data.LastName} onChange={(e) => handChange(e)} /><br />
                <div>
                    <label>Gender</label>
                    <label>
                        <input type="radio" name='Gender' value="Male" checked={data.Gender === "Male"} onChange={(e) => handChange(e)} />
                        Male
                    </label>
                    <label>
                        <input type="radio" name='Gender' value="Female" checked={data.Gender === "Female"} onChange={(e) => handChange(e)} />
                        Female
                    </label>
                </div>
                <button onClick={() => Submit()}>submit</button>
            </div>
            {
                (arr == []) ? <h1>empty data</h1> :
                    arr && arr.map((e, i) => {
                        return (
                            <p key={i}>First Name :- {e.FirstName} Last Name :-{e.LastName} Gender:- {e.Gender} <button onClick={() => EditData(i)}>edit</button> <button onClick={() => DeleteData(i)}>Delete</button></p>
                        )
                    })

            }
        </>
    )
}

export default Crud
