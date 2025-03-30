"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
  delayBeforeDeleting?: number;
  adjectives?: string[];
}

export default function TypewriterText({
  words,
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 500,
  delayBeforeDeleting = 1000,
  adjectives = [],
}: TypewriterTextProps) {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isFirstComplete, setIsFirstComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      // Waiting before typing second text
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsFirstComplete(true);
      }, delayBetweenWords);
    } else {
      // Typing first text
      if (firstText === words[0]) {
        setIsWaiting(true);
      } else {
        timeout = setTimeout(() => {
          setFirstText(words[0].slice(0, firstText.length + 1));
        }, typingSpeed);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [firstText, isWaiting, words, typingSpeed, delayBetweenWords]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isFirstComplete) {
      if (isDeleting) {
        // Deleting current adjective
        if (secondText === words[1]) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % adjectives.length);
        } else {
          timeout = setTimeout(() => {
            setSecondText(secondText.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        // Typing new adjective
        const currentAdjective = adjectives[currentWordIndex];
        if (secondText === words[1] + " " + currentAdjective) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, delayBeforeDeleting);
        } else {
          timeout = setTimeout(() => {
            setSecondText(
              (words[1] + " " + currentAdjective).slice(
                0,
                secondText.length + 1
              )
            );
          }, typingSpeed);
        }
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    isFirstComplete,
    isDeleting,
    secondText,
    words,
    adjectives,
    currentWordIndex,
    typingSpeed,
    deletingSpeed,
    delayBeforeDeleting,
  ]);

  return (
    <div className={`${className} flex flex-col`}>
      <span className="inline-block mt-4 sm:mt-14">
        {firstText}
        {!isFirstComplete && <span className="animate-pulse">|</span>}
      </span>
      <span className="inline-block mt-4 sm:mt-14">
        {secondText}
        {isFirstComplete && <span className="animate-pulse">|</span>}
      </span>
    </div>
  );
}
