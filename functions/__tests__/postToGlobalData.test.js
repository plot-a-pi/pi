const test = require('firebase-functions-test');
const functions = require('../services/postGlobal');

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn((test) => ({
    name: test
  })),
  credential: {
    applicationDefault: jest.fn(() => ({
      name: 'test'
    }))
  },
  app: () => ({name: 'test'}),
  firestore: () => ({
    ref: jest.fn(path => ({
      set: mockSet
    }))
  })
}))

describe('post to global data service', () => {
  it('should post a new dataPoint to global', () => {
    const push = jest.fn();
    const send = jest.fn();
    const json = jest.fn();
    const res = {
      status: () => ({
        json
      }),
      send
    }

    const req ={ 
      method: 'POST',
      body: {
        circumference: 5, 
        diameter: 2.5, 
        circumferenceUnit: 'in', 
        diameterUnit: 'in'
      }
    }

    const data = {
      push,
      get: () => ({
        snap: {
          size: 1
        }
      })
    }

    return functions.postToGlobalData(req, res, data)
      .then(res => {
        expect(data.push).toBeCalledWith(req.body);
        console.log(res)
      })
  });
});
