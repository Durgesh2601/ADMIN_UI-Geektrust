import { useEffect, useState } from "react";
import Pagination from '@material-ui/lab/Pagination';
import "./User.css";
import { UserList } from "./UserList";
export const User = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        getUsers(page);
    },[page]);

    const getUsers = (page = 1) => {
        fetch(`http://localhost:3001/users?_page=${page}&_limit=10`).then((res)=>res.json()).then((data) => setUsers(data));
    }
    return (
        <>
        <div className="container-sm cont1 mt-2">
        <h1 className="dispaly-1 text-center">Users List</h1>
        <form>
        <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
        </form>
        </div>
        <table className="table mt-4">
            <thead>
                <tr>
                    <th><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((e) => {
                    return(
                        <>
                        <tr>
                            <UserList key={+e.id.toString()} name={e.name} email={e.email} role={e.role} />
                        </tr>
                        </>
                    )
                })}
            </tbody>
        </table>
        <div className="container mt-5 ms-10 pagination">
        <button type="button" class="btn btn-danger">Delete Selected</button>
        <Pagination count={10} showFirstButton showLastButton/>
        </div>
        </>
    )
}