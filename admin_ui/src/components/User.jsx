import { useEffect, useState } from "react";
import "./User.css";
export const User = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        getUsers(page);
    }, [page]);
    
    const getUsers = (page) => {
        fetch(`https://fake-server-eva.herokuapp.com/users?_page=${page}&_limit=10`).then((res) => res.json()).then((data) => {
            setUsers(data);
        })
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
    console.log(users)
    return (
        <>
        <div className="container_1">
        <h1>Users List</h1>
        <input type="text" placeholder="Search by name email or role" />
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
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.role}</td>
                        <td>Edit Delete</td>
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
                <button onClick={() => setPage(page+1)}>Next</button>
            </div>
        </div>
        </>
    )
}
