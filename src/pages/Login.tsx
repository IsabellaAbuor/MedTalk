import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from "@elastic/eui";
import React from "react";
import animation from "../assets/animation.gif";
import logo from "../assets/logo4.png";

function Login() {
    return (
    <EuiProvider colorMode = "dark">
        <EuiFlexGroup alignItems="center" justifyContent="center" style={{ width: "100vw", height: "100vh" }}>
            <EuiFlexItem grow={false}>
                <EuiPanel paddingSize = "xl">
                    <EuiFlexGroup justifyContent="center" alignItems="center" >
                    <EuiFlexItem>
                            <EuiImage src={animation} alt="logo" />
                        </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiImage src={logo} alt="logo2" size="230px"/>
                        <EuiSpacer size="xs" />
                        <EuiText textAlign="center" grow={false}>
                        <h3>
                            <EuiTextColor>One Platform to</EuiTextColor>
                            <EuiTextColor color="#0b5cff"> connect</EuiTextColor>
                        </h3>
                        </EuiText>
                        <EuiSpacer size="l" />
                        <EuiButton fill onClick={Login}>
                            Login with Google
                        </EuiButton>
                    </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiProvider>
  );
}

export default Login;