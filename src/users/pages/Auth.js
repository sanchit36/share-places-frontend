import { useContext, useState } from "react";

import Button from "../../shared/components/FormElements/Button/Button";
import Input from "../../shared/components/FormElements/Input/Input";
import Card from "../../shared/components/UIElements/Card/Card";
import { AuthContext } from "../../shared/content/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const toggleModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setLoginMode((prev) => !prev);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
    auth.login();
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />

      <form className="form-container" onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name"
            onInput={inputHandler}
          />
        )}

        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a valid password, at least 8 characters"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGN UP"}
        </Button>
      </form>

      <hr />

      <Button inverse onClick={toggleModeHandler}>
        {isLoginMode
          ? "Don't have an account? Sign up!"
          : "Already have a account? Login!"}
      </Button>
    </Card>
  );
};

export default Auth;
