import { useParams } from "react-router-dom";

const ResetPasswordScreen = () => {
    const { userId } = useParams();

    return (
        <div>
            <h1>Reset Password Screen</h1>
            <p>User ID: {userId}</p>
        </div>
    );
}

export default ResetPasswordScreen;