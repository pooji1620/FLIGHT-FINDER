import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <a className="navbar-brand" href="/">
          <span className="fast">AVIAN</span>{" "}
          <span className="airlines">AIRLINES</span>
        </a>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link navs" href="/searchflights">Flights</a>
            </li>
            <li className="nav-item">
              <a className="nav-link navs" href="/ticket">Ticket</a>
            </li>
            <li className="nav-item">
              <a className="nav-link navs" href="/adminlogin">Admin</a>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default NavBar;
