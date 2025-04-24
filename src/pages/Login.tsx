import React, { useState } from 'react';
import { 
  IonAvatar,
  IonButton,
  IonContent, 
  IonInput, 
  IonInputPasswordToggle, 
  IonItem, 
  IonList,
  IonCard,
  IonCardContent,
  IonPage, 
  IonText, 
  IonToolbar, 
  IonTitle, 
  useIonRouter, 
  IonAlert, 
  IonModal, 
  IonToast,
  IonHeader
} from '@ionic/react';

const Login: React.FC = () => {
  const navigation = useIonRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validUsername = 'user123';
  const validPassword = 'password123';

  const doLogin = () => {
    if (!username || !password) {
      setShowAlert(true);
    } else {
      if (username === validUsername && password === validPassword) {
        setShowSuccessModal(true);
        setShowToast(true);
      } else {
        setLoginError(true);
      }
    }
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigation.push('/it35-lab/app', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <IonAvatar className="avatar" style={{ width: '100px', height: '100px' }}>
            <img 
              src="https://www.recordnet.com/gcdn/presto/2021/03/22/NRCD/9d9dd9e4-e84a-402e-ba8f-daa659e6e6c5-PhotoWord_003.JPG" 
              alt="Avatar" 
            />
          </IonAvatar>
        </div>

        <IonCard style={{ maxWidth: '500px', margin: '20px auto' }}>
          <IonCardContent>
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <IonText style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>USER</IonText>
            </div>

            <IonList>
              <IonItem>
                <IonInput
                  label="Username"
                  placeholder="Enter your username"
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                >
                  <IonInputPasswordToggle slot="end" onClick={() => setShowPassword(!showPassword)} />
                </IonInput>
              </IonItem>
            </IonList>

            {loginError && (
              <IonText color="danger">
                <p style={{ color: '#e74c3c', marginTop: '10px', marginBottom: '0' }}>
                  Incorrect username or password. Please try again.
                </p>
              </IonText>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <IonButton onClick={doLogin} expand="block">
                Login
              </IonButton>  
              <IonButton onClick={() => navigation.push('/it35-lab/register', 'forward', 'replace')} expand="block" fill="outline">
                Create Account
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        <IonModal isOpen={showSuccessModal} onDidDismiss={handleSuccessModalClose}>
          <IonContent className="ion-padding">
            <h2>Login Successful!</h2>
            <IonButton expand="full" onClick={handleSuccessModalClose}>Go to Dashboard</IonButton>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={showToast}
          message="Login successful! Redirecting to the dashboard..."
          onDidDismiss={() => setShowToast(false)}
          duration={3000}
        />

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Please Fill in All Fields"
          message="All fields are required. Please fill in all fields."
          buttons={[{
            text: 'OK',
            handler: handleAlertConfirm,
          }]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
