export const createSuccess = (statusCode, statusMsg, data) => {
    const successRes = {
        status: statusCode,
        message: statusMsg,
        data: data
    }
    return successRes;
}

export const createError = (status, error) => {
    const err = new Error();
    err.stack = status;
    err.message = error;
    return {
        status: status,
        message: error
    }
    return err;
}

export const createErrorWithData = (status, error, data) => {
    return {
        status: status,
        message: error,
        data: data
    }
}