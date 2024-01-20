import './styles/App.css';
import './styles/styles.css';
import './bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row" id='main'>
          <div className="col-md-6 col-xs-12" id='left'>
            Hello World
          </div>
          <div className="col-md-6 col-xs-12" id='right'>
            Hello World
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
