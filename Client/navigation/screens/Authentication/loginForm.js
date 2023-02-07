

const handleSubmit = async(e) =>{

e.preventDefault(); //default Action is to refresh form once submitted

} 

const loginForm = () => {

const[email, setEmail] = useState('');
const[password, setPassword] = useState('');

    return (
        <form className = "create" onSubmit = {handleSubmit}>
            <h3>Login Form</h3>

            <label>Email: </label>
            <input 
            type = "email"
            onChange = {(e) => setEmail(e.target.value)}
            value = {email}
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

module.exports.loginForm = loginForm;