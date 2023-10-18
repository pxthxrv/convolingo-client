import FlashCard from "../../components/FlashCard/FlashCard";
import "./FlashCardsPage.scss";

import { useState } from "react";

const flashWords = [
    {word: "essen", translation: "to eat", part_of_speech: "Verb", gender: "", pronunciation: "['esən]", used_in_a_sentence: "Ich esse gerne Pizza.", stem: "ess", cefr: "A1.1"},
    {word: "trinken", translation: "to drink", part_of_speech: "Verb", gender: "", pronunciation: "['trɪŋkn̩]", used_in_a_sentence: "Er trinkt einen Kaffee.", stem: "trink", cefr: "A1.1"},
    {word: "Haus", translation: "house", part_of_speech: "Noun", gender: "n", pronunciation: "[haʊs]", used_in_a_sentence: "Das Haus ist groß.", stem: "Haus", cefr: "A1.1"},
    {word: "Wasser", translation: "water", part_of_speech: "Noun", gender: "n", pronunciation: "['vasɐ]", used_in_a_sentence: "Ich möchte Wasser, bitte.", stem: "Wasser", cefr: "A1.1"},
    {word: "Freund", translation: "friend", part_of_speech: "Noun", gender: "m", pronunciation: "[freund]", used_in_a_sentence: "Mein Freund heißt Max.", stem: "Freund", cefr: "A1.1"},
    {word: "Tisch", translation: "table", part_of_speech: "Noun", gender: "m", pronunciation: "[tɪʃ]", used_in_a_sentence: "Der Tisch ist rund.", stem: "Tisch", cefr: "A1.1"},
    {word: "Buch", translation: "book", part_of_speech: "Noun", gender: "n", pronunciation: "[buːχ]", used_in_a_sentence: "Ich lese ein gutes Buch.", stem: "Buch", cefr: "A1.1"},
    {word: "heute", translation: "today", part_of_speech: "Adverb", gender: "", pronunciation: "['ho͜ʏtə]", used_in_a_sentence: "Heute ist ein sonniger Tag.", stem: "heute", cefr: "A1.1"},
    {word: "Taschenlampe", translation: "flashlight", part_of_speech: "Noun", gender: "f", pronunciation: "['taʃənˌlampə]", used_in_a_sentence: "Ich brauche meine Taschenlampe für den Campingausflug.", stem: "Taschenlamp", cefr: "A1.1"},
    {word: "Sonnenbrille", translation: "sunglasses", part_of_speech: "Noun", gender: "f", pronunciation: "['zɔnənˌbrɪlə]", used_in_a_sentence: "Ich trage meine Sonnenbrille im Sommer.", stem: "Sonnenbrill", cefr: "A1.1"}
];

const sampleWords = [
  { word: "Hund", translation: "Dog" },
  { word: "Katze", translation: "Cat" },
  { word: "Haus", translation: "House" },
  { word: "Auto", translation: "Car" },
  { word: "Buch", translation: "Book" },
];

export default function FlashCardsPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (correct) => {
    const answerData = {
      foreign_language_word: flashWords[currentWordIndex].word,
      native_language_word: flashWords[currentWordIndex].translation,
      answered_correct: correct,
      time_submitted: new Date().toISOString(),
    };
    setAnswers([...answers, answerData]);

    if (currentWordIndex === flashWords.length - 1) {
      setQuizFinished(true);
    } else {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentWordIndex(0);
    setAnswers([]);
    setQuizFinished(false);
  };

  const submitResults = () => {
    console.log(answers);
    // submit to backend after parsing/verifying return
    // navigate to chat
  };

  return (
    <div>
      {quizFinished ? (
        <div>
          <h2>
            {answers.filter((answer) => answer.answered_correct).length} out of{" "}
            {flashWords.length} correct!
          </h2>

          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                {answer.foreign_language_word}:{" "}
                {answer.answered_correct
                  ? answer.native_language_word
                  : "Incorrect"}{" "}
                ({answer.answered_correct ? "Correct" : "Incorrect"})
              </li>
            ))}
          </ul>
          <button onClick={restartQuiz}>Restart</button>
          <button onClick={submitResults}>Submit</button>
        </div>
      ) : (
        <FlashCard
          word={flashWords[currentWordIndex].word}
          translation={flashWords[currentWordIndex].translation}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
