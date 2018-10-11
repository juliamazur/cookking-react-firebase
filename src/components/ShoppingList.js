import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  display: flex;
  max-width: 90%;
  margin: 30px auto;
  padding: 4%;
`;

class AddIngredient extends React.Component {

render() {
    const { classes } = this.props;

    return (
      <Container>
          <h3>Lista zakupów</h3>
      </Container>
);

}

}

export default AddIngredient;
