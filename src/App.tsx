import { Listbox, Switch, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useLayoutEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [word, setWord] = useState(null);
  const [error, setError] = useState(null);
  const [font, setFont] = useState("Sans Serif");
  const [darkTheme, setDarkTheme] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useLayoutEffect(() => {
    if (darkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkTheme]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      if (!response.ok) {
        const error = await response.json();
        setError(error);
        setWord(null);
      }
      const data = await response.json();

      // if the response contains multiple results (?), just return the first object.
      // We don't want to display or handle multiple results for the same word ATM.
      setWord(data[0]);
      setError(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-full dark:bg-gray-700 dark:text-white">
      <div
        className={clsx(
          font === "Sans Serif" && "font-sans",
          font === "Serif" && "font-serif",
          font === "Mono" && "font-mono",
          "mx-auto max-w-[736px] pb-32 text-lg"
        )}
      >
        <header className="flex items-center justify-between py-12">
          <img src="/logo.svg" alt="FrontEndMentor Dictionary" />
          <div className="flex items-center">
            <Listbox onChange={setFont} defaultValue="Sans Serif" name="font">
              <div className="relative font-bold">
                <Listbox.Button className=" px-2">
                  {({ value }) => value}
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute right-0 z-50 mt-4 flex w-max flex-col gap-3 rounded-2xl bg-white p-6 shadow-[0px_0px_20px_2px] shadow-gray-200 dark:bg-gray-600 dark:shadow-primary">
                    <Listbox.Option
                      value="Sans Serif"
                      className="cursor-pointer font-sans hover:text-primary"
                    >
                      Sans Serif
                    </Listbox.Option>
                    <Listbox.Option
                      value="Serif"
                      className="cursor-pointer font-serif hover:text-primary"
                    >
                      Serif
                    </Listbox.Option>
                    <Listbox.Option
                      value="Mono"
                      className="cursor-pointer font-mono hover:text-primary"
                    >
                      Mono
                    </Listbox.Option>
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <div className="mx-4 h-full w-4 bg-gray-700"></div>
            <div className="flex items-center gap-5">
              <Switch
                onChange={() => setDarkTheme(!darkTheme)}
                className={`${
                  darkTheme ? "bg-primary" : "bg-gray-300"
                } relative inline-flex h-5 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Toggle Theme</span>
                <span
                  className={`${
                    darkTheme ? "translate-x-6" : "translate-x-1"
                  } inline-block h-[14px] w-[14px] transform rounded-full bg-white transition`}
                />
              </Switch>
              <div
                className={clsx(darkTheme ? "text-primary" : "text-gray-300")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main>
          <form onSubmit={handleSubmit} className="relative mb-12 w-full">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              className="text-inherit w-full rounded-2xl border border-transparent bg-gray-100 px-6 py-5 font-bold outline-none placeholder:text-black/25 invalid:required:border-secondary focus:border-primary dark:bg-gray-600 dark:text-white dark:placeholder:text-white/25"
              placeholder="Search for any word..."
              required
            />
            <button className="absolute top-1/2 right-5 -translate-y-1/2">
              <img src="/icon-search.svg" />
            </button>
          </form>

          {error && (
            <div className="mt-36 text-center">
              <p className="text-[64px]">😕</p>
              <p className="mt-16 text-xl font-bold">{error.title}</p>
              <p className="mt-6 text-gray-300">
                {error.message} {error.resolution}
              </p>
            </div>
          )}

          {word && (
            <>
              <h1 className="text-6xl font-bold">{word.word}</h1>
              <p className="mt-4 text-2xl text-primary">{word.phonetic}</p>
              {word.meanings?.map((meaning) => (
                <div key={meaning.partOfSpeech}>
                  <h2 className="relative my-10 text-2xl font-bold italic after:absolute after:top-1/2 after:ml-6 after:h-[1px] after:w-full after:bg-gray-200 after:dark:bg-gray-400">
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
                </div>
              ))}
              <div className="mt-10 flex gap-6 border-t border-gray-200 pt-5 text-sm dark:border-gray-400">
                <p className="text-gray-300 underline">Source</p>
                <a
                  href={word.sourceUrls[0]}
                  target="blank"
                  className="flex items-center gap-2 underline"
                >
                  {word.sourceUrls[0]}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                  >
                    `
                    <path
                      fill="none"
                      stroke="#757575"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
                    />
                  </svg>
                </a>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
