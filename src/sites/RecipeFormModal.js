import React from 'react';
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
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth='lg'
                >
                    <DialogContent>
                        <RecipeForm
                            id={this.props.id}
                            recipe={this.props.recipe}
                            fork={this.props.fork}
                            edit={this.props.edit}
                            callbackAfterSubmit={this.props.callbackAfterSubmit}
                            handleClose={this.props.handleClose}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default RecipeFormModal;