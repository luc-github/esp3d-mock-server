# ESP3D Mock Server

:computer:  Mock server for [ESP3D web UI](https://github.com/luc-github/ESP3D-WEBUI) development purpose.

:warning:  Do not use for production !  :warning:

## Installing

```
yarn add esp3d-mock-server -D
```

## CLI options

```
$ esp3d-mock-server

  -V, --version                output the version number
  -P, --http-port <number>     HTTP port (default: 8080)
  -F, --firmware <name>        Target firmware (default: "marlin")
  -W, --ws-port <number>       Websocket server port (default: 81)
  -T, --throttle <number>      Throttle value (bps) (default: 0)
  -S, --serial-port <path>     Serial path to bind
  -B, --serial-speed <number>  Serial communication speed (default: 250000)
  -I, --interactive            Run interactive CLI
  -h, --help                   display help for command
```
