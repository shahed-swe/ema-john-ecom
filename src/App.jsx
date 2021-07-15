import './App.css';
import androids from './fakeData/android';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {console.log(androids)}
        {androids.map(prod => {
          return (
            <div key={prod.key} className="App-header-item">
              <img src={prod.img} alt={prod.name} />
              <h2>{prod.name}</h2>
              <p>{prod.price}$</p>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
