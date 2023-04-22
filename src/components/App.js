import React from "react";
import TrelloList from "./TrelloList";
import {connect} from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {sort} from "../actions/cardActions";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function App (props) {
    const onDragEnd = (result) => {
        const {destination, source, draggableId, type} = result;

        if(!destination) {
            return;
        }

        props.dispatch(
            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
            )
        )
    };

    const {lists} = props;
  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='App'>
          <h2>Hello Youtube!</h2>
            <Droppable droppableId='all-lists' direction='horizontal' type='list'>
                {provided => (
                    <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                        {lists.map((list, index) => (
                            <TrelloList listID={list.id} title={list.title} cards={list.cards} key={list.id} index={index}/>
                        ))}
                        {provided.placeholder}
                        <TrelloActionButton list />
                    </ListContainer>
                )}
            </Droppable>
        </div>
      </DragDropContext>
  );
}



const mapStateToProps = state => ({
    lists: state.listsList
})

export default connect(mapStateToProps) (App);
