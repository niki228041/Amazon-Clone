import { SyntheticEvent, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const { userId, code } = useParams();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5034/api/Account/ForgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if(response.ok) {
            alert('Письмо для відновлення пароля надіслано на вашу почту.');
        } else {
            const error = await response.json();
            alert(`Помилка: ${error.message}`);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Відновлення паролю</h2>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <button type="submit">Відправити</button>
        </form>
    );
}


export default ForgotPasswordScreen;