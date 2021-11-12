import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import HomePage from './homePage/homePage';
import PageSong from './PageSong/PageSong';
import  MyProFile from './myFroFile/MyProFile'
import Login from './Authen/login';
import Menu from './Header1/Menu';
import Footer from './Footer/Footer';
import System from '../routes/System';
import Home from '../routes/Home';
import { CustomToastCloseButton } from '../components/CustomToast';
import  CustomScrollbars from '../components/CustomScrollbars';
import PlayerMusic from '../components/PlayerMusic';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <Menu />  

                     
    
                            <div className="content-container">
                                <CustomScrollbars style={{height: '100vh', width: '100%'}}  >
                                    <Switch>
                                         <Route exact path={path.HOME} component={(Home)} />
                                         <Route  path={path.HOMEPAGE} component={(HomePage)} /> 
                                         <Route path={path.SONG} component={(PageSong)} />
                                         <Route path={path.MY_MUSIC} component={(MyProFile)} />
                                       
                                       
                                        <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                        <Route path={path.SYSTEM} component={userIsAuthenticated(System)} /> 
                                    </Switch>
                                </CustomScrollbars>
                            </div>
                            <PlayerMusic />
                        <Footer />

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}


                            <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            />
                    </div>
                   
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);