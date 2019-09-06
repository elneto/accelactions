import React, { useState, useEffect } from 'react';
//import 'bootstrap';
import Pagination from "react-js-pagination";
import Commitment from './components/Commitment.js';
import Select from './components/Select.js';
import { Bar } from 'react-chartjs-2';
import * as Constants from './constants';

function App() {

  const [commitments, setCommitments] = useState({});
  const [orderBy, setOrderBy] = useState("dateadded");
  const [direction, setDirection] = useState("desc");
  const [activePage, setActivePage] = useState(1);
  const [start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const [comsPerSDGs, setComsPerSDGs] = useState({});
  const Rows = 10;

  async function fetchData(an=0, start=0, rows=Rows, orderby="dateadded", direction="desc") {
    const res = await fetch(Constants.URL + "getCommitments.php?start="+start
                +"&rows="+rows
                +"&orderby="+orderby
                +"&direction="+direction
                +"&an="+an  
                );
    res
      .json()
      .then(res => {
        setCommitments(res);
      })
      .catch(err => console.log("API Commitments error: " + err));

    const res2 = await fetch(Constants.URL + "getSDGsActionNetwork.php?an="+an);
      res2
        .json()
        .then(res2=>{
          setTotal(res2[0]);
          setComsPerSDGs(res2);
        })
        .catch(err => console.log("API SDGS error: " + err));
  }

  useEffect(() => {
    fetchData(Constants.ActionNetwork);
  },[]);
  
  function handleOrderChange(e){
      fetchData(Constants.ActionNetwork, start, Rows, e.target.value);
      setOrderBy(e.target.value);      
      e.preventDefault();
    }

  function handleDirectionChange(e){
      fetchData(Constants.ActionNetwork, start, Rows, orderBy, e.target.value);
      setDirection(e.target.value);      
      e.preventDefault();
    }

  function handlePageChange(pageNumber) {
      let s = pageNumber * Rows - Rows;
      fetchData(Constants.ActionNetwork, s, Rows, orderBy, direction);
      setActivePage(pageNumber);
      setStart(s);
  }
  
  const directionOptions = [
    {"asc": "Ascendent (a-z, or older first)"},
    {"desc": "Descendent (z-a or most recent first)"}
  ];
  
  const orderOptions = [
    {"dateadded": "Date registered"},
    {"title": "Title"},
    {"leadorg": "Organization"},
  ];

  // bar chart logic

  const graphKeys = () => {
    let arr = [];
    Object.keys(comsPerSDGs).map(key => {   
        if (key>0) {arr.push("SDG "+key)}
        return 0;
      }
    )
    return arr;
  };

  const graphVals = () => {
    let arr = [];
    Object.keys(comsPerSDGs).map(key => {   
        if (key>0) {arr.push(comsPerSDGs[key])}
        return 0;
      }
    )
    return arr;
  };

  const graphData = {
    labels: graphKeys(),
    datasets: [{
            label: 'Acceleration Actions per SDG',            
            data: graphVals(),
            backgroundColor: Constants.SDGCOLORS.slice(1)            
        }]
  };


  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <Bar data={graphData} width={100} height={22} options={{ maintainAspectRatio: true }}/>
        </div>
      </div>
      <p>&nbsp;</p>
      <div className="row">
          <div className="col-md-9">
              <h3>Featured</h3>
          </div>

          <div className="col-md-3">
              <h3>More information</h3>
              <div className="list-group">
                  <a href="//effectivecooperation.org/our-work/callforevidence/" className="list-group-item list-group-item-action" target="_blank" rel="noopener noreferrer">25
                      Jul - 30 Sep | Call for Evidence on effective
                      development
                      co-operation</a>

              </div>
          </div>

      </div>

      <div className="row">
        <div className="col">
          <h3>Browse</h3>

        </div>
      </div>

      <div className="row">
        <div className="col" style={{display:"flex", justifyContent:"space-between"}}>
          
            <div>
              <Select value={orderBy} options={orderOptions} onChange={handleOrderChange}/>
              <Select value={direction} options={directionOptions} onChange={handleDirectionChange}/>
            </div>

            <div id="pagibox" className="justify-content-end">
              <Pagination
                prevPageText='prev'
                nextPageText='next'
                firstPageText='first'
                lastPageText='last'
                activePage={activePage}
                itemsCountPerPage={Rows}
                totalItemsCount={total}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
              />
            </div>
          
        </div>
      </div>
      <p>&nbsp;</p>

      <div className="row">
        <div className="col">
        {Object.keys(commitments).map((key, index) => 
            <Commitment key={commitments[key].commitment_nr} commitment={commitments[key]}></Commitment>                        
          )
        }
        </div>
      </div>
    </div>
  );
}

export default App;
