import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux'
import SelectTransaction from '../components/SelectTransaction';
import { RouteComponentProps } from 'react-router-dom';

import './HomePage.css';



interface walletDetailsPageProps extends RouteComponentProps<{
  wallet: string;
}> {}

const SendPage: React.FC<walletDetailsPageProps> = ({match}) => {

  
  const counter = useSelector( (state:any) => state.propsPage.counter);
  
  console.log(counter);
  const dispatch = useDispatch()



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transaction - Send</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton routerLink="/HomePage">test </IonButton>
        

        User {match.params.wallet}

      </IonContent>
    </IonPage>
  );
};

export default SendPage;
