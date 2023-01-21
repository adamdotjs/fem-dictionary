import { useState } from "react";
import { Heading } from "./components/Typography";

function App() {
  const [query, setQuery] = useState("");
  const [word, setWord] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      if (!response.ok) console.log("No results");
      const data = await response.json();
      console.log(data);
      setWord(data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
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

      {word && (
        <>
          <Heading as="h1" size="lg">
            {word.word}
          </Heading>
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
    </div>
  );
}

export default App;
