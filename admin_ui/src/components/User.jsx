import { useEffect, useState } from "react";
import "./User.css";
import { AiTwotoneEdit, AiTwotoneDelete, AiOutlineSave } from "react-icons/ai";
export const User = () => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [updatedUser, setUpdatedUser] = useState({});
    const [dataLength, setDataLength] = useState(0);
    
    useEffect(() => {
        getUsers(page);
        allUsers();
    }, [page]);
    
    const getUsers = (page) => {
        fetch(`https://fake-server-eva.herokuapp.com/users?_page=${page}&_limit=10`).then((res) => res.json()).then((data) => {
            setUsers(data);
        })
    };
    const allUsers = () => {
        fetch("https://fake-server-eva.herokuapp.com/users").then((res) =>res.json()).then((data) => {
            setDataLength(data.length)
        });
    };
    const handleCheck = (e) => {
        const { name, checked } = e.target;
        if(name === "selectAll") {
            let newUsers = users.map((e) => {
                return {...e, isChecked : checked}
            });
            setUsers(newUsers);
        } else {
            let newUsers = users.map((e) =>
            e.name === name ? { ...e, isChecked: checked } : e
          );
          setUsers(newUsers);
        }
    }
    const handleDeleteOne = (id) => {
       const updatedUsers = users.filter((e) => e.id !== id);
        setUsers(updatedUsers);
    }
    function searchUser()
    const handleSearch = (e) => {
        e.preventDefault();
    }
    //////------///////
    const handleEdit = (e) => {
        let tempUsers = users.map((el) =>
        e.id === el.id ? {...el, doEdit : true} : el);
        // setUpdatedUser(tempUsers);
        setUsers(tempUsers);
    }
    const handleChange = (e) => {
         const {name, value} = e.target;
         setUpdatedUser({...updatedUser, [name] : value, doEdit:false});
    }
    const handleSave = (e) => {
       console.log(e);
       console.log(updatedUser)
    }
    /////////------.///////
    return (
        <>
        <div className="container_1">
        <h1>Users List</h1>
        <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search by name email or role" onChange={(e) => setQuery(e.target.value)} /></form>
        </div>
        <div className="container_2">
        <table>
            <thead className="tr">
                <tr>
                    <td><input type="checkbox" name="selectAll" onChange={handleCheck} checked={!users.some((e) => e?.isChecked !== true)}/></td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Role</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {users.map((e) => {
                   return(
                   <tr key={e.id}>
                        <td><input type="checkbox" name={e.name} onChange={handleCheck} checked={e?.isChecked || false}/></td>
                        <td>{e.name} <input defaultValue={e.name} name={e.name} onChange={handleChange} type="text" style={e.doEdit? {visibility:"visible"} : {visibility:"hidden"}} /> </td>
                        <td>{e.email} <input defaultValue={e.email} name={e.email} onChange={handleChange} type="text" style={e.doEdit? {visibility:"visible"} : {visibility:"hidden"}}/></td>
                        <td>{e.role} <input defaultValue={e.role} name={e.role} onChange={handleChange} type="text" style={e.doEdit? {visibility:"visible"} : {visibility:"hidden"}}/></td>
                        <td><AiTwotoneEdit id={e.id} onClick={() => handleEdit(e)} style={!e.doEdit? {visibility:"visible"} : {visibility:"hidden"}}/>
                        <AiOutlineSave style={e.doEdit? {visibility:"visible"} : {visibility:"hidden"}} onClick={()=>handleSave(e)}/>
                         <AiTwotoneDelete onClick={() =>handleDeleteOne(e.id)} style={{color:"rgb(239, 55, 86)"}}/></td>
                    </tr>)
                })}
            </tbody>
        </table>
        </div>
        <div className="footer">
            <div>
                <button className="btn">Delete Selected</button> 
            </div>
            <div>
                <button disabled={page === 1} onClick={() => setPage(page-1)}>Prev</button>
                <button disabled={page === Math.ceil(dataLength/10)} onClick={() => setPage(page+1)}>Next</button>
            </div>
        </div>
        </>
    )
}
