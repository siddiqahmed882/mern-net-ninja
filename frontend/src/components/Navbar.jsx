import { Link } from "react-router-dom"

function Navbar() {
  return (
    <header>
      <div className="container">
      <h1 className="logo">
        <Link to="/">
          Workout Buddy
        </Link>
      </h1>
      </div>
    </header>
  )
}

export default Navbar