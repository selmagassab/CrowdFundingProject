import React, { useContext, useEffect, useState, useRef } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import App from "../../../../../App";
import { Route, useLocation } from "react-router-dom";
import { Marginer } from "../marginer";
import { InputText } from "primereact/inputtext";
import { AccountContext } from "./accountContext";
import { Toast } from "primereact/toast";
import { userService } from "../../../_services";
import Dashboard from "../../../../../components/Dashboard";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

export function LoginForm(props) {
    const { switchToSignup } = useContext(AccountContext);
    const { switchToForgotPasswordOne } = useContext(AccountContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const location = useLocation();
    const toast = useRef(null);

    useEffect(() => {
        userService.logout();
    }, []);

    function refreshPage() {
        window.location.reload(false);
    }
    useEffect(() => {}, [redirect]);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else {
            setPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (username && password) {
            var result = userService.login(username, password);
            Promise.resolve(result).then((value) => {
                if (value === "Invalid details") {
                    toast.current.show({ severity: "error", summary: "Error", detail: value, life: 5000 });
                } else if (value === "You failed too many times.") {
                    toast.current.show({ severity: "error", summary: "Error", detail: value, life: 5000 });
                } else if (value === "No User Found!") {
                    toast.current.show({ severity: "error", summary: "Error", detail: value, life: 5000 });
                } else {
                    toast.current.show({ severity: "success", summary: "Succesfull", detail: "Login successful", life: 5000 });
                    setTimeout(
                        function () {
                            //Start the timer
                            refreshPage(); //After 1 second, set render to true
                        }.bind(this),
                        1000
                    );
                    setRedirect(true);
                }
            });
        }
    };
    const responseSuccessGoogle = (res) => {
        console.log(res);
        userService.googlelogin(res.tokenId);
        setTimeout(
            function () {
                //Start the timer
                refreshPage(); //After 1 second, set render to true
            }.bind(this),
            1000
        );
    };
    const componentClicked = (res) => {};

    const responseFacebook = (res) => {
        userService.facebooklogin(res.accessToken, res.userID);
        setTimeout(
            function () {
                //Start the timer
                refreshPage(); //After 1 second, set render to true
            }.bind(this),
            1000
        );
    };
    const responseFailureGoogle = (res) => {
        console.log(res);
    };
    if (!redirect) {
        return (
            <BoxContainer>
                <Toast ref={toast} />
                <FormContainer>
                    <Input id="username" name="username" type="text" placeholder="Email" onChange={handleChange} />
                    {submitted && !username && <div className="help-block">Username is required</div>}
                    <Input type="password" id="password" name="password" placeholder="Password" onChange={handleChange} />
                </FormContainer>
                <Marginer direction="vertical" margin={10} />
                <MutedLink href="#" onClick={switchToForgotPasswordOne}>
                    Forget your password?
                </MutedLink>
                <Marginer direction="vertical" margin="1.6em" />
                <SubmitButton type="submit" onClick={handleSubmit}>
                    Signin
                </SubmitButton>
                <Marginer direction="vertical" margin="1em" />
                <Marginer direction="vertical" margin="1.6em" />
                <GoogleLogin clientId="98128393533-fb736bc4b2637vn8t1028bcf0e6mv0lj.apps.googleusercontent.com" buttonText="Login with Google" onSuccess={responseSuccessGoogle} onFailure={responseFailureGoogle} cookiePolicy={"single_host_origin"} />
                <FacebookLogin appId="531998668448477" autoLoad={false} onClick={componentClicked} callback={responseFacebook} />
                <Marginer direction="vertical" margin="1em" />
                <MutedLink href="#">
                    Don't have an accoun?{" "}
                    <BoldLink href="#" onClick={switchToSignup}>
                        Signup
                    </BoldLink>
                </MutedLink>
            </BoxContainer>
        );
    }
}
