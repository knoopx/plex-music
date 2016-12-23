// @flow

import React from 'react'

import TouchableOpacity from '../touchable-opacity'

const touchableStyle = {
  default: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: '8px 16px',
    backgroundColor: '#f0f0f0',
  },
  active: {
    backgroundColor: 'white',
  },
}

const textStyle = {
  active: {
    fontWeight: 'bold',
  },
}

type Props = {
  active: boolean,
  title: string
}

export default function Tab(props: Props) {
  const { active, ...otherProps } = props
  let style = touchableStyle.default
  if (active) {
    style = { ...touchableStyle.default, ...touchableStyle.active }
  }

  return (
    <TouchableOpacity {...otherProps} style={style}>
      <span style={active ? textStyle.active : {}}>{props.title}</span>
    </TouchableOpacity>
  )
}
