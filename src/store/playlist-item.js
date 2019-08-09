import { types } from "mobx-state-tree"

import Album from "store/album"
import Track from "store/track"

export default types.model("PlayListItem", {
  album: types.reference(Album),
  track: types.reference(Track),
})
