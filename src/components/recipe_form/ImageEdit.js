import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    mainImage: {
        maxWidth: '80%',
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    },
    mainImageDummy: {
        maxWidth: '70%',
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        padding: '5%',
        opacity: '0.9',
    },
    cameraIcon: {
       opacity: '0.5',
       fontSize: '6em',
       margin: '60px auto',
       display: 'flex',
       cursor: 'pointer',
    }
});

class ImageEdit extends React.Component {

  render() {

      const { classes } = this.props;

      let image;
      if (this.props.imageUrl) {
          image = <img className={classes.mainImage} src={this.props.imageUrl} alt = ''/>;
      } else {
          image = <div className={classes.mainImageDummy}>
              <PhotoCameraIcon className={classes.cameraIcon} onClick={() => this.refs.fileUploadInput.click()}/>
          </div>;
      }

      return (
        <div>
        {image}
      <input
          ref="fileUploadInput"
          accept="image/*"
          id="button-file"
          type="file"
          style={{ display: 'none' }}
          onChange={this.props.handleImageChange}
      />
      </div>
    );
  }
}

export default withStyles(styles)(ImageEdit);