import entry from "../yoga/javascript/sources/entry-common";
import emscripten from '../build/yoga.js'

function bind(name, proto) {
    return proto;
}

function init(mod) {
    return entry(bind, mod)
}

export default function Yoga(path) {
    return emscripten({
        locateFile() {
            return path
        },
        onRuntimeInitialized() {
            console.log('onRuntimeInitialized')
        }
      }).then(init)
}

