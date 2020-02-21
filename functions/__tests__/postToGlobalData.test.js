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
    const res = {
      status: () => {},
      json: 'POST method required, access denied'
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
      push
    }

    return functions.postToGlobalData(req, res, data)
      .then(res => {
        expect(data.push).toBeCalledWith(req.body);
      })
  });
});


