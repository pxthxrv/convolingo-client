import "./Header.scss";
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return(
    <div className="header">
        <button className="logo-home" onClick={() => navigate('/')}>
    <h1 className="header__title">ConvoLingo</h1>
    </button>
    </div>
    )
}