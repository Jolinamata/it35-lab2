// src/pages/Login.tsx
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  useIonRouter,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
} from '@ionic/react';
import { useState } from 'react';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [role, setRole] = useState<string>();
  const [showToast, setShowToast] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = () => {
    if (!role || !username || !password) {
      setShowToast(true);
      return;
    }

    console.log('Logging in as', role, username);
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
    navigation.push('/it35-lab/app/home/wall', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 400,
              backgroundColor: '#9acd32', // Yellow-green
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <IonItem>
              <IonLabel>Login as</IonLabel>
              <IonSelect
                placeholder="Select Role"
                value={role}
                onIonChange={(e) => setRole(e.detail.value)}
              >
                <IonSelectOption value="teacher">Teacher</IonSelectOption>
                <IonSelectOption value="student">Student</IonSelectOption>
              </IonSelect>
            </IonItem>

            {role && (
              <>
                <IonItem>
                  <IonLabel position="floating">Username</IonLabel>
                  <IonInput
                    type="text"
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  />
                </IonItem>

                <IonButton
                  onClick={doLogin}
                  expand="block"
                  className="ion-margin-top"
                >
                  Login as {role.charAt(0).toUpperCase() + role.slice(1)}
                </IonButton>
              </>
            )}
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Please complete all fields before logging in."
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
