import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [state, setState] = useState(true)
  let [loading, setLoading] = useState(false)

  var pg = 1
  const getUsers = function (page) {
    var file = `https://reqres.in/api/users?page=${page}`
    return (
      fetch(file)
        .then(x => x.text())
        .then(
          y => {
            var str = JSON.parse(y)
            var total = str.total_pages
            var html = function () {
              for (const i of str.data) {
                document.getElementById('row').innerHTML += `
                  <div class="card">
                      <img src="${i.avatar}" alt="${i.avatar}"></img>
                      <div class="desc">
                        <p><strong>Id: </strong>${i.id}</p>
                        <p><strong>Email: </strong>${i.email}</p>
                        <p><strong>First Name: </strong>${UpdateString(i.first_name)}</p>
                        <p><strong>Last Name: </strong>${UpdateString(i.last_name)}</p>
                      </div>
                  </div>
              `
              }
            }

            html()

            if (page <= total) {
              document.getElementById('next-users').style.display = 'inline-block'
            }
            else {
              alert('No more pages')
              document.getElementById('next-users').style.display = 'none'
            }
          },
        )
    )

    function UpdateString(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }
  }

  function display() {
    setLoading(true)
    setState(state = !state)
    setTimeout(() => {
      getUsers(pg)
      setLoading(false)
    }, 4000)
  }

  function nextUsers() {
    pg += 1
    setLoading(true)
    setTimeout(() => {
      getUsers(pg)
      setLoading(false)
    }, 4000)
  }

  return (
    <div className="App">
      <div className="container">
        <header>
          <nav id="sticky">Web Application API Call</nav>
          <div className='buttons'>
            <button type="button" className="btn" id="get-users" onClick={display}><i class="fa-solid fa-users"></i>{state ? 'Fetch Users' : 'Hide Users'}</button>
            <button type="button" className="btn" id="next-users" onClick={nextUsers}>Next</button>
          </div>
        </header>
        <section>
          {
            !state ?
              loading ? <div className='loader'>
                <div className='loader-glass'></div>
              </div> : <div id="users" >
                <p id="count"></p>
                <div id="row"></div>
              </div> : ""
          }
        </section>
      </div>
    </div>
  );
}

export default App;