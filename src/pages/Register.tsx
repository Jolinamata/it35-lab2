import React, { useState } from 'react';
import { 
  IonButton,
  IonContent, 
  IonInput, 
  IonItem, 
  IonTextarea, 
  IonPage, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonAlert,
  IonLoading,
  IonText,
  useIonRouter,
  IonCard,
  IonCardContent,
  IonAvatar
} from '@ionic/react';

const Register: React.FC = () => {
  const navigation = useIonRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const DoRegister = () => {
    setIsLoading(true);
    if (!firstName || !lastName || !address || !email || !password || !confirmPassword) {
      setAlertMessage("Please fill in all fields.");
      setTimeout(() => {
        setShowAlert(true);
        setIsLoading(false); 
      }, 1000); 
      return;
    }
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setTimeout(() => {
        setShowAlert(true);
        setIsLoading(false); 
      }, 1000); 
      return;
    }

    setAlertMessage("Registration successful! Redirecting to login.");
    setTimeout(() => {
      setShowAlert(true);
      setIsLoading(false);
    }, 1000); 
    setTimeout(() => {
      navigation.push('/it35-lab', 'forward', 'replace'); 
    }, 3000); 
  };

  const DoLogin = () => {
    navigation.push('/it35-lab', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <IonAvatar style={{ width: '100px', height: '100px' }}>
            <img 
              src="https://www.recordnet.com/gcdn/presto/2021/03/22/NRCD/9d9dd9e4-e84a-402e-ba8f-daa659e6e6c5-PhotoWord_003.JPG" 
              alt="Avatar" 
            />
          </IonAvatar>
        </div>

        <IonCard style={{ maxWidth: '500px', margin: '20px auto' }}>
          <IonCardContent>
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <IonText style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>USER REGISTRATION</IonText>
            </div>

            <IonItem>
              <IonTextarea
                label="First Name"
                labelPlacement="floating"
                fill="solid"
                placeholder="Enter your first name"
                value={firstName}
                onIonChange={(e) => setFirstName(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonTextarea
                label="Last Name"
                labelPlacement="floating"
                fill="solid"
                placeholder="Enter your last name"
                value={lastName}
                onIonChange={(e) => setLastName(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonTextarea
                label="Address"
                labelPlacement="floating"
                fill="solid"
                placeholder="Enter your address"
                value={address}
                onIonChange={(e) => setAddress(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Email"
                labelPlacement="floating"
                fill="solid"
                type="email"
                placeholder="Enter your email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Password"
                labelPlacement="floating"
                fill="solid"
                type="password"
                placeholder="Enter password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Confirm Password" 
                labelPlacement="floating" 
                fill="solid" 
                type="password" 
                placeholder="Confirm password" 
                value={confirmPassword} 
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              />
            </IonItem>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <IonButton onClick={DoRegister} expand="block">Register</IonButton>
              <IonButton fill="outline" onClick={DoLogin} expand="block">Sign In</IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        <IonLoading
          isOpen={isLoading}
          message="Please wait..."
          duration={0}
          spinner="circles"
        />

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={alertMessage.includes("successful") ? "Success" : "Error"}
          message={alertMessage}
          buttons={[{ text: 'OK', handler: () => setShowAlert(false) }]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;
