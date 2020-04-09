import React from "react";
import PropTypes from "prop-types";
import mousetrap from "mousetrap";
import { inject, observer } from "mobx-react";

import { MdEject, MdLightbulbOutline } from "react-icons/md";

import { AppState, AlbumStore } from "stores";
import { Toolbar } from "app/components";
import { View, Button, Gutter, Divider, Select } from "ui";

import PlayListView from "./play-list-view";
import AlbumListView from "./album-list-view";
import PlayerView from "./player-view";

import FilterGroup from "./filter-group";
import OrderButtonGroup from "./order-button-group";

@inject("appState")
@inject("albumStore")
@observer
export default class PlayerScreen extends React.Component {
  static propTypes = {
    appState: PropTypes.instanceOf(AppState).isRequired,
    albumStore: PropTypes.instanceOf(AlbumStore).isRequired
  };

  componentWillMount() {
    mousetrap.bind("command+r", this.refresh);
  }

  componentWillUnmount() {
    mousetrap.unbind("command+r", this.refresh);
  }

  refresh = (e) => {
    this.props.albumStore.fetch(true);
    e.preventDefault();
  }

  render() {
    const { appState } = this.props;

    return (
      <View flow="column" style={{ flex: 1 }}>
        <Toolbar>
          <View flow="row" style={{ flex: 1 }}>
            <Gutter size={70} />
            <FilterGroup />
            <Gutter size={4} />
            <Select
              value={appState.activeSectionIndex}
              onChange={appState.onChangeSection}
            >
              {appState.sections.map((section, index) => (
                <option key={section.id} value={index}>
                  {section.name}
                </option>
              ))}
            </Select>
            <Gutter />
            <OrderButtonGroup />
          </View>
          <Gutter size={16} />
          <View flow="row" style={{ flex: 1 }}>
            <PlayerView />
            <Gutter size={16} />
            <Button
              active={appState.themeName === "dark"}
              style={{ width: 48, height: 34, justifyContent: "center", alignItems: "center", display: "flex" }}
              onClick={() =>
                appState.setThemeName(
                  appState.themeName === "dark" ? "light" : "dark"
                )
              }
            >
              <MdLightbulbOutline size={18} />
            </Button>
            <Gutter size={4} />
            <Button
              style={{ width: 48, height: 34, justifyContent: "center", alignItems: "center", display: "flex" }}
              onClick={appState.disconnect}
            >
              <MdEject size={24} />
            </Button>
          </View>
        </Toolbar>
        <Divider />
        <View flow="row" style={{ flex: 1 }}>
          <AlbumListView />
          <Divider />
          <PlayListView />
        </View>
      </View>
    );
  }
}
