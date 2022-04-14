import Axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {


  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
 
  var i,j;
  for (i=start;i<=end;i++){
    var k=true;
    for (j=start;j<i;j++){
        if (i%j==0){
          k=false;
          break;
        }
    } if (k){
      console.log(i+ ", ");
    }
  }

  const [primenumberList, setPrimenumberList] = useState([]);

  const getPrimeNumber = () => {
    Axios.get('http://localhost:3001/primenumber').then((response) => {
      setPrimenumberList(response.data);
    }); 
  }

  const addPrimeNumber = () => {
    Axios.post('http://localhost:3001/create', {
      start : start,
      end : end ,
     
        
    }).then(() => {
      setPrimenumberList([
        ...primenumberList,
        {
          start : start,
          end : end,
          
        },
      ]);      
    });
  };

  return (
    <div className="App">
      <h1>Prime Number</h1>
      <div className="col-sm-5 bg-light border rounded py-3 container d-flex align-items-center justify-content-center" >
        <form action="" >
          <div class=" ">
            <label for='start' className='form-label'>Input start </label>
            <input type="text " 
                   className='form-control'
                   placeholder='Enter Number to Start' 
                   onChange={(event) => {
                     setStart(event.target.value)
                   }}
                   ></input>
          </div> <div class=" ">
            <label for='end' className='form-label'>Input End </label>
            <input type="text" 
                   className='form-control' 
                   placeholder='Enter Number to End'
                   onChange={(event) => {
                    setEnd(event.target.value)
                   }}
                   ></input>
          </div>
          <br></br>
          <button class="btn btn-success mb-3 py-1" onClick={addPrimeNumber}>Calculate</button>
        </form>
      </div>
      <br></br>
      <button class="btn btn-primary" onClick={getPrimeNumber}>History Calculate</button>
      <br></br> <br></br>
      {primenumberList.map((val,key) => {
        return (
          
          <div className="primeNumber card">
            <div class= "card-body text-left">
            <p className="card-text">Timestamp : {val.id}</p>
              <p className="card-text">Input Start : {val.start}</p>
              <p className="card-text">Input End : {val.end}</p>
              <p className="card-text">Prime Number is : {i+" ,"}</p>
              
            </div>
          </div>
        )
      })}
    </div>
  );
      
}


export default App;
