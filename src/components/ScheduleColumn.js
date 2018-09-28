import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props =>  (props.isDraggingOver ? 'lightgrey' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

class ScheduleColumn extends React.Component {
  render() {
    return (
      <Container>
        Hello
      </Container>
    );
  }
}

export default ScheduleColumn;
