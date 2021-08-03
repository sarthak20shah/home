import { Form, Input, Button, Checkbox, DatePicker } from "antd";
import moment from "moment";
import { exit } from "process";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [bDate, setBDate] = useState("");
  const [allUserData, setAllUserData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("allUserData") === null) {
      localStorage.setItem("allUserData", JSON.stringify(allUserData));
    }
  }, []);

  let history = useHistory();

  // function onChange(date: any, dateString: any) {
  //   console.log("datestring", dateString);
  //   console.log("date", date);
  // }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const usedata: any = localStorage.getItem("allUserData");
    const allUserData = JSON.parse(usedata);
    let format = moment(bDate).format("DD/MM/YYYY");
    console.log("format", format);
    if (allUserData.length < 1) {
      const newUserData = { name, email, password, format };
      allUserData.push(newUserData);
      localStorage.setItem("allUserData", JSON.stringify(allUserData));
      history.push("/login");
    } else {
      const isUserDataAvailable = allUserData.find((element: any) => {
        return element.email === email;
      });
      console.log("isUserDataAvailable", isUserDataAvailable);
      if (isUserDataAvailable !== undefined) {
        toast.error("EMAIL IS ALREADY TAKEN");
      } else {
        const newUserData = { name, email, password, format };
        allUserData.push(newUserData);
        localStorage.setItem("allUserData", JSON.stringify(allUserData));
        toast.success("SIGN UP SUCCESSFUL");
        history.push("/login");
      }
      // if (element && element.email === email) {
      //
      //   return;
      // } else {
      // const newUserData = { name, email, password };
      // allUserData.push(newUserData);
      // localStorage.setItem("allUserData", JSON.stringify(allUserData));
      //   return;
      // }
    }

    // localStorage.setItem("name", name);
    // localStorage.setItem("password", password);
    // localStorage.setItem("email", email);
  };

  return (
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Sign up
                  </p>

                  <form className="mx-1 mx-md-4">
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required={true}
                        />
                        <label className="form-label" htmlFor="form3Example1c">
                          Your Name
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required={true}
                        />
                        <label className="form-label" htmlFor="form3Example3c">
                          Your Email
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        {/* <input
                          type="text"
                          className="form-control"
                          value={bDate}
                          
                          required={true}
                        /> */}

                        <DatePicker
                          onChange={(dateString: any) => {
                            setBDate(dateString);
                          }}
                          id="form3Example3c"
                        />
                        <label className="form-label" htmlFor="form3Example3c">
                          Your Birthdate
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4c"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required={true}
                        />
                        <label className="form-label" htmlFor="form3Example4c">
                          Password
                        </label>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={handleSubmit}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img
                    src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                    className="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
