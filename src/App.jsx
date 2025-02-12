import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import logo from './assets/search.png';
import PlayBtnn from './assets/play-button.png';

const APT_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

const userSchema = Yup.object().shape({
  Name: Yup.string().required("Whoops, can't be empty..."),
});

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleSearchSubmit = async (formData) => {
    const { Name } = formData;
    if (!Name) {
      setError({ title: "Whoops, can't be empty..." });
      return;
    }

    try {
      const res = await axios.get(`${APT_URL}/${Name}`);
      setData(res.data);
      setError(null);
    } catch (e) {
      setData([]);
      setError({
        title: 'No definitions found',
        message: 'Sorry pal, we couldn\'t find definitions for the word you were looking for.',
        mesaagee: 'You can try the search again later, or head to the web instead',
      });
    }
  };

  const playSound = () => {
    const audioUrl = data[0]?.phonetics[0]?.audio;
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div>
      <form className='bg-white' onSubmit={handleSubmit(handleSearchSubmit)}>
        <input
          type="text"
          placeholder='Search'
          {...register('Name')}
          className={errors.Name ? 'input-error' : ''}
        />
        <button className='search-button' type="submit">
          <img src={logo} alt="Search" />
        </button>
        {errors.Name && <p className='error'>{errors.Name.message}</p>}
      </form>
      </div>
      {data.length ? (
        <div style={{ position: 'absolute' }}>
          <h2>{data[0].word}</h2>
          <button className='playbtn' onClick={playSound}><img src={PlayBtnn} alt="Play" /></button>
          <br />
          {data[0].meanings.map((el, i) => (
            <div key={i}>
              <h2>{el.partOfSpeech}</h2>
              <h3>Meaning</h3>
              {el.definitions.map((item, i) => (
                <ul key={i}>
                  <li>{item.definition}</li>
                </ul>
              ))}
            </div>
          ))}
        </div>
      ) : (
        error && (
          <div className="no-results">
            <h1>😢</h1>
            <h2>{error.title}</h2>
            <h3>{error.message}</h3>
            <h3>{error.mesaagee}</h3>
          </div>
        )
      )}
    </div>
  );
}

export default App;
