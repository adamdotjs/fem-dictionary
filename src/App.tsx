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
        font === "mono" && "font-mono"
      )}
    >
      <header className="flex items-center justify-between p-8">
        <img src="/logo.svg" alt="FrontEndMentor Dictionary" />
        <div className="flex">
          <select onChange={(e) => setFont(e.target.value)}>
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="mono">Mono</option>
          </select>
          <div className="mx-4 h-full w-4 bg-gray-700"></div>
          <div>
            <Switch
              onChange={() => setDarkTheme(!darkTheme)}
              className={`${
                darkTheme ? "bg-primary" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  darkTheme ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <img src="/icon-moon.svg" alt="dark mode" />
        </div>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="query">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              className="text-inherit rounded-lg bg-gray-100 px-3 py-2 font-medium"
            />
            <button>Search</button>
          </label>
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
            <h1 className="text-5xl font-bold dark:text-primary">
              {word.word}
            </h1>
            <span>{word.phonetic}</span>
            {word.meanings?.map((meaning) => (
              <div key={meaning.partOfSpeech}>
                <h2>{meaning.partOfSpeech}</h2>
                <h3>Meaning</h3>
                <ul>
                  {meaning.definitions.map(({ definition, example }) => (
                    <li key={definition}>
                      <p>{definition}</p>
                      <p>{example}</p>
                    </li>
                  ))}
                </ul>
                {meaning.synonyms.length > 0 && (
                  <>
                    <h3>Synonyms</h3>
                    <ul>
                      {meaning.synonyms.map((synonym) => (
                        <li key={synonym}>{synonym}</li>
                      ))}
                    </ul>
                  </>
                )}
                {meaning.antonyms.length > 0 && (
                  <>
                    <h3>Antonyms</h3>
                    <ul>
                      {meaning.antonyms.map((antonym) => (
                        <li key={antonym}>{antonym}</li>
                      ))}
                    </ul>
                  </>
                )}
                <div>
                  <p>Source</p>
                  <a href={word.sourceUrls[0]} target="blank">
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
