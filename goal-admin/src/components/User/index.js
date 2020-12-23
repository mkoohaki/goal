import { useParams } from 'react-router-dom';

const User = () => {
    const { userId } = useParams();

    return (
        <div>
            Display user with ID: {userId}
        </div>
    )
}

export default User;