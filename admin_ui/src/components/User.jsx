import { useEffect, useState } from "react";
import "./User.css";
import { AiTwotoneEdit, AiTwotoneDelete, AiOutlineSave } from "react-icons/ai";
export const User = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");
  const [dataLength, setDataLength] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getUsers(page);
    allUsers();
  }, [page]);

  const getUsers = (page) => {
    fetch(`https://fake-server-eva.herokuapp.com/users?_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };
  const allUsers = () => {
    fetch("https://fake-server-eva.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => {
        setDataLength(data.length);
      });
  };
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (name === "selectAll") {
      let newUsers = users.map((e) => {
        return { ...e, isChecked: checked };
      });
      setUsers(newUsers);
      for (let i = 0; i < users.length; i++) {
        selectedRows.push(users[i].id);
      }
    } else {
      let newUsers = users.map((e) =>
        e.name === name ? { ...e, isChecked: checked } : e
      );
      setUsers(newUsers);
      setSelectedRows([...selectedRows, e.target.id]);
    }
  };
  const handleDeleteOne = (id) => {
    const updatedUsers = users.filter((e) => e.id !== id);
    setUsers(updatedUsers);
  };
  const handleDeleteMultiple = () => {
    if (selectedRows.length === 0) {
      alert(
        "Looks like you haven't selected any item! Please select at least one item."
      );
    }
    const newUsers = users.filter((e) => !selectedRows.includes(e.id));
    if(newUsers.length ===0) {
      alert("Successfully deleted selected users! No users on this page. Click ok to go the next page");
      setPage(page+1);
    }
    setUsers(newUsers);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const updatedUsers = users.filter(
      (el) => el.name === query || el.email === query || el.role === query
    );
    if (updatedUsers.length === 0) {
      alert("Oops! No user found with the given data");
      window.reload();
    }
    setUsers(updatedUsers);
    e.target.children[0].value=null;
  };
  const allPages = [];
  for (let i = 1; i <= Math.ceil(dataLength / 10); i++) {
    allPages.push(i);
  }
  const handleEdit = (e) => {
    let tempUsers = users.map((el) =>
      e.id === el.id ? { ...el, doEdit: true } : el
    );
    setUsers(tempUsers);
  };
  const handleSave = (e) => {
    for (let i = 0; i < users.length; i++) {
      if (e.id === users[i].id) {
        users[i].name = updatedName.length > 0 ? updatedName : users[i].name;
        users[i].email =
          updatedEmail.length > 0 ? updatedEmail : users[i].email;
        users[i].role = updatedRole.length > 0 ? updatedRole : users[i].role;
        users[i].doEdit = false;
      }
    }
    setUsers([...users]);
  };
  return (
    <>
      <div className="container_1">
        <h1>Users List</h1>
        <form onSubmit={handleSearch }>
          <input
            type="text"
            placeholder="Search by name email or role"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="container_2">
        <table>
          <thead className="tr">
            <tr>
              <td>
                <input
                  type="checkbox"
                  name="selectAll"
                  onChange={handleCheck}
                  checked={!users.some((e) => e?.isChecked !== true)}
                />
              </td>
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map((e) => {
              return (
                <tr
                  key={e.id}
                  style={
                    e.isChecked
                      ? { backgroundColor: "lightgray" }
                      : { backgroundColor: "white" }
                  }
                >
                  <td>
                    <input
                      type="checkbox"
                      name={e.name}
                      id={e.id}
                      onChange={handleCheck}
                      checked={e?.isChecked || false}
                    />
                  </td>

                  <td>
                    {e.name}{" "}
                    <input
                      defaultValue={e.name}
                      name={e.name}
                      onChange={(e) => setUpdatedName(e.target.value)}
                      type="text"
                      style={
                        e.doEdit
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                    />{" "}
                  </td>

                  <td>
                    {e.email}{" "}
                    <input
                      defaultValue={e.email}
                      name={e.email}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                      type="text"
                      style={
                        e.doEdit
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                    />
                  </td>

                  <td>
                    {e.role}{" "}
                    <input
                      defaultValue={e.role}
                      name={e.role}
                      onChange={(e) => setUpdatedRole(e.target.value)}
                      type="text"
                      style={
                        e.doEdit
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                    />
                  </td>

                  <td>
                    <AiTwotoneEdit
                      className="icon"
                      id={e.id}
                      onClick={() => handleEdit(e)}
                      style={
                        !e.doEdit
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                    />

                    <AiOutlineSave
                      className="icon"
                      style={
                        e.doEdit
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                      onClick={() => handleSave(e)}
                    />

                    <AiTwotoneDelete
                      className="icon"
                      onClick={() => handleDeleteOne(e.id)}
                      style={{ color: "rgb(239, 55, 86)" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <div>
          <button className="btn" onClick={() => handleDeleteMultiple()}>
            Delete Selected
          </button>
        </div>
        <div>
          <ul>
            <li onClick={() => setPage(1)} style={
                    page === 1
                      ? { backgroundColor: "#1890ff", color: "white" }
                      : { backgroundColor: "white" }
                  }>First</li>
            <li>
              <button
                className="pagebtn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>
            </li>
            {allPages.map((e) => {
              return (
                <li
                  key={e}
                  onClick={() => setPage(e)}
                  style={
                    page === e
                      ? { backgroundColor: "#1890ff", color: "white" }
                      : { backgroundColor: "white" }
                  }
                >
                  {e}
                </li>
              );
            })}
            <li>
              <button
                className="pagebtn"
                disabled={page === Math.ceil(dataLength / 10)}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>
            <li onClick={() => setPage(Math.ceil(dataLength / 10))} style={
                    page === Math.ceil(dataLength / 10)
                      ? { backgroundColor: "#1890ff", color: "white" }
                      : { backgroundColor: "white" }
                  }>Last</li>
          </ul>
        </div>
      </div>
    </>)
};
