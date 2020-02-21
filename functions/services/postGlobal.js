exports.postToGlobalData = (req, res, data) => {
  if(req.method !== 'POST'){
    return res.status('401').json({
      message: 'POST method required, access denied'
    })
  }
  // req.body = {circumference: num, diameter: num, circumferenceUnit: string, diameterUnit: string}
  return Promise.resolve(data.push(req.body))
};
