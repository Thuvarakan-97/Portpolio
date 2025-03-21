import { useEffect, useState } from "react";

export default function TypingText({ text, speed = 100, pause = 1500 }: { text: string; speed?: number; pause?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing effect
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          setIndex(index + 1);
        } else {
          // Pause when fully typed
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        // Deleting effect
        if (index > 0) {
          setDisplayedText(text.substring(0, index - 1));
          setIndex(index - 1);
        } else {
          setIsDeleting(false);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [index, isDeleting, text, speed, pause]);

  return (
    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
      {displayedText}
      <span className="animate-blink">|</span>
    </p>
  );
}
