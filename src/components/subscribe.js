import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"

const Subscribe = props => {
  const [state, setState] = useState("ready")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState(null)

  const handleChangeEmail = e => setEmail(e.target.value)
  const handleChangeName = e => setName(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    setError(null)
    setState("error")
    addToMailchimp(email, { FNAME: name })
      .then(({ result, msg }) => {
        if (result === "success") {
          setState("success")
        } else {
          setState("error")
          setError(msg)
        }
      })
      .catch(_error => {
        setState("error")
      })
  }

  switch (state) {
    case "ready":
      return (
        <Form
          onSubmit={handleSubmit}
          email={email}
          handleChangeEmail={handleChangeEmail}
          name={name}
          handleChangeName={handleChangeName}
        />
      )
    case "submitting":
      return (
        <Form
          onSubmit={handleSubmit}
          email={email}
          handleChangeEmail={handleChangeEmail}
          name={name}
          disabled
          handleChangeName={handleChangeName}
        >
          Un momento di pazienza, ti sto registrando alla mia mailing list :)
        </Form>
      )

    case "success":
      return (
        <Form
          onSubmit={handleSubmit}
          email={email}
          handleChangeEmail={handleChangeEmail}
          name={name}
          disabled
          handleChangeName={handleChangeName}
        >
          Ottimo <b>{name}</b>, ti ho registrato alla mia mailing list con il
          tuo indirizzo <b>{email}</b>!{" "}
          <b>
            Controlla il tuo indirizzo email e clicca il link di conferma per
            confermare la tua iscrizione!
          </b>
        </Form>
      )
    case "error":
      return (
        <Form
          onSubmit={handleSubmit}
          email={email}
          handleChangeEmail={handleChangeEmail}
          name={name}
          handleChangeName={handleChangeName}
        >
          <span style={{ color: "red" }}>
            {error ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: error,
                }}
              />
            ) : (
              "C'è stato un errore non meglio identificato. Potresti riprovare, per favore?"
            )}
          </span>
        </Form>
      )
    default:
      return ""
  }
}

const Form = ({
  onSubmit,
  email,
  handleChangeEmail,
  name,
  handleChangeName,
  disabled,
  children,
}) => {
  const [placeholder] = useState(() => sample(placeholders))

  return (
    <form onSubmit={onSubmit}>
      <p>
        Se vuoi ricevere una email quando scrivo qualcosa, lasciami il tuo
        indirizzo email e il tuo nome.
      </p>
      <p>
        <label htmlFor="email">Qual è il tuo indirizzo email?</label>
        <br />
        <input
          type="email"
          id="email"
          placeholder={placeholder[1]}
          value={email}
          onChange={handleChangeEmail}
          disabled={disabled}
          required
        ></input>
      </p>
      <p>
        <label htmlFor="name">Come ti chiami?</label>
        <br />
        <input
          type="text"
          id="name"
          placeholder={placeholder[0]}
          value={name}
          required
          disabled={disabled}
          onChange={handleChangeName}
        ></input>
      </p>
      <p>
        <button type="submit" disabled={disabled}>
          {disabled ? "Ti sto registrando..." : "Registrati"}
        </button>
      </p>
      {children}
    </form>
  )
}

const placeholders = [
  ["Guybrush", "guybrush.ulysses@threepwood.com"],
  ["Chuckie", "le.chuck@vodoo.com"],
  ["Elaine", "elaine.marley@melee.gov"],
  ["Benjamin", "benjamin.sisko@starfleet.com"],
  ["Jadzia", "jadzia.dax@trill.com"],
  ["Boba", "boba.fett@bountyhunter.com"],
  ["Sheev", "senator.palpatine@naboo.gov"],
  ["Luke", "luke.skywalker@force.jedi"],
  ["Leia", "leia.organa@rebel.com"],
  ["Han", "han.solo@rebel.com"],
  ["Yoda", "yoda@force.jedi"],
  ["Frodo", "frodo.baggins@theshire.com"],
  ["Gollum", "gollum.smeagol@myprecious.mor"],
  ["Theoden", "king.theoden@rohan.gov"],
]

const sample = array => array[Math.floor(Math.random() * array.length)]

export default Subscribe
