module.exports = {
  USER_REGISTRATION_SUCCESS: {
    fail: false,
    success: true,
    message: "User created successfully",
  },
  FAILED: "Something went wrong!",
  USERS_NOT_FOUND: "Users are not available",
  USER_NOT_FOUND: "User is not registered",
  ALREADY_ACCEPTED: "The user is already activated",
  SUCCESS: "Success",
  EMAIL_ALREADY_EXISTS: "Email address already exists.",
  CLIENT_REGISTERED_SUCCESS:
    "Your request has been generated sucessfully successfully",
  CLIENT_ACCEPTED: "Your account has been activated.",
  LOGIN_SUCCESS: "logged in successfully ",
  SUCCESS_UPDATE: "successfully updated!",
  SUCCESS_DELETE: "successfully deleted!",
  PROJECT_ADDED: "Add project successfully",
  PROJECT_UPDATED: "Project updated successfully",
  TASK_SUCCESS: "Task created successfully ",
  FORGET_EMAIL_SUCCESS: "Reset link successfully send to your email address",
  PASSWORD_UPDATED: "your password successfully updated",
  TOKEN_EXPIRED: "your token has expired",
  UPLOAD_IMAGE: "uplaod image succesfully",
  NETWORK_ERROR: "Network error !",
  genericResponse: (status, success, data, error, message) => {
    return {
      status: {
        code: status,
        success: success,
      },
      data: data,
      error: error,
      message: message,
    };
  },
};
