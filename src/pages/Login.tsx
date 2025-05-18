import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
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

    navigation.push('/it35-lab/app/home', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">CLASS  WALL </IonTitle>
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
              backgroundColor: '#d4edda',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <IonLabel className="ion-text-center" style={{ display: 'block', marginBottom: 10 }}>
              Login as
            </IonLabel>

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    fill={role === 'teacher' ? 'solid' : 'outline'}
                    color="primary"
                    onClick={() => setRole('teacher')}
                  >
                    Teacher
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    expand="block"
                    fill={role === 'student' ? 'solid' : 'outline'}
                    color="secondary"
                    onClick={() => setRole('student')}
                  >
                    Student
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>

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
