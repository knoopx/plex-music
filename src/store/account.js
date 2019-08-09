import { types } from "mobx-state-tree"
import Axios from "axios"
import UUID from "uuid"
import { flow, filter, map } from "lodash/fp"

import Device, { parse } from "./device"
import LoginParams from "./login-params"

export default types
  .model("Account", {
    clientIdentifier: types.optional(types.string, () => UUID.v4()),
    devices: types.optional(types.array(Device), []),
    loginParams: types.optional(LoginParams, { login: "", password: "" }),
    isLoggedIn: types.optional(types.boolean, false),
    isLoggingIn: types.optional(types.boolean, false),
  })
  .preProcessSnapshot((state) => ({
    ...state,
    isLoggingIn: false,
    isLoggedIn: false,
  }))
  .actions((self) => ({
    afterCreate() {
      if (self.loginParams.login && self.loginParams.login) {
        self.login(self.loginParams)
      }
    },
    async login(loginParams) {
      self.setIsLoggingIn(true)
      try {
        const auth = await self.performLogin(loginParams, self.clientIdentifier)
        if (auth && auth.data && auth.data.authToken) {
          if (typeof auth.data.authToken === "string") {
            self.setDevices(await self.fetchDevices(auth.data.authToken))
            self.setLoginParams(loginParams)
            self.setIsLoggedIn(true)
          }
        }
      } finally {
        self.setIsLoggingIn(false)
      }
    },
    logOut() {
      self.setLoginParams({ login: "", password: "" })
      self.setDevices([])
      self.setIsLoggedIn(false)
    },
    setLoginParams(loginParams) {
      self.loginParams = loginParams
    },
    setDevices(devices) {
      self.devices = devices
    },
    setIsLoggingIn(value) {
      self.isLoggingIn = value
    },
    setIsLoggedIn(value) {
      self.isLoggedIn = value
    },
    async fetchDevices(authToken) {
      const res = await Axios.get("https://plex.tv/api/resources", {
        params: {
          "includeHttps": 1,
          "includeRelay": 1,
          "X-Plex-Token": authToken,
        },
        responseType: "document",
      })
      return flow(
        map((device) => parse(device)),
        filter((d) => d.presence && d.provides === "server"),
      )(res.data.getElementsByTagName("Device"))
    },
    async performLogin(loginParams) {
      return Axios.post("https://plex.tv/api/v2/users/signin", loginParams, {
        headers: {
          "X-Plex-Client-Identifier": self.clientIdentifier,
          "X-Plex-Device-Name": "Plex Music",
          "X-Plex-Product": "Plex Music",
          "X-Plex-Device": "OSX",
          "Accept": "application/json",
        },
      })
    },
  }))
