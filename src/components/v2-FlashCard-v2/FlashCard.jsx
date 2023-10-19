import { useState } from 'react';

export default function FlashCard({ word, translation, onAnswer }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const correct = userInput.toLowerCase() === translation.toLowerCase();
        setIsCorrect(correct);
        setIsFlipped(true);

        const delay =correct ? 1000 : 3000; // correct 1 sec, incorrect 3 sec,

        setTimeout(() => {
            setUserInput('');
            setIsFlipped(false);
            onAnswer(correct);
        }, delay); // Delay for 2 seconds for better readability  
    }

    return (
        <div className="flash-card-container">
            <div className={`flash-card ${isFlipped ? (isCorrect ? 'green' : 'red') : ''}`}>
                {isFlipped ? (
                    isCorrect ? (
                        translation
                    ) : (
                        <div>
                            <p>Answer:</p>
                            <p>"{translation}"</p>
                        </div>
                    )
                ) : (
                    word
                )}
            </div>

            {!isFlipped && (
                <form onSubmit={handleSubmit} className="flash-card-input-form">
                    <input 
                        type="text"
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        placeholder="Your translation"
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}