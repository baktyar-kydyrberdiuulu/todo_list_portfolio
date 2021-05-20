import React from 'react'
import { Button, Checkbox } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import { useDispatch, } from 'react-redux'
import { delete_todo, toggle_todo, edit_todo } from '../../store/actions'


const ItemContainer = ({ after, children }) => {
  return after ? <Item>{children}</Item> : <Item after>{children}</Item>
}

const Item = styled.div`
display: flex;
justify-content: space-between;
margin: 10px 0;
background-color:${(props) => {
    return props.after ? " red" : "beige"
  }};
padding: 8px;
borderRadius: 5px;
`


export const TodoItem = ({ todo, id }) => {

  const dispatch = useDispatch()
  console.log(todo)

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`)
    dispatch(toggle_todo(id, e.target.checked))
  }
  const dedline = moment(todo.dedline).format('MMMM Do YYYY')
  const after = moment(todo.dedline).isAfter(moment())

  return <ItemContainer after={after}>
    {/* <div
      style={{
        textDecoration:
          todo.checked
            ? 'line-through'
            : 'none'
      }}

      onChange={(e) => dispatch(edit_todo(id, e.currentTarget.textContent))} contentEditable='true'>
      {todo.text}

    </div> */}
    <input
      style={{
        border: 'none', background: 'none',
        textDecoration:
          todo.checked
            ? 'line-through'
            : 'none',
      }}
      type='text' value={todo.text}
      onChange={(e) => {
        // console.log(e.target.value)
        dispatch(edit_todo(id, e.target.value))
      }}
    />
    <i style={{
      textDecoration:
        todo.checked
          ? 'line-through'
          : 'none'
    }}
    >
      {dedline}
    </i>
    <div>
      <Checkbox value={todo.checked} style={{ marginRight: 10 }} onChange={onChange}></Checkbox>
      <Button onClick={() => {
        dispatch(delete_todo(id))
      }} type="primary" danger>delete</Button>
    </div>
  </ItemContainer>
}