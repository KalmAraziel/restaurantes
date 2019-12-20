import firebase from 'firebase/app';

export const reLogin = (pass: string) => {
    const user = firebase.auth().currentUser;
    const credenciales = firebase.auth.EmailAuthProvider.credential(user.email, pass);
    return user.reauthenticateWithCredential(credenciales);
}