import DanyaGeelyMK from "../assets/download.jfif";

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="javascript:void(0)">
                    <img src={DanyaGeelyMK} alt="logo" width="30" height="24"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="javascript:void(0)">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="javascript:void(0)">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="javascript:void(0)">Link</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="text" placeholder="Search"/>
                        <button className="btn btn-primary" type="button">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}