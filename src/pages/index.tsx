import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { Result } from "~/layout/Result";
import { Typing } from "~/layout/Typing";
import { Words } from "~/layout/Words";

export default function Home() {
  const [words, setWords] = useState<string>('')

  useEffect(() => {
    setWords(faker.word.words(15))
  }, [])

  return (
    <main>
      <div className='relative max-w-xl mt-3 text-4xl leading-relaxed break-all'>
        <Words words={words} />
        <Typing
          className='absolute inset-0'
          typedCharacters={words}
        />
      </div>
      <Result
        className='mt-10'
        accuracyPercentage={100}
        total={90}
        errors={3100}
      />
    </main>
  );
}
