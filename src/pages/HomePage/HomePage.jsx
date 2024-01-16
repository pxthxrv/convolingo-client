import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getLanguageById } from "../../utils/lookUp";
import words from "../../data/german/words";


const randomWordId = words.length - 1;

export default function HomePage({ user }) {
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const displayLanguageData = await getLanguageById(user.id);
  //       if (displayLanguageData) {
  //         setLanguage(displayLanguageData);
  //         console.log("Fetched and set language:", displayLanguageData);
  //       } else {
  //         console.error("Data is undefined or null");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching language data:", error);
  //     }
  //   }
  //   fetchData();
  // }, [user.id]);

// const test = getLanguageById("display name", getLanguageById(user.id));
// console.log(test);

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
        <div className="discover__card--title font-size-title">{title}</div>
        <div className="discover__card--block">
          <p className="discover__card--text font-size-main">{description}</p>
          <h5 className="discover__card--footer font-size-small">Click to get started!</h5>
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
        <div className="card-title font-size-title">YOUR PROFILE</div>
        <div className="card-block">
          <div className="user-info">
            <div className="column-keys">
              <span className="info-key">Name:</span>
              <span className="info-key">Learning:</span>
              <span className="info-key">Level:</span>
              <span className="info-key">Commitment:</span> 
              {/* <span className="info-key">Email:</span> */}
            </div>
            <div className="column-values">
              <span className="info-value">
                {user.first_name} {user.last_name}
              </span>
              <span className="info-value">German</span>
              <span className="info-value">{user.cefr}</span>
              <span className="info-value">
                {user.time_per_day} Minutes per Day
              </span>
              {/* <span className="info-value">{user.email}</span> */}
                   
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
      <div className="card-title font-size-title">WORD OF THE DAY</div>
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
