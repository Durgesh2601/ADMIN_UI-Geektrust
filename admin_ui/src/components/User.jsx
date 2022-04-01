import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
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
        fetch(`https://fake-server-eva.herokuapp.com/users?_page=${page}&_limit=10`).then((res)=>res.json()).then((data) => setUsers(data));
    }
    return (
        <>
        <div className="container1">
        <Typography variant="h2" sx={{ textAlign: 'center' }} component="div" gutterBottom>
        Users List
      </Typography>
        <form>
        <TextField
          sx={{ width: '95%' }}
          size='small'
          id="outlined-textarea"
          label="Search user"
          placeholder="Search by name, email or role"
          multiline
        />
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