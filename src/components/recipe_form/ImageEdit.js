import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from "styled-components";


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
    }
});


const ImageContainer = styled.div`
    max-width: 400px;
    max-height: 400px;
    overflow: hidden;
`;

class ImageEdit extends React.Component {

  render() {

      const { classes } = this.props;

      let image;
      if (this.props.imageUrl) {
          image = <img className={classes.mainImage} src={this.props.imageUrl} alt = ''/>;
      } else {
          image = <img className={classes.mainImageDummy} src="/static/images/icons/fried-rice.png" alt = ''/>;
      }

      return (
        <div>
        <ImageContainer>{image}</ImageContainer>
        <h4>Edytuj obrazek</h4>
      <input
          accept="image/*"
          id="button-file"
          multiple
          type="file"
          onChange={this.props.handleImageChange}
      />
      </div>
    );
  }
}

export default withStyles(styles)(ImageEdit);