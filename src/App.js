import { useEffect, useState } from "react"

function App() {

  let resolvedOptions = Intl.DateTimeFormat().resolvedOptions()
  let urlmytimezone = `http://worldtimeapi.org/api/timezone/${resolvedOptions.timeZone}`

  const [timeApi, setTimeApi] = useState();
  const [timeLocal, setTimeLocal] = useState()

  const gettimezone = async () => {
    await fetch(urlmytimezone)
      .then( r => r.json() )
      .then( d => setTimeApi( d.datetime ) )
      .then( () => {
        let Digital = '';
        console.log(timeApi)
        console.log(typeof timeApi)

        Digital = new Date(timeApi);

        let day   = Digital.getDay() < 10 ? `0${Digital.getDay()}` : Digital.getDay()
        let month = Digital.getMonth() + 1
        month = month < 10 ? `0${month}` : month
        let year = Digital.getFullYear()
        let hours = Digital.getHours() < 10 ? `0${Digital.getHours()}` : Digital.getHours()
        let minutes = Digital.getMinutes() < 10 ? `0${Digital.getMinutes()}` : Digital.getMinutes()
        let seconds = Digital.getSeconds() < 10 ? `0${Digital.getSeconds()}` : Digital.getSeconds()

        setTimeLocal( `${day}-${month}-${year} ${hours}:${minutes}:${seconds}` )
      })
  }

  useEffect( () => {
    gettimezone()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h2>La hora en {resolvedOptions.timeZone}</h2>
      <p>{ timeLocal }</p>
    </>
  );
}

export default App;
