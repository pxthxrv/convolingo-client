import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import words from "../../data/german/words";

const randomWordId = words.length - 1;

export default function HomePage({ user }) {
  const navigate = useNavigate();

  const navigateToFlashcards = () => {
    navigate("/flashcards");
  };

  const navigateToChat = () => {
    navigate(`/chat/${user.id}`);
  };

  const featureCards = [
    {
      title: "VOCABULARY",
      description:
        "Boost your vocabulary now! Dive into our flash card quizzes and master new words while revisiting familiar ones.",
      actionText: "PRACTICE YOUR VOCABULARY!",
      action: navigateToFlashcards,
    },
    {
      title: "CHAT",
      description:
        "Want to speak like a local? Chat with our interactive bot and sharpen your conversational skills.",
      actionText: "LET'S CHAT ABOUT SOMETHING NEW!",
      action: navigateToChat,
    },
    {
      title: "MY DICTIONARY",
      description:
        "Never let a word slip away again! Effortlessly save, organize, and review your vocabulary with your very own personal dictionary.",
      actionText: "WHAT WAS THAT WORD AGAIN?",
      action: navigateToFlashcards,
    },
  ];

  function FeatureCard({ title, description, actionText, action }) {
    return (
      <div className="discover__card">
        <div className="discover__card--title">{title}</div>
        <div className="discover__card--block">
          <p className="discover__card--text">{description}</p>
          <h5 className="discover__card--footer">Click to get started!</h5>
        </div>
        <div className="discover__card--options">
          <button className="discover__card--action" onClick={action}>
            {actionText}
          </button>
        </div>
      </div>
    );
  }

  function UserProfile({ user }) {
    const navigateToAccountSettings = () => {
      navigate(`/getting-started/${user.id}`)
    }
    return (
      <div className="card user-card">
        <div className="card-title">YOUR PROFILE</div>
        <div className="card-block">
          <div className="user-info">
            <div className="column-keys">
              <span className="info-key">Name:</span>
              <span className="info-key">Learning:</span>
              <span className="info-key">Level:</span>
              <span className="info-key">Commitment:</span>
              {/* <span className="info-key">Email:</span> */}
              {/* <span className="info-key">UserID:</span> */}
            </div>
            <div className="column-values">
              <span className="info-value">
                {user.first_name} {user.last_name}
              </span>
              <span className="info-value">{user.target_language}</span>
              <span className="info-value">{user.cefr}</span>
              <span className="info-value">
                {user.time_per_day} Minutes per Day
              </span>
              {/* <span className="info-value">{user.email}</span>
                    <span className="info-value">{user.id}</span> */}
            </div>
          </div>
        
        </div>
        <div className="discover__card--options">
          <button className="discover__card--action" onClick={navigateToAccountSettings}>
            UPDATE YOUR PROFILE & DIFFICULTY HERE
          </button>
        </div>
        
      </div>
    );
  }

function DailyWord({ word }) {
  return (
    <div className="card daily-word-card">
      <div className="card-title">WORD OF THE DAY</div>
      <div className="card-block">
        <div className="word-info">
          <div className="column-keys">
            <span className="info-key">Word:</span>
            <span className="info-key">Translation:</span>
            <span className="info-key">Part of Speech:</span>
            <span className="info-key">Gender:</span>
            <span className="info-key">Pronunciation:</span>
            {/* <span className="info-key">Used in a Sentence:</span> */}
            {/* <span className="info-key">Stem:</span> */}
            <span className="info-key">CEFR Level:</span>
          </div>
          <div className="column-values">
            <span className="info-value">{words[randomWordId].word}</span>
            <span className="info-value">
              {words[randomWordId].translation}
            </span>
            <span className="info-value">
              {words[randomWordId].part_of_speech}
            </span>
            <span className="info-value">{words[randomWordId].gender}</span>
            <span className="info-value">
              {words[randomWordId].pronunciation}
            </span>
            {/* <span className="info-value">{words[randomWordId].used_in_a_sentence}</span> */}
            {/* <span className="info-value">{words[randomWordId].stem}</span> */}
            <span className="info-value">{words[randomWordId].cefr}</span>
          </div>
        </div>
        <div className="daily-word-sent">
          <p className="daily-word-sent__text">
            "{words[randomWordId].used_in_a_sentence}"
          </p>
        </div>
      </div>
      <div className="discover__card--options">
          <button className="discover__card--action">
            SAVE THIS WORD FOR LATER?
          </button>
        </div>
    </div>
  );
}

  return (
    <div className="discover">
      <div className="discover__central-container">
        <div className="discover__features">
          {featureCards.map((card) => (
            <FeatureCard
              title={card.title}
              description={card.description}
              actionText={card.actionText}
              action={card.action}
              key={card.title}
            />
          ))}
        </div>
        <div className="discover__info">
          {/* User Card */}
          <UserProfile user={user} />
          {/* Daily Word Card */}
          <DailyWord word={words[randomWordId]} />
        </div>
      </div>
    </div>
  );
}


// function refactor() {
//   return (
//       <div className="container-1">
//         <div className="card card-feature">
//           <div className="card-title">VOCABULARY</div>
//           <div className="card-block">
//             <p className="card-block__front-text">
//               Boost your vocabulary now! Dive into our flash card quizzes and
//               master new words while revisiting familiar ones.
//             </p>
//             <h5 className="card-block__footer">Click to get started!</h5>
//           </div>
//           <div className="card-options">
//             <button
//               className="card-options__back-text"
//               onClick={navigateToFlashcards}
//             >
//               PRACTICE YOUR VOCABULARY!
//             </button>
//           </div>
//         </div>
//         <div className="card card-feature">
//           <div className="card-title">CHAT</div>
//           <div className="card-block">
//             <p className="card-block__front-text">
//               Want to speak like a local? Chat with our interactive bot and
//               sharpen your conversational skills.
//             </p>
//             <h5 className="card-block__footer">Click to get started!</h5>
//           </div>
//           <div className="card-options">
//             <button
//               className="card-options__back-text"
//               onClick={navigateToFlashcards}
//             >
//               LET'S CHAT ABOUT SOMETHING NEW!
//             </button>
//           </div>
//         </div>
//         <div className="card card-feature">
//           <div className="card-title">MY DICTIONARY</div>
//           <div className="card-block">
//             <p className="card-block__front-text">
//               Never let a word slip away again! Effortlessly save, organize, and
//               review your vocabulary with your very own personal dictionary.
//             </p>
//             <h5 className="card-block__footer">Click to get started!</h5>
//           </div>
//           <div className="card-options">
//             <button
//               className="card-options__back-text"
//               onClick={navigateToFlashcards}
//             >
//               WHAT WAS THAT WORD AGAIN?
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="container-2">

//       </div>
//     </div>
//   );
// }
