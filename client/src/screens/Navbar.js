import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import M from "materialize-css";
import { use } from "passport";
import "./design.css";
// import img1 from '../images/cf.jpg'
import Navbar_Logo from "../images/logo.jpg";
import BlobbyButton from "../assets/BlobbyButton";

function Navbar() {
  const [query, setQuery] = useState("");
  const history = useHistory();

  useEffect(() => {
    var side_nav_elem = document.querySelectorAll("#slide-out");
    M.Sidenav.init(side_nav_elem);
    var modal_elem = document.querySelectorAll(".modal");
    M.Modal.init(modal_elem);

    var tooltip_elem = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(tooltip_elem);

    // var collapsible_elem=document.querySelectorAll('.collapsible')
    // M.Collapsible.init(collapsible_elem)

    var drop_elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(drop_elems);
  }, []);

  function SubmitQuery() {
    fetch("/user/submitQuery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        userQuery: query,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          M.toast({
            html: data.error,
            classes: "#ce93d8 purple",
            displayLength: 1000,
          });
        } else {
          M.toast({
            html: data.message,
            classes: "#ce93d8 purple",
            displayLength: 1000,
          });
        }
      });
  }

  function Logout() {
    fetch("/user/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        localStorage.clear();
        history.push("/landing");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="navbar-div" style={{ minWidth: "fit-content" }}>
      <nav
        className="navbar-setter"
        // style={{
        //     backgroundColor: 'rgb(0,0,0,0.2)',
        //     borderBottom: '2px solid rgba(0, 0, 0, 1)',
        //     height: '17vw',
        //     textAlign: 'center',
        //     //paddingTop: '1.3rem',
        // }}
      >
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "10rem 50rem 10rem",
            columnGap: "2rem",
            justifyContent: "center",
            alignItems: "center",
            //overflow: 'auto',
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <li style={{ position: "absolute" }}>
            <a
              data-target="slide-out"
              className="sidenav-trigger show-on-large left"
              style={{
                cursor: "pointer",
                overflow: "hidden",
                height: "10vh",
              }}
            >
              <i className="material-icons">menu</i>
            </a>
          </li>

          <li
            className="Heading-navbar"
            style={
              {
                // width: '100%',position: 'absolute', alignItems: 'center'
              }
            }
          >
            <div className="heading">
              {/* <Link to="/home" style={{ fontSize: '4.7vw', margin: 'auto' }}>CLASH OF CODES</Link> */}
              <Link to="/home" className="heading-content">
                CLASH OF CODES
              </Link>
            </div>
            <div className="nav-wrapper">
              <ul id="slide-out" className="sidenav nav lighten-2">
                <li
                  style={{
                    marginTop: "1.2rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <Link to="/home">
                    <button
                      className="blobby-button sidenav-close tooltipped"
                      data-position="right"
                      data-tooltip="Go to the home page"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                      }}
                    >
                      Home
                      <BlobbyButton />
                    </button>
                  </Link>
                </li>
                <li
                  style={{
                    marginTop: "1.2rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <Link to="/contest">
                    <button
                      className="blobby-button sidenav-close tooltipped"
                      data-position="right"
                      data-tooltip="Join or Create a contest from all your unattempted questions on codeforces"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                      }}
                    >
                      Contest
                      <BlobbyButton />
                    </button>
                  </Link>
                </li>
                <li
                  style={{
                    marginTop: "1.2rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <Link to="/profile">
                    <button
                      className="blobby-button sidenav-close tooltipped"
                      data-position="right"
                      data-tooltip="View/Set your handles and don't forget to add your friends!!"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                      }}
                    >
                      Profile
                      <BlobbyButton />
                    </button>
                  </Link>
                </li>
                <li
                  style={{
                    marginTop: "1.2rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <Link to="/dsa">
                    <button
                      className="blobby-button sidenav-close tooltipped"
                      data-position="right"
                      data-tooltip="Practice Data Structures & Algorithms and keep a track on your daily progress"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                      }}
                    >
                      DSA
                      <BlobbyButton />
                    </button>
                  </Link>
                </li>
                <li
                  style={{
                    marginTop: "1.2rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <Link to="/codeforces">
                    <button
                      className="blobby-button sidenav-close tooltipped"
                      data-position="right"
                      data-tooltip="Complete statistics of your codeforces performance"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                      }}
                    >
                      Codeforces
                      <BlobbyButton />
                    </button>
                  </Link>
                </li>
                <li
                  style={{
                    marginTop: "1.2rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <Link to="/codechef">
                    <button
                      className="blobby-button sidenav-close tooltipped"
                      data-position="right"
                      data-tooltip="Complete statistics of your Codechef performance"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                      }}
                    >
                      Codechef
                      <BlobbyButton />
                    </button>
                  </Link>
                </li>

                <li
                  style={{
                    marginTop: "1.2rem",
                    marginBottom: "3.2rem",
                  }}
                >
                  <Link to="/compareCodeforces">
                    <button
                      className="blobby-button sidenav-close tooltipped "
                      data-position="right"
                      data-tooltip="Compare your codeforces performance with that of your friend"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                      }}
                    >
                      Compare
                      <br />
                      Codeforces
                      <BlobbyButton />
                    </button>
                  </Link>
                </li>

                <li
                  style={{
                    marginTop: "1.2rem",
                    marginBottom: "3.2rem",
                  }}
                >
                  <Link to="/compareCodechef">
                    <button
                      className="blobby-button sidenav-close tooltipped "
                      data-position="right"
                      data-tooltip="Compare your codechef performance with that of your friend"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                      }}
                    >
                      Compare
                      <br />
                      Codechef
                      <BlobbyButton />
                    </button>
                  </Link>
                </li>

                <li
                  style={{
                    marginTop: "1.2rem",
                    marginBottom: "3.2rem",
                  }}
                >
                  <Link to="/codeforcesPractice">
                    <button
                      className="blobby-button sidenav-close tooltipped "
                      data-position="right"
                      data-tooltip="Practice questions from codeforces. Apply filters to practice
                                            specific questions of your choice"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                      }}
                    >
                      Practice
                      <br />
                      Codeforces
                      <BlobbyButton />
                    </button>
                  </Link>
                </li>

                <li
                  style={{
                    marginTop: "1.2rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <a className="modal-trigger" href="#modal1">
                    <button
                      className="blobby-button sidenav-close tooltipped"
                      data-position="right"
                      data-tooltip="Found a bug? Some feedback or suggestion? We will be happy to hear from you"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                      }}
                    >
                      Report
                      <BlobbyButton />
                    </button>
                  </a>
                </li>
                <li
                  style={{
                    marginTop: "1.2rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <a className="" href="#">
                    <button
                      className="blobby-button sidenav-close tooltipped"
                      onClick={() => {
                        Logout();
                      }}
                      data-position="right"
                      data-tooltip="Hope you liked the website"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                      }}
                    >
                      Logout
                      <BlobbyButton />
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li style={{ height: "100%" }}>
            <div className="brand-logo right" style={{ margin: "1rem" }}>
              <Link to="/home" style={{ padding: "0", marginRight: "1rem" }}>
                <img
                  src={Navbar_Logo}
                  style={{
                    width: "8rem",
                    height: "8rem",
                    borderRadius: "20%",
                    overflow: "hidden",
                  }}
                  className="hide-on-med-and-down"
                ></img>
              </Link>
            </div>
          </li>
        </ul>
      </nav>

      <nav
        className="smallNavbar"
        style={{
          marginBottom: "100px",
          backgroundColor: "rgba(0, 0, 0, 0)",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            fontSize: "1.2rem",
          }}
        >
          <li>
            <Link
              to="/home"
              style={{
                fontSize: "1.2rem",
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              style={{
                fontSize: "1.2rem",
              }}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/codeforces"
              style={{
                fontSize: "1.2rem",
              }}
            >
              Codeforces
            </Link>
          </li>
          <li>
            <Link
              to="/codechef"
              style={{
                fontSize: "1.2rem",
              }}
            >
              Codechef
            </Link>
          </li>
          <li>
            <Link
              to="/dsa"
              style={{
                fontSize: "1.2rem",
              }}
            >
              DSA
            </Link>
          </li>
          <li>
            <Link
              to="/contest"
              style={{
                fontSize: "1.2rem",
              }}
            >
              Contest
            </Link>
          </li>

          <li className="dropdown-trigger" href="#" data-target="dropdown1">
            <a
              style={{
                fontSize: "1.2rem",
              }}
            >
              Compare
            </a>
            <ul
              id="dropdown1"
              className="dropdown-content"
              style={{
                width: "fit-content",
                fontSize: "1.2rem",
                borderRadius: "15px",
                // background: "rgba(230, 236, 233, 0.349)",
                backdropFilter: "blur(10px)",
              }}
            >
              <li>
                <Link
                  to="/compareCodeforces"
                  style={{
                    fontSize: "1.2rem",
                    // color: "#e6ff02",
                  }}
                >
                  Codeforces
                </Link>
              </li>
              <li>
                <Link
                  to="/compareCodechef"
                  style={{
                    fontSize: "1.2rem",
                    // color: "#e6ff02",
                  }}
                >
                  Codechef
                </Link>
              </li>
            </ul>
          </li>
          <li className="dropdown-trigger" href="#" data-target="dropdown2">
            <a
              style={{
                fontSize: "1.2rem",
              }}
            >
              Practice
            </a>

            <ul
              id="dropdown2"
              className="dropdown-content"
              style={{
                width: "fit-content",
                borderRadius: "15px",
                // background: "rgba(230, 236, )",
                backdropFilter: "blur(10px)",
              }}
            >
              <li>
                <Link
                  to="/codeforcesPractice"
                  style={{
                    fontSize: "1.2rem",
                    // color: "#e6ff02",
                  }}
                >
                  Codeforces
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/division"
              style={{
                fontSize: "1.2rem",
              }}
            >
              Division
            </Link>
          </li>
          <li
            style={{ cursor: "pointer", fontSize: "1.2rem" }}
            onClick={() => {
              Logout();
            }}
          >
            <a
              style={{
                fontSize: "1.2rem",
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>

      <div id="modal1" className="modal">
        <div className="modal-content" style={{ backgroundColor: "darkcyan" }}>
          <h4>Report us your queries/suggestions</h4>
          <h5>
            <p>
              &#128516; &#128516; We will be happy to hear from you &#128513;
              &#128513;{" "}
            </p>
          </h5>
          <textarea
            type="text"
            style={{ color: "white", height: "200px", fontSize: "20px" }}
            placeholder="Right down here"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div className="modal-footer">
          <a className="modal-close waves-effect waves-green btn-flat">Close</a>
          <a
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => {
              SubmitQuery();
            }}
          >
            Submit
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
