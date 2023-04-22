import React, {useState} from "react";
import {Button, Card} from "@material-ui/core";
import {TextareaAutosize} from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';
import {connect} from "react-redux";
import {CONSTANTS} from "../actions";
import styled from "styled-components";

const ActionButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`

const IconButtonStyle = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  height: 36px;
  width: 272px;
`

const TrelloActionButton = (props) => {


    const [formOpen, setFormOpen] = useState(false);
    const [text, setText] = useState('');



    const handleAddList = () => {
        const {dispatch} = props
            if(text) {
            dispatch({
                type: CONSTANTS.ADD_LIST,
                payload: text
            })
    }
            return;
    }

    const handleAddCard = () => {
        const {dispatch, listID} = props
        if(text) {
            dispatch({
                type: CONSTANTS.ADD_CARD,
                payload: {listID, text}
            })
        }
        return;
    }



    const renderForm = () => {
        const {list} = props;
        const placeholder = list ? 'Enter list title...' : 'Enter a title for this card...';
        const buttonTitle = list ? 'Add List' : 'Add Card';
        return (
            <div>
                <Card>
                    <TextareaAutosize placeholder={placeholder}
                                      autoFocus
                                      onBlur={() => setFormOpen(!formOpen)}
                                      value={text}
                                      onChange={(e) => setText(e.target.value)}
                    ></TextareaAutosize>
                </Card>
                <ActionButtonContainer>
                    <Button
                        onMouseDown={buttonTitle === 'Add List' ? handleAddList : handleAddCard}
                        variant='contained'>{buttonTitle}</Button>
                    <Button onMouseDown={() => setText('')}><CloseIcon></CloseIcon></Button>
                </ActionButtonContainer>
            </div>
        )
    }

    const renderAddButton = () => {
        const {list} = props;
        const buttonText = list ? 'Add another list' : 'Add another card';

        return (
                <IconButtonStyle onClick={() => setFormOpen(!formOpen)}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                 className="bi bi-plus" viewBox="0 0 16 16">
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>&nbsp;{buttonText}</IconButtonStyle>
        )
    }

    return (formOpen ? renderForm() : renderAddButton())
}



export default connect() (TrelloActionButton);