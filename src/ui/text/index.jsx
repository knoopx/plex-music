import PropTypes from "prop-types"
import React from "react"

const Text = ({
  muted = false,
  bold = false,
  italic = false,
  size,
  className,
  ...props
}) => {
  return (
    <span
      className={[
        {
          italic,
          "font-bold": bold,
          "text-grey-dark": muted,
        },
        className,
      ]}
      {...props}
    />
  )
}

Text.propTypes = {
  bold: PropTypes.bool,
  muted: PropTypes.bool,
  italic: PropTypes.bool,
  size: PropTypes.number,
}

export default Text
