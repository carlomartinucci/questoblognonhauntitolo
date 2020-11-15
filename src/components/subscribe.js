import React, { useState, useEffect } from "react"
import useCookie from "../hooks/useCookie"
import addToMailchimp from "gatsby-plugin-mailchimp"

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

  switch (state) {
    case "ready":
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
    case "subscribed":
      return (
        <p>
          Grazie per esserti iscritto alla mia newsletter! Se vuoi puoi{" "}
          <button className="btn-link" onClick={e => setState("ready")}>
            iscriverti nuovamente
          </button>
          , ad esempio se hai cambiato indirizzo email o per qualsiasi altra
          ragione.
        </p>
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
  ["Harry", "harry.potter@gryffindor.hog"],
  ["Hermione", "hermione.granger@gryffindor.hog"],
  ["Garrick", "garrick.ollivander@ravenclaw.hog"],
  ["Luna", "luna.lovegood@ravenclaw.hog"],
  ["Draco", "draco.malfoy@slytherin.hog"],
  ["Tom", "dark.lord@youknowwho.evil"],
  [
    "Daenerys",
    "daenerys.targaryen@FirstofHerNameQueenoftheAndalsandtheFirstMenProtectoroftheSevenKingdomstheMotherofDragonstheKhaleesioftheGreatGrassSeatheUnburnttheBreakerofChains.7k",
  ],
  ["Sirius", "sirius.black@orderofthephoenyx.org"],
  ["Cedric", "cedric.diggory@hufflepuff.hog"],
  ["Nymphadora", "nymphadora.tonks@hufflepuff.hog"],
  ["Molly", "molly.weasley@orderofthephoenyx.org"],
  ["Arthur", "arthur.weasley@ministerofmagic.gov"],
  ["Severus", "severus.snape@hogwarts.hog"],
  ["Jon", "jon.snow@youknownothing.dumb"],
  ["King", "stannis.baratheon@onetrueking.storm"],
  ["Petyr", "petyr.littlefinger@masterofcoin.gov"],
  ["Jaime", "jaime.lannister@kingslayer.net"],
  ["Kahl", "kahl.drogo@dotraki.org"],
  ["Walter", "walter.white@eisenberg.com"],
  ["Alicia", "alicia.florrick@chumhum.com"],
  ["Varys", "lord.varys@masterofwhispers.gov"],
  ["Aerys", "aerys.targaryen@burnthemall.crazy"],
  ["Hodor", "hodor@hodor.hodor"],
  // president bartlet
]

const useRandom = array => {
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (value === null) {
      setValue(array[Math.floor(Math.random() * array.length)])
    }
  }, [array, value, setValue])

  return value
}

// const sample = array => array[Math.floor(Math.random() * array.length)]

export default Subscribe
