import React from "react";

import { MdStar, MdRestore, MdSortByAlpha } from "react-icons/md";

import { inject, observer } from "mobx-react";
import { ButtonGroup, Button } from "ui";
import { OrderFn } from "stores/album-store/support";

const iconMap = {
  alphabetically: MdSortByAlpha,
  recentlyAdded: MdRestore,
  userRating: MdStar
};

@inject("albumStore")
@observer
export default class OrderButtonGroup extends React.Component {
  renderButton = (order, index) => {
    const { albumStore } = this.props;

    const Icon = iconMap[order];

    return (
      <Button
        key={index}
        style={{ width: 48, height: 34, justifyContent: "center", alignItems: "center", display: "flex" }}
        active={albumStore.order === order}
        onClick={() => {
          albumStore.setOrder(order);
        }}
      >
        <Icon size={18} />
      </Button>
    );
  };

  render() {
    return (
      <ButtonGroup>{Object.keys(OrderFn).map(this.renderButton)}</ButtonGroup>
    );
  }
}
