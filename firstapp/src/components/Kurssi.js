import React from 'react'
import Sisalto from './Sisalto'
import Otsikko from './Otsikko'

const Kurssi = ({ kurssi }) => {
  
  const yhteensa = () => kurssi.osat.reduce(function(yhteensa, osa) {
    return yhteensa + osa.tehtavia
  }, 0)
  
  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto kurssi={kurssi} />
      <p>yhteensä {yhteensa()} tehtävää</p>
    </div>
  )
}

export default Kurssi