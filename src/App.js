import { Box, Button, Container, Input, NativeSelect } from '@material-ui/core';
import React, { useState } from "react";
import "./App.css";

const FlightDetails = props => {
  const [firstNameError, setFirstNameError] = useState(false)
  const [firstName, setFirstName] = useState("");
  const [lastNameError, setLastNameError] = useState(false)
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState(false)
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState(false)
  const [phone, setPhone] = useState("");
  const [passportError, setPassError] = useState(false)
  const [passport, setPassport] = useState("");

  const [btnText, setBtnText] = useState("Continue")
  return (
    <>
      <div className="title">
        { btnText === "Continue" && `Hi ${props.name}`}
        { btnText === "Verify" && `Please review your information`}
      </div>
      <Box width={ 1 }>
        <Input placeholder="First Name" fullWidth={ true } input p={ 4 } className="input" required value={firstName} onChange={(e) => setFirstName(e.target.value)} error={firstNameError} />         
        { firstNameError && <span className="alert-danger">Enter First Name</span> }
      </Box>
      <Box width={ 1 }>
        <Input placeholder="Last Name" fullWidth={ true } input p={ 4 } className="input" required value={lastName} onChange={(e) => setLastName(e.target.value)} error={lastNameError} />
        { lastNameError && <span className="alert-danger">Enter Last Name</span> }
      </Box>
      <Box width={ 1 }>
        <NativeSelect className="select">
          <option aria-label="None" value="">Nationality</option>
          <option value="USA">USA</option>
          <option value="NIGERIA">NIGERIA</option>
          <option value="AUSTRIALIA">AUSTRIALIA</option>
        </NativeSelect>
      </Box>
      <Box width={ 1 }>
        <Input placeholder="Email" fullWidth={ true } input p={ 4 } className="input" required value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} />
        { emailError && <span className="alert-danger">Enter Email</span> }
      </Box>
      <Box width={ 1 }>
        <Input placeholder="Phone Number" fullWidth={ true } input p={ 4 } className="input" required value={phone} onChange={(e) => setPhone(e.target.value)} error={phoneError} />         
        { phoneError && <span className="alert-danger">Enter Phone Number</span> }
      </Box>
      <Box width={ 1 }>
        <Input placeholder="Passport #" fullWidth={ true } input p={ 4 } className="input" required value={passport} onChange={(e) => setPassport(e.target.value)} error={passportError} />         
        { passportError && <span className="alert-danger">Enter Passport ID</span> }
      </Box>
      <Button width={ 1 } m={ "auto" } size="medium" className="button" onClick={ () => {
          
        if (firstName.trim().length < 4) {
          setFirstNameError(true);
        } else {
          setFirstNameError(false)
        }

        if (lastName.trim().length < 4) {
          setLastNameError(true);
          return;
        } else {
          setLastNameError(false);
        }

        if (email.trim().length < 4) {
          setEmailError(true);
        } else {
          setEmailError(false)
        }

        if (phone.trim().length < 4) {
          setPhoneError(true);
        } else {
          setPhoneError(false)
        }

        if (passport.trim().length < 4) {
          setPassError(true);
        } else {
          setPassError(false)
        }

        if(!firstNameError && !lastNameError && !emailError && !phoneError && !passportError) {
          if(btnText === "Continue") {
            setBtnText("Verify");
            return
          } else {
            props.setFlightPhase('phase3');
            return;
          }
        } else {
          return
        }
      } }>
        {btnText}
      </Button>
    </>
  )
}

const AddFlight = props => {
  const [flightId, setFlightID] = useState('');
  const [lastname, setLastName] = useState('');
  const [flightIdError, setFlightError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  return (
    <>
      <div className="title">Welcome to your Flight Check in</div>
      <Box width={ 1 }>
        <Input placeholder="Flight #" fullWidth={ true } input p={ 4 } className="input" required value={ flightId } error={ flightIdError } onChange={ e => setFlightID(e.target.value) } />
        { flightIdError && <span className="alert-danger">Enter flight ID of at least 4 characters</span> }
      </Box>
      <Box width={ 1 }>
        <Input placeholder="Last Name" fullWidth={ true } input p={ 4 } className="input" required value={ lastname } error={ lastNameError } onChange={ e => setLastName(e.target.value) } />
        { lastNameError && <span className="alert-danger">Enter lastName of at least 4 characters</span> }
      </Box>
      <Button width={ 1 } m={ "auto" } size="medium" className="button" onClick={ () => {
        if (flightId.trim().length < 4) {
          setFlightError(true);
        } else {
          setFlightError(false)
        }

        if (lastname.trim().length < 4) {
          setLastNameError(true);
          return;
        } else {
          setLastNameError(false);
        }



        if (!flightIdError && !lastNameError) {
          props.setFlightPhase('phase2');
          props.setFlightId(flightId.trim());
          props.setName(lastname.trim())
          return;
        } else {
          return;
        }
      } }>
        Search Flight
      </Button>
    </>
  )

}


const Success = props => {
  return (
    <>
      <div className="title success">Your Check in is confirmed</div>
    </>
  )

}

const App = () => {
  const [name, setName] = useState("");
  const [flightId, setFlightId] = useState("");
  const [flightPhase, setFlightPhase] = useState('phase1');
  return (
    <>
      <Container className="container">
        <Box width={ 1 / 4 } m={ "auto" } p={ "auto" } height={ 1 / 2 } className="flex">
          { flightPhase === "phase1" && <AddFlight setFlightPhase={ setFlightPhase } setFlightId={ setFlightId } setName={ setName } /> }
          { flightPhase === "phase2" && <FlightDetails  name={name} setFlightPhase={setFlightPhase} /> }
          { flightPhase === "phase3" && <Success />}
        </Box>
      </Container>
    </>
  )
}

export default App;
