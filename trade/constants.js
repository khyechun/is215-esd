
exports.errorName = {
    NOTRADES: 'NOTRADES',
    CREATETRADE: 'CREATETRADE'
  }
  
  exports.errorType = {
    NOTRADES: {
      message: 'No such trades found',
      statusCode: 404
    },
    CREATETRADE: {
      message: 'Error creating trade',
      statusCode: 500
    }
  }