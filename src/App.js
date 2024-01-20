import './styles/App.css';
import './styles/styles.css';
import './bootstrap/dist/css/bootstrap.min.css';

function App() {
  // usestate for setting a javascript
  // object for storing and using data
  const [data, setdata] = useState({
      name: "",
      age: 0,
      date: "",
      programming: "",
  });

  // Using useEffect for single rendering
  useEffect(() => {
      // Using fetch to fetch the api from
      // flask server it will be redirected to proxy
      fetch("/data").then((res) =>
          res.json().then((data) => {
              // Setting a data from api
              setdata({
                  name: data.Name,
                  age: data.Age,
                  date: data.Date,
                  programming: data.programming,
              });
          })
      );
  }, []);
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
