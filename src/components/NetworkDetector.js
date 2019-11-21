import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';


import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

export default function (ComposedComponent) {
    class NetworkDetector extends Component {
        state = {
            isDisconnected: false
        }

        componentDidMount() {
            this.handleConnectionChange();
            window.addEventListener('online', this.handleConnectionChange);
            window.addEventListener('offline', this.handleConnectionChange);
        }

        componentWillUnmount() {
            window.removeEventListener('online', this.handleConnectionChange);
            window.removeEventListener('offline', this.handleConnectionChange);
        }


        handleConnectionChange = () => {
            const condition = navigator.onLine ? 'online' : 'offline';
            if (condition === 'online') {
                const webPing = setInterval(
                    () => {
                        fetch('//google.com', {
                            mode: 'no-cors',
                        })
                            .then(() => {
                                this.setState({ isDisconnected: false }, () => {
                                    return clearInterval(webPing)
                                });
                            }).catch(() => this.setState({ isDisconnected: true }))
                    }, 2000);
                return;
            }

            return this.setState({ isDisconnected: true });
        }

        render() {
            const { isDisconnected } = this.state;
            const message = 'Jesteś offline. Wprowadzone zmiany nie zostaną zapisane.';
            return (
                <div>
                    {isDisconnected && (<SnackbarContent
                        aria-describedby="client-snackbar"
                        style={{position: 'fixed', top: '50px', margin: '10px', zIndex: 10000, backgroundColor: '#ff005f'}}
                        message={
                            <span id="client-snackbar">
                                {message}
                            </span>
                        }
                    />)
                    }
                    <ComposedComponent {...this.props} />
                </div>
            );
        }
    }

    return NetworkDetector;
}