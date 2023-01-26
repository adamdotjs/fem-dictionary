import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { ChangeEvent, useLayoutEffect, useState } from "react";

function App() {
  const prefersDarkTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [query, setQuery] = useState("");
  const [word, setWord] = useState({});
  const [error, setError] = useState(null);
  const [darkTheme, setDarkTheme] = useState(prefersDarkTheme);
  const [font, setFont] = useState("sans");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      if (!response.ok) {
        const error = await response.json();
        setError(error);
      }
      const data = await response.json();

      // if the response contain multiple results (?), just return the first object.
      // We don't want to display or handle multiple results for the same word ATM.
      setWord(data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={clsx(
        darkTheme && "dark",
        font === "sans" && "font-sans",
        font === "serif" && "font-serif",
        font === "mono" && "font-mono",
        "mx-auto max-w-[736px] text-lg"
      )}
    >
      <header className="flex items-center justify-between py-8">
        <img src="/logo.svg" alt="FrontEndMentor Dictionary" />
        <div className="flex items-center">
          <select
            onChange={(e) => setFont(e.target.value)}
            className="bg-transparent px-2 font-bold"
          >
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="mono">Mono</option>
          </select>
          <div className="mx-4 h-full w-4 bg-gray-700"></div>
          <div className="flex items-center gap-5">
            <Switch
              onChange={() => setDarkTheme(!darkTheme)}
              className={`${
                darkTheme ? "bg-primary" : "bg-gray-300"
              } relative inline-flex h-5 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  darkTheme ? "translate-x-6" : "translate-x-1"
                } inline-block h-[14px] w-[14px] transform rounded-full bg-white transition`}
              />
            </Switch>
            <img src="/icon-moon.svg" alt="dark mode" className="h-5 w-5" />
          </div>
        </div>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="relative mt-4 mb-12 w-full">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="text-inherit w-full rounded-2xl bg-gray-100 px-6 py-5 font-bold"
          />
          <button className="absolute top-1/2 right-5 -translate-y-1/2">
            <img src="/icon-search.svg" />
          </button>
        </form>

        {error && (
          <div>
            <div>😕</div>
            <p>{error.title}</p>
            <p>
              {error.message}. {error.resolution}
            </p>
          </div>
        )}

        {word && (
          <>
            <h1 className="text-6xl font-bold">{word.word}</h1>
            <p className="mt-4 text-2xl text-primary">{word.phonetic}</p>
            {word.meanings?.map((meaning) => (
              <div key={meaning.partOfSpeech}>
                <h2 className="relative my-10 text-2xl font-bold italic after:absolute after:top-1/2 after:ml-6 after:h-[1px] after:w-full after:bg-gray-200">
                  {meaning.partOfSpeech}
                </h2>
                <h3 className="text-xl text-gray-300">Meaning</h3>
                <ul className="mt-6 ml-6 list-disc marker:text-primary">
                  {meaning.definitions.map(({ definition, example }) => (
                    <li key={definition} className="mt-4 pl-5">
                      <p>{definition}</p>
                      {example && (
                        <p className="mt-2 text-gray-300">"{example}"</p>
                      )}
                    </li>
                  ))}
                </ul>
                {meaning.synonyms.length > 0 && (
                  <div className="mt-16 flex gap-6">
                    <h3 className="text-xl text-gray-300">Synonyms</h3>
                    <ul className="text-xl font-bold text-primary">
                      {meaning.synonyms.map((synonym) => (
                        <li key={synonym}>{synonym}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {meaning.antonyms.length > 0 && (
                  <div className="mt-16 flex gap-6">
                    <h3 className="text-xl text-gray-300">Antonyms</h3>
                    <ul className="text-xl font-bold text-primary">
                      {meaning.antonyms.map((antonym) => (
                        <li key={antonym}>{antonym}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-10 flex gap-6 border-t border-gray-200 pt-5 text-sm">
                  <p className="text-gray-300 underline">Source</p>
                  <a
                    href={word.sourceUrls[0]}
                    target="blank"
                    className="underline"
                  >
                    {word.sourceUrls[0]}
                  </a>
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
