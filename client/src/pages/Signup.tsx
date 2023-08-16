import { EuiButton, EuiFieldPassword, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from "@elastic/eui";
import React from "react";
import {Link, useNavigate} from "react-router-dom"
import animation from "../assets/animation.gif";
import { GoogleAuthProvider, onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth, firebaseDB, userRef } from "../utilis/FirebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";

function Signup() {

        const navigate = useNavigate();
        const dispatch = useAppDispatch();

        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) navigate("/");
        });

        const signup = async () => {
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
        
            // const signUpWithEmailAndPassword = async () => {
            //     try {
            //         await createUserWithEmailAndPassword(firebaseAuth, email, password);
            //         } catch (err){
            //           console.error(err);
            //         }
            //         if (email) {
            //             const firestoreQuery = query(userRef, where("uid", "==", uid));
            //             const fetchedUsers = await getDocs(firestoreQuery);
            //             if (fetchedUsers.docs.length === 0) {
            //                 await addDoc(collection(firebaseDB, "users"), {
            //                 uid,
            //                 name: displayName,
            //                 email,
            //                 });
            //             }
            //       };
            //     dispatch(setUser({ uid, email: email!, name: displayName! }));
            //     navigate("/");
            //     }

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
                        <EuiText textAlign="center" grow={false}>
                        <h1>
                            <EuiTextColor>Create your account</EuiTextColor>
                        </h1>
                        </EuiText>
                        <EuiSpacer size="l" />
                        <EuiForm component="form">
                        <EuiFormRow label="Email" helpText="Enter an email">
                            <EuiFieldText 
                            icon ="email" 
                            placeholder="user@gmail.com"
                            />
                        </EuiFormRow>
                        <EuiFormRow label="Password" helpText="Enter your password.">
                            <EuiFieldPassword
                            name ="password" 
                            placeholder="••••••••••••"
                            ></EuiFieldPassword>
                        </EuiFormRow>
                        </EuiForm>
                        <EuiSpacer size="l" />
                        <EuiButton fill> Create account </EuiButton>
                        <EuiSpacer size="xs" />
                        <EuiText textAlign="center" grow={false}>
                        <h5>
                            <EuiTextColor>Or</EuiTextColor>
                        </h5>
                        </EuiText>
                        <EuiSpacer size="xs" />
                        <EuiButton onClick={Signup}>
                            Signup with Google
                        </EuiButton>
                        <EuiSpacer size="l" />
                        <EuiText textAlign="center" grow={false}>
                        <h5>
                            Already have an account?<Link to="/login">Login</Link>.
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


export default Signup