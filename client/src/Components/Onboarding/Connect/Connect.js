
import google from "../../../Assets/Images/Icons/google.svg"
import facebook from "../../../Assets/Images/Icons/facebook.svg"
import github from "../../../Assets/Images/Icons/github.svg"
import twitter from "../../../Assets/Images/Icons/twitter.svg"
import email from "../../../Assets/Images/Icons/email.svg"
import ConnectButton from "../../ConnectButton/ConnectButton"
import { useEffect } from "react"
import firebaseApp from "../../../firebase.js";
import firebase from "firebase/app";

export default function Start(props) {

    useEffect(() => {
        props.animate("connect");
    }, []);

    const connectWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        firebaseApp.auth().signInWithPopup(provider).then((result) => {
            const user = result.user;
            props.sendMachine({ type: "CONTRIBUTE", authUser: {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                } 
            });
        });
    };

    const connectWithFacebook = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(authProvider);
        props.sendMachine("CONTRIBUTE");
    }

    const connectWithGithub = () => {
        const authProvider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(authProvider);
        props.sendMachine("CONTRIBUTE");
    }

    const connectWithTwitter = () => {
        const authProvider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(authProvider);
        props.sendMachine("CONTRIBUTE");
    }

    const connectWithEmail = () => {
        firebase.auth().createUserWithEmailAndPassword("maor@maor.com", "password");
        props.sendMachine("CONTRIBUTE");
    }

    return (
        <div style={styles.step}>
            <div style={styles.content}>
                <div style={styles.h1}> Sign in </div>
                <div style={styles.h2}> Lorem ipsum dolor sit amet elit.</div>
                <ConnectButton text="Sign in with Google" icon={google} action={() => connectWithGoogle()} />
                {/* todo: need to open apps for all of the bellow logins */}
                {/* <ConnectButton text="Sign in with Facebook" icon={facebook} action={() => connectWithFacebook()} />
                <ConnectButton text="Sign in with Github" icon={github} action={() => connectWithGithub()} />
                <ConnectButton text="Sign in with Twitter" icon={twitter} action={() => connectWithTwitter()} /> */}
                <ConnectButton text="Sign in with Email" icon={email} action={() => connectWithEmail()} />
            </div>
        </div>
    );
}

const styles = {
    step: {
        display: "flex",
        flexDirection: "row",
        marginTop: "4%",
        marginLeft: "45%",
        padding: "19px",
        zIndex: 1
    },
    content: {
        width: "480px"
    },
    h1: {
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "48px",
        lineHeight: "59px",
        color: "#ffffff",
        whiteSpace: "pre-line"
    },
    h2: {
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "24px",
        lineHeight: "29px",
        background: "linear-gradient(#05DFFC -2.86%, #0BFFC4 107.93%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        divShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        whiteSpace: "pre-line",
        marginBottom: "28px"
    }
};
