import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [searchID, setSearchID] = useState('')
  const [searchName, setSearchName] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <h1>Binary search engine</h1>
          <div>
            <form>
              <p>Search for ID</p>
              <input type={'number'} onChange={(e) => {setSearchID(e.currentTarget.value)}} placeholder='ID'></input>
              <p>{binarySearch(arr, parseInt(searchID), 0, (arr.length - 1))}</p>
            </form>
          </div>

          <div>
            <form>
              <p>Search for NAME</p>
              <input type={'string'} onChange={(e) => {setSearchName(e.currentTarget.value)}} placeholder='Name'></input>
              <p>{binarySearch2(arr, searchName, 0, (arr.length - 1))}</p>
            </form>
          </div>

      </header>
    </div>
  );
}

export default App;

type Searchable = {
  id: number
  name: string
}

const arr: Array<Searchable> = [{id: 1, name: "Andrzej"}, {id: 3, name: "Bryan"}, {id: 8, name: "Hans"}, {id: 2, name: "Tim"}, {id: 21, name: "David"}, {id: 13, name: "Jim"}]

const binarySearch = (arr: Array<Searchable>, target: number, start: number, end: number): JSX.Element => {

  arr.sort((a, b) => a.id - b.id)
  let mid: number = Math.floor((start + end) / 2)

  return start > end ? <div>Not Found!</div>
          : arr[mid].id === target ? <div>found name: {arr[mid].name}</div>
          : arr[mid].id > target ? binarySearch(arr, target, start, (mid - 1))
          : binarySearch(arr, target, (mid + 1), end)
}

const binarySearch2 = (arr: Array<Searchable>, name: string, start: number, end: number): JSX.Element => {

  arr.sort((a, b) => getASCIIvalue(a.name.toLowerCase()) - getASCIIvalue(b.name.toLowerCase()))
  let mid: number = Math.floor((start + end) / 2)
  let calculatedASCIIvalue: number = getASCIIvalue(name.toLowerCase())

  return start > end ? <div>Not Found!</div>
          : (getASCIIvalue(arr[mid].name.toLowerCase()) === calculatedASCIIvalue) && (arr[mid].name.toLowerCase() === name.toLowerCase()) ? <div>found id: {arr[mid].id}</div>
          : getASCIIvalue(arr[mid].name.toLowerCase()) > calculatedASCIIvalue ? binarySearch2(arr, name, start, (mid - 1))
          : binarySearch2(arr, name, (mid + 1), end)
}

const getASCIIvalue = (input: string): number => {
  let calculatedSum: number = 0
  for (let i = 0; i < input.length; i++){
    let code = input.charCodeAt(i)
    calculatedSum = calculatedSum + code
  }
  return calculatedSum
}
