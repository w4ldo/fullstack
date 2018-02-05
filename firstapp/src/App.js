import React from 'react'
import Kurssi from './components/Kurssi'

const App = ({kurssit}) => {

    const kaikkiKurssit = () => kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)
  
    return (
      <div>
        {kaikkiKurssit()}
      </div>
    )
  }

export default App