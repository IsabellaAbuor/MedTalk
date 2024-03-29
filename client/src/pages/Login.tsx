import { EuiButton, EuiFieldPassword, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from "@elastic/eui";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import animation from "../assets/animation.gif";
import logo from "../assets/logo2.png"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { firebaseAuth, firebaseDB, userRef } from "../utilis/FirebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { userSchema } from "../utilis/validation"

function Login() {

        const navigate = useNavigate();
        const dispatch = useAppDispatch();

        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) navigate("/");
        });

        const login = async () => {
            const provider = new GoogleAuthProvider();
            const {
                user: { displayName, email, uid },
              } = await signInWithPopup(firebaseAuth, provider);

            if (email) {
            const firestoreQuery = query(userRef, where("uid", "==", uid));
            const fetchedUsers = await getDocs(firestoreQuery);
            if (fetchedUsers.docs.length === 0) {
                await addDoc(collection(firebaseDB, "users"), {
                uid,
                name: displayName,
                email,
                });
            }
            dispatch(setUser({ uid, email: email!, name: displayName! }));
            navigate("/");
            }
        
        // const [registerEmail, setRegisterEmail] = useState ("");
        // const [registerPassword, setRegisterPassword] = useState ("");
        // const [loginEmail, setLoginEmail] = useState ("");
        // const [loginPassword, setLoginPassword] = useState ("");
        // const [isSubmitting, setIsSubmitting] = useState (false);
        // const loginwithEmail = async () => {

        // }
        const loginwithEmail = async () => {
            dispatch(setUser({ uid, email: email!, name: displayName! }));
            navigate("/");
            }

    };
    return (
    <EuiProvider colorMode = "light">
        <EuiFlexGroup alignItems="center" justifyContent="center" style={{ width: "100vw", height: "100vh" }}>
            <EuiFlexItem grow={false}>
                <EuiPanel paddingSize = "xl">
                    <EuiFlexGroup justifyContent="center" alignItems="center" >
                    <EuiFlexItem>
                            <EuiImage src={animation} alt="logo" />
                        </EuiFlexItem>
                    <EuiFlexItem>
                        {<EuiImage src={logo} alt="icon" size="50%" />}
                        <EuiSpacer size="xs" />

                        <EuiForm component="form">
                        <EuiFormRow 
                            label="Email" 
                            helpText="Enter the email associated with your account"
                            // isInvalid={errors.email}
                            // error={`Please enter a valid email.`}
                            >
                            <EuiFieldText 
                            icon ="email" 
                            placeholder="user@gmail.com"
                            // value={form.email}
                            // onChange={(e) => handleInputChange("email", e.target.value)}
                            // aria-label="Enter the email associated with your account."
                            // isInvalid={errors.email}
                            />
                        </EuiFormRow>

                        <EuiFormRow 
                            label="Password" 
                            helpText="Enter your password."
                            // isInvalid={errors.password}
                            // error={`Password must be at least 7 characters.`}
                            >
                            <EuiFieldPassword
                            name ="password" 
                            placeholder="••••••••••••"
                            // onChange={(e) => handleInputChange("password", e.target.value)}
                            // type="dual"
                            // aria-label="Enter your password."
                            // isInvalid={errors.password}
                            />
                        </EuiFormRow>
                        </EuiForm>
                        <EuiSpacer size="l" />
                        <EuiButton type = "submit" fill > Login </EuiButton>
                        <EuiSpacer size="xs" />
                        <EuiText textAlign="center" grow={false}>
                        <h5>
                            <EuiTextColor>Or</EuiTextColor>
                        </h5>
                        </EuiText>
                        <EuiSpacer size="xs" />
                        <EuiButton onClick={login}>
                            Login with Google
                        </EuiButton>
                        <EuiSpacer size="l" />
                        <EuiText textAlign="center" grow={false}>
                        <h5>
                            Don't have an account?<Link to="/signup">Signup</Link>.
                        </h5>
                        </EuiText>
                    </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiProvider>
  );
}


export default Login;