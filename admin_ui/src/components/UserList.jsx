
export const UserList = ({name,email,role}) => {
    return(
        <>
            <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>Edit Delete</td>
        </>
    )
}