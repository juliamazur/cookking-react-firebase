import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

import RecipeForm from './RecipeForm';

class RecipeFormModal extends React.Component {

    render() {
        return (
            <div>
                <Button onClick={this.props.handleOpen}>Open alert dialog</Button>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        {this.props.id}
                        <RecipeForm
                            id={this.props.id}
                            recipe={this.props.recipe}
                            fork={this.props.fork}
                            edit={this.props.edit}
                            callbackAfterSubmit={this.props.callbackAfterSubmit}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.props.handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default RecipeFormModal;