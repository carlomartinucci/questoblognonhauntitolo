import React from "react"

import SEO from "../../components/seo"

import Game from "./Game"

const Cascata = () => {
  return (
    <div>
      <SEO title="Cascata di lettere" />
      <h1>Cascata di lettere</h1>
      <p>Lo schema è diviso in due metà. Far cadere colonna per colonna le lettere della metà superiore nella stessa colonna della metà inferiore, in modo da leggere una frase di C.B.</p>
      <p>Le caselle in grigio rappresentano gli spazi tra le parole. Sono indicati inoltre tre segni di interpunzione (due punti, apostrofo, punto).</p>
      <Game />
    </div>
  )
}

export default Cascata
