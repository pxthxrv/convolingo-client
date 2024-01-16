import { useState } from "react";

export default function FlashCard({
  word,
  translation,
  part_of_speech,
  gender,
  used_in_a_sentence,
  onAnswer,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = userInput.toLowerCase() === translation.toLowerCase();
    setIsCorrect(correct);
    setIsFlipped(true);

    const delay = correct ? 1000 : 3000; // correct 1 sec, incorrect 3 sec,

    setTimeout(() => {
      setUserInput("");
      setIsFlipped(false);
      onAnswer(correct);
    }, delay); // Delay for 2 seconds for better readability
  };

  console.log(used_in_a_sentence);
  console.log(word);

  return (
    <div className="flash-card-container">
      <div
        className={`flash-card ${
          isFlipped ? (isCorrect ? "green" : "red") : ""
        }`}
      >
        {isFlipped ? (
          isCorrect ? (
            translation
          ) : (
             <div>
              {/* <p>Answer:</p> */}
              <p className="flash-card--correct-answer">" {translation} "</p>
             </div> 
          )
        ) : (
          word
        )}
        <div className="flash-card--options">
          <p className="flash-card-detail">{part_of_speech}</p>
          {gender && gender!=="" && <p className="flash-card-detail">{gender}</p>}
          <p className="flash-card-detail">{used_in_a_sentence}</p>
        </div>
      </div>

      {!isFlipped && (
        <form onSubmit={handleSubmit} className="flash-card-input-form">
          <input
            className="input-translation"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Your Translation"
          />
          <button className="flash-submit" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
