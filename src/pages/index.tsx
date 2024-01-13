import { Result } from "~/layout/Result";
import { Typing } from "~/layout/Typing";
import { Words } from "~/layout/Words";
import { useSystem } from "~/libs/useSystem";

export default function Home() {
  const {
    typed,
    words
  } = useSystem()

  return (
    <main>
      <div className='relative max-w-xl mt-3 text-4xl leading-relaxed break-all'>
        <Words words={words} />
        <Typing
          className='absolute inset-0'
          typedCharacters={typed}
          words={words}
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
