const loginForm = () => {

const[username, setUsername] = useState('');
const[password, setPassword] = useState('');

    return (
        <form className = "create">
            <h3>Login Form</h3>

            <label>Username: </label>
            <input 
            type = "text"
            onChange = {(e) => setUsername(e.target.value)}
            value = {username}
            />

            <label>Password: </label>
            <input 
            type = "password"
            onChange = {(e) => setPassword(e.target.value)}
            value = {password}
            />

            <button>Login</button>
        </form>
    )
}