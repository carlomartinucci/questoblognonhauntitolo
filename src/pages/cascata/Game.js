import React, { useReducer } from "react"
import "./style.css"

const initialValues = [
  "__c_aa________",
  "_ve_ae__a__aaa",
  "_aecch_eiaaeia",
  "adeiei_llecgrl",
  "aonnhieqneeltr",
  "npnrnsotrnhltr",
  "osorttsuusltuu",
  "   ^      ^   ",
  "^      ^  ^   ",
  "^     ^  ^  ^ ",
  "       :^  ^  ",
  "      ^  '    ",
  " ^ ^  ^       ",
  "^     ^      .",
].join("")

const initialArg = { values: initialValues, selected: null }

const reducer = (state, action) => {
  switch (action.type) {
    case "tap":
      if (state.selected == null) {
        return { values: state.values, selected: action.tapped }
      } else if (action.tapped === state.selected) {
        return { values: state.values, selected: null }
      } else if (canSwap(state.values, state.selected, action.tapped)) {
        return {
          values: swap(state.values, state.selected, action.tapped),
          selected: null,
        }
      } else {
        return { values: state.values, selected: action.tapped }
      }
    case "reset":
      return { values: initialValues, selected: null }
    default:
      throw new Error()
  }
}

const canSwap = (values, i1, i2) => i1 % 14 === i2 % 14
function swap(values, i1, i2) {
  const first = i1 < i2 ? i1 : i2
  const last = i1 < i2 ? i2 : i1
  return (
    values.substr(0, first) +
    values[last] +
    values.substring(first + 1, last) +
    values[first] +
    values.substr(last + 1)
  )
}

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialArg)
  const handleClick = index => e => dispatch({ type: "tap", tapped: index })

  return (
    <div className="crossword-board-container">
      <div className="crossword-board">
        <Inputs
          values={state.values}
          onClick={handleClick}
          selected={state.selected}
        />
      </div>
    </div>
  )
}

const Inputs = ({ values, selected, onClick }) => {
  let inputs = []
  for (let i = 0; i < 14 * 14; i++) {
    const value = values[i]

    if (value === "^") {
      inputs.push(
        <span
          key={i}
          className="crossword-board__item crossword-board__item--blank"
        />
      )
    } else if (value === "_") {
      inputs.push(<span key={i} className="crossword-board__item" />)
    } else {
      inputs.push(
        <input
          key={i}
          className={`crossword-board__item ${
            i === selected ? "crossword-board__item--selected" : ""
          } ${
            14 * 6 <= i && i < 14 * 7
              ? "crossword-board__item--border-bottom"
              : ""
          }`}
          type="text"
          minLength="1"
          maxLength="1"
          value={value}
          onClick={value.match(/[a-z ]/i) ? onClick(i) : undefined}
          required
          readOnly
        />
      )
    }
  }

  return inputs
}

export default Game
