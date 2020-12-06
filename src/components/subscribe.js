import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"

import placeholders from "./subscribe/placeholders"

import useCookie from "../hooks/useCookie"
import useRandom from "../hooks/useRandom"

const Subscribe = props => {
  const [cookieState, setCookieState] = useCookie("subscribed", "ready")
  const [state, setState] = useState(() =>
    cookieState === "subscribed" ? "subscribed" : "ready"
  )
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState(null)

  const handleChangeEmail = e => setEmail(e.target.value)
  const handleChangeName = e => setName(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    setError(null)
    setState("submitting")
    addToMailchimp(email, { FNAME: name })
      .then(({ result, msg }) => {
        if (result === "success") {
          setState("success")
          setCookieState("subscribed")
        } else {
          setState("error")
          setError(msg)
        }
      })
      .catch(_error => {
        setState("error")
      })
  }

  const setAlreadySubscribed = e => {
    setState("subscribed")
    setCookieState("subscribed")
  }

  if (
    (state === "ready" && props.neverHide) ||
    (state === "subscribed" && props.neverHide)
  ) {
    return (
      <Form
        onSubmit={handleSubmit}
        email={email}
        handleChangeEmail={handleChangeEmail}
        name={name}
        handleChangeName={handleChangeName}
      />
    )
  } else if (state === "ready") {
    return (
      <Form
        onSubmit={handleSubmit}
        email={email}
        handleChangeEmail={handleChangeEmail}
        name={name}
        handleChangeName={handleChangeName}
      >
        Se invece sei già iscritto alla newsletter,{" "}
        <button
          className="btn-link"
          onClick={setAlreadySubscribed}
          type="button"
        >
          nascondi questo form
        </button>
        .
      </Form>
    )
  } else if (state === "submitting") {
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
  } else if (state === "success") {
    return (
      <Form
        onSubmit={handleSubmit}
        email={email}
        handleChangeEmail={handleChangeEmail}
        name={name}
        disabled
        handleChangeName={handleChangeName}
      >
        Ottimo <b>{name}</b>, ti ho registrato alla mia mailing list con il tuo
        indirizzo <b>{email}</b>!{" "}
        <b>
          Controlla il tuo indirizzo email e clicca il link di conferma per
          confermare la tua iscrizione!
        </b>
      </Form>
    )
  } else if (state === "error") {
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
  } else if (state === "subscribed") {
    return (
      <p>
        Grazie per esserti iscritto alla mia newsletter! Se vuoi puoi{" "}
        <button className="btn-link" onClick={e => setState("ready")}>
          iscriverti nuovamente
        </button>{" "}
        (ad esempio se hai cambiato indirizzo email).
      </p>
    )
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
  // const [placeholder] = useState(() => sample(placeholders))
  const placeholder = useRandom(placeholders)

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
          placeholder={placeholder ? placeholder[1] : ""}
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
          placeholder={placeholder ? placeholder[0] : ""}
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

export default Subscribe
