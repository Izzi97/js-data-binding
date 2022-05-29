export class Model {
  /**
   * Instantiate a data binding model.
   * @param {string?} name optional model name
   */
  constructor(name) {
    this.name = name
    this.history = {}
    this.subscribers = {}
  }

  /**
   * Establish a one-way data binding from the model's "fromProp" property to "toObj"'s "toProp" property.
   * @param {string} fromProp 
   * @param {object} toObj 
   * @param {string} toProp 
   */
  bind(fromProp, toObj, toProp) {
    checkInput()

    const model = this
    
    registerNewSubscriber()
    initPropertyHistory()
    registerPropertySetter()

    function checkInput() {
      if (!fromProp instanceof String)
        throw new Error('fromProp must be string')
      
      if (!toObj instanceof Object)
        throw new Error('toObj must be object')
      
      if (!toProp instanceof String)
        throw new Error('toProp must be string')
    }

    function registerNewSubscriber() {
      if (!model.subscribers[fromProp])
        model.subscribers[fromProp] = []
      model.subscribers[fromProp].push([toObj, toProp])
    }

    function initPropertyHistory() {
      if (!model.history[fromProp])
        model.history[fromProp] = []
    }

    function registerPropertySetter() {
      if (model.hasOwnProperty(fromProp))
        return

      Object.defineProperty(model, fromProp, {
        
        set: function(val) {
          model.history[fromProp].push(val)
          
          model.subscribers[fromProp].forEach(([obj, prop]) => {
            obj[prop] = val
          })
        }
        
      })
    }
  }
}
