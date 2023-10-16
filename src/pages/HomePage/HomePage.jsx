import "./HomePage.scss";
import { useNavigate } from 'react-router-dom';

export default function HomePage({ user }) {
  const navigate = useNavigate();
  console.log(user);

  const navigateToFlashcards = () => {
    navigate('/flashcards');
  }

  const navigateToChat = () => {
    navigate(`/chat/${user.id}`);
  }

  if (!user || !user.first_name || !user.last_name) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="discover-page">
    <h2>Discover</h2>
    
    <div className="card-container">
      <button className="glass btn-flash" onClick={navigateToFlashcards}>
        Flash Cards
        <h5>Sub-heading for Flash Cards</h5>
        <p>Some descriptive text about flashcards.</p>
      </button>
      <button className="btn-chat" onClick={navigateToChat}>
        Chat
        <h5>Sub-heading for Chat</h5>
        <p>Some descriptive text about chat.</p>
      </button>
    </div>

    <div className="user-info">
        <p>Name: {user.first_name} {user.last_name}</p>
        <p>Learning: {user.target_language_display}</p>
        <p>Level: {user.cefr}</p>
        <p>Commitment: {user.time_per_day} Minutes per Day</p>
        <p>Email: {user.email}</p>
        <p>UserID: {user.id}</p>
        {/* ... add more fields as needed */}
      </div>
  </div>
  );
};