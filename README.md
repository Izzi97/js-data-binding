# Reactive One-way Data Binding using JS Setters

Instantiate a data binding model with optional name and and set up a subscriber.
```js
import { Model } from './data-bind.js'
const model = new Model('my-model')

const subscriber = {
  value: 'nothing'
}
```

Define a property on the model and establish a one-way data binding to a property of the subscriber.
```js
model.bind('someProperty', subscriber, 'value')
```

Each new assignment of the model's property is reflected to all its subscribers.
```js
model.someProperty = 'hello' // subscriber.value === 'hello'
model.someProperty = 'world' // subscriber.value === 'world'
model.someProperty = '!'     // subscriber.value === '!'
```

The model also keeps track of all assigned values in a history.
```js
console.log(model.history.someProperty)
```
Output:
```
['hello', 'world', '!']
```

For a working example with ui integration take a look at `index.html`.
