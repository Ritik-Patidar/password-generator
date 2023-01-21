import React, { useCallback, useEffect, useState } from 'react';
import { HangmanDrawing } from './Drawing';
import { HangmanWord } from './Words';
import { Keyboard } from './KeyBoard';
import words from './wordList.json';

function getWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function HangMan() {
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const [wordToGuess, setWordToGuess] = useState(getWord);

    const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter));

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess.split('').every((letter) => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isWinner || isLoser) return;
            setGuessedLetters((currentLetters) => [...currentLetters, letter]);
        },
        [guessedLetters, isWinner, isLoser],
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;
            if (!key.match(/^[a-z]$/)) return;

            e.preventDefault();
            addGuessedLetter(key);
        };

        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        };
    }, [guessedLetters]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;
            if (key !== 'Enter') return;
            e.preventDefault();
            setGuessedLetters([]);
            setWordToGuess(getWord());
        };

        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        };
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                margin: '0 auto',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    fontSize: '2rem',
                    textAlign: 'center',
                    color: '#11dd1b',
                    userSelect: 'none',
                }}
            >
                {isWinner && 'Winner! 🏆 - Refresh to  Try Again'}
                {isLoser && 'Nice Try! 👍 - Refresh to  Try Again'}
            </div>
            <div className="flex w-full justify-around">
                <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
                <div>
                    <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
                        <Keyboard
                            disabled={isWinner || isLoser}
                            activeLetters={guessedLetters.filter((letter) => wordToGuess.includes(letter))}
                            inactiveLetters={incorrectLetters}
                            addGuessedLetter={addGuessedLetter}
                        />
                    {/* <div style={{ alignSelf: 'stretch' }}>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default HangMan;
