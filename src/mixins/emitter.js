function broadcast (compoentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name
    if (name === compoentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [compoentName, eventName].concat([params]))
    }
  })
}

export default {
  methods: {
    dispatch (compoentName, eventName, params) {
      let parant = this.$parent || this.$root
      let name = parant.$options.name
      while (parant && (!name || name !== compoentName)) {
        parant = parant.$parent
        if (parant) {
          name = parant.$options.name
        }
      }
      if (parant) {
        parant.$emit.apply(parant, [eventName].concat(params))
      }
    },
    broadcast (compoentName, eventName, params) {
      broadcast.call(this, compoentName, eventName, params)
    }
  }
}
