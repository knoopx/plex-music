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
  bold: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  italic: PropTypes.bool.isRequired,
  size: PropTypes.number,
}

export default Text
