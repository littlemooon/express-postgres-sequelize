import React, { PropTypes, Component } from 'react'
import m from 'moment'

import Client from './Client'

const formatDate = x => m(x).calendar(null, {
  sameDay: '[Today] HH:mm',
  lastDay: '[Yesterday] HH:mm',
  lastWeek: 'dddd HH:mm',
  sameElse: 'DD/MM/YYYY HH:mm',
})

const Message = ({createdAt, content, user}) => user ? (
  <div className='comment'>
    <a className='avatar'>
      <img
        role='presentation'
        src={`https://api.adorable.io/avatars/40/${user.username}.png`}
      />
    </a>
    <div className='content'>
      <a className='author'>{user.username}</a>
      <div className='metadata'>
        <span className='date'>{formatDate(createdAt)}</span>
      </div>
      <div className='text'>{content}</div>
    </div>
  </div>
) : null

Message.propTypes = {
  user: PropTypes.object,
  content: PropTypes.string,
  createdAt: PropTypes.string,
}

export default class Root extends Component {

  componentWillMount() {
    Client.fetchUsers(users => this.setState({users}))
    Client.fetchMessages(messages => this.setState({messages: messages.reverse()}))
  }

  state = {
    messages: [],
    users: [],
  }

  render() {
    const { messages, users } = this.state
    return (
      <div className='ui text container' style={{marginTop: '3rem'}}>
        <div className='ui comments'>
          <h3 className='ui dividing header'>{'Messages'}</h3>
          {messages.map(m => (
            <Message
              key={m.id}
              user={users.find(u => u.id === m.userId)}
              {...m}
            />
          ))}
        </div>
      </div>
    )
  }
}
