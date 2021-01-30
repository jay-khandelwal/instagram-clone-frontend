import React, {Component} from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { compose } from 'redux';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import PrivateRoute from './PrivateRoute';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import VerifyEmailLogin from './Pages/VerifyEmailLogin';
import ConfirmEmailVerify from './Pages/ConfirmEmailVerify';
import Explore from './Pages/Explore';
import Activity from './Pages/Activity';
import EditProfile from './Pages/EditProfile';
import Settings from './Pages/Settings';
import Followers from './Pages/Followers';
import Followings from './Pages/Followings';
import FollowRedirect from './Pages/FollowRedirect';
import CreateDetail from './Pages/CreateDetail';
import Directs from './Pages/Direct';

import DesktopImageCard from './Components/Gallery/DesktopImageCard';
import ImagePopup from './Components/Gallery/ImagePopup';
import MobileImageCard from './Components/Gallery/MobileImageCard';
import CardFinder from './Components/Gallery/CardFinder';
import DesktopActivityPage from './Components/Activity/Desktop/DesktopActivityPage';
import ProfilePage from './Components/Profile/ProfilePage';
import StartMssgPopup from './Components/Direct/StartMssgPopup';
import DesktopStartMssgPopup from './Components/Direct/Desktop/DesktopStartMssgPopup';
import DesktopRequestMade from './Components/Activity/Desktop/DesktopRequestMade';
import DesktopRequestRecv from './Components/Activity/Desktop/DesktopRequestRecv';
import LikePage from './Components/Home/LikePage';
import CommentPage from './Components/Home/CommentPage';
import Page404 from './Pages/Page404';

class BaseRouter extends Component {
  constructor(props){
        super(props);
        this.previousLocation = this.props.location;
   }
 
  componentWillUpdate() {
    let { location } = this.props;
    if (!(location.state && (location.state.modal || location.state.imagePopup || location.state.activity)) ) {
      this.previousLocation = location;
    }
  }
    
    
  render(){
    const upMd = isWidthUp('md', this.props.width)
    const { location } = this.props;
    
    var isModal=false;
    var isImagePopup=false;
    var isCreateDetail=false;
    var isActivity=false;
    var newLocation = location;
    
    if (upMd){
        isModal = ((location.state && location.state.isModal && this.previousLocation !== location));
        
        isImagePopup = ((location.state && location.state.imagePopup && this.previousLocation !== location));
        
        isCreateDetail = (location.pathname.includes('/create/detail'))      
        
        isActivity = (
      (location.state &&
      location.state.activity &&
      this.previousLocation !== location)
    ); 
        
        newLocation = ((isModal || isImagePopup || isCreateDetail || isActivity) ) ? this.previousLocation : location
    }
    
    return(
        <>
        <Switch location={newLocation} >
            <PrivateRoute exact path='/' component={Home} />
         
            <PrivateRoute exact path='/explore' component={Explore} />   
         
            <Route exact path={['/direct/inbox', '/direct/chat/:id']}> 
                <Directs/>
            </Route>
            <Route exact path='/direct/new' >
                { upMd &&
                <Redirect to='/direct/inbox'/>
                }
                { !upMd &&
                <PrivateRoute exact path='/direct/new' component={StartMssgPopup} />
                }
            </Route>  
        
            <PrivateRoute exact path={['/activity', '/activity/requests', '/activity/requested']} component={Activity}  />  
            
            <PrivateRoute exact path='/create/detail' component={CreateDetail} />

            <PrivateRoute exact path='/p/:slug' component={CardFinder}/>
            
            <Route 
            exact 
            path='/p/:slug/comments' 
            render={(props) => {
                if (upMd){
                    return(
                        <Redirect to={`/p/${props.match.params.slug}`}/>
                    )
                }
                else{
                    return(
                        <PrivateRoute exact path='/p/:slug/comments' component={CommentPage} />
                    )
                }
            }
            } 
            />
        
            <Route exact path='/login' component={Login} />
            <Route exact path='/Signup' component={Signup} />            
            <Route exact path='/accounts/password/reset' component={ForgotPassword} />            
            <Route exact path='/accounts/verify-email' component={VerifyEmailLogin} />            
            <Route exact path='/accounts/confirm-email/:key' component={ConfirmEmailVerify} />          
         
            <Route exact path='/accounts/password/recovery/:ud/:tkn/' component={ResetPassword} />            
       
            <PrivateRoute exact path={['/accounts/edit', '/accounts/password/change', '/accounts/privacy']} component={EditProfile} />
            
            <PrivateRoute exact path='/settings' component={Settings} />
        
            <PrivateRoute exact path='/p/:slug' component={MobileImageCard} />
            <PrivateRoute exact path='/p/:slug/likes' component={LikePage} /> 
            <PrivateRoute exact path='/gallery2' component={DesktopImageCard} />
         
            <Route exact path={['/:username', '/:username/feed', '/:username/saved']}>    
            <ProfilePage/>
            </Route>
            
            { upMd &&
            <PrivateRoute exact path={['/:username/followers', '/:username/followings']} component={FollowRedirect}/> 
            }
            

            <PrivateRoute exact path='/:username/followers' component={Followers}/>      
            <PrivateRoute exact path='/:username/followings' component={Followings} />                       

           <Route path='*' component={Page404}/>   
        </Switch>
     
        {isModal
          ? 
        <>
        <PrivateRoute exact strict path="/direct/new">
             <DesktopStartMssgPopup />
        </PrivateRoute>
        <PrivateRoute exact path={['/activity', '/activity/requests', '/activity/requested']} component={Activity}  />  
        <Route exact path={['/p/:slug', '/p/:slug/comments']}>
               <ImagePopup isImagePopup={isModal}/>
        </Route>
          
        <PrivateRoute exact path='/p/:slug/likes' component={LikePage} />              
        
        <PrivateRoute exact path='/:username/followers' component={Followers}/>      
        <PrivateRoute exact path='/:username/followings' component={Followings} />         
        </>          
          : null
        }
        
        {isImagePopup
          ? 
          <Route exact path="/p/:slug">
               <ImagePopup isImagePopup={isImagePopup}/>
          </Route>
          : null
        }
        
        { isCreateDetail &&
        <PrivateRoute exact path='/create/detail' component={CreateDetail} />
        }
        
        { isActivity ?
        <>
        <PrivateRoute path='/activity' component={DesktopActivityPage} />
        <PrivateRoute exact path='/activity/requests' component={DesktopRequestRecv} />
        <PrivateRoute exact path='/activity/requested' component={DesktopRequestMade} />
        </>
        :null}
      
        </>
  )
    }
};


export default compose(withRouter, withWidth())(BaseRouter);
