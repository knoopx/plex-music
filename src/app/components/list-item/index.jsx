import React from 'react'
import { inject } from 'mobx-react'
import { TouchableOpacity, View } from 'ui'
import { ThemeProvider, theme } from 'react-theme'

@theme('listItem')
@inject('theme')
export default class ListItem extends React.PureComponent {
  render() {
    const { active, style, activeStyle, containerStyle, activeTextMutedStyle, theme, ...props } = this.props

    return (
      <TouchableOpacity style={containerStyle} >
        <ThemeProvider
          theme={{
            ...theme,
            ...(active && { text: { mutedStyle: activeTextMutedStyle } }),
          }}
        >
          <View
            flow="row" {...props} style={{
              flex: 1,
              padding: '8px 16px',
              alignItems: 'center',
              ...style,
              ...(active && activeStyle),
            }}
          />
        </ThemeProvider>
      </TouchableOpacity>
    )
  }
}
