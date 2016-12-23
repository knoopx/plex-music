import Color from 'color-js'

export default {
  touchableOpacity: {
    cursor: 'pointer',
  },
}

function lighten(value, amount) {
  return Color(value).lightenByAmount(amount).toString()
}

function darken(value, amount) {
  return Color(value).darkenByAmount(amount).toString()
}

function contrast(baseColor, amount) {
  const color = Color(baseColor)
  const luminance = color.getLuminance()
  if (luminance >= 0.5) {
    return darken(baseColor, amount)
  }
  return lighten(baseColor, amount)
}

function raisedStyle(borderColor) {
  return {
    boxShadow: `0 1px 0 ${borderColor}, 0 -1px 0 ${borderColor}, 1px 0 0 ${borderColor}, -1px 0 0 ${borderColor}, 0 1px 1px ${borderColor}`,
  }
}

export function build(accentColor, baseColor) {
  const backgroundColor = baseColor
  const textColor = contrast(baseColor, 0.75)
  const textMutedColor = Color(textColor).setAlpha(0.6).toString()
  const borderColor = contrast(backgroundColor, 0.1)
  const accentBackground = `linear-gradient(to bottom, ${lighten(accentColor, 0.1)}, ${accentColor})`
  const accentTextColor = contrast(accentColor, 0.75)
  const accentTextMutedColor = Color(accentTextColor).setAlpha(0.6).toString()

  const spinnerColor = contrast(baseColor, 0.5)

  const frameBackgroundColor = lighten(backgroundColor, 0.02)
  const frameBackgroundGradient = `linear-gradient(${frameBackgroundColor}, ${contrast(frameBackgroundColor, -0.02)})`
  const frameBorderColor = contrast(frameBackgroundColor, 0.3)

  const toolbarBackgroundColor = contrast(backgroundColor, 0.2)
  const toolbarBackgroundGradient = `linear-gradient(${lighten(toolbarBackgroundColor, 0.05)}, ${toolbarBackgroundColor})`

  return {
    app: {
      style: {
        color: textColor,
        backgroundColor,
      },
    },
    text: {
      mutedStyle: {
        color: textMutedColor,
      },
    },
    frame: {
      style: {
        background: frameBackgroundGradient,
        ...raisedStyle(frameBorderColor),
      },
    },
    button: {
      style: {
        background: frameBackgroundGradient,
        ...raisedStyle(frameBorderColor),
      },
      activeStyle: {
        background: accentBackground,
        color: accentTextColor,
      },
    },
    divider: {
      size: 1,
      color: borderColor,
    },
    badge: {
      style: {
        fontSize: 14,
      },
    },
    rating: {
      size: 16,
    },
    spinner: {
      color: spinnerColor,
    },
    artwork: {
      borderColor,
    },
    toolbar: {
      style: {
        background: toolbarBackgroundGradient,
      },
    },
    listItem: {
      containerStyle: { borderBottom: `1px solid ${borderColor}` },
      activeStyle: {
        color: accentTextColor,
        background: accentBackground,
      },
      activeTextMutedStyle: {
        color: accentTextMutedColor,
      },
    },
    nowPlaying: {
      style: {
        backgroundColor: contrast(frameBackgroundColor, 0.05),
      },
    },
    filterGroup: {
      focusStyle: {
        ...raisedStyle(accentColor),
      },
    },
    seekBar: {
      progressBarStyle: {
        background: accentBackground,
      },
      bufferBarStyle: {
        background: contrast(frameBackgroundColor, 0.05),
      },
    },
  }
}
