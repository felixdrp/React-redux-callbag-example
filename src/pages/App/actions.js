// name format: 'yourproject/YourContainer/YOUR_ACTION_CONSTANT'
const APP_NAME = 'app/App/'

// pass an amount
// 'this' will be inherited from object
function passAmount(amount) {
  return {
    type: this.type,
    amount,
  }
}

export default {
  // reuse the same action function
  add: {
    type: APP_NAME + 'ADD',
    action: passAmount
  },
  minus: {
    type: APP_NAME + 'MINUS',
    action: passAmount
  },
  // Example action fucntion format call 1
  exampleAsyncCall: {
    type: APP_NAME + 'EXAMPLE_ASYNC_CALL_1',
    action: function () {
      return {
        type: this.type,
      }
    }
  },
  // Example action fucntion format call 2
  exampleAsyncCall2: {
    type: APP_NAME + 'EXAMPLE_ASYNC_CALL_2',
    action() {
      return { type: this.type }
    }
  },
}
