import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux'
import SelectTransaction from '../components/SelectTransaction';

import './HomePage.css';

const HomePage: React.FC = () => {

  
  const counter = useSelector( (state:any) => state.propsPage.counter);
  
  console.log(counter);
  const dispatch = useDispatch()


  /*
  <IonButton color="primary" onClick={() => { dispatch({ type: "INCREASE_COUNTER" })}}>Primady { counter }</IonButton>
  <IonButton routerLink="/tab2">got to tab2 </IonButton>
  */

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        


        <SelectTransaction walletAddress="0x74A0Ccc350b5877cf6A8FB1Ccf922E76ECb8b524" />
        <IonButton>Add a wallet</IonButton>
        <IonButton>Create a wallet</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
