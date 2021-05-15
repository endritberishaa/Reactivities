import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';


function App() {

  const location = useLocation();

  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(()=> commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

if (!commonStore.appLoaded) return <LoadingComponent content='Loading App...'/>

  return (
    <>
      <ModalContainer/>
      <Route exact path='/' component={HomePage}/>
      <Route 
      path={'/(.+)'}
      render={()=>(
        <>
      <NavBar/>
      <Container style={{marginTop: '8em'}}>
        <Route exact path='/activities' component={ActivityDashboard}/>
        <Route path='/activities/:id' component={ActivityDetails}/>
        <Route path='/login' component={LoginForm}/>
        <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
      </Container>
        </>
      )}
      />



    </>
  );
  }

export default observer(App);
